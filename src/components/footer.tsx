import Link from "next/link";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-slate-950">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mx-auto">
        <div className="flex text-xs text-gray-200 dark:text-gray-400">
          <span>
            © 2024 PetFinder. Creado con ❤️ por{" "}
            <Link
              className="text-xs hover:underline underline-offset-4 ml-1"
              href="https://github.com/jfreites"
              target="_blank"
            >
              Jonathan Freites
            </Link>
            .
          </span>
        </div>
        <div className="flex text-xs text-gray-200 dark:text-gray-400">
          <span>
            Este proyecto es de código abierto, puedes ir al repo {" "}
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="https://github.com/jfreites/petfinder-website"
              target="_blank"
            >
             <Github className="w-4 h-4 inline" />
            </Link>
          </span>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-gray-200 text-center">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Enlaces de interés
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Nuestros aliados
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de uso
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
    </div>
      {/* <p className="flex flex-row text-xs text-gray-200 dark:text-gray-400">
        © 2024 PetFinder. Creado con ❤️ por{" "}
        <Link
          className="text-xs hover:underline underline-offset-4 ml-1"
          href="https://github.com/jfreites"
          target="_blank"
        >
          Jonathan Freites
        </Link>
        . Este proyecto es de código abierto, si quieres colaborar puedes ir al repo{" "}
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
          Enlaces de interés
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Nuestros aliados
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Términos de uso
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacidad
        </Link>
      </nav> */}
    </footer>
  );
};

export default Footer;
