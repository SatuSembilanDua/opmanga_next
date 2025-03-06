import ReadPage from "@/components/ui/read-page"
import { pageModel } from "@/lib/repo"

export const generateMetadata = async ({ params }) => {
	const { id } = await params
  const data = await pageModel.get(id)
  const title = data.title
  return {
		title: `One Piece - ${title}`,
  }
}

const ViewPage = async ({ params }) => {
	const { id } = await params
  const data = await pageModel.getPage(id)
  return (
    <>
      <ReadPage pageTitle={`One Piece - ${data.title}`} data={data} />
    </>
  )
}

export default ViewPage