import { HeaderWrapper } from "./HeaderCommon.style";

// Icons
import logo from "../../assets/images/logo.svg";

const HeaderCommon = () => {
  return (
    <HeaderWrapper>
      <img src={logo} alt="logo" className="logo cursor-pointer" />
    </HeaderWrapper>
  );
};

export default HeaderCommon;
