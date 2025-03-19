import axios from "axios";
import { authApi } from "./AuthApi";
import { BASE_URL } from "../config";

// 카드 API 기본 설정
const cardApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 - 매 요청마다 인증 헤더 추가
cardApiClient.interceptors.request.use(
  (config) => {
    const authHeader = authApi.getAuthHeader();
    config.headers = {
      ...config.headers,
      ...authHeader,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 카드 소유 여부 확인
export const checkHasCard = async () => {
  try {
    console.log("카드 소유 여부 확인 API 호출 중...");
    const response = await cardApiClient.get("/solpick/api/card/has-card");
    console.log("카드 소유 여부 API 응답:", response.data);
    return response.data.hasCard;
  } catch (error) {
    console.error("카드 소유 여부 확인 중 오류 발생:", error);
    if (error.response) {
      console.error("응답 데이터:", error.response.data);
      console.error("응답 상태:", error.response.status);
    }
    return false;
  }
};

// 카드 디자인 저장 - 배경 저장
export const saveCardBackground = {
  post: async (url, data) => {
    try {
      const response = await cardApiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("배경 저장 실패:", error);
      throw error;
    }
  },
};

// 카드 디자인 저장 - 스티커 저장
export const saveCardStickers = {
  post: async (url, data) => {
    try {
      const response = await cardApiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("스티커 저장 실패:", error);
      throw error;
    }
  },
};

export const saveCardDesign = {
  post: async (url, data) => {
    try {
      const response = await cardApiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("카드 디자인 저장 실패:", error);
      throw error;
    }
  },
};

// 카드 발급
export const issueCard = async (userId, designId, lastName, firstName) => {
  try {
    // 필수 파라미터 검증
    if (!userId) {
      console.error("카드 발급 실패: userId가 누락되었습니다.");
      throw new Error("userId가 누락되었습니다.");
    }
    if (!designId) {
      console.error("카드 발급 실패: designId가 누락되었습니다.");
      throw new Error("designId가 누락되었습니다.");
    }
    if (!lastName) {
      console.error("카드 발급 실패: lastName이 누락되었습니다.");
      throw new Error("lastName이 누락되었습니다.");
    }
    if (!firstName) {
      console.error("카드 발급 실패: firstName이 누락되었습니다.");
      throw new Error("firstName이 누락되었습니다.");
    }

    console.log("카드 발급 API 호출:", {
      userId,
      designId,
      lastName,
      firstName,
    });

    const response = await cardApiClient.post(
      "/solpick/api/card-design/issue-card",
      {
        userId: parseInt(userId),
        designId: parseInt(designId),
        lastName,
        firstName,
      }
    );

    console.log("카드 발급 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("카드 발급 실패:", error);
    throw error;
  }
};

// 카드 정보 조회
export const getCardInfo = async (userId) => {
  try {
    if (!userId) {
      console.error("카드 정보 조회 실패: 사용자 ID가 누락되었습니다.");
      throw new Error("사용자 ID가 누락되었습니다.");
    }

    console.log("카드 정보 조회 API 호출:", { userId });
    const response = await cardApiClient.get(
      `/solpick/api/card-design/card-info/${userId}`
    );
    console.log("카드 정보 조회 API 응답:", response.data);

    // 응답 데이터 확인 및 처리
    if (!response.data) {
      console.error("카드 정보 조회 실패: 응답 데이터가 없습니다.");
      throw new Error("카드 정보를 가져오는데 실패했습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("카드 정보 조회 실패:", error);
    throw error;
  }
};

// 객체 형태로도 export (이전 방식과의 호환성 유지)
export const cardApi = {
  checkHasCard,
  saveCardBackground,
  saveCardStickers,
  issueCard,
  getCardInfo,
};
