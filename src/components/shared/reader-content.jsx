import Image from "next/image"

const ReaderContent = ({ data }) => {
	// console.log(data)
	return (
		<>
			<div className="flex flex-col justify-center items-center">
				{data.map((e, i) => (
					<Image
						src={e.img}
						key={i}
						alt={e.id}
						className="w-full md:w-4/5"
						width={2000}
						height={1000}
						quality={100}
						// fill={true}
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg=="
						loading="lazy"
					/>
				))}
			</div>
		</>
	)
}

export default ReaderContent
