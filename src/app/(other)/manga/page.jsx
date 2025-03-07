import Pagination from "@/components/shared/pagination"
import Search from "@/components/shared/search"
import KomikPage from "@/components/ui/kimok/komik-page"
import PageTitle from "@/components/ui/kimok/page-title"
import { mangaModel } from "@/lib/repo"

export const generateMetadata = () => {
	return {
		title: `Manga`,
	}
}

const MangaPage = async ({ searchParams }) => {
	const csp = await searchParams
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
	const data = await mangaModel.getSearchPagin(query, currentPage)
	const totalPage = await mangaModel.getPage(query)
	return (
		<>
			<div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center mb-4 md:mb-0">
				<PageTitle>List Manga</PageTitle>
				<div className="w-full md:w-auto">
					<Search />
				</div>
			</div>
			<KomikPage data={data} suspenseKey={query + currentPage} link={`/manga/`} />
			<div className="flex justify-center mt-4">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	)
}

export default MangaPage
