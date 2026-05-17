import ErrorPage from "@/components/shared/error-page";
import Pagination from "@/components/shared/pagination";
import Search from "@/components/shared/search";
import ChapterList from "@/components/ui/op/chapter-list";
import SkeletonList from "@/components/ui/op/skeleton-list";
import { getChapterSearchPagin } from "@/server/chapter";
import { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

type SearchParamsType = {
  searchParams: Promise<SearchParams | undefined> | SearchParams | undefined;
};

const HomePage = ({ searchParams }: SearchParamsType) => {
  return (
    <>
      <div className="px-4 py-8 md:px-20">
        <h1 className="mb-4 border-b-2 border-primary pb-1 text-2xl">LIST MANGA ONE PIECE</h1>
        <Suspense fallback={<SkeletonList />}>
          <HomeMainPage searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

const HomeMainPage = async ({ searchParams }: SearchParamsType) => {
  const csp = await searchParams;
  const query = csp?.query || "";
  const currentPage = Number(csp?.page) || 1;
  const getData = await getChapterSearchPagin(query, currentPage);
  if (!getData) {
    return <ErrorPage />;
  }
  const { data, totalPage } = getData;
  return (
    <>
      <Search />
      <div className="my-4 border-y-2 border-primary">
        <ChapterList data={data} />
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination totalPages={totalPage} />
      </div>
    </>
  );
};

export default HomePage;
