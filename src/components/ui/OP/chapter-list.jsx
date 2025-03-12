import { formatDateToLocal } from "@/lib/utils"
import Link from "next/link"
import { PiHashBold } from "react-icons/pi"

const ChapterList = ({ data }) => {
	return (
		<>
			{data.map((e) => (
				<Link key={e.id} href={`/view/${e.id}`} className="linking block border-b last:border-none">
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
