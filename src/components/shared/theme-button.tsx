"use client";
import { PiMoonBold, PiSunBold } from "react-icons/pi";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === "dark" ? true : false);
  const mounted = useMounted();

  if (!mounted) return null;

  const handleChecked = () => {
    const ch = !checked;
    setChecked(ch);
    if (ch) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <div className="flex items-center">
        <label htmlFor="hs-large-soft-switch-with-icons" className="relative inline-block h-8 w-15 cursor-pointer">
          <input
            type="checkbox"
            id="hs-large-soft-switch-with-icons"
            className="peer sr-only"
            checked={checked}
            onChange={handleChecked}
          />
          <span className="absolute inset-0 rounded-full bg-background transition-colors duration-200 ease-in-out peer-disabled:pointer-events-none peer-disabled:opacity-50"></span>
          <span className="absolute inset-s-0.5 top-1/2 size-7 -translate-y-1/2 rounded-full bg-foreground shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
          <span className="absolute inset-s-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-background transition-colors duration-200">
            <PiSunBold size={18} />
          </span>
          <span className="absolute inset-e-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-background transition-colors duration-200">
            <PiMoonBold size={18} />
          </span>
        </label>
      </div>
    </>
  );
};

export default ThemeButton;
