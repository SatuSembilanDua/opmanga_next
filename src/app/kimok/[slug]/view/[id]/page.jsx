import ReadPage from "@/components/ui/read-page"
import { issueModel, komikModel } from "@/lib/repo"

export const generateMetadata = async ({ params }) => {
	const { slug, id } = await params
	const komik = await komikModel.getWhere({ slug: slug })
	const issue = await issueModel.get(id)
	const title = `${issue.title} - ${komik.title}`
	return {
		title: title,
	}
}

const ViewPage = async ({ params }) => {
	const { slug, id } = await params
  const data = await issueModel.getPageData(slug, id)
  return (
    <>
      <ReadPage pageTitle={`${data.title}`} data={data} />
    </>
  )
}

export default ViewPage

// <ReadPage pageTitle={`${data.title}`} data={data} />