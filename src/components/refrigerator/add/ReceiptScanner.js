import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./ReceiptScanner.css";
import closeIcon from "../../../assets/close.svg";
import cameraIcon from "../../../assets/camera.svg";
import ButtonS from "../../common/button/ButtonS"; // ButtonS 컴포넌트 import

const ReceiptScanner = ({ isOpen, onClose, onScanComplete }) => {
  const [stage, setStage] = useState("camera"); // camera, loading, results
  const [capturedImage, setCapturedImage] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // 카메라 스트림 시작
  useEffect(() => {
    if (isOpen && stage === "camera") {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, stage]);

  // 카메라 스트림 시작 함수
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment", // 후면 카메라 우선 사용
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      console.error("카메라 접근 오류:", err);
      alert("카메라에 접근할 수 없습니다.");
    }
  };

  // 카메라 스트림 중지 함수
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // 사진 촬영 함수
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // 캔버스 크기를 비디오 크기에 맞춤
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 비디오 프레임을 캔버스에 그림
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캔버스 이미지를 데이터 URL로 변환
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageDataUrl);

      // 카메라 중지
      stopCamera();

      // 로딩 단계로 전환
      setStage("loading");

      // 로딩 진행 시뮬레이션
      simulateLoading();
    }
  };

  // 로딩 시뮬레이션 함수
  const simulateLoading = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // OCR 처리 완료 후 다음 단계로 이동
          setTimeout(() => {
            onScanComplete(capturedImage);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  // 다시 촬영하기
  const retakePhoto = () => {
    setCapturedImage(null);
    setStage("camera");
    startCamera();
  };

  // 버튼 비활성화 상태 계산
  const isRetakeButtonDisabled = loadingProgress > 80;

  return (
    <motion.div
      className="receipt-scanner-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="receipt-scanner-header">
        <h3 className="scanner-title bold">영수증 촬영하기</h3>
        <img
          src={closeIcon}
          alt="Close"
          className="close-icon"
          onClick={onClose}
        />
      </div>

      <div className="receipt-scanner-content">
        {stage === "camera" && (
          <div className="camera-view">
            {/* 비디오 미리보기 */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-preview"
              onCanPlay={() => videoRef.current.play()}
            />

            <div className="camera-guidance">
              <div className="guidance-text">
                사각형 안에 구입한 식재료명이
                <br />
                모두 들어오도록 사진을 촬영해주세요.
              </div>
              <div className="receipt-frame"></div>
              <div className="capture-button-container">
                <button className="capture-button" onClick={captureImage}>
                  <img src={cameraIcon} alt="cameraIcon" />
                </button>
              </div>
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}

        {stage === "loading" && (
          <div className="loading-view">
            <div className="captured-receipt">
              <img src={capturedImage} alt="Captured Receipt" />
              <div className="scan-line"></div>
            </div>
            <div className="loading-progress-container">
              <div
                className="loading-progress-bar"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="loading-status">
              {loadingProgress < 30 && "영수증 이미지 분석 중..."}
              {loadingProgress >= 30 &&
                loadingProgress < 60 &&
                "텍스트 인식 중..."}
              {loadingProgress >= 60 &&
                loadingProgress < 90 &&
                "식재료명 정보 추출 중..."}
              {loadingProgress >= 90 && "거의 완료되었습니다..."}
            </div>
            <div className="retake-button-container">
              <ButtonS
                text="다시 촬영하기"
                variant="outlined"
                onClick={retakePhoto}
                disabled={isRetakeButtonDisabled}
                width="120px"
                height="40px"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReceiptScanner;
