import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import shippingLogo from "../../public/assets/ic_shipping@2x.png";
import { SearchItems, Category, Item } from "../../actions/searchActions";
import Breadcrumb from "../../components/Breadcrumb";
import PriceInfo from "../../components/PriceInfo";

type ItemsProps = {
  data: SearchItems;
  search: string;
};

export default function Items({ data, search }: ItemsProps) {
  const items: Item[] = data.items;
  return (
    <div className="">
      <Head>
        <title>{search} | Mercado Libre Argentina</title>
        <meta
          name="description"
          content={`Comrprá ${search} en cutas sin interés! Conocé nuestras increíbles ofertas y promociones en millones de productos.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white-meli text-dark-meli min-h-screen pb-8">
        <Header query={search} />
        <Breadcrumb categories={data.categories} />
        {items.length === 0 ? (
          <div className="container mx-auto bg-white rounded-sm">
            <h3 className="text-2xl text-center flex-grow pt-64">
              No hay publicaciones que coincidan con tu búsqueda.
            </h3>
          </div>
        ) : (
          <>
            <div className="container mx-auto bg-white rounded-sm">
              {items.map((item: Item) => (
                <Link key={item.id} href={`/items/${item.id}`}>
                  <div className="flex flex-col border-b cursor-pointer text-dark-meli">
                    <div className="flex flex-row">
                      <div className="mx-4 my-4">
                        <Image
                          src={item.picture}
                          alt={item.title}
                          width={180}
                          height={180}
                          layout="fixed"
                          className="rounded"
                        ></Image>
                      </div>

                      <div className="flex-grow flex flex-col justify-start">
                        <div className="flex flex-row pt-8 pb-4">
                          <div className="text-2xl">
                            <PriceInfo price={item.price} />
                          </div>
                          <div className="flex items-center pl-2">
                            {item.free_shipping ? (
                              <Image
                                src={shippingLogo.src}
                                alt="Envio Gratis"
                                width={18}
                                height={18}
                              />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>

                        <div className="text-lg max-w-sm md:max-w-xs">
                          <p className="text-ellipsis">{item.title}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex text-xs w-48 text-gray-meli pt-2">
                        <p className="pt-12"> {item.address}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(con: any) {
  const query = con.query.search;
  const data = await searchItemsByTerm(query);

  const categories = data.available_filters[0].values;
  categories.sort((firstCategory: any, secondCategory: any) => {
    return secondCategory.results - firstCategory.results;
  });
  const parsedCategories: string[] = [...categories].map(
    (category: Category) => {
      return category.name;
    }
  );
  const items = data.results.slice(0, 4);

  const parsedItems: Item[] = [...items].map((item: Item) => {
    return parseItem(item);
  });

  const parsedData: SearchItems = {
    author: {
      name: "Nicolas",
      lastname: "Badano",
    },
    // Get the list of categories ordered by results, obtain the first 5, and then reverse the list to change the order
    categories: parsedCategories.slice(0, 5).reverse(),
    items: parsedItems,
  };
  return { props: { data: parsedData, search: query } };
}

const baseURL: string = "https://api.mercadolibre.com";

const searchItemsByTerm = async (term: string) => {
  const res = await fetch(baseURL + "/sites/MLA/search?q=" + term);
  const data = await res.json();
  return data;
};

const parseItem = (item: any) => {
  const {
    id,
    title,
    price,
    thumbnail,
    condition,
    shipping: { free_shipping },
    currency_id,
    address,
  } = item;

  return {
    id: id,
    title: title,
    price: {
      currency: currency_id,
      amount: price,
      decimals: 0,
    },
    picture: thumbnail,
    condition: condition,
    address: address.state_name,
    free_shipping: free_shipping,
  };
};
