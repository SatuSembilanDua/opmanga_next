import Image from "next/image"
import Link from "next/link"
import { PiBookOpenTextDuotone, PiNotebookFill } from "react-icons/pi"

const KomikCard = ({ data, link }) => {
	return (
		<>
			{data.map((e, i) => (
				<Card data={e} key={i} link={link} />
			))}
		</>
	)
}

const Card = ({ data, link }) => {
	const imgsrc = data.poster ? data.poster : data.thumb 
	return (
		<>
			<div className="group">
				<div className="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
					<Link href={`${link}${data.slug}`}>
						<Image
							src={imgsrc}
							width={126}
							height={196}
							alt={data.id}
							placeholder="blur"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg=="
							loading="lazy"
							className="h-full min-w-full transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
						/>
						<div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-black/50 text-white transition-all duration-1000 ease-in-out group-hover:flex">
							<PiBookOpenTextDuotone size={56} />
						</div>
					</Link>
				</div>
				<div className="flex items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap text-primary mt-1">
					<div className="mr-1">
						<PiNotebookFill size={20} />
					</div>
					<div>
						<Link href={`${link}${data.slug}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.title}</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default KomikCard
