import HeaderCommon from "../../components/Header/HeaderCommon";
import Input from "../../components/Input/Input";
import ButtonCustom from "../../components/Button/ButtonCustom";
import { useNavigate } from "react-router-dom";

// style
import { LoginWrapper } from "./Login.style";

// Icons
import passLogo from "../../assets/images/password.svg";

const Login = () => {
  const navigate = useNavigate();
  return (
    <LoginWrapper>
      <HeaderCommon />
      <div className="box-container w-100 d-flex justify-content-center align-items-center m-auto">
        <div className="box-card">
          <p className="main-title">
            Welcome back to{" "}
            <strong>
              Convers<span>ai</span>te
            </strong>
          </p>
          <Input type="email" name="email" placeholder="Email or username" />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-0"
            image={passLogo}
          />
          <div className="text-end mb-4">
            <span className="forgot-pass cursor-pointer">Forgot Password?</span>
          </div>
          <ButtonCustom
            text="Log in"
            onClick={() => {
              navigate("/home");
            }}
          />
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <strong className="cursor-pointer">Sign up</strong>
          </p>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
