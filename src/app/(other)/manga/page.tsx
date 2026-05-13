import ErrorPage from "@/components/shared/error-page";
import Pagination from "@/components/shared/pagination";
import Search from "@/components/shared/search";
import KomikCard from "@/components/ui/kimok/komik-card";
import PageTitle from "@/components/ui/kimok/page-title";
import { SkeletonKomik } from "@/components/ui/kimok/skeleton-komik";
import { getMangaSearchPagin } from "@/server/manga";
import { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

export const generateMetadata = () => {
  return {
    title: `Manga`,
  };
};

const MangaPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams | undefined> | SearchParams | undefined;
}) => {
  const csp = await searchParams;
  const query = csp?.query || "";
  const currentPage = Number(csp?.page) || 1;
  const getData = await getMangaSearchPagin(query, currentPage);
  if (!getData) {
    return <ErrorPage />;
  }
  const { data, totalPage } = getData;
  return (
    <>
      <div className="my-4 flex flex-col items-start justify-start md:mb-0 md:flex-row md:items-center md:justify-between">
        <PageTitle>List Manga</PageTitle>
        <div className="w-full md:w-auto">
          <Suspense key={query + currentPage} fallback={null}>
            <Search />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pb-10 md:grid-cols-5 md:gap-6">
        <Suspense key={query + currentPage} fallback={<SkeletonKomik />}>
          <KomikCard data={data} link={`/manga/`} />
        </Suspense>
      </div>
      <Suspense key={query + currentPage} fallback={null}>
        <div className="mt-4 mb-20 flex justify-center">{totalPage > 1 && <Pagination totalPages={totalPage} />}</div>
      </Suspense>
    </>
  );
};

export default MangaPage;
