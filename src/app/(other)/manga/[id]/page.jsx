import ReadPage from "@/components/ui/read-page"
import { pajiModel } from "@/lib/repo"

export const generateMetadata = async ({ params }) => {
	const { id } = await params
	const data = await pajiModel.get(id)
	const group = data.Group.name != "Other" ? `${data.Group.name} - ` : ""
	const title = data.title
	return {
		title: `${group}${title}`,
	}
}

const PejiPage = async ({ params }) => {
	const { id } = await params
	const data = await pajiModel.getPageData(id)
	return (
		<>
			<ReadPage pageTitle={`${data.title}`} data={data} />
		</>
	)
}

export default PejiPage
