import "./IngredientAddForm.css";
import Header from "../../../components/common/header/Header";
import backArrow from "../../../assets/backArrow.svg";
import close from "../../../assets/close.svg";
import Input from "../../../components/common/input/Input";
import SelectL from "../../../components/common/select/SelectL";
import ButtonL from "../../../components/common/button/ButtonL";
import Menu from "../../../components/common/menu/Menu";
import plus from "../../../assets/plus.svg";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SelectIcon from "../../../components/refrigerator/add/SelectIcon";

const IngredientAddForm = () => {
  // location을 사용하여 현재 경로 및 상태 확인
  const location = useLocation();
  const isFromReceipt = location.state?.fromReceipt || false;
  const receiptData = location.state?.receiptData || {};

  // 이미지 미리보기 상태 관리
  const [imagePreview, setImagePreview] = useState(null);

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    emoji: "",
    name: "",
    expiryDate: "",
    mainCategory: "",
    subCategory: "",
    detailCategory: "",
    weight: "",
  });

  // 파일 입력 요소 접근
  const fileInputRef = useRef(null);

  // 영수증 데이터로 폼 초기화 (영수증 스캔 후 이동한 경우)
  useEffect(() => {
    if (isFromReceipt && receiptData) {
      setFormData({
        name: receiptData.name || "",
        expiryDate: receiptData.expiryDate || "",
        mainCategory: receiptData.mainCategory || "",
        subCategory: receiptData.subCategory || "",
        detailCategory: receiptData.detailCategory || "",
        weight: receiptData.weight || "",
        emoji: receiptData.emoji || "",
      });

      // 영수증에서 이미지가 있으면 설정
      if (receiptData.image) {
        setImagePreview(receiptData.image);
      }
    }
  }, [isFromReceipt, receiptData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          attachedImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const mainOptions = [
    { value: "", label: "대분류" },
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
  ];
  const subOptions = [
    { value: "", label: "중분류" },
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
  ];
  const detailOptions = [
    { value: "", label: "소분류" },
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
  ];

  return (
    <>
      <Header
        leftIcon={backArrow}
        title={isFromReceipt ? "영수증 촬영하기" : "직접 입력하기"}
        rightIcon={close}
        onLeftClick={() => window.history.back()}
        onRightClick={() => window.history.back()}
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
                  emoji: emoji,
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
            {/* 파일 입력 요소 */}
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
              options={mainOptions}
              className="select-item"
              value={formData.mainCategory}
              onChange={(e) =>
                setFormData({ ...formData, mainCategory: e.target.value })
              }
            />
            <SelectL
              options={subOptions}
              className="select-item"
              value={formData.subCategory}
              onChange={(e) =>
                setFormData({ ...formData, subCategory: e.target.value })
              }
            />
            <SelectL
              options={detailOptions}
              className="select-item"
              value={formData.detailCategory}
              onChange={(e) =>
                setFormData({ ...formData, detailCategory: e.target.value })
              }
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">중량</h3>
          <Input
            className="add-form-input"
            placeholder="중량을 입력해 주세요."
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="add-form-button-container">
        <ButtonL
          text="취소"
          variant="outlined"
          onClick={() => window.history.back()}
        />
        <ButtonL text={isFromReceipt ? "추가하기" : "등록하기"} />
      </div>

      <div style={{ height: "100px" }}></div>

      <Menu />
    </>
  );
};

export default IngredientAddForm;
