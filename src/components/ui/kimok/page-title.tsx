const PageTitle = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <h1 className="my-5 border-l-4 border-primary pl-5 text-xl">{children}</h1>
    </>
  );
};

export default PageTitle;
