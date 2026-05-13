import { IssueType, KomikType } from "@/server/komik";
import KomikCard from "./komik-card";
import Link from "next/link";
import { PiHashBold } from "react-icons/pi";
import { formatDateToLocal } from "@/lib/utils";

const IssuePage = ({ komik, data }: { komik: KomikType; data: Array<IssueType> }) => {
  if (["K0001", "K0017", "K0018", "K0019"].includes(komik.id)) {
    const link = `/kimok/${komik.slug}/view/`;
    return (
      <>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
          <KomikCard data={data} link={link} />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="border-dialect my-4 border-y-2">
        {data.map((e) => (
          <Link
            key={e.id}
            href={`/kimok/${komik.slug}/view/${e.id}`}
            className="linking block border-b last:border-none"
          >
            <div className="flex items-center justify-start gap-2 py-1 hover:bg-muted focus:bg-muted active:bg-muted">
              <PiHashBold size={32} className="text-muted-foreground" />
              <div>
                <h2 className="text-base font-medium text-foreground">{e.title}</h2>
                <p className="text-sm text-muted-foreground">{formatDateToLocal(e.date)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default IssuePage;
