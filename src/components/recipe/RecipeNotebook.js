import React, { useState, useEffect, useRef } from "react";
import "./RecipeNotebook.css";
import notebookBackground from "../../assets/recipe/notebook-background.png";
import postItYellow from "../../assets/recipe/postit-yellow.png";
import yellowPostIt from "../../assets/recipe/yellow-postit.png";
import SteamIcon from "../../assets/recipe/steam-icon.js";
import forkImage from "../../assets/recipe/fork.png";
import plateImage from "../../assets/recipe/plate.png";
import eyesImage from "../../assets/recipe/eyes.png";
import TalkingMouth from "../../assets/recipe/talking-mouth.tsx";

// 레시피.노트북 컴포넌트
const RecipeNotebook = ({ recipe }) => {
  const [completedSteps, setCompletedSteps] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  // 컴포넌트 unmount 시 정리
  useEffect(() => {
    return () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 체크박스 클릭 핸들러
  const toggleStep = (stepId) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  // TTS 일시 정지 핸들러
  const pauseTTS = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPlaying(false);
  };

  // TTS 중지 핸들러
  const stopTTS = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPlaying(false);
    setCurrentStep(0);
    setTimeLeft(0);
  };

  // 스텝을 TTS로 읽기 함수 수정
  const playStepVoice = (index) => {
    if (!recipe || index >= recipe.steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = recipe.steps[index];
    setCurrentStep(index);

    // 스텝 텍스트를 TTS로 읽기
    const utterance = new SpeechSynthesisUtterance(step.description);
    utterance.lang = "ko-KR"; // 한국어 설정

    // 읽기가 끝난 후에만 현재 스텝을 체크
    utterance.onend = () => {
      // 현재 스텝만 체크 표시 추가 - 인덱스 기반 고유 키 사용
      setCompletedSteps((prev) => ({
        ...prev, // 이전 상태 유지
        [`step-${index}`]: true, // 현재 스텝만 체크 (인덱스 기반 고유 키)
      }));

      // 스텝에 지정된 시간이 있으면 타이머 시작
      if (step.time && step.time > 0) {
        setTimeLeft(step.time);
        startTimer(step.time, index);
      } else {
        // 지정된 시간이 없으면 약간의 지연 후 다음 스텝으로
        setTimeout(() => playStepVoice(index + 1), 1500);
      }
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // 수정된 startTTS 함수
  const startTTS = () => {
    if (!recipe || recipe.steps.length === 0) return;

    // 모든 체크박스 초기화
    setCompletedSteps({});
    setIsPlaying(true);
    setCurrentStep(0);

    // 첫 번째 스텝 실행
    playStepVoice(0);
  };

  // 타이머 시작 함수
  const startTimer = (seconds, index) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (seconds <= 0) {
      // 타이머 종료 시 다음 스텝으로
      playStepVoice(index + 1);
      return;
    }

    setTimeLeft(seconds);

    timerRef.current = setTimeout(() => {
      startTimer(seconds - 1, index);
    }, 1000);
  };

  // 타이머 포맷팅 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!recipe) return null;

  return (
    <div className="notebook-outer-container">
      {/* 포스트잇 영역 - 노트북 바깥에 절대 위치로 배치 */}
      <div className="postit-container">
        {/* 왼쪽 포스트잇 - 이미지 포함 */}
        <div className="postit-wrapper">
          <img src={postItYellow} alt="Post-it" className="postit-background" />
          <div className="postit-pin"></div>
          <div className="postit-content">
            <div className="steam-container">
              <div className="steam-container">
                <SteamIcon size={75} color="#000" />
              </div>
            </div>
            <img
              src={recipe.mainImage}
              alt={recipe.name}
              className="recipe-image"
            />
          </div>
        </div>

        {/* 오른쪽 포스트잇 - 접시와 포크, 눈과 입 포함 */}
        <div className="postit-wrapper">
          <img src={yellowPostIt} alt="Post-it" className="postit-background" />
          <div className="postit-pin"></div>
          <div className="postit-content">
            <div className="plate-container">
              <img src={forkImage} alt="Left Fork" className="fork-left" />
              <div className="plate-wrapper">
                <img
                  src={plateImage}
                  alt="Plate"
                  className="postit-plate-image"
                />
                <div className="plate-face">
                  <img src={eyesImage} alt="Eyes" className="eyes-image" />
                  <div className="mouth-container">
                    <TalkingMouth size={40} />
                  </div>
                </div>
              </div>
              <img src={forkImage} alt="Right Fork" className="fork-right" />
            </div>
          </div>
        </div>
      </div>

      {/* 노트북 컨테이너 - 포스트잇 아래에 배치 */}
      <div className="notebook-container">
        <img
          src={notebookBackground}
          alt="Notebook"
          className="notebook-background"
        />

        {/* 노트북 콘텐츠 영역 */}
        <div className="notebook-content">
          {/* 조리 단계 */}
          <div className="recipe-section">
            <h3 className="recipe-method-title">💡 요리 방법</h3>
            <br></br>
            <div className="steps-list">
              {recipe.steps.map((step, index) => (
                <div
                  key={`step-${index}`}
                  className={`step-item ${
                    index === currentStep && isPlaying ? "current-step" : ""
                  }`}
                >
                  <div
                    className={`step-checkbox ${
                      completedSteps[`step-${index}`] ? "checked" : ""
                    }`}
                    onClick={() => toggleStep(`step-${index}`)}
                  >
                    {completedSteps[`step-${index}`] && (
                      <span className="checkmark">✓</span>
                    )}
                  </div>
                  <div className="step-content">
                    <p
                      className={`step-description ${
                        completedSteps[`step-${index}`] ? "completed" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                    {step.time > 0 && (
                      <span className="step-time">{step.time}초</span>
                    )}
                    {step.image && (
                      <img
                        src={step.image}
                        alt={`Step ${index + 1}`}
                        className="step-image"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tts-controls">
        {!isPlaying ? (
          <button onClick={startTTS} className="tts-button play-button">
            {/* 재생 아이콘 (인라인 SVG) */}
            <svg
              className="tts-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="#0070f3" />
            </svg>
            요리 시작
          </button>
        ) : (
          <>
            <button onClick={pauseTTS} className="tts-button pause-button">
              {/* 일시정지 아이콘 (인라인 SVG) */}
              <svg
                className="tts-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="#fa8c16" />
              </svg>
              일시정지
            </button>
            <button onClick={stopTTS} className="tts-button stop-button">
              {/* 중지 아이콘 (인라인 SVG) */}
              <svg
                className="tts-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4H18V20H6V4Z" fill="#f5222d" />
              </svg>
              중지
            </button>
          </>
        )}
        {timeLeft > 0 && recipe.steps[currentStep].time > 0 && (
          <div className="tts-timer">
            <span className="timer-label">남은 시간: </span>
            <span className="timer-value">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeNotebook;
