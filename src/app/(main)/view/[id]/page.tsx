import ErrorPage from "@/components/shared/error-page";
import ReaderContent from "@/components/shared/reader-content";
import ReaderNav from "@/components/shared/reader-nav";
import ReaderSkeleton from "@/components/shared/reader-skeleton";
import { getChapterPage } from "@/server/chapter";
import { Suspense } from "react";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ParamsType) => {
  const { id } = await params;
  const data = await getChapterPage(id);
  const title = data?.title ?? `Not Found`;
  return {
    title: `${title}`,
  };
};

const ViewPage = ({ params }: ParamsType) => {
  return (
    <>
      <Suspense fallback={<ReaderSkeleton />}>
        <ViewMainPage params={params} />
      </Suspense>
    </>
  );
};

const ViewMainPage = async ({ params }: ParamsType) => {
  const { id } = await params;
  const data = await getChapterPage(id);
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="px-2 py-8 md:px-20">
        <h1 className="mb-4 border-b-2 border-primary pb-1 text-2xl">{data.title}</h1>
        <ReaderContent data={data.pages} />
        <ReaderNav data={data.nav} list="/" />
      </div>
    </>
  );
};

export default ViewPage;
