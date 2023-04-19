export function Navbar() {
  return (
    <nav className="border-b-2 ">
      <div className="max-w-6xl flex justify-between items-center px-20 pt-6 pb-2 mx-auto">
        <h2 className="text-orange-500 text-2xl">KUKS FRESH</h2>
        <ul className="text-stone-600 flex flex-1 justify-center gap-5 border-r-2">
          <li>Home</li>
          <li>Nosotros</li>
          <li>Videos</li>
        </ul>
        <img
          className="rounded-full w-10 ml-4"
          src="https://i.pravatar.cc/100"
          alt="avatar"
        />
      </div>
    </nav>
  );
}