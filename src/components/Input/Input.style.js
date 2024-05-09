import styled from "styled-components";

const InputWrapper = styled.div`
  img {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 20px;
    top: 22px;
  }
  input {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    border: none;
    background-color: #f7f8f8;
    padding: 19px 12px;
    border-radius: 12px;
    color: #000;
    outline: none;
    width: 100%;
    margin-bottom: 24px;
    &::placeholder {
      color: #1c1c1f99;
    }
  }
`;

export default InputWrapper;
