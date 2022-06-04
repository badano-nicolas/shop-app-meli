import Head from "next/head";
import { SearchItem } from "../../actions/searchActions";
import Header from "../../components/Header";

export default function ItemsDetail({ data }: any) {
  console.log(data);
  return (
    <div>
      <Head>
        <title>Shop app Meli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white-meli">
        <Header />
        <div className="container mx-auto bg-white mb-6 mt-3 rounded-md p-6"></div>
      </main>
    </div>
  );
}

export async function getServerSideProps(con: any) {
  const itemId = con.query.id;
  const data = await getItemDataById(itemId);
  const descriptionData = await getItemDescriptionById(itemId);

  const {
    id,
    title,
    price,
    pictures,
    condition,
    shipping: { free_shipping },
    sold_quantity,
    currency_id,
  } = data;

  const { plain_text } = descriptionData;

  const parsedData: SearchItem = {
    author: {
      name: "Nicolas",
      lastname: "Badano",
    },
    item: {
      id: id,
      title: title,
      price: {
        currency: currency_id,
        amount: price,
        decimals: 2,
      },
      picture: pictures[0].url,
      condition: condition,
      free_shipping: free_shipping,
      sold_quantity: sold_quantity,
      description: plain_text,
    },
  };

  return { props: { data: parsedData } };
}

const baseURL: string = "https://api.mercadolibre.com";

const getItemDataById = async (id: string) => {
  const res = await fetch(baseURL + "/items/" + id);
  const data = await res.json();
  return data;
};

const getItemDescriptionById = async (id: string) => {
  const res = await fetch(baseURL + "/items/" + id + "/description");
  const data = await res.json();
  return data;
};
