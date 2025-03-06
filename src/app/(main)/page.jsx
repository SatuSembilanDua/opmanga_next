import OPChapter from "@/components/ui/OP/chapter"
import { chapterModel } from "@/lib/repo"

const Home = async ({ searchParams }) => {
	const csp = await searchParams
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
	const data = await chapterModel.getSearchPagin(query, currentPage)
	const totalPage = await chapterModel.getPage(query)
	return (
		<>
			<OPChapter suspenseKey={query + currentPage} totalPages={totalPage} data={data} />
		</>
	)
}

export default Home
