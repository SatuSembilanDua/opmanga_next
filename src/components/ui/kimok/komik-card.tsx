import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PiBookOpenTextDuotone, PiNotebookFill } from "react-icons/pi";

type propsType = {
  date: string;
  id: string;
  title: string;
  slug?: string;
  poster?: string;
  thumb?: string;
  Group?: {
    name: string;
  } | null;
};

const KomikCard = ({ data, link }: { data: Array<propsType> | null; link: string }) => {
  if (data === null) {
    return <></>;
  }
  return (
    <>
      {data.map((e, i) => (
        <Card data={e} key={i} link={link} />
      ))}
    </>
  );
};

const Card = ({ data, link }: { data: propsType; link: string }) => {
  const imgsrc = data.poster ? data.poster : data.thumb ? data.thumb : "";
  const linkhref = data.slug ? data.slug : data.id;
  return (
    <>
      <div className="linking group">
        <div className="relative h-[40vw] overflow-hidden rounded md:h-[20vw]">
          <Link href={`${link}${linkhref}`}>
            <Image
              src={imgsrc}
              width={226}
              height={296}
              quality={75}
              alt={data.id}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg=="
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
            />
            <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-black/50 text-white transition-all duration-1000 ease-in-out group-hover:flex">
              <PiBookOpenTextDuotone size={56} />
            </div>
            {data.Group?.name && data.Group?.name != "Other" && (
              <div className="absolute top-0 left-0 bg-primary px-2 py-1 text-xs text-white">{data.Group.name}</div>
            )}
          </Link>
        </div>
        <div className="mt-1 flex items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap text-primary">
          {data.Group ? (
            ""
          ) : (
            <div className="mr-1">
              <PiNotebookFill size={20} />
            </div>
          )}
          <div>
            <Link href={`${link}${linkhref}`} aria-label={data.title}>
              <p className="text-md text-foreground md:text-lg">{data.title}</p>
              {data.Group && <span className="text-muted-foreground">{formatDateToLocal(data.date)}</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default KomikCard;
