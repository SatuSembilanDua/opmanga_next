"use client";
import { PiCaretUp } from "react-icons/pi";

const ScrollTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="hidden md:block">
        <div
          className="fixed right-4 bottom-10 cursor-pointer rounded-full bg-primary p-2 text-white"
          onClick={scrollToTop}
        >
          <PiCaretUp size={16} />
        </div>
      </div>
    </>
  );
};

export default ScrollTop;
