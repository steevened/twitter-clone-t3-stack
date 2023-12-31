import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import SideNav from "~/components/SideNav";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Twitter T3</title>
        <meta
          name="description"
          content="Twitter clone made with t3 stack - @steevened"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex items-start">
        <SideNav />
        <main className="min-h-screen flex-grow border-x border-white/20">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
