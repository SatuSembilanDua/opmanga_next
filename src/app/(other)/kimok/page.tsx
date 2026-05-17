import ErrorPage from "@/components/shared/error-page";
import KomikCard from "@/components/ui/kimok/komik-card";
import PageTitle from "@/components/ui/kimok/page-title";
import { SkeletonKimok } from "@/components/ui/kimok/skeleton-komik";
import { getAllKomik } from "@/server/komik";
import { Suspense } from "react";

export const generateMetadata = async () => {
  return {
    title: `Kimok`,
  };
};

const KimokPage = () => {
  return (
    <>
      <PageTitle>List Komik</PageTitle>
      <Suspense fallback={<SkeletonKimok />}>
        <KimokMainPage />
      </Suspense>
    </>
  );
};

const KimokMainPage = async () => {
  const data = await getAllKomik();
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pb-10 md:grid-cols-5 md:gap-6">
        <KomikCard data={data} link={`/kimok/`} />
      </div>
    </>
  );
};

export default KimokPage;
