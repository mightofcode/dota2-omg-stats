import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    console.log(ref);
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
