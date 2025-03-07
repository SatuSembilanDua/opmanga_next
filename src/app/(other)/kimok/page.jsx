import KomikPage from "@/components/ui/kimok/komik-page"
import PageTitle from "@/components/ui/kimok/page-title"
import { komikModel } from "@/lib/repo"

export const generateMetadata = () => {
	return {
		title: `Kimok`,
	}
}

const KimokPage = async () => {
	const data = await komikModel.getAll()
	// console.log(data)
	return (
		<>
			<PageTitle>List Komik</PageTitle>
			<KomikPage data={data} suspenseKey={data} link={"/kimok/"} />
		</>
	)
}

export default KimokPage
