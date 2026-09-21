import { Link, useSearchParams } from "react-router";
import type { ResetPasswordType } from "../../types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { updatePassword } from "../../services";
import { useState } from "react";

function ResetPassword() {
  const [successMessage, setSuccessMessage] = useState("")
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = (formData) => {
    const token = searchParams.get("token");
    if (token) {
      updatePassword(formData.newPassword, token);
      setSuccessMessage("Password changed!")
    }
  };

  function checkPassword(value: string, formData: ResetPasswordType) {
    if (value === formData.newPassword) {
      return true;
    } else {
      return "Passwords do not match";
    }
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#E8F0EF]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-[20px] flex min-h-[530px] max-w-[448px] flex-col gap-[32px] rounded-[12px] bg-white px-[32px] py-[40px]"
        >
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
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="">New Password *</label>
              <input
                type="password"
                {...register("newPassword")}
                autoComplete="off"
                className="h-[45px] max-w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="">Confirm password *</label>
              <input
                type="password"
                {...register("confirmPassword", { validate: checkPassword })}
                autoComplete="off"
                className="h-[45px] max-w-[384px] rounded-[8px] border border-[#899492] p-[12px]"
              />
              {errors && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600">
                  {successMessage}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="h-[46px] max-w-[384px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] text-[16px]/[140%] text-white"
            >
              Reset password
            </button>
          </div>
          <div className="flex flex-col justify-center gap-[12px]">
            <div className="flex justify-center">
              <Link to="/">
                <p className="text-[14px]/[140%]">Back to login</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
