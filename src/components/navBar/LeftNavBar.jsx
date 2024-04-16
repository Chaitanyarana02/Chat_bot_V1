const LeftNavBar = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-screen w-[80px] py-[28px] px-[22px]">
        <img
          src="/assets/navbar/logo.svg"
          alt="logo"
          className="cursor-pointer mb-[110px]"
        />
        <img
          src="/assets/navbar/bag.svg"
          alt="bag"
          className="cursor-pointer"
        />
        <img
          src="/assets/navbar/browser.svg"
          alt="browser"
          className="cursor-pointer mt-4"
        />
        <img
          src="/assets/navbar/exit.svg"
          alt="exit"
          className="cursor-pointer mt-auto"
        />
      </div>
    </>
  );
};

export default LeftNavBar;
