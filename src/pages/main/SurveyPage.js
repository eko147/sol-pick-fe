import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyPage.css";
import Menu from "../../components/common/menu/Menu";
import MainHeader from "../../components/common/header/MainHeader";
// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";

const SurveyPage = () => {
  const navigate = useNavigate();
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
  useState(() => {
    sessionStorage.removeItem("mealPlan");
  }, []);
  // 다음 단계로 이동
  const nextStep = () => setStep(step + 1);

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
  const selectAndNext = (field, value) => {
    handleChange(field, value);
    nextStep();
  };
  return (
    <div className="survey-container">
      <Header leftIcon={backArrow} onLeftClick={() => navigate(-1)} />
      {/* ✅ (1) 사용자 정보 입력 */}
      {step === 1 && (
        <div className="survey-step">
          <h2>사용자의 정보를 설정해주세요</h2>
          <label>신장 (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
          <label>몸무게 (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
          <label>성별</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="남성"
              checked={formData.gender === "남성"}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
            남성
            <input
              type="radio"
              name="gender"
              value="여성"
              checked={formData.gender === "여성"}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
            여성
          </div>
          <button onClick={nextStep}>다음</button>
        </div>
      )}

      {/* ✅ (2) 식단 목표 설정 */}
      {step === 2 && (
        <div className="survey-step">
          <h2>식단으로 이루고 싶은 목표를 알려주세요</h2>
          <div className="button-group">
            {" "}
            {/* ✅ 버튼 그룹 추가 */}
            <button onClick={() => selectAndNext("goal", "체중 감량")}>
              체중 감량
            </button>
            <button onClick={() => selectAndNext("goal", "체중 증량")}>
              체중 증량
            </button>
            <button onClick={() => selectAndNext("goal", "건강한 삶 유지")}>
              건강한 삶 유지
            </button>
          </div>
        </div>
      )}

      {/* ✅ (3) 목표 체중 입력 */}
      {step === 3 && (
        <div className="survey-step">
          <h2>목표 체중을 설정해주세요</h2>
          <input
            type="number"
            value={formData.targetWeight}
            onChange={(e) => handleChange("targetWeight", e.target.value)}
          />
          <button onClick={nextStep}>다음</button>
        </div>
      )}

      {/* ✅ (4) 추천받고 싶은 끼니 선택 */}
      {step === 4 && (
        <div className="survey-step">
          <h2>하루 중 추천받고 싶은 끼니를 골라주세요</h2>
          <div className="button-group">
            {["아침", "점심", "저녁"].map((meal) => (
              <button
                key={meal}
                onClick={() => handleMultiSelect(meal)}
                className={formData.meals.includes(meal) ? "selected" : ""}
              >
                {meal}
              </button>
            ))}
            <button onClick={nextStep}>다음</button>
          </div>
        </div>
      )}

      {/* ✅ (5) 평균 수면시간 선택 */}
      {step === 5 && (
        <div className="survey-step">
          <h2>하루 평균 수면시간을 알려주세요</h2>
          <div className="button-group">
            {["4시간 이하", "5~6시간", "7~8시간", "9시간 이상"].map(
              (option) => (
                <button
                  key={option}
                  onClick={() => selectAndNext("sleepHours", option)}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* ✅ (6) 생활 패턴 선택 */}
      {step === 6 && (
        <div className="survey-step">
          <h2>하루 생활 패턴이 어떻게 되나요?</h2>
          <div className="button-group">
            {[
              "활동적인 일을 하고 있어요",
              "주로 앉아서 일해요",
              "현재는 쉬고 있어요",
            ].map((option) => (
              <button
                key={option}
                onClick={() => selectAndNext("activityLevel", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ (7) 운동 여부 선택 */}
      {step === 7 && (
        <div className="survey-step">
          <h2>주 3회 이상 꾸준히 운동하나요?</h2>
          <div className="button-group">
            <button onClick={() => selectAndNext("exercise", "예")}>예</button>
            <button onClick={() => selectAndNext("exercise", "아니오")}>
              아니오
            </button>
          </div>
        </div>
      )}

      {/* ✅ (8) 입력 정보 확인 및 식단 추천 요청 */}
      {step === 8 && (
        <div className="survey-step">
          <button onClick={handleSubmit}>식단 추천받기</button>
        </div>
      )}
      <Menu />
    </div>
  );
};

export default SurveyPage;
