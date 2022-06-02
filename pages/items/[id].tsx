import Head from "next/head";
import Header from "../../components/Header";

export default function ItemsDetail({ data }: any) {
  console.log("item ", data);
  return (
    <div>
      <Head>
        <title>Shop app Meli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="container mx-auto bg-white mb-6 mt-3 rounded-md p-6">
          <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(con: any) {
  const id = con.query.id;
  const data = await searchItemsById(id);
  return { props: { data: data } };
}

const baseURL: string = "https://api.mercadolibre.com";

const searchItemsById = async (id: string) => {
  const res = await fetch(baseURL + "/items/" + id);
  const data = await res.json();
  return data;
};
