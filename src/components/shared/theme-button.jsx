"use client"
import { PiMoonBold, PiSunBold } from "react-icons/pi"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const ThemeButton = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!checked) {
			setTheme("light")
		} else {
			setTheme("dark")
		}
	}, [checked])

	if (!mounted) {
		return null
	}

	const handleChecked = () => {
		setChecked(!checked)
	}

	return (
		<>
			<div className="flex items-center">
				<label htmlFor="hs-large-soft-switch-with-icons" className="relative inline-block w-15 h-8 cursor-pointer">
					<input
						type="checkbox"
						id="hs-large-soft-switch-with-icons"
						className="peer sr-only"
						checked={checked}
						onChange={handleChecked}
					/>
					<span className="absolute inset-0 bg-background rounded-full transition-colors duration-200 ease-in-out peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
					<span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-7 bg-foreground rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
					<span className="absolute top-1/2 start-1.5 -translate-y-1/2 flex justify-center items-center size-5 text-background transition-colors duration-200">
						<PiSunBold size={18} />
					</span>
					<span className="absolute top-1/2 end-1.5 -translate-y-1/2 flex justify-center items-center size-5 text-background  transition-colors duration-200">
						<PiMoonBold size={18} />
					</span>
				</label>
			</div>
		</>
	)
}

export default ThemeButton
