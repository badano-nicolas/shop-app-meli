import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mercado Libre - Envios Gratis en el día</title>
        <meta
          name="description"
          content={`Comrprá productos con Envio Gratis en el día en Mercado Libre. Encuentre miles de marcas y prodcutos a precios increíbles.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white-meli min-h-screen">
        <Header />
      </main>
    </div>
  );
};

export default Home;
