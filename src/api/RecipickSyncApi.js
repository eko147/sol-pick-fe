import axios from "axios";
import { authApi } from "./AuthApi";
import { BASE_URL } from "../config";
import { ingredientApi } from "./IngredientApi";
import { notificationApi } from "./NotificationApi";

// 동기화 주기
const SYNC_INTERVAL = 10000; // 10초 (밀리초)

// 모듈 스코프 변수로 마지막 동기화 주문 ID 저장
let _lastSyncOrderId = 0;

// 유통기한과 등록일을 한국 시간 기준으로 설정하는 함수
const getKoreanDateTime = (daysToAdd = 0) => {
  // 현재 UTC 시간에 9시간 추가하여 한국 시간으로 변환
  const now = new Date();
  const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  if (daysToAdd > 0) {
    // 지정된 일수 추가 (유통기한용)
    koreanTime.setDate(koreanTime.getDate() + daysToAdd);
  }

  // ISO 문자열로 변환 후 시간대 정보(Z) 제거
  // 서버에서 LocalDateTime으로 파싱할 수 있는 형식
  return (
    koreanTime.toISOString().split(".")[0] +
    "." +
    koreanTime.toISOString().split(".")[1].substring(0, 3)
  );
};

/* 레시픽 주문 내역을 동기화하는 API */
export const RecipickSyncApi = {
  // 마지막 동기화 주문 ID 가져오기 (서버에서)
  getLastSyncOrderId: async () => {
    try {
      // 이미 값이 있으면 캐시된 값 반환
      if (_lastSyncOrderId > 0) {
        return _lastSyncOrderId;
      }

      const response = await axios.get(
        `${BASE_URL}/api/member/last-sync-order-id`,
        { headers: authApi.getAuthHeader() }
      );

      // 모듈 변수에 저장
      _lastSyncOrderId = response.data || 0;

      console.log(`마지막 동기화 ID: ${_lastSyncOrderId}`);
      return _lastSyncOrderId;
    } catch (error) {
      console.error("마지막 동기화 ID 조회 실패:", error);
      return 0;
    }
  },

  // 마지막 동기화 주문 ID 설정 (메모리와 서버 모두 업데이트)
  setLastSyncOrderId: async (orderId) => {
    try {
      // 이전 값보다 큰 경우에만 업데이트
      if (orderId <= _lastSyncOrderId) {
        console.log(
          `새 주문 ID ${orderId}가 기존 ID ${_lastSyncOrderId}보다 작거나 같아 업데이트하지 않음`
        );
        return false;
      }

      // 먼저 모듈 변수 업데이트
      _lastSyncOrderId = orderId;
      console.log(`메모리 내 마지막 동기화 ID 업데이트: ${_lastSyncOrderId}`);

      // 서버에도 업데이트
      const response = await axios.post(
        `${BASE_URL}/api/member/update-last-sync-order-id`,
        { orderId },
        { headers: authApi.getAuthHeader() }
      );

      console.log(`서버 마지막 동기화 ID 업데이트 성공: ${orderId}`);
      return true;
    } catch (error) {
      console.error("마지막 동기화 ID 업데이트 실패:", error);
      return false;
    }
  },

  // 주문 내역을 냉장고에 추가
  addOrdersToRefrigerator: async (orders, solpickUserId) => {
    const addedItems = [];
    let lastOrderId = await RecipickSyncApi.getLastSyncOrderId(); // 기존 값 가져오기
    let maxOrderId = lastOrderId;

    for (const order of orders) {
      // 주문 ID가 이미 처리된 주문 ID보다 작거나 같으면 건너뛰기
      if (order.ohId <= lastOrderId) {
        console.log(
          `주문 ID ${order.ohId}는 이미 처리됨 (최신 ID: ${lastOrderId}), 건너뜀`
        );
        continue;
      }

      try {
        // 한국 시간 기준으로 현재 시간(등록일)과 유통기한(7일 후) 설정
        const createdAt = getKoreanDateTime(); // 현재 한국 시간
        const expiryDate = getKoreanDateTime(7); // 현재 한국 시간 + 7일

        // 디버깅용 로그 추가
        console.log(`주문 ${order.name}의 날짜 정보 (한국 시간):`);
        console.log(`- 등록일(현재 한국 시간): ${createdAt}`);
        console.log(`- 유통기한(7일 후): ${expiryDate}`);

        // 식재료 등록을 위한 사용자 정의 함수 구현 (시간대 처리를 위한 추가 로직)
        // ingredientApi의 addIngredient를 직접 호출하지 않고 수정된 버전 사용
        const result = await addSyncedIngredient({
          userId: solpickUserId,
          name: order.name,
          emoji: order.emoji,
          image: order.image,
          quantity: order.quantity,
          expiryDate: expiryDate, // 한국 시간 기준 7일 후
          mainCategory: order.mainCategory,
          subCategory: order.subCategory,
          detailCategory: order.detailCategory,
          createdAt: createdAt, // 한국 현재 시간
          orderHistoryId: order.ohId,
        });

        if (result.success) {
          addedItems.push(result.data);

          // 최대 주문 ID 갱신
          if (order.ohId > maxOrderId) {
            maxOrderId = order.ohId;
          }
        } else {
          console.error(`식재료 ${order.name} 등록 실패:`, result.error);
        }
      } catch (error) {
        console.error(`식재료 등록 중 오류 발생:`, error);
      }
    }

    // 마지막 동기화 주문 ID 업데이트 (새로운 최대값이 있는 경우)
    if (maxOrderId > lastOrderId) {
      console.log(`마지막 동기화 ID 업데이트: ${lastOrderId} -> ${maxOrderId}`);
      await RecipickSyncApi.setLastSyncOrderId(maxOrderId);
    }

    return addedItems;
  },

  // 레시픽 주문 내역 동기화
  syncRecipickOrders: async () => {
    try {
      const user = authApi.getCurrentUser();

      if (!user) {
        console.log("로그인이 필요합니다.");
        return { success: false, error: "로그인이 필요합니다." };
      }

      // API 호출로 마지막 동기화 ID 가져오기
      const lastSyncOrderId = await RecipickSyncApi.getLastSyncOrderId();
      console.log(`마지막 동기화 ID: ${lastSyncOrderId}`);

      // 레시픽 ID와 솔픽 ID
      const recipickUserId = user.recipickUserId;
      const solpickUserId = user.memberId;

      console.log(
        `동기화 시작 - 레시픽ID: ${recipickUserId}, 솔픽ID: ${solpickUserId}, 마지막동기화주문ID: ${lastSyncOrderId}`
      );

      // API 호출하여 새 주문 가져오기 - 레시픽 ID 사용
      const response = await axios.get(
        `${BASE_URL}/api/solpick/refrigerator/ingredients/sync`,
        {
          params: {
            userId: recipickUserId, // 레시픽 사용자 ID 사용
            lastOrderId: lastSyncOrderId,
          },
          headers: authApi.getAuthHeader(),
        }
      );

      if (response.data && response.data.length > 0) {
        console.log(`새로운 주문 ${response.data.length}건 발견`);

        // 새 주문이 있으면 냉장고에 추가 (솔픽 ID 전달)
        const addedItems = await RecipickSyncApi.addOrdersToRefrigerator(
          response.data,
          solpickUserId
        );

        if (addedItems.length > 0) {
          // 알림 생성
          try {
            // 알림 메시지 생성
            let message = "";
            if (addedItems.length === 1) {
              // 단일 식재료
              message = `레시픽에서 주문하신 ${addedItems[0].name}이(가) 냉장고에 등록되었습니다.`;
            } else if (addedItems.length <= 3) {
              // 2~3개 식재료
              const itemNames = addedItems.map((item) => item.name).join(", ");
              message = `레시픽에서 주문하신 ${itemNames}이(가) 냉장고에 등록되었습니다.`;
            } else {
              // 4개 이상 식재료
              const firstItems = addedItems
                .slice(0, 3)
                .map((item) => item.name)
                .join(", ");
              message = `레시픽에서 주문하신 ${firstItems} 외 ${
                addedItems.length - 3
              }개의 식재료가 냉장고에 등록되었습니다.`;
            }

            // 알림 데이터 생성
            const notificationData = {
              userId: solpickUserId,
              type: "refrigerator", // 새로운 알림 타입 추가
              message: message,
              isRead: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            // 알림 API 호출
            await notificationApi.createNotification(notificationData);
            console.log("동기화 알림 생성 성공");
          } catch (error) {
            console.error("동기화 알림 생성 실패:", error);
          }

          return {
            success: true,
            count: addedItems.length,
            items: addedItems,
          };
        }
      } else {
        console.log("새로운 주문이 없습니다.");
      }

      return { success: true, newItems: false };
    } catch (error) {
      console.error("주문 동기화 실패:", error);
      return {
        success: false,
        error: error.message || "주문 동기화에 실패했습니다.",
      };
    }
  },

  // 주기적 동기화 시작
  startPeriodicSync: () => {
    // 이미 실행 중인 타이머가 있으면 중지
    if (window.recipickSyncInterval) {
      clearInterval(window.recipickSyncInterval);
    }

    // 즉시 한 번 실행
    RecipickSyncApi.syncRecipickOrders();

    // 주기적으로 실행할 타이머 설정
    window.recipickSyncInterval = setInterval(async () => {
      await RecipickSyncApi.syncRecipickOrders();
    }, SYNC_INTERVAL);

    return () => {
      if (window.recipickSyncInterval) {
        clearInterval(window.recipickSyncInterval);
      }
    };
  },

  // 주기적 동기화 중지
  stopPeriodicSync: () => {
    if (window.recipickSyncInterval) {
      clearInterval(window.recipickSyncInterval);
      window.recipickSyncInterval = null;
    }
  },
};

// 동기화 전용 식재료 등록 함수 (시간대 처리 로직 포함)
const addSyncedIngredient = async (ingredientData) => {
  try {
    // 이미지가 있으면 압축
    let compressedImage = ingredientData.image;
    if (compressedImage && compressedImage.startsWith("data:image")) {
      const compressImage = await import("./IngredientApi").then(
        (module) => module.compressImage
      );
      compressedImage = await compressImage(compressedImage);
    }

    // 요청 데이터 준비
    const requestData = {
      userId: ingredientData.userId,
      name: ingredientData.name || "",
      emoji: ingredientData.emoji || "🍎", // 기본 이모지
      image: compressedImage || "",
      quantity: parseInt(ingredientData.quantity) || 0,
      // 시간 형식은 변경하지 않고 그대로 전달 (이미 올바른 형식)
      expiryDate: ingredientData.expiryDate,
      mainCategory: ingredientData.mainCategory || "",
      subCategory: ingredientData.subCategory || "",
      detailCategory: ingredientData.detailCategory || "",
      createdAt: ingredientData.createdAt, // 한국 시간
      orderHistoryId: ingredientData.orderHistoryId || null,
    };

    // API 요청 로그
    console.log("동기화 식재료 등록 요청 데이터:", {
      ...requestData,
      image: requestData.image ? "[이미지 데이터]" : null,
    });

    // API 요청 - 기존 ingredientApi 활용
    const response = await axios.post(
      `${BASE_URL}/api/solpick/refrigerator/ingredients`,
      requestData,
      {
        headers: {
          ...authApi.getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("동기화 식재료 등록 실패:", error);

    if (error.response) {
      console.error("서버 응답 데이터:", error.response.data);
      console.error("서버 응답 상태 코드:", error.response.status);
    }

    return {
      success: false,
      error: error.message || "동기화 식재료 등록에 실패했습니다.",
    };
  }
};

// React Hook으로 사용하기 위한 래퍼
export const useRecipickSync = () => {
  // 주기적 동기화 시작 (컴포넌트에서 useEffect와 함께 사용)
  const startPeriodicSync = () => {
    return RecipickSyncApi.startPeriodicSync();
  };

  return {
    startPeriodicSync,
    stopPeriodicSync: RecipickSyncApi.stopPeriodicSync,
  };
};

export default RecipickSyncApi;
