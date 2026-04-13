function Signup() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#E8F0EF]">
        <div className="flex h-[618px] w-[448px] flex-col gap-[32px] rounded-[12px] bg-white px-[32px] py-[40px]">
          <div>
            <img src="/img/logo-light-theme.svg" alt="" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[24px]/[140%] font-bold">Create your account</p>
            <p className="text-[14px]/[150%]">
              Join us and start saving your favorite links — organized,
              searchable, and always within reach.
            </p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <label htmlFor="">Full name *</label>
              <input
                type="email"
                name="email"
                id="email"
                className="h-[45px] w-[384px]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Email address *</label>
              <input
                type="email"
                name="email"
                id="email"
                className="h-[45px] w-[384px]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password *</label>
              <input
                type="password"
                name="password"
                id="password"
                className="h-[45px] w-[384px]"
              />
            </div>
            <button className="bg-[#014745] px-[16px] py-[12px] text-[16px]/[140%] text-white">
              Create account
            </button>
          </div>
          <div className="flex flex-col justify-center gap-[12px]">
            <div className="flex justify-center">
              <p className="text-[14px]/[150%]">Already have an account?</p>{" "}
              <p className="text-[14px]/[140%]">Log in</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
