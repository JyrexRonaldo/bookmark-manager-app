function ForgetPassword() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#E8F0EF]">
        <div className="flex h-[443] w-[448px] flex-col gap-[32px] rounded-[12px] bg-white px-[32px] py-[40px]">
          <div>
            <img src="/img/logo-light-theme.svg" alt="" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="font-manrope text-[24px]/[140%] font-bold">
              Forgot your password?
            </p>
            <p className="font-manrope text-[14px]/[150%] tracking-[1%]">
              Enter your email address below and we’ll send you a link to reset
              your password.
            </p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="h-[45px] w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
            </div>
            <button className="h-[46px] w-[384px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] font-manrope text-[16px]/[140%] text-white">
              Send reset link
            </button>
          </div>
          <div className="flex flex-col justify-center gap-[12px]">
            <div className="flex justify-center">
              <p className="font-manrope text-[14px]/[140%]">Back to login</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
