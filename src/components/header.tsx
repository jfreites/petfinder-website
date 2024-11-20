import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo-temp.png";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
      <Link className="flex items-center justify-center" href="/">
        <Image src={logo.src} alt="Pet Finder" width={32} height={32} />
        <span className="sr-only">Pet Finder</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#report"
        >
          Reportar
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#catalog"
        >
          Catálogo
        </Link>
      </nav>
    </header>
  );
};

export default Header;
