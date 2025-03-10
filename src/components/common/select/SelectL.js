import React, { useRef } from "react";
import "./SelectL.css";
import selectArrow from "../../../assets/selectArrow.svg";
import selectArrowActive from "../../../assets/selectArrowActive.svg";

const SelectL = ({
  name,
  id,
  options = [],
  defaultValue = "",
  onChange,
  width = "108px",
  height = "36px",
  className,
}) => {
  const selectRef = useRef(null);

  // 옵션 선택 후 포커스 제거
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    selectRef.current.blur();
  };

  return (
    <div className="selectL-container">
      <select
        ref={selectRef}
        name={name}
        id={id}
        onChange={handleChange}
        defaultValue={defaultValue}
        className={`selectL ${className || ""}`}
        style={{ width, height }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={selectArrow}
        alt="Select Arrow"
        className="selectLArrow-icon default"
      />
      <img
        src={selectArrowActive}
        alt="Select Arrow Active"
        className="selectLArrow-icon active"
      />
    </div>
  );
};

export default SelectL;
