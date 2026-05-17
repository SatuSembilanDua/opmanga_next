import ErrorPage from "@/components/shared/error-page";
import Pagination from "@/components/shared/pagination";
import Search from "@/components/shared/search";
import IssuePage from "@/components/ui/kimok/issue-page";
import PageTitle from "@/components/ui/kimok/page-title";
import { SkeletonIssue } from "@/components/ui/kimok/skeleton-komik";
import { getKomikBySlug, getKomikSearchPagin } from "@/server/komik";
import { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

type paramsType = Promise<{ slug: string }>;

type ChapterPagePropsType = {
  params: paramsType;
  searchParams: Promise<SearchParams | undefined> | SearchParams | undefined;
};

export const generateMetadata = async ({ params }: { params: paramsType }) => {
  const { slug } = await params;
  const data = await getKomikBySlug(slug);
  const title = data?.title ?? `Not Found`;
  return {
    title: `${title}`,
  };
};

const ChapterPage = ({ params, searchParams }: ChapterPagePropsType) => {
  return (
    <>
      <Suspense fallback={<SkeletonIssue />}>
        <ChapterMainPage params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
};

const ChapterMainPage = async ({ params, searchParams }: ChapterPagePropsType) => {
  const { slug } = await params;
  const csp = await searchParams;
  const query = csp?.query || "";
  const currentPage = Number(csp?.page) || 1;
  const getData = await getKomikSearchPagin(slug, query, currentPage);
  if (!getData) {
    return <ErrorPage />;
  }
  const { komik, totalPage, issue } = getData;
  return (
    <>
      <div className="my-4 flex flex-col items-start justify-start md:mb-0 md:flex-row md:items-center md:justify-between">
        <PageTitle>{komik.title}</PageTitle>
        <div>
          <Search />
        </div>
      </div>
      <IssuePage komik={komik} data={issue} />
      <div className="mt-4 mb-20 flex justify-center">{totalPage > 1 && <Pagination totalPages={totalPage} />}</div>
    </>
  );
};

export default ChapterPage;
