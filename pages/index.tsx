import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Shop app Meli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white-meli min-h-screen">
        <Header />
      </main>
    </div>
  );
};

export default Home;
