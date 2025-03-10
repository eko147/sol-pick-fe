import "./NotiItem.css";

import expirationIcon from "../../../assets/expiration.svg";
import reorderIcon from "../../../assets/reorder.svg";

const iconMap = {
  expiration: expirationIcon,
  reorder: reorderIcon,
};

const NotiItem = ({
  type,
  title,
  description,
  timestamp,
  showDate = false,
  date,
}) => {
  const icon = iconMap[type];

  return (
    <>
      {showDate && <div className="noti-date">{date}</div>}
      <div className="noti-item">
        <img src={icon} alt={type} className="noti-icon" />
        <div className="noti-description">
          <p className="noti-type">{title}</p>
          <p className="noti-detail bold">{description}</p>
          <p className="noti-item-time">{timestamp}</p>
        </div>
      </div>
    </>
  );
};

export default NotiItem;
