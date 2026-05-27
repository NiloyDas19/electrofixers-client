import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} ElectroFixers. All rights reserved.
        </p>
        <nav className="flex items-center gap-5">
          <Link
            to="/"
            className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/all-services"
            className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Services
          </Link>
          <a
            href="#"
            className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
