"use client";
import { LogoHead } from "@/components/shared/app-logo";

const LoginPage = () => {
  const email = "";
  const password = "";
  const error = null;
  const handleSubmit = () => {};
  const setEmail = (v: string) => {
    console.log(v);
  };
  const setPassword = (v: string) => {
    console.log(v);
  };
  return (
    <>
      <div className="bg-primary">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="mb-6 flex items-center">
            <LogoHead />
          </div>
          <div className="w-full rounded bg-card shadow sm:max-w-md md:mt-0 xl:p-0 dark:border">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h2 className="text-xl leading-tight font-bold tracking-tight text-card-foreground md:text-2xl">
                Sign in to your account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-card-foreground">
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="w-full rounded-sm border p-2 text-sm outline-2"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-card-foreground">
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    autoComplete="on"
                    className="w-full rounded-sm border p-2 text-sm outline-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-destructive">{error}</div>}
                <button
                  type="submit"
                  className="focus:ring-primary-300 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-secondary focus:ring-4 focus:outline-none"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
