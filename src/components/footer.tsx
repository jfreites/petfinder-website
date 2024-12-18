import Link from "next/link";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-slate-950">
      <p className="flex flex-row text-xs text-gray-200 dark:text-gray-400">
        © 2024 PetFinder. Creado con ❤️ por{" "}
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="https://github.com/jfreites"
          target="_blank"
        >
          Jonathan Freites
        </Link>
        . Este proyecto es de código abierto, si quieres colaborar puedes ir al
        repo{" "}
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="https://github.com/jfreites/petfinder-website"
          target="_blank"
        >
          <Github className="w-4 h-4 ml-2" />
        </Link>
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-gray-200">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Términos de uso
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacidad
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
