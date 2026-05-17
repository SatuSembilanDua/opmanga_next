import ErrorPage from "@/components/shared/error-page";
import ReaderContent from "@/components/shared/reader-content";
import ReaderNav from "@/components/shared/reader-nav";
import ReaderSkeleton from "@/components/shared/reader-skeleton";
import { getPageData } from "@/server/komik";
import { Suspense } from "react";

type paramsType = Promise<{ slug: string; id: string }>;

export const generateMetadata = async ({ params }: { params: paramsType }) => {
  const { slug, id } = await params;
  const data = await getPageData(slug, id);
  const title = `${data?.Issue.title ?? ""} | ${data?.Komik?.title ?? ""}`;
  return {
    title: `${title}`,
  };
};

const ViewPage = ({ params }: { params: paramsType }) => {
  return (
    <>
      <Suspense fallback={<ReaderSkeleton />}>
        <ViewMainPage params={params} />
      </Suspense>
    </>
  );
};

const ViewMainPage = async ({ params }: { params: paramsType }) => {
  const { slug, id } = await params;
  const getData = await getPageData(slug, id);
  if (!getData) {
    return <ErrorPage />;
  }
  const { Issue, pages } = getData;
  return (
    <>
      <div className="px-2 py-8 md:px-20">
        <h1 className="mb-4 border-b-2 border-primary pb-1 text-2xl">{Issue.title}</h1>
        <ReaderContent data={pages} />
        <ReaderNav data={Issue.nav} list={`/kimok/${slug}`} />
      </div>
    </>
  );
};

export default ViewPage;
