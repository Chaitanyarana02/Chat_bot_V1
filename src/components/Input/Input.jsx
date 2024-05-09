import React from "react";
import InputWrapper from "./Input.style";

const Input = ({ type, name, placeholder, className, image }) => {
  return (
    <InputWrapper className="position-relative">
      {/* for icon we use span */}
      {image && <img src={image} className="cursor-pointer" alt="image" />}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={className}
      />
    </InputWrapper>
  );
};

export default Input;
