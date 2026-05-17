import { Skeleton } from "@/components/shared/skeleton";
import PageTitle from "./page-title";

export const SkeletonKomik = () => {
  const data = [...Array(12).keys()];
  return (
    <>
      {data.map((e) => (
        <div key={e} className="group">
          <Skeleton className="h-[40vw] w-full rounded-xl md:h-[20vw]" />
          <Skeleton className="mt-3 h-6 w-full" />
        </div>
      ))}
    </>
  );
};

export const SkeletonIssue = () => {
  return (
    <>
      <div className="my-4 flex flex-col items-start justify-start md:mb-0 md:flex-row md:items-center md:justify-between">
        <PageTitle>
          <Skeleton className="mb-1 h-5 w-96" />
        </PageTitle>
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
        <SkeletonKomik />
      </div>
      <div className="mt-4 mb-20 flex justify-center">
        <Skeleton className="h-8 w-80" />
      </div>
    </>
  );
};

export const SkeletonKimok = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pb-10 md:grid-cols-5 md:gap-6">
        <SkeletonKomik />
      </div>
    </>
  );
};
