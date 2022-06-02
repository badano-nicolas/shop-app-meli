import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

export default function Items({ data, searchTerm }: any) {
  console.log("perro ", data);
  console.log("first th ", data[0].thumbnail);
  return (
    <div>
      <Head>
        <title>Shop app Meli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        {data.length === 0 ? (
          <h4 className="text-2xl text-center flex-grow pt-64">
            No encontramos resultados para la busqueda{" "}
            <strong>{searchTerm}</strong>
          </h4>
        ) : (
          <>
            <div className="container mx-auto bg-white mb-6 rounded-sm">
              {data.map((item: any) => (
                <Link key={item.id} href={`/items/${item.id}`}>
                  <div className="flex flex-col border-b p-4 my-4 cursor-pointer">
                    <div className="flex flex-row">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={160}
                        height={160}
                        className="rounded mr-4 w-40"
                      ></Image>
                      <div className="info flex-grow  flex flex-col justify-center">
                        <div className="text-xl font-medium">
                          <div className="flex flex-row font-semibold text-2x1">
                            <div className="pt-1 ml-1 text-lg">
                              {item.price}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">{item.title}</div>
                      </div>
                      <div className="hidden md:flex location flex-col justify-center ml-4 text-sm w-32">
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
  return { props: { data: data.results.slice(0, 4), searchTerm: query } };
}

const baseURL: string = "https://api.mercadolibre.com";

const searchItemsByTerm = async (term: string) => {
  const res = await fetch(baseURL + "/sites/MLA/search?q=" + term);
  const data = await res.json();
  return data;
};
