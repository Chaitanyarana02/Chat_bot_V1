import React from "react";
import { Button } from "./ButtonCustom.style";

const ButtonCustom = ({ type, text, className, image, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonCustom;
