import { Skeleton } from "@/components/shared/skeleton"

const SkeletonList = () => {
	const data = [...Array(20).keys()]
	return (
		<>
			{data.map((e) => (
				<div className="py-1 border-b last:border-none flex justify-start items-center gap-2 cursor-pointer hover:bg-muted">
					<Skeleton className="size-8" />
					<div>
						<Skeleton className="h-4 w-80 mb-1" />
						<Skeleton className="h-2 w-40" />
					</div>
				</div>
			))}
		</>
	)
}

export default SkeletonList

/* 
<PiHashBold size={32} className="text-muted-foreground" />
					<div>
						<h2 className="text-base font-medium text-foreground">Chapter Number : Chapter Title</h2>
						<p className="text-sm text-muted-foreground">20 December 2025</p>
					</div>

*/
