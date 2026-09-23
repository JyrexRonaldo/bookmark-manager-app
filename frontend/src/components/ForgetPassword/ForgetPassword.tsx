import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { resetPassword } from "../../services";
import Toast from "../Toast/Toast";
import { useToastStatusControls } from "../../store";

function ForgetPassword() {
  const { setToastStatus } = useToastStatusControls();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resetEmail: "",
    },
  });

  const onSubmit: SubmitHandler<{ resetEmail: string }> = async (formData) => {
    const data = await resetPassword(formData.resetEmail);
    if (data !== undefined) {
      setError("resetEmail", { message: data.message });
      return;
    }
    setToastStatus(true);
  };

  return (
    <>
      <div className="grid h-screen grid-flow-col grid-rows-[1fr_50px]">
        <div className="flex items-center justify-center bg-[#E8F0EF]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-[20px] flex h-[443] max-w-[448px] flex-col gap-[32px] justify-self-center rounded-[12px] bg-white px-[32px] py-[40px]"
          >
            <div>
              <img src="/img/logo-light-theme.svg" alt="" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <p className="font-manrope text-[24px]/[140%] font-bold">
                Forgot your password?
              </p>
              <p className="font-manrope text-[14px]/[150%] tracking-[1%]">
                Enter your email address below and we’ll send you a link to
                reset your password.
              </p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  {...register("resetEmail", {
                    required: "please enter a valid email address",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Invalid address",
                    },
                  })}
                  id="email"
                  className="h-[45px] max-w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
                />
                {errors.resetEmail && (
                  <p className="ml-[10px] text-xs text-red-600">
                    {errors.resetEmail?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="h-[46px] max-w-[384px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] font-manrope text-[16px]/[140%] text-white"
              >
                Send reset link
              </button>
            </div>
            <div className="flex flex-col justify-center gap-[12px]">
              <div className="flex justify-center">
                <Link to="/">
                  <p className="font-manrope text-[14px]/[140%]">
                    Back to login
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-[#E8F0EF]">
          <Toast message="Email sent!!" />
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
