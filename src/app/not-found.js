import Image from "next/image"
import Link from "next/link"

const NotFoundPage = () => {
	return (
		<>
			<div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
				<div className="flex flex-col items-center max-w-sm mx-auto text-center">
					<div className="flex flex-col items-center max-w-sm mx-auto text-center">
						<Image width={275} height={260} src={`/imgs/icon.png`} alt="Error" priority />
					</div>
					<h1 className="mt-3 text-2xl font-semibold text-primary md:text-3xl">Halaman tidak ditemukan</h1>
					<p className="mt-4 text-secondary">
						Halaman yang Anda cari tidak ada. Berikut ini beberapa tautan yang berguna:
					</p>
					<div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
						<Link
							href={"/"}
							className="w-1/2 px-5 py-2 text-sm tracking-wide text-primary-foreground transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-accent "
						>
							One Piece
						</Link>
						<Link
							href={"/kimok"}
							className="w-1/2 px-5 py-2 text-sm tracking-wide text-secondary-foreground transition-colors duration-200 bg-secondary rounded-lg shrink-0 sm:w-auto hover:bg-accent "
						>
							Komik/Manga Lain
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default NotFoundPage
