"use client";
// import { SessionProvider, useSession, signOut } from "next-auth/react"
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <NavbarContent />
      {/* <SessionProvider>
			</SessionProvider> */}
    </>
  );
};

const NavbarContent = () => {
  // const { data: session } = useSession()
  return (
    <>
      <div className="border-b-4 border-accent-foreground bg-primary md:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <NavLink href={"/"} label={"One Piece"} />
            <NavLink href={"/kimok"} label={"Komik"} />
            {/* {session && <NavLink href={"/manga"} label={"Manga"} />} */}
            <NavLink href={"/manga"} label={"Manga"} />
          </div>
          <div className="flex items-center justify-start">
            {/* {session ? (
							<button
								onClick={() => signOut()}
								className="px-4 py-2 text-primary-foreground hover:bg-dialect cursor-pointer"
							>
								Logout
							</button>
						) : (
							<NavLink href={"/login"} label={"Login"} />
              )} */}
            <NavLink href={"/login"} label={"Login"} />
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <>
      <Link
        href={href}
        className="linking p-1.5 text-primary-foreground hover:bg-accent-foreground focus:bg-accent-foreground active:bg-accent-foreground md:px-4 md:py-2"
      >
        {label}
      </Link>
    </>
  );
};

export default NavBar;
