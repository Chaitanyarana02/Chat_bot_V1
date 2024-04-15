import logo from "/assets/auth/logo.svg";

const HeaderCommon = () => {
  return (
    <>
      <div className="py-[48px] px-[56px]">
        <img src={logo} alt="logo" className="logo cursor-pointer" />
      </div>
    </>
  );
};

export default HeaderCommon;
