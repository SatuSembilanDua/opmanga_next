import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <Image width={275} height={260} src={`/icon.png`} alt="Error" priority />
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-primary md:text-3xl">Halaman tidak ditemukan</h1>
          <p className="mt-4 text-secondary-foreground">
            Halaman yang Anda cari tidak ada. Berikut ini beberapa tautan yang berguna:
          </p>
          <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <Link
              href={"/"}
              className="w-1/2 shrink-0 rounded-lg bg-primary px-5 py-2 text-sm tracking-wide text-primary-foreground transition-colors duration-200 hover:bg-accent sm:w-auto"
            >
              One Piece
            </Link>
            <Link
              href={"/kimok"}
              className="w-1/2 shrink-0 rounded-lg bg-secondary px-5 py-2 text-sm tracking-wide text-secondary-foreground transition-colors duration-200 hover:bg-accent sm:w-auto"
            >
              Komik/Manga Lain
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
