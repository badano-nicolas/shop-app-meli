import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import shippingLogo from "../../public/assets/ic_shipping@2x.png";
import { SearchItems, Category } from "../../actions/searchActions";
import Breadcrumb from "../../components/Breadcrumb";

export default function Items({ data }: any) {
  return (
    <div className="">
      <Head>
        <title>Shop app Meli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white-meli text-dark-meli min-h-screen">
        <Header />
        <Breadcrumb categories={data.categories} />
        {data.items.length === 0 ? (
          <div className="container mx-auto bg-white rounded-sm">
            <h3 className="text-2xl text-center flex-grow pt-64">
              No hay publicaciones que coincidan con tu búsqueda.
            </h3>
          </div>
        ) : (
          <>
            <div className="container mx-auto bg-white mb-6 mt-3 p rounded-md">
              {data.items.map((item: any) => (
                <Link key={item.id} href={`/items/${item.id}`}>
                  <div className="flex flex-col border-b cursor-pointer text-dark-meli">
                    <div className="flex flex-row">
                      <div className="mx-4 my-4">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={180}
                          height={180}
                          className="rounded"
                        ></Image>
                      </div>

                      <div className="flex-grow flex flex-col justify-start">
                        <div className="flex flex-row py-8">
                          <div className="text-2xl">
                            {item.price.toLocaleString("es-AR", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 0,
                            })}
                          </div>
                          <div className="flex items-center pl-2">
                            {item.shipping.free_shipping ? (
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

                        <div className="text-lg">{item.title}</div>
                      </div>
                      <div className="hidden md:flex flex-col ml-4 text-xs w-40 text-gray-meli pt-2">
                        {item.address.state_name}
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
  const parsedCategories: string[] = [...categories].map(
    (category: Category) => {
      return category.name;
    }
  );

  const parsedData: SearchItems = {
    author: {
      name: "Nicolas",
      lastname: "Badano",
    },
    categories: parsedCategories.slice(0, 5),
    items: data.results.slice(0, 4),
  };
  return { props: { data: parsedData } };
}

const baseURL: string = "https://api.mercadolibre.com";

const searchItemsByTerm = async (term: string) => {
  const res = await fetch(baseURL + "/sites/MLA/search?q=" + term);
  const data = await res.json();
  return data;
};
