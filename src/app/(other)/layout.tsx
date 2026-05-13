import { KimokLogo } from "@/components/shared/app-logo";
import NavBar from "@/components/shared/nav-bar";
import ScrollTop from "@/components/shared/scroll-top";
import ThemeButton from "@/components/shared/theme-button";
import Link from "next/link";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="border-b-4 border-accent-foreground bg-primary p-4">
        <div className="flex items-center justify-between">
          <KimokLogo />
        </div>
      </div>
      <NavBar />
      <div className="min-h-screen px-1 md:px-40 md:py-10">{children}</div>
      <div className="min-h-20 border-t-4 border-accent-foreground bg-primary px-4 py-8">
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
  );
};

export default MainLayout;
