import { LogoHead } from "@/components/shared/app-logo";
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
      <div className="border-dialect border-b-4 bg-primary p-4">
        <div className="flex items-center justify-between">
          <LogoHead />
          <ThemeButton />
        </div>
      </div>
      <div className="min-h-screen">{children}</div>
      <div className="border-dialect min-h-40 border-t-4 bg-primary px-4 py-8">
        <div className="flex justify-between">
          <div className="w-full md:w-1/4">
            <LogoHead />
            <p className="text-white">Baca Manga One Piece</p>
            <Link href={"/kimok"} className="linking text-secondary hover:text-secondary-foreground">
              Komik/Manga Lainnya
            </Link>
            <p className="text-xs text-white">
              Disclaimer: Situs OPManga ini tidak menyimpan file apa pun di servernya. Seluruh konten disediakan oleh
              pihak ketiga yang tidak berafiliasi.
            </p>
          </div>
        </div>
      </div>
      <ScrollTop />
    </>
  );
};

export default MainLayout;
