import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyPage.css";
import Menu from "../../components/common/menu/Menu";
import backArrow from "../../assets/backArrow.svg";
import Header from "../../components/common/header/Header";
import Input from "../../components/common/input/Input";
import ButtonL from "../../components/common/button/ButtonL";
import { useToast } from "../../context/ToastContext";
import { authApi } from "../../api/AuthApi";

const SurveyPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "",
    goal: "",
    targetWeight: "",
    meals: [],
    sleepHours: "",
    activityLevel: "",
    exercise: "",
  });

  const currentUser = authApi.getCurrentUser();

  useEffect(() => {
    sessionStorage.removeItem("mealPlan");
  }, []);

  // 다음 단계로 이동
  const nextStep = () => setStep(step + 1);

  // 이전 단계로 이동
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/main");
    }
  };

  // 입력 값 업데이트
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 다중 선택 (끼니 선택)
  const handleMultiSelect = (meal) => {
    setFormData((prev) => {
      const newMeals = prev.meals.includes(meal)
        ? prev.meals.filter((m) => m !== meal)
        : [...prev.meals, meal];
      return { ...prev, meals: newMeals };
    });
  };

  // 설문 완료 후 결과 페이지로 이동
  const handleSubmit = () => {
    navigate("/survey-result", { state: { formData } });
  };

  // 필드 선택 후 다음 단계로 이동 (삭제된 함수 - 불필요)
  // 수정: 모든 단계에 다음 버튼을 추가하기 위해 selectAndNext 함수는 더 이상 사용하지 않음

  // 다음 단계로 이동 핸들러
  const handleNextStep = () => {
    if (isStepComplete()) {
      nextStep();
    } else {
      // 필수 정보가 입력되지 않은 경우 토스트 메시지 표시
      showToast("필수 정보를 모두 입력해주세요.");
    }
  };

  // 설문 제출 핸들러
  const handleFormSubmit = () => {
    if (isStepComplete()) {
      handleSubmit();
    } else {
      // 필수 정보가 입력되지 않은 경우 토스트 메시지 표시
      showToast("필수 정보를 모두 입력해주세요.");
    }
  };

  // 현재 단계의 입력이 완료되었는지 확인
  const isStepComplete = () => {
    switch (step) {
      case 1:
        return formData.height && formData.weight && formData.gender;
      case 3:
        return formData.targetWeight;
      case 4:
        return formData.meals.length > 0;
      case 7:
        return formData.exercise;
      default:
        return true;
    }
  };

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="AI 기반 식단 추천"
        onLeftClick={prevStep}
      />

      <div className="survey-container">
        {/* (1) 사용자 정보 입력 */}
        {step === 1 && (
          <div className="survey-step">
            <h2 className="survey-step-title">
              {currentUser.name}님의 정보를 입력해주세요
            </h2>

            <div className="survey-input-container">
              <label className="survey-field-label">신장 (cm)</label>
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                placeholder="신장을 입력하세요"
                width="100%"
              />
            </div>

            <div className="survey-input-container">
              <label className="survey-field-label">몸무게 (kg)</label>
              <Input
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="몸무게를 입력하세요"
                width="100%"
              />
            </div>

            <div className="survey-input-container">
              <label className="survey-field-label">성별</label>
              <div className="gender-group">
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="남성"
                    checked={formData.gender === "남성"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  <span className="gender-label">남성</span>
                </label>
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="여성"
                    checked={formData.gender === "여성"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  <span className="gender-label">여성</span>
                </label>
              </div>
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="다음" onClick={handleNextStep} />
            </div>
          </div>
        )}

        {/* (2) 식단 목표 설정 */}
        {step === 2 && (
          <div className="survey-step">
            <h2 className="survey-step-title">
              식단으로 이루고 싶은 목표를 알려주세요
            </h2>
            <div className="survey-button-group">
              <button
                className={`survey-button ${
                  formData.goal === "체중 감량" ? "selected" : ""
                }`}
                onClick={() => handleChange("goal", "체중 감량")}
              >
                체중 감량
              </button>
              <button
                className={`survey-button ${
                  formData.goal === "체중 증량" ? "selected" : ""
                }`}
                onClick={() => handleChange("goal", "체중 증량")}
              >
                체중 증량
              </button>
              <button
                className={`survey-button ${
                  formData.goal === "건강한 삶 유지" ? "selected" : ""
                }`}
                onClick={() => handleChange("goal", "건강한 삶 유지")}
              >
                건강한 삶 유지
              </button>
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="다음" onClick={handleNextStep} />
            </div>
          </div>
        )}

        {/* (3) 목표 체중 입력 */}
        {step === 3 && (
          <div className="survey-step">
            <h2 className="survey-step-title">목표 체중을 설정해주세요</h2>
            <div className="survey-input-container">
              <label className="survey-field-label">몸무게 (kg)</label>
              <Input
                type="number"
                value={formData.targetWeight}
                onChange={(e) => handleChange("targetWeight", e.target.value)}
                placeholder="목표 체중을 입력하세요"
                width="100%"
              />
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="다음" onClick={handleNextStep} />
            </div>
          </div>
        )}

        {/* (4) 추천받고 싶은 끼니 선택 */}
        {step === 4 && (
          <div className="survey-step">
            <h2 className="survey-step-title">
              하루 중 추천받고 싶은 끼니를 골라주세요
            </h2>
            <div className="survey-button-group">
              {["아침", "점심", "저녁"].map((meal) => (
                <button
                  className={`survey-button ${
                    formData.meals.includes(meal) ? "selected" : ""
                  }`}
                  key={meal}
                  onClick={() => handleMultiSelect(meal)}
                >
                  {meal}
                </button>
              ))}
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="다음" onClick={handleNextStep} />
            </div>
          </div>
        )}

        {/* (5) 평균 수면시간 선택 */}
        {step === 5 && (
          <div className="survey-step">
            <h2 className="survey-step-title">
              하루 평균 수면시간을 알려주세요
            </h2>
            <div className="survey-button-group">
              {["4시간 이하", "5~6시간", "7~8시간", "9시간 이상"].map(
                (option) => (
                  <button
                    className={`survey-button ${
                      formData.sleepHours === option ? "selected" : ""
                    }`}
                    key={option}
                    onClick={() => handleChange("sleepHours", option)}
                  >
                    {option}
                  </button>
                )
              )}
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="다음" onClick={handleNextStep} />
            </div>
          </div>
        )}

        {/* (6) 생활 패턴 선택 */}
        {step === 6 && (
          <div className="survey-step">
            <h2 className="survey-step-title">
              하루 생활 패턴이 어떻게 되나요?
            </h2>
            <div className="survey-button-group">
              {[
                "활동적인 일을 하고 있어요",
                "주로 앉아서 일해요",
                "현재는 쉬고 있어요",
              ].map((option) => (
                <button
                  className={`survey-button ${
                    formData.activityLevel === option ? "selected" : ""
                  }`}
                  key={option}
                  onClick={() => handleChange("activityLevel", option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="다음" onClick={handleNextStep} />
            </div>
          </div>
        )}

        {/* (7) 운동 여부 선택 */}
        {step === 7 && (
          <div className="survey-step">
            <h2 className="survey-step-title">
              주 3회 이상 꾸준히 운동하나요?
            </h2>
            <div className="survey-button-group">
              {["예", "아니오"].map((option) => (
                <button
                  key={option}
                  className={`survey-button ${
                    formData.exercise === option ? "selected" : ""
                  }`}
                  onClick={() => handleChange("exercise", option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="survey-button-wrapper">
              <ButtonL text="식단 추천받기" onClick={handleFormSubmit} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SurveyPage;
