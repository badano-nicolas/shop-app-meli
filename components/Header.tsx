import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import logo from "../public/assets/Logo_ML.png";
import searchIcon from "../public/assets/ic_Search.png";

function Header() {
  const inputRef: any = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      router.push(`/items?search=${inputRef.current.value}`);
    },
    [router]
  );

  return (
    <header className="p-4 bg-yellow-meli">
      <div className="mx-auto container flex flex-row justify-between">
        <Image src={logo.src} alt="Mercado Libre Logo" width={50} height={10} />

        <div className="flex flex-col justify-center align-center flex-grow ml-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between rounded-sm py-2 px-4 w-full appearance-none leading-normal bg-white">
              <input
                ref={inputRef}
                placeholder="Nunca dejes de buscar"
                type="text"
                defaultValue={searchTerm}
                className="focus:outline-none flex-grow bg-white"
              />
              <button
                type="submit"
                className="focus:outline-none border-l pl-3"
              >
                <Image
                  src={searchIcon.src}
                  alt="Search icon"
                  width={15}
                  height={15}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
