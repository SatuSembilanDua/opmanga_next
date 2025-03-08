"use client"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
// import { useRouter } from "next/router"

const ProgressBar = () => {
	const [progress, setProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()
	const searchParams = useSearchParams()
	// const router = useRouter()

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true)
			setProgress(0)
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 90) {
						clearInterval(interval)
						return prev
					}
					return prev + 10
				})
			}, 100)
		}

		const handleRouteChangeComplete = () => {
			setProgress(100)
			setTimeout(() => {
				setIsLoading(false)
			}, 300)
		}

		// window.addEventListener("routeChangeStart", handleRouteChangeStart)
		// window.addEventListener("routeChangeComplete", handleRouteChangeComplete)

		// return () => {
		// 	window.removeEventListener("routeChangeStart", handleRouteChangeStart)
		// 	window.removeEventListener("routeChangeComplete", handleRouteChangeComplete)
		// }

		// router.events.on("routeChangeStart", handleRouteChangeStart)
		// router.events.on("routeChangeComplete", handleRouteChangeComplete)

		// return () => {
		// 	router.events.off("routeChangeStart", handleRouteChangeStart)
		// 	router.events.off("routeChangeComplete", handleRouteChangeComplete)
		// }

		// const handleLinkClick = (event) => {
		// 	const target = event.target
		// 	console.log(target.tagName)
		// 	if (target.tagName === "A") {
		// 		handleRouteChangeStart()
		// 	}
		// }

		// document.addEventListener("click", handleLinkClick)
		// const timeout = setTimeout(handleRouteChangeComplete, 1000)

		// console.log(pathname, searchParams)
		// return () => {
		// 	document.removeEventListener("click", handleLinkClick)
		// 	clearTimeout(timeout)
		// }

		handleRouteChangeStart()
		const timeout = setTimeout(handleRouteChangeComplete, 1000)
		return () => {
			clearTimeout(timeout)
		}
		// }, [pathname, searchParams, router])
	}, [pathname, searchParams])
	// }, [])

	if (!isLoading) return null

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-1 z-50">
				<div className="h-full bg-blue-500 transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }} />
			</div>
		</>
	)
}

export default ProgressBar
