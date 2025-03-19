import { motion, AnimatePresence } from "framer-motion";
import closeIcon from "../../../assets/close.svg";
import ButtonS from "../button/ButtonS";
import "./Popup.css";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

const Popup = ({
  isOpen,
  onClose,
  onLeftClick,
  onRightClick,
  title,
  description,
  outlinedButtonText,
  filledButtonText,
  children, // children props 추가
}) => {
  // 포털 사용을 위한 상태 추가
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 root div 참조 가져오기
    const element = document.getElementById("root");
    setPortalElement(element);
  }, []);

  // isOpen이 false이거나 portalElement가 없으면 아무것도 렌더링하지 않음
  if (!isOpen || !portalElement) return null;

  // 포털을 사용하여 팝업 렌더링
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="popup-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <h3 className="popup-title bold">{title}</h3>
              <img
                src={closeIcon}
                alt="Close"
                className="close-icon"
                onClick={onClose}
              />
            </div>
            {description && <p className="popup-description">{description}</p>}

            {/* children이 있으면 렌더링 */}
            {children}

            <div className="popup-button-container">
              <ButtonS
                text={outlinedButtonText}
                variant="outlined"
                onClick={onLeftClick}
                width="100%"
              />
              <ButtonS
                text={filledButtonText}
                variant="filled"
                onClick={onRightClick}
                width="100%"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalElement
  );
};

export default Popup;
