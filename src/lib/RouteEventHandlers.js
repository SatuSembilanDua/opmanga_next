import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const useRouteChange = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	useEffect(() => {
		const url = `${pathname}?${searchParams}`
		console.log("Route changed to:", url)
		window.dispatchEvent(new CustomEvent("routeChangeStart"))
		setTimeout(() => {
			window.dispatchEvent(new CustomEvent("routeChangeComplete"))
		}, 1000)
	}, [pathname, searchParams])
}
