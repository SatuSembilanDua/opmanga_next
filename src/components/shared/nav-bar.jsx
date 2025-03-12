"use client"
import { SessionProvider, useSession, signOut } from "next-auth/react"
import Link from "next/link"

const NavBar = () => {
	return (
		<>
			<SessionProvider>
				<NavbarContent />
			</SessionProvider>
		</>
	)
}

const NavbarContent = () => {
	const { data: session } = useSession()
	return (
		<>
			<div className="bg-primary md:px-20 border-b-4 border-dialect">
				<div className="flex justify-between items-center">
					<div className="flex justify-start items-center">
						<NavLink href={"/"} label={"One Piece"} />
						<NavLink href={"/kimok"} label={"Komik"} />
						{session && <NavLink href={"/manga"} label={"Manga"} />}
					</div>
					<div className="flex justify-start items-center">
						{session ? (
							<button
								onClick={() => signOut()}
								className="px-4 py-2 text-primary-foreground hover:bg-dialect cursor-pointer"
							>
								Logout
							</button>
						) : (
							<NavLink href={"/login"} label={"Login"} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}

const NavLink = ({ href, label }) => {
	return (
		<>
			<Link href={href} className="linking px-4 py-2 text-primary-foreground hover:bg-dialect">
				{label}
			</Link>
		</>
	)
}

export default NavBar
