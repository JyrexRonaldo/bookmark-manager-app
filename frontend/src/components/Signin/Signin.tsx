import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import type { UserType } from "../../types";
import { signIn } from "../../services";

function Signin() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserType> = async (formData) => {
    const userData = await signIn(formData);
    console.log({ userData });
    localStorage.setItem("email", userData.email);
    localStorage.setItem("fullname", userData.fullname);
    localStorage.setItem("userToken", userData.token);
    localStorage.setItem("userId", userData.userId);
    navigate("/");
  };

  const onError = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#E8F0EF]">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex h-[543px] w-[448px] flex-col gap-[32px] rounded-[12px] bg-white px-[32px] py-[40px]"
        >
          <div>
            <img src="/img/logo-light-theme.svg" alt="" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="font-manrope text-[24px]/[140%] font-bold">
              Log in to your account
            </p>
            <p className="font-manrope text-[14px]/[150%] tracking-[1%]">
              Welcome back! Please enter your details.
            </p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "please enter email" })}
                id="email"
                className="h-[45px] w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "please enter password" })}
                id="password"
                className="h-[45px] w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
            </div>
            <button className="h-[46px] w-[384px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] font-manrope text-[16px]/[140%] text-white">
              Log in
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-[12px]">
            <div className="flex justify-center gap-[6px]">
              <p className="font-manrope text-[14px]/[150%] tracking-[1%]">
                Forgot password?
              </p>
              <Link to="/forget" className="font-manrope text-[14px]/[140%] font-semibold">
                Reset it
              </Link>
            </div>
            <div className="flex justify-center gap-[6px]">
              <p className="-manrope text-[14px]/[150%] tracking-[1%]">
                Don't have an account?
              </p>
              <Link
                to="/signup"
                className="font-manrope text-[14px]/[140%] font-semibold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
