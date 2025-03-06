import Search from "@/components/shared/search"
import SkeletonList from "./skeleton-list"
import Pagination from "@/components/shared/pagination"
import { Suspense } from "react"
import ChapterList from "./chapter-list"

const OPChapter = ({ suspenseKey, totalPages, data }) => {
	return (
		<>
			<div className="py-8 px-4 md:px-20">
				<h1 className="text-2xl pb-1 mb-4 border-b-2 border-dialect">LIST MANGA ONE PIECE</h1>
				<Search />
				<div className="my-4 border-y-2 border-dialect">
					<Suspense key={suspenseKey} fallback={<SkeletonList />}>
						<ChapterList data={data} />
					</Suspense>
				</div>
				<div className="flex justify-center mt-4">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</>
	)
}

export default OPChapter
