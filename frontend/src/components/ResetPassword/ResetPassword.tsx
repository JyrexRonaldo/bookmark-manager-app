function ResetPassword() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#E8F0EF]">
        <div className="flex h-[530px] w-[448px] flex-col gap-[32px] rounded-[12px] bg-white px-[32px] py-[40px]">
          <div>
            <img src="/img/logo-light-theme.svg" alt="" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[24px]/[140%] font-bold">Reset Your Password</p>
            <p className="text-[14px]/[150%]">
              Enter your new password below. Make sure it’s strong and secure.
            </p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <label htmlFor="">New Password *</label>
              <input
                type="password"
                name="password"
                id="password"
                className="h-[45px] w-[384px]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Confirm password *</label>
              <input
                type="password"
                name="password"
                id="password"
                className="h-[45px] w-[384px]"
              />
            </div>
            <button className="bg-[#014745] px-[16px] py-[12px] text-[16px]/[140%] text-white">
              Reset password
            </button>
          </div>
          <div className="flex flex-col justify-center gap-[12px]">
            <div className="flex justify-center">
              <p className="text-[14px]/[150%]">Back to login</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
