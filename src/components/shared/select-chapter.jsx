"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { PiCaretDown } from "react-icons/pi"

const SelectChapter = ({ options, defaultValue }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const optionsRef = useRef([])

	const toggleDropdown = () => setIsOpen(!isOpen)

	useEffect(() => {
		if (isOpen && defaultValue) {
			const defaultIndex = options.findIndex((option) => option.id === defaultValue)
			if (defaultIndex !== -1 && optionsRef.current[defaultIndex]) {
				// optionsRef.current[defaultIndex].scrollIntoView({ behavior: "auto", block: "start" })
				const optionElement = optionsRef.current[defaultIndex]
				dropdownRef.current.scrollTop = optionElement.offsetTop - dropdownRef.current.offsetTop
			}
		}
	}, [isOpen, defaultValue, options])

	return (
		<>
			<div className="relative w-full">
				<button
					onClick={toggleDropdown}
					className="bg-card text-card-foreground border border-border rounded-md px-4 py-2 text-sm flex items-center justify-between w-full"
				>
					{"Select Chapter..."}
					<PiCaretDown className={cn("w-4 h-4 ml-2 transition-transform", isOpen && "rotate-180")} />
				</button>
				{isOpen && (
					<div
						className="absolute mt-1 w-full max-h-96 overflow-y-auto bg-card border text-card-foreground border-border rounded-md shadow-lg"
						ref={dropdownRef}
					>
						{options.map((option, index) => (
							<Link
              href={option.link}
              key={index}
              ref={(el) => (optionsRef.current[index] = el)}
              >
                <div
								className={cn(
									"px-4 py-2 text-sm hover:bg-dialect cursor-pointer",
									option.id == defaultValue && "bg-dialect"
								)}
							>
								{option.title}
							</div>
              </Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default SelectChapter

