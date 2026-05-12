import { Skeleton } from "@/components/shared/skeleton";

const SkeletonList = () => {
  const data = [...Array(20).keys()];
  return (
    <>
      <div className="my-4 border-y-2 border-primary">
        {data.map((e) => (
          <div key={e} className="flex cursor-pointer items-center justify-start gap-2 border-b py-2 last:border-none">
            <Skeleton className="size-10" />
            <div>
              <Skeleton className="mb-1 h-5 w-96" />
              <Skeleton className="h-3 w-80" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Skeleton className="mb-1 h-8 w-96 rounded" />
      </div>
    </>
  );
};

export default SkeletonList;
