import { cn } from "@/lib/utils";
import { NavChapterType } from "@/server/chapter";
import Link from "next/link";
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold, PiListBulletsBold } from "react-icons/pi";

const ReaderNav = ({ data, list }: { data: NavChapterType; list: string }) => {
  return (
    <div className="sticky bottom-0">
      <div className="grid grid-cols-3">
        <Link
          href={data.prev ?? "#"}
          className={cn(
            "linking flex items-center justify-center gap-2 rounded-l bg-accent-foreground py-2.5 text-accent hover:bg-muted hover:text-accent-foreground",
            !data.prev && "pointer-events-none"
          )}
        >
          <PiCaretDoubleLeftBold />
          <p className="hidden md:block">Chapter Sebelumnya</p>
        </Link>
        <Link
          href={list}
          className="linking flex items-center justify-center gap-2 bg-primary py-2.5 text-primary-foreground hover:bg-muted"
        >
          <p className="hidden md:block">Daftar Chapter</p>
          <PiListBulletsBold className="block md:hidden" />
        </Link>
        <Link
          href={data.next ?? "#"}
          className={cn(
            "linking flex items-center justify-center gap-2 rounded-r bg-accent-foreground py-2.5 text-accent hover:bg-muted hover:text-accent-foreground",
            !data.next && "pointer-events-none"
          )}
        >
          <p className="hidden md:block">Chapter Selanjutnya</p>
          <PiCaretDoubleRightBold />
        </Link>
      </div>
    </div>
  );
};

export default ReaderNav;
