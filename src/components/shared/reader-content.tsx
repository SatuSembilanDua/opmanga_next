import { PageType } from "@/server/chapter";
import LazyImage from "./lazy-image";

const ReaderContent = ({ data }: { data: Array<PageType> }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {data.map((e, i) => (
          <LazyImage
            src={e.img}
            key={i}
            alt={e.id}
            className="w-full md:w-1/2"
            width={2000}
            height={1000}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg=="
          />
        ))}
      </div>
    </>
  );
};

export default ReaderContent;
