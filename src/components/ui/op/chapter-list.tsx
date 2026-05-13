import { formatDateToLocal } from "@/lib/utils";
import { ChapterType } from "@/server/chapter";
import Link from "next/link";
import { PiHashBold } from "react-icons/pi";

const ChapterList = ({ data }: { data: Array<ChapterType> }) => {
  return (
    <>
      {data.map((e) => (
        <Link key={e.id} href={`/view/${e.id}`} className="linking block border-b last:border-none">
          <div className="flex items-center justify-start gap-2 py-1 hover:bg-muted focus:bg-muted active:bg-muted">
            <PiHashBold size={32} className="text-muted-foreground" />
            <div>
              <h2 className="text-base font-medium text-foreground">{e.title}</h2>
              <p className="text-sm text-muted-foreground">{formatDateToLocal(e.date)}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ChapterList;
