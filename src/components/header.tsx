import { PawPrint } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <PawPrint className="h-8 w-8 text-primary" />
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
