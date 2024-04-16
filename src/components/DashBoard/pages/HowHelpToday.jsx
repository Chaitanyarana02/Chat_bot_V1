const HowHelpToday = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-auto py-[94px] px-[65px] h-[calc(100% - 100px)] overflow-auto">
        <img
          src="/assets/navbar/logo.svg"
          alt="logo"
          className="cursor-pointer"
          width={"56px"}
          height={"56px"}
        />
        <p className="text-[32px] font-semibold leading-[39px] tracking-normal mt-3">
          How can I help you today?
        </p>
      </div>
    </>
  );
};

export default HowHelpToday;
