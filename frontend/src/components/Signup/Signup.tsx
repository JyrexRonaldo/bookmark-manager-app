import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import type { NewUserType } from "../../types";
import { createUser } from "../../services";
import { Link, useNavigate } from "react-router";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<NewUserType>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<NewUserType> = async (formData) => {
    const userData = await createUser(formData);
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
          className="flex h-[618px] w-[448px] flex-col gap-[32px] rounded-[12px] bg-white px-[32px] py-[40px]"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div>
            <img src="/img/logo-light-theme.svg" alt="" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="font-manrope text-[24px]/[140%] font-bold">
              Create your account
            </p>
            <p className="font-manrope text-[14px]/[150%] tracking-[1%]">
              Join us and start saving your favorite links — organized,
              searchable, and always within reach.
            </p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Full name *
              </label>
              <input
                type="text"
                {...register("fullName", { required: "please enter fullname" })}
                id="full-name"
                className="h-[45px] w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Email address *
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
                Password *
              </label>
              <input
                type="password"
                {...register("password", { required: "please enter password" })}
                id="password"
                className="h-[45px] w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
            </div>
            <button
              type="submit"
              className="h-[46px] w-[384px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] font-manrope text-[16px]/[140%] text-white"
            >
              Create account
            </button>
          </div>
          <div className="flex flex-col justify-center gap-[12px]">
            <div className="flex justify-center gap-[6px]">
              <p className="font-manrope text-[14px]/[150%] tracking-[1%]">
                Already have an account?
              </p>
              <Link
                to="/signin"
                className="font-manrope text-[14px]/[140%] font-semibold"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
