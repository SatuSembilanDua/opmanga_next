import Pagination from "@/components/shared/pagination"
import Search from "@/components/shared/search"
import ChapterList from "@/components/ui/kimok/chapter-list"
import KomikPage from "@/components/ui/kimok/komik-page"
import PageTitle from "@/components/ui/kimok/page-title"
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants"
import { issueModel, komikModel } from "@/lib/repo"

export const generateMetadata = async ({ params }) => {
	const { slug } = await params
	const data = await komikModel.getWhere({ slug: slug })
	const judul = data.title
	const deskripsi = `Baca ${judul}. ${APP_DESCRIPTION}`
	const url = `${SERVER_URL}/kimok/${slug}`
	return {
		title: judul,
		description: deskripsi,
		openGraph: {
			siteName: APP_NAME,
			title: judul,
			description: deskripsi,
			url: new URL(url),
			locale: "id_ID",
			type: "website",
		},
	}
}

const ChapterPage = async ({ params, searchParams }) => {
	const { slug } = await params
	const komik = await komikModel.getWhere({ slug: slug })
	const csp = await searchParams
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
	const order = { id: "asc" }
	const where = { komikId: komik.id }
	const data = await issueModel.getSearchPaginWhere(where, query, currentPage, order)
	const totalPage = await issueModel.getPageWhere(where, query)
	// console.log(data)
	return (
		<>
			<div className="flex justify-between items-center">
				<PageTitle>{komik.title}</PageTitle>
				<div>
					<Search />
				</div>
			</div>
			{["K0001", "K0017", "K0018", "K0019"].includes(komik.id) ? (
				<>
					<KomikPage data={data} suspenseKey={query + currentPage} link={`/kimok/${komik.slug}/view/`} />
				</>
			) : (
				<>
					<ChapterList data={data} suspenseKey={query + currentPage} slug={slug} />
				</>
			)}
			<div className="flex justify-center mt-4">{totalPage > 1 && <Pagination totalPages={totalPage} />}</div>
		</>
	)
}

export default ChapterPage
