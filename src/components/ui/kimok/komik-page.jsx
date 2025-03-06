import { Suspense } from "react"
import KomikCard from "./komik-card"
import SkeletonKomik from "./skeleton-komik"

const KomikPage = ({ data, link, suspenseKey }) => {
	return (
		<>
			<div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense key={suspenseKey} fallback={<SkeletonKomik />}>
					<KomikCard data={data} link={link} />
				</Suspense>
			</div>
		</>
	)
}

export default KomikPage
