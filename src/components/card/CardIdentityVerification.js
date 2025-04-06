import React, { useState, useEffect, useRef } from "react"; // useRef 추가
import { useNavigate } from "react-router-dom";
import "./CardIdentityVerification.css";
import { useToast } from "../../context/ToastContext";

const CardIdentityVerificationPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    firstName: "",
    residentId: "",
    telecom: "KT",
    phoneNumber: "",
    verificationCode: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // 타이머 관련 상태 추가
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [timerActive, setTimerActive] = useState(false);
  const timerIntervalRef = useRef(null);

  // 메시지 알림 관련 상태 추가
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const messageTimeoutRef = useRef(null);

  // 타이머 효과
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // 시간이 만료되면 인증번호 초기화
      setGeneratedCode("");
      setFormData((prev) => ({
        ...prev,
        verificationCode: "",
      }));
      showToast("인증 시간이 만료되었습니다. 다시 인증해주세요.");
      setTimerActive(false);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerActive, timeLeft, showToast]);

  // 메시지 알림 표시 효과
  useEffect(() => {
    if (showMessage) {
      // 8초 후에 메시지 숨기기
      messageTimeoutRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 8000);
    }

    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [showMessage]);

  // 타이머 포맷 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 입력 필드 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 인증 요청 처리
  const handleRequestVerification = () => {
    if (formData.phoneNumber) {
      // 휴대폰 번호 형식 검증 (간단한 예시)
      const phoneRegex = /^01[0-1|6-9][0-9]{7,8}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        showToast("올바른 휴대폰 번호를 입력해주세요.");
        return;
      }

      // 6자리 랜덤 인증번호 생성
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      setGeneratedCode(verificationCode);

      // 인증번호 필드 표시
      setShowVerificationField(true);

      // 타이머 시작
      setTimeLeft(180);
      setTimerActive(true);

      // 모바일 메시지 스타일 알림 표시
      setMessage(
        `[SOL Pick] 인증번호는 [${verificationCode}]입니다. 3분 내에 입력해주세요.`
      );
      setShowMessage(true);

      // 3초 후에 자동으로 인증번호 입력
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          verificationCode,
        }));
      }, 3000);
    } else {
      showToast("휴대폰 번호를 입력해주세요.");
    }
  };

  // 인증 완료 처리
  const handleCompleteVerification = () => {
    // 모든 필수 필드가 입력되었는지 확인
    const isFormComplete =
      formData.name &&
      formData.lastName &&
      formData.firstName &&
      formData.residentId &&
      formData.residentIdBack &&
      formData.residentIdBack.length === 7 &&
      formData.phoneNumber &&
      formData.verificationCode;

    // 인증번호 일치 여부 확인 및 타이머 유효성 검증
    const isVerificationValid =
      formData.verificationCode === generatedCode && timeLeft > 0;

    if (isFormComplete && agreeToTerms) {
      if (isVerificationValid) {
        // 타이머 중지
        setTimerActive(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }

        // 영문 성, 이름 저장
        localStorage.setItem("cardLastName", formData.lastName);
        localStorage.setItem("cardFirstName", formData.firstName);
        navigate("/card/apply/terms"); // 다음 단계(약관 동의)로 이동
      } else if (timeLeft <= 0) {
        showToast("인증 시간이 만료되었습니다. 다시 인증해주세요.");
      } else {
        showToast("인증번호가 일치하지 않습니다.");
      }
    } else {
      showToast("모든 정보를 입력하고 약관에 동의해주세요.");
    }
  };

  return (
    <div className="identity-verification-container">
      <div className="identity-verification-content">
        {/* 모바일 메시지 스타일 알림 */}
        {showMessage && (
          <div className="mobile-message">
            <div className="message-header">
              <span className="message-sender">SOL Pick</span>
              <span className="message-time">방금 전</span>
            </div>
            <div className="message-content">{message}</div>
          </div>
        )}
        {/* 진행 단계 표시 */}
        <div className="step-indicator">
          <div className="active"></div>
          <div className="active"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <p className="step-number">2 / 6</p>

        {/* 안내 텍스트 */}
        <div className="verification-title">
          <h2>본인 인증해 주세요</h2>
        </div>
        <div className="verification-form">
          {/* 이름 입력 */}
          <div className="input-section">
            <label>이름</label>
            <input
              type="text"
              name="name"
              placeholder="이름 입력"
              value={formData.name}
              onChange={handleInputChange}
              className="card-input-field"
            />
          </div>

          {/* 영문 성 입력 */}
          <div className="input-section">
            <label>영문 성</label>
            <input
              type="text"
              name="lastName"
              placeholder="EX) HONG"
              value={formData.lastName}
              onChange={handleInputChange}
              className="card-input-field"
            />
          </div>

          {/* 영문 이름 입력 */}
          <div className="input-section">
            <label>영문 이름</label>
            <input
              type="text"
              name="firstName"
              placeholder="EX) GILDONG"
              value={formData.firstName}
              onChange={handleInputChange}
              className="card-input-field"
            />
          </div>

          {/* 주민등록번호(외국인등록번호) 입력 */}
          <div className="input-section">
            <label>주민등록번호(외국인등록번호)</label>
            <div className="resident-id-input">
              <input
                type="text"
                name="residentId"
                placeholder="생년월일 6자리"
                maxLength="6"
                value={formData.residentId}
                onChange={handleInputChange}
                className="card-input-field birth-date"
              />
              <span className="separator">-</span>
              <div className="masked-input">
                <input
                  type="password"
                  name="residentIdBack"
                  maxLength="7"
                  className="card-input-field masked"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                      ...formData,
                      residentIdBack: value,
                    });
                  }}
                  value={
                    formData.residentIdBack
                      ? "•".repeat(formData.residentIdBack.length)
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* 휴대폰 인증 */}
          <div className="phone input-section">
            <label>휴대폰 인증</label>
            <div className="telecom-selection">
              <select
                name="telecom"
                value={formData.telecom}
                onChange={handleInputChange}
                className="telecom-select"
              >
                <option value="KT">KT</option>
                <option value="SKT">SKT</option>
                <option value="LGU+">LGU+</option>
                <option value="KT알뜰폰">KT 알뜰폰</option>
                <option value="SKT알뜰폰">SKT 알뜰폰</option>
                <option value="LGU+알뜰폰">LGU+ 알뜰폰</option>
              </select>
              <svg
                className="dropdown-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M5 8L10 13L15 8" stroke="black" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="phone-verification">
              <input
                type="text"
                name="phoneNumber"
                placeholder="휴대폰 11자리"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="card-input-field phone-number"
                maxLength="11"
              />
              <button
                className="verification-request-button"
                onClick={handleRequestVerification}
                disabled={timerActive && timeLeft > 0}
              >
                {timerActive && timeLeft > 0 ? "재전송" : "인증 요청"}
              </button>
            </div>
          </div>

          {/* 인증 번호 입력 필드 (인증 요청 후 표시) */}
          {showVerificationField && (
            <div className="input-section verification-code-section">
              <input
                type="text"
                name="verificationCode"
                placeholder="인증 번호 입력"
                value={formData.verificationCode}
                onChange={handleInputChange}
                className="card-input-field verification-code"
                maxLength="6"
              />
              {timerActive && (
                <span
                  className={`verification-timer ${
                    timeLeft <= 60 ? "warning" : ""
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>
          )}

          {/* 본인 확인 약관 동의 */}
          <div className="terms-agreement">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="checkbox-input"
              />
              <span className="custom-checkbox"></span>
              <span className="checkbox-label">
                본인 확인을 위한 약관 모두 동의
              </span>
            </label>
          </div>
        </div>
        {/* 하단 버튼 섹션 */}
        <div className="verification-footer">
          <button
            className="verification next-button"
            onClick={handleCompleteVerification}
            disabled={
              !showVerificationField ||
              !formData.verificationCode ||
              !agreeToTerms
            }
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardIdentityVerificationPage;
