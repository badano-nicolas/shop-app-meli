import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import shippingLogo from "../../public/assets/ic_shipping@2x.png";

export default function Items({ data }: any) {
  console.log(data[0]);

  return (
    <div>
      <Head>
        <title>Shop app Meli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white-meli">
        <Header />
        {data.length === 0 ? (
          <div className="container mx-auto bg-white rounded-sm">
            {" "}
            <h3 className="text-2xl text-center flex-grow pt-64">
              No hay publicaciones que coincidan con tu búsqueda.
            </h3>
          </div>
        ) : (
          <>
            <div className="container mx-auto bg-white">
              {data.map((item: any) => (
                <Link key={item.id} href={`/items/${item.id}`}>
                  <div className="flex flex-col border-b p-4 my-4 cursor-pointer text-dark-meli">
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

                      <div className="info flex-grow flex flex-col justify-start">
                        <div className="flex flex-row">
                          <div className="text-2xl">$ {item.price}</div>
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

                        <div className="mt-2">{item.title}</div>
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
  return { props: { data: data.results.slice(0, 4) } };
}

const baseURL: string = "https://api.mercadolibre.com";

const searchItemsByTerm = async (term: string) => {
  const res = await fetch(baseURL + "/sites/MLA/search?q=" + term);
  const data = await res.json();
  return data;
};
