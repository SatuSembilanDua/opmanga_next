"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PiMagnifyingGlass } from "react-icons/pi"
import { useDebouncedCallback } from "use-debounce"

const Search = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", "1")
		if (term) {
			params.set("query", term)
		} else {
			params.delete("query")
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<>
			<div className="relative flex flex-1">
				<input
					type="search"
					className="w-full border py-2 pl-10 text-sm outline-2 rounded-sm"
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams.get("query")?.toString()}
				/>
				<PiMagnifyingGlass className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
			</div>
		</>
	)
}

export default Search
