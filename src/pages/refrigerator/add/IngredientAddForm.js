import "./IngredientAddForm.css";
import Header from "../../../components/common/header/Header";
import close from "../../../assets/close.svg";
import Input from "../../../components/common/input/Input";
import SelectL from "../../../components/common/select/SelectL";
import ButtonL from "../../../components/common/button/ButtonL";
import Menu from "../../../components/common/menu/Menu";
import plus from "../../../assets/plus.svg";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectIcon from "../../../components/refrigerator/add/SelectIcon";
import { ingredientApi } from "../../../api/IngredientApi";
import { authApi } from "../../../api/AuthApi";
import { useToast } from "../../../context/ToastContext";

const IngredientAddForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromReceipt = location.state?.fromReceipt || false;
  const receiptData = location.state?.receiptData || {};

  // 상태 관리
  const [imagePreview, setImagePreview] = useState(null);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // 연속 입력 모드 상태 추가
  const [continuousMode, setContinuousMode] = useState(false);

  // 등록된 식재료 개수 추적
  const [registeredCount, setRegisteredCount] = useState(0);
  // 건너뛴 식재료 개수 추적
  const [skippedCount, setSkippedCount] = useState(0);

  const [formData, setFormData] = useState({
    emoji: "",
    name: "",
    expiryDate: "",
    mainCategory: "",
    subCategory: "",
    detailCategory: "",
    quantity: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  // 영수증 데이터로 폼 초기화
  useEffect(() => {
    if (isFromReceipt && receiptData) {
      if (
        receiptData.ingredientNames &&
        receiptData.ingredientNames.length > 0
      ) {
        setIngredientNames(receiptData.ingredientNames);

        // 첫 번째 식재료명 자동 설정
        setFormData((prev) => ({
          ...prev,
          name: receiptData.ingredientNames[0] || "",
        }));

        // 여러 식재료가 인식되었음을 알리는 토스트 메시지
        if (receiptData.ingredientNames.length > 1) {
          showToast(
            `${receiptData.ingredientNames.length}개의 식재료가 인식되었습니다.`
          );
        }
      }
    }
  }, [isFromReceipt, receiptData]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 이미지 관련 핸들러
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImagePreview(imageData);
        setFormData((prev) => ({
          ...prev,
          image: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 유효성 검사 함수
  const validateFormInline = () => {
    // 이모지 검증
    if (!formData.emoji) {
      showToast("아이콘을 선택해주세요.");
      return false;
    }

    // 식재료명 검증
    if (!formData.name.trim()) {
      showToast("식재료명을 입력해주세요.");
      return false;
    }

    // 사진 첨부 검증
    if (!formData.image && !imagePreview) {
      showToast("사진을 첨부해주세요.");
      return false;
    }

    // 유통기한 검증
    if (!formData.expiryDate) {
      showToast("유통기한을 입력해주세요.");
      return false;
    }

    // 유통기한이 과거 날짜인지 확인
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 부분 제거하여 날짜만 비교
    const expiryDate = new Date(formData.expiryDate);
    if (expiryDate < today) {
      showToast("유통기한은 오늘 이후로 설정해주세요.");
      return false;
    }

    // 대분류 검증
    if (!formData.mainCategory) {
      showToast("대분류를 선택해주세요.");
      return false;
    }

    // 중분류 검증
    if (!formData.subCategory) {
      showToast("중분류를 선택해주세요.");
      return false;
    }

    // 소분류 검증
    if (!formData.detailCategory) {
      showToast("소분류를 선택해주세요.");
      return false;
    }

    // 중량 검증
    if (!formData.quantity) {
      showToast("중량을 입력해주세요.");
      return false;
    }

    // 중량이 정수인지 확인
    if (formData.quantity && isNaN(parseInt(formData.quantity))) {
      showToast("중량은 정수만 입력 가능합니다.");
      return false;
    }

    // 모든 검증 통과
    return true;
  };

  // 현재 식재료 건너뛰기 (다음 식재료로 이동)
  const skipCurrentIngredient = () => {
    // 건너뛴 식재료 개수 증가
    setSkippedCount((prevCount) => prevCount + 1);

    const nextIndex = currentIngredientIndex + 1;

    // 다음 식재료가 있으면 이동
    if (nextIndex < ingredientNames.length) {
      moveToNextIngredient();
      showToast("식재료를 건너뛰었습니다.");
    } else {
      // 마지막 식재료이거나 식재료가 없을 때, 냉장고 화면으로 이동

      // 등록된 식재료 수에 따라 메시지 결정
      let message;
      if (registeredCount === 0) {
        message = "모든 식재료를 건너뛰었습니다.";
      } else {
        message = `${registeredCount}개의 식재료가 등록되었습니다.`;
      }

      showToast(message);

      navigate("/refrigerator");
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setFormData({
      emoji: "",
      name: "",
      expiryDate: "",
      mainCategory: "",
      subCategory: "",
      detailCategory: "",
      quantity: "",
      image: "",
    });
    setImagePreview(null);
  };

  // 다음 식재료로 이동하는 함수
  const moveToNextIngredient = () => {
    // 부드럽게 스크롤을 맨 위로 이동
    // 래퍼 내부의 스크롤 가능한 요소 선택
    const wrapper = document.querySelector(".wrapper");

    if (wrapper) {
      wrapper.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // 폴백으로 window 스크롤
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const nextIndex = currentIngredientIndex + 1;

    if (nextIndex < ingredientNames.length) {
      // 다음 식재료 인덱스로 업데이트
      setCurrentIngredientIndex(nextIndex);

      // 폼 초기화하면서 다음 식재료명 설정
      setFormData({
        emoji: "",
        name: ingredientNames[nextIndex],
        image: "",
        expiryDate: "",
        mainCategory: "",
        subCategory: "",
        detailCategory: "",
        quantity: "",
      });

      // 이미지 미리보기 상태를 초기화
      setImagePreview(null);

      // 토스트 메시지 표시
      showToast(`${nextIndex + 1}/${ingredientNames.length} 식재료 입력 중`);

      return true;
    }

    return false;
  };

  // 연속 입력 모드 전환 핸들러
  const handleContinuousMode = () => {
    if (validateFormInline()) {
      saveIngredient(true);
    }
  };

  // 식재료 저장 공통 로직
  const saveIngredient = async (isContinuous = false) => {
    setIsLoading(true);
    try {
      // 현재 로그인한 사용자 정보 가져오기
      const currentUser = authApi.getCurrentUser();

      if (!currentUser) {
        showToast("로그인이 필요합니다.");
        setIsLoading(false);
        return false;
      }

      // formData에 userId 추가
      const ingredientData = {
        ...formData,
        quantity: parseInt(formData.quantity), // quantity를 int로 변환
        image: formData.image || imagePreview, // image 데이터 저장
        userId: currentUser.memberId,
      };

      // API 호출
      const result = await ingredientApi.addIngredient(ingredientData);

      if (!result.success) {
        showToast(result.error || "식재료 저장에 실패했습니다.");
        setIsLoading(false);
        return false;
      }

      // 등록 성공 시 등록된 식재료 개수 증가
      setRegisteredCount((prevCount) => prevCount + 1);

      // 연속 모드일 경우 폼 초기화 및 추가 입력 준비
      if (isContinuous && !isFromReceipt) {
        resetForm();
        setContinuousMode(true);

        // 부드럽게 스크롤을 맨 위로 이동
        const wrapper = document.querySelector(".wrapper");
        if (wrapper) {
          wrapper.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }

        showToast("다음 식재료를 등록해 주세요.");
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("식재료 저장 중 오류 발생:", error);
      showToast("다시 시도해주세요.");
      setIsLoading(false);
      return false;
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 유효성 검사 실행
    if (!validateFormInline()) {
      return;
    }

    // 영수증에서 온 경우에만 다음 로직 실행
    if (isFromReceipt && ingredientNames.length > 0) {
      const result = await saveIngredient();

      if (result) {
        const hasNext = moveToNextIngredient();

        // 다음 식재료가 있으면 함수 종료
        if (hasNext) {
          return;
        }
      }
    } else {
      // 일반 모드: 연속 모드 비활성화 상태에서 등록
      const result = await saveIngredient(false);

      if (result) {
        if (continuousMode) {
          // 연속 모드에서 마지막 등록 시
          showToast(`${registeredCount + 1}개의 식재료가 등록되었습니다.`);
          navigate("/refrigerator");
        } else {
          // 직접 입력일 경우, 첫 등록 완료 (연속 모드가 아닌 경우)
          showToast("1개의 식재료가 등록되었습니다.");
          navigate("/refrigerator");
        }
        return;
      }
    }

    // 영수증 모드에서 마지막 등록 완료 시
    if (isFromReceipt) {
      showToast(`${registeredCount + 1}개의 식재료가 등록되었습니다.`);
      navigate("/refrigerator");
    }
  };

  // 카테고리 데이터
  const mainOptions = [
    { value: "", label: "대분류" },
    { value: "신선식품류", label: "신선식품류" },
    { value: "가공식품류", label: "가공식품류" },
    { value: "조미료·양념류", label: "조미료·양념류" },
    { value: "음료·주류", label: "음료·주류" },
    { value: "유가공·냉장·냉동", label: "유가공·냉장·냉동" },
  ];

  // 카테고리 데이터 구조
  const categoryData = {
    신선식품류: {
      options: [
        { value: "채소·과일·견과류", label: "채소·과일·견과류" },
        { value: "수산·해산·건어물", label: "수산·해산·건어물" },
        { value: "정육·계란", label: "정육·계란" },
      ],
      subCategories: {
        "채소·과일·견과류": [
          { value: "채소류", label: "채소류" },
          { value: "과일류", label: "과일류" },
          { value: "견과류", label: "견과류" },
        ],
        "수산·해산·건어물": [
          { value: "생선류", label: "생선류" },
          { value: "해산물", label: "해산물" },
          { value: "갑각류·조개류", label: "갑각류·조개류" },
          { value: "건어물·해조류", label: "건어물·해조류" },
        ],
        "정육·계란": [
          { value: "소고기", label: "소고기" },
          { value: "돼지고기", label: "돼지고기" },
          { value: "닭고기·오리고기", label: "닭고기·오리고기" },
          { value: "계란", label: "계란" },
        ],
      },
    },

    가공식품류: {
      options: [
        { value: "즉석식품·간편식", label: "즉석식품·간편식" },
        { value: "면·빵·떡", label: "면·빵·떡" },
        { value: "육가공·델리", label: "육가공·델리" },
        { value: "통조림·레토르트", label: "통조림·레토르트" },
      ],
      subCategories: {
        "즉석식품·간편식": [
          { value: "냉동간편식", label: "냉동간편식" },
          { value: "국·탕·찌개", label: "국·탕·찌개" },
        ],
        "면·빵·떡": [
          { value: "국수·면류", label: "국수·면류" },
          { value: "빵·베이커리", label: "빵·베이커리" },
          { value: "떡·한과", label: "떡·한과" },
        ],
        "육가공·델리": [
          { value: "햄·소시지·베이컨", label: "햄·소시지·베이컨" },
          { value: "델리미트", label: "델리미트" },
        ],
        "통조림·레토르트": [
          { value: "통조림", label: "통조림" },
          { value: "절임·피클류", label: "절임·피클류" },
          { value: "즉석밥·죽", label: "즉석밥·죽" },
        ],
      },
    },

    "조미료·양념류": {
      options: [
        { value: "소스·드레싱·양념", label: "소스·드레싱·양념" },
        { value: "장류·식초·기름", label: "장류·식초·기름" },
        { value: "소금·설탕·향신료", label: "소금·설탕·향신료" },
      ],
      subCategories: {
        "소스·드레싱·양념": [
          { value: "소스류", label: "소스류" },
          { value: "드레싱", label: "드레싱" },
          { value: "양념장", label: "양념장" },
        ],
        "장류·식초·기름": [
          { value: "간장·된장·고추장", label: "간장·된장·고추장" },
          { value: "식초", label: "식초" },
          { value: "참기름·들기름", label: "참기름·들기름" },
        ],
        "소금·설탕·향신료": [
          { value: "소금·설탕", label: "소금·설탕" },
          { value: "후추·향신료", label: "후추·향신료" },
        ],
      },
    },

    "음료·주류": {
      options: [
        { value: "생수·탄산수", label: "생수·탄산수" },
        { value: "커피·차·음료", label: "커피·차·음료" },
        { value: "주류·전통주", label: "주류·전통주" },
      ],
      subCategories: {
        "생수·탄산수": [
          { value: "생수", label: "생수" },
          { value: "탄산수", label: "탄산수" },
        ],
        "커피·차·음료": [
          { value: "커피", label: "커피" },
          { value: "차", label: "차" },
          { value: "음료", label: "음료" },
        ],
        "주류·전통주": [
          { value: "맥주", label: "맥주" },
          { value: "소주·청주", label: "소주·청주" },
          { value: "와인·양주", label: "와인·양주" },
        ],
      },
    },

    "유가공·냉장·냉동": {
      options: [
        { value: "유제품·치즈·버터", label: "유제품·치즈·버터" },
        { value: "냉장·냉동식품", label: "냉장·냉동식품" },
      ],
      subCategories: {
        "유제품·치즈·버터": [
          { value: "우유·요거트", label: "우유·요거트" },
          { value: "치즈·버터", label: "치즈·버터" },
        ],
        "냉장·냉동식품": [
          { value: "냉장식품", label: "냉장식품" },
          { value: "냉동식품", label: "냉동식품" },
        ],
      },
    },
  };

  // 대분류에 따른 중분류 옵션
  const getSubOptions = () => {
    if (!formData.mainCategory || !categoryData[formData.mainCategory]) {
      return [{ value: "", label: "중분류" }];
    }
    return [
      { value: "", label: "중분류" },
      ...categoryData[formData.mainCategory].options,
    ];
  };

  // 중분류에 따른 소분류 옵션
  const getDetailOptions = () => {
    if (
      !formData.mainCategory ||
      !formData.subCategory ||
      !categoryData[formData.mainCategory] ||
      !categoryData[formData.mainCategory].subCategories[formData.subCategory]
    ) {
      return [{ value: "", label: "소분류" }];
    }
    return [
      { value: "", label: "소분류" },
      ...categoryData[formData.mainCategory].subCategories[
        formData.subCategory
      ],
    ];
  };

  // 대분류 변경 시 중분류, 소분류 초기화
  const handleMainCategoryChange = (e) => {
    setFormData({
      ...formData,
      mainCategory: e.target.value,
      subCategory: "",
      detailCategory: "",
    });
  };

  // 중분류 변경 시 소분류 초기화
  const handleSubCategoryChange = (e) => {
    setFormData({
      ...formData,
      subCategory: e.target.value,
      detailCategory: "",
    });
  };

  // 헤더 타이틀 계산
  const getHeaderTitle = () => {
    if (isFromReceipt) {
      return `식재료 등록 (${currentIngredientIndex + 1}/${
        ingredientNames.length
      })`;
    }
    return "식재료 등록";
  };

  // 버튼 텍스트 계산
  const getButtonText = () => {
    // if (isLoading) {
    //   return "처리 중...";
    // }

    if (isFromReceipt && ingredientNames.length > 0) {
      if (currentIngredientIndex < ingredientNames.length - 1) {
        return "다음";
      }
      return "등록하기";
    }

    return "등록하기";
  };

  // 식재료 등록이 영수증 촬영하기를 통한 경우에만 건너뛰기 버튼 활성화
  const showSkipButton = isFromReceipt;

  return (
    <>
      <Header
        title={getHeaderTitle()}
        rightIcon={close}
        onRightClick={() => navigate("/refrigerator")}
      />

      <div className="add-form-wrapper">
        <div className="add-form-container">
          <h3 className="add-form-label bold">식재료명</h3>

          <div className="name-container">
            <SelectIcon
              value={formData.emoji}
              onChange={(emoji) =>
                setFormData((prev) => ({
                  ...prev,
                  emoji,
                }))
              }
            />

            <Input
              className="add-form-input"
              placeholder="식재료명을 입력해 주세요."
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              width="275px"
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">사진 첨부</h3>
          <div
            className="image-upload-container"
            onClick={handleImageClick}
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!imagePreview && (
              <img src={plus} alt="이미지 추가" className="image-plus-icon" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">유통기한</h3>
          <Input
            className="add-form-input"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">분류기준</h3>
          <div className="add-form-select-container">
            <SelectL
              key={`main-category-${currentIngredientIndex}-${
                continuousMode ? registeredCount : 0
              }`}
              options={mainOptions}
              className="select-item"
              value={formData.mainCategory}
              onChange={handleMainCategoryChange}
            />
            <SelectL
              key={`sub-category-${currentIngredientIndex}-${
                continuousMode ? registeredCount : 0
              }`}
              options={getSubOptions()}
              className="select-item"
              value={formData.subCategory}
              onChange={handleSubCategoryChange}
              disabled={!formData.mainCategory}
            />
            <SelectL
              key={`detail-category-${currentIngredientIndex}-${
                continuousMode ? registeredCount : 0
              }`}
              options={getDetailOptions()}
              className="select-item"
              value={formData.detailCategory}
              onChange={(e) =>
                setFormData({ ...formData, detailCategory: e.target.value })
              }
              disabled={!formData.subCategory}
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">중량</h3>
          <Input
            className="add-form-input"
            placeholder="중량(g)을 입력해 주세요."
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="add-form-button-container">
        {/* 건너뛰기 버튼 - 영수증 모드에서만 표시 */}
        {showSkipButton && (
          <ButtonL
            text="건너뛰기"
            variant="outlined"
            onClick={skipCurrentIngredient}
            // disabled={isLoading}
          />
        )}

        {/* 추가 등록 버튼 - 직접 입력 모드에서만 표시 */}
        {!isFromReceipt && (
          <ButtonL
            text="추가하기"
            variant="outlined"
            onClick={handleContinuousMode}
            // disabled={isLoading}
          />
        )}

        {/* 등록 버튼 - 항상 표시 */}
        <ButtonL
          text={getButtonText()}
          onClick={() => {
            if (validateFormInline()) {
              // 연속 모드에서 '등록하기'는 모든 등록을 완료하고 냉장고로 이동
              if (!isFromReceipt) {
                setContinuousMode(false);
              }
              handleSubmit();
            }
          }}
          // disabled={isLoading}
        />
      </div>

      <div style={{ height: "24px" }}></div>
    </>
  );
};

export default IngredientAddForm;
