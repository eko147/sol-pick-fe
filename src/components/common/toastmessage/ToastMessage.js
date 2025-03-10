import { useEffect, useState } from "react";
import "./ToastMessage.css";

const ToastMessage = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`toast-container ${visible ? "show-toast" : ""}`}>
      <p className="toast-message">{message}</p>
    </div>
  );
};

export default ToastMessage;
