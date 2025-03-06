import { Suspense } from "react"
import { formatDateToLocal } from "@/lib/utils"
import SkeletonList from "../OP/skeleton-list"
import Link from "next/link"
import { PiHashBold } from "react-icons/pi"

const ChapterList = ({ data, suspenseKey, slug }) => {
	return (
		<>
			<div className="my-4 border-y-2 border-dialect">
				<Suspense key={suspenseKey} fallback={<SkeletonList />}>
					<IssueList data={data} slug={slug} />
				</Suspense>
			</div>
		</>
	)
}

const IssueList = ({ data, slug }) => {
	return (
		<>
			{data.map((e) => (
				<Link key={e.id} href={`/kimok/${slug}/view/${e.id}`} className="block border-b last:border-none">
					<div className="py-1 flex justify-start items-center gap-2 hover:bg-muted">
						<PiHashBold size={32} className="text-muted-foreground" />
						<div>
							<h2 className="text-base font-medium text-foreground">{e.title}</h2>
							<p className="text-sm text-muted-foreground">{formatDateToLocal(e.date)}</p>
						</div>
					</div>
				</Link>
			))}
		</>
	)
}

export default ChapterList
