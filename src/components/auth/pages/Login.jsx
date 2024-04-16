import { useNavigate } from "react-router-dom";
// import HeaderCommon from "./HeaderCommon";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-start">
        <div className="w-full h-[calc(100% - 144px)] flex justify-center items-center m-auto">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[26px] font-semibold leading-[32px] tracking-normal mb-[36px]">
              Welcome back to{" "}
              <strong>
                Convers<span className="text-red-600">ai</span>te
              </strong>
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email or username"
              className="text-[16px] leading-[24px] font-medium font-[Montserrat, sans-serif] border-none bg-[#f7f8f8] py-[19px] px-[12px] rounded-[12px] text-[#000] outline-none w-full mb-[24px] placeholder:text-[#1c1c1f99]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="text-[16px] leading-[24px] font-medium font-[Montserrat, sans-serif] border-none bg-[#f7f8f8] py-[19px] px-[12px] rounded-[12px] text-[#000] outline-none w-full mb-[24px] placeholder:text-[#1c1c1f99]"
            />

            <div className="text-end w-full mb-4">
              <span className="cursor-pointer text-[12px] font-semibold leading-[15px] tracking-normal">
                Forgot Password?
              </span>
            </div>

            <button
              className="bg-[#1c1c1f] text-[#fff] p-[12px] rounded-[44px] text-[14px] font-semibold leading-[20px] tracking-normal text-center font-[Montserrat, sans-serif] border-none w-full"
              onClick={() => {
                navigate("/home");
              }}
            >
              Log in
            </button>

            <p className="text-center mt-4">
              Don’t have an account?{" "}
              <strong className="cursor-pointer">Sign up</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
