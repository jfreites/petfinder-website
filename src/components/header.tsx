import Link from "next/link";
import Image from "next/image";
import { AlignRight, AlignJustify } from "lucide-react";
import logo from "../../public/logo-temp.png";

const Header = () => {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
        <Link className="flex items-center justify-center" href="/">
          <Image src={logo.src} alt="Pet Finder" width={32} height={32} />{" "}
          <span className="text-2xl font-semibold text-primary ml-4">
            Pet<span className="text-gray-800">Finder</span>
          </span>
          <span className="sr-only">Pet Finder</span>
        </Link>
        <nav className="hidden ml-auto md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/how-works"
          >
            ¿Cómo funciona?
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pet-list"
          >
            Reportar una mascota
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contacto
          </Link>
        </nav>
        <div className="flex md:hidden items-center ml-auto gap-4">
          <AlignRight size={24} />
        </div>
      </header>
      <div className="flex md:hidden p-4">
        <ul className="w-full">
          <li>¿Cómo funciona?</li>
          <li>Reportar una mascota</li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
    </>
  );
};

export default Header;
