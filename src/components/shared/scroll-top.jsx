"use client"
import { PiCaretUp } from "react-icons/pi"

const ScrollTop = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}
	return (
		<>
			<div className="hidden md:block">
				<div
					className="fixed bottom-10 right-4 cursor-pointer bg-dialect p-2 text-white rounded-full"
					onClick={scrollToTop}
				>
					<PiCaretUp size={16} />
				</div>
			</div>
		</>
	)
}

export default ScrollTop
