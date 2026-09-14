import clsx from "clsx";
import { useEffect } from "react";
import { useToastStatus, useToastStatusControls } from "../../store";

function Toast({ message = "Supply text to display" }) {
const toastStatus = useToastStatus();
  const { setToastStatus } = useToastStatusControls();

  useEffect(() => {
    setTimeout(() => {
      setToastStatus(false);
    }, 2000);
  }, [toastStatus, setToastStatus]);

  function closeToastComponent() {
    setToastStatus(false);
  }

  return (
    <>
      <div
        className={clsx(
          "fixed right-[-340px] flex h-[41px] max-w-[340px]",
          toastStatus && "translate-x-[-350px]",
          "items-center gap-[8px] rounded-[8px] bg-white px-[12px] py-[10px] transition-transform duration-1000 ease-out",
        )}
      >
        <img src="/img/icon-check.svg" alt="" />
        <p className="grow font-manrope text-[14px]/[150%] font-medium tracking-[1%]">
          {message}
        </p>
        <button onClick={closeToastComponent} type="button">
          <img src="/img/icon-close.svg" alt="" />
        </button>
      </div>
    </>
  );
}

export default Toast;
