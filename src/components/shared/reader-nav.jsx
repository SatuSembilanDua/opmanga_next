import { cn } from "@/lib/utils"
import Link from "next/link"
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold, PiListBulletsBold } from "react-icons/pi"

const ReaderNav = ({ data }) => {
	return (
		<div className="grid grid-cols-3">
			<Link
				href={data.prev}
				className={cn(
					"rounded-l-md py-2.5 bg-dialect text-white flex justify-center items-center gap-2 hover:bg-muted",
					!data.prev && "pointer-events-none"
				)}
			>
				<PiCaretDoubleLeftBold />
				<p className="hidden md:block">Chapter Sebelumnya</p>
			</Link>
			<Link
				href={data.list}
				className="py-2.5 bg-primary text-primary-foreground flex justify-center items-center gap-2 hover:bg-muted"
			>
				<p className="hidden md:block">Daftar Chapter</p>
				<PiListBulletsBold className="block md:hidden" />
			</Link>
			<Link
				href={data.next}
				className={cn(
					"rounded-r-md py-2.5 bg-dialect text-white flex justify-center items-center gap-2 hover:bg-muted",
					!data.next && "pointer-events-none"
				)}
			>
				<p className="hidden md:block">Chapter Selanjutnya</p>
				<PiCaretDoubleRightBold />
			</Link>
		</div>
	)
}

export default ReaderNav
