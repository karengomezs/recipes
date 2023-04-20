import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export function Navbar() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="border-b-2 ">
        <div className="max-w-6xl flex justify-between items-center px-4 pt-6 pb-2 mx-auto">
          <h2 className="text-orange-500 text-2xl">
            <Link href="/">KUKS FRESH</Link>
          </h2>
          <ul className="text-stone-600 hidden sm:flex flex-1 justify-center gap-5 border-r-2">
            <li
              className={`${
                router.pathname === "/" ? "border-b-4 border-orange-500" : ""
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <Link href="https://karengomez.netlify.app/" target="_blank">
              <li>Nosotros</li>
            </Link>

            <li>Videos</li>
          </ul>
          <img
            className="rounded-full w-10 ml-4 hidden sm:block"
            src="https://i.pravatar.cc/100"
            alt="avatar"
          />
          <i
            onClick={() => {
              setModal(!modal);
            }}
            className="fa-solid fa-bars sm:hidden text-2xl text-orange-600"
          ></i>
        </div>
      </nav>

      <dialog open={modal} className="w-full h-full fixed top-0 bottom-0 p-0">
        <div className="flex justify-between bg-orange-600 py-8 px-4 items-center text-white">
          <i
            onClick={() => {
              setModal(!modal);
            }}
            className="fa-solid fa-x"
          ></i>
          <p className="text-3xl">Menú</p>
        </div>
        <ul className="text-stone-600 mt-5 flex flex-col gap-5 ml-4 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Nosotros</li>
          <li>Videos</li>
        </ul>
      </dialog>
    </>
  );
}
