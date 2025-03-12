import { LogoHead } from "@/components/shared/app-logo"
import ScrollTop from "@/components/shared/scroll-top"
import ThemeButton from "@/components/shared/theme-button"
import Link from "next/link"

const MainLayout = ({ children }) => {
	return (
		<>
			<div className="bg-primary p-4 border-b-4 border-dialect">
				<div className="flex justify-between items-center">
					<LogoHead />
				</div>
			</div>
			<div className="min-h-screen">{children}</div>
			<div className="bg-primary min-h-20 border-t-4 border-dialect px-4 py-8">
				<div className="flex justify-between">
					<div>
						<LogoHead />
						<p className="text-white">Baca Manga One Piece</p>
						<Link href={"/kimok"} className="linking text-secondary-foreground hover:text-secondary-foreground">
							Komik/Manga Lainnya
						</Link>
					</div>
					<div>
						<ThemeButton />
					</div>
				</div>
			</div>
			<ScrollTop />
		</>
	)
}

export default MainLayout
