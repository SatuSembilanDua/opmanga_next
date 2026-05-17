import ErrorPage from "@/components/shared/error-page";
import ReaderContent from "@/components/shared/reader-content";
import ReaderNav from "@/components/shared/reader-nav";
import ReaderSkeleton from "@/components/shared/reader-skeleton";
import { getMangaPage } from "@/server/manga";
import { Suspense } from "react";

type paramsType = Promise<{ slug: string; id: string }>;

export const generateMetadata = async ({ params }: { params: paramsType }) => {
  const { id } = await params;
  const data = await getMangaPage(id);
  const title = `${data?.group ?? ""} | ${data?.title ?? ""}`;
  return {
    title: `${title}`,
  };
};

const ViewMangaPage = ({ params }: { params: paramsType }) => {
  return (
    <>
      <Suspense fallback={<ReaderSkeleton />}>
        <ViewMangaMainPage params={params} />
      </Suspense>
    </>
  );
};

const ViewMangaMainPage = async ({ params }: { params: paramsType }) => {
  const { id } = await params;
  const data = await getMangaPage(id);
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="px-2 py-8 md:px-20">
        <h1 className="mb-4 border-b-2 border-primary pb-1 text-2xl">{data.title}</h1>
        <ReaderContent data={data.pages} />
        <ReaderNav data={data.nav} list={`/manga/`} />
      </div>
    </>
  );
};

export default ViewMangaPage;
