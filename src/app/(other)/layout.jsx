import { KimokLogo } from "@/components/shared/app-logo"
import NavBar from "@/components/shared/nav-bar"
import ScrollTop from "@/components/shared/scroll-top"
import ThemeButton from "@/components/shared/theme-button"
import Link from "next/link"

const MainLayout = ({ children }) => {
	return (
		<>
			<div className="bg-primary p-4 border-b-4 border-dialect">
				<div className="flex justify-between items-center">
					<KimokLogo />
				</div>
			</div>
			<NavBar />
			<div className="min-h-screen px-4 py-4 md:px-20">{children}</div>
			<div className="bg-primary min-h-20 border-t-4 border-dialect px-4 py-8">
				<div className="flex justify-between">
					<div>
						<KimokLogo />
						<p className="text-white">Baca Manga One Piece</p>
						<Link href={"/"} className="text-secondary hover:text-secondary-foreground">
							One Piece Manga
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
