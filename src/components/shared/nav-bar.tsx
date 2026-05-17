import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <NavbarContent />
    </>
  );
};

const NavbarContent = () => {
  return (
    <>
      <div className="border-b-4 border-accent-foreground bg-primary md:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <NavLink href={"/"} label={"One Piece"} />
            <NavLink href={"/kimok"} label={"Komik"} />
            <NavLink href={"/manga"} label={"Manga"} />
          </div>
          <div className="flex items-center justify-start"></div>
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
