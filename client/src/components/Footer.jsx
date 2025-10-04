import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img alt="QuickShow Logo" className="h-11" src={assets.logo} />
          <p className="mt-6 text-sm">
            QuickShow is your one-stop destination for booking movie tickets,
            discovering the latest releases, and exploring theaters near you.
            Enjoy a seamless and fast movie booking experience, exclusive
            offers, and more!
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="Get it on Google Play"
              className="h-9 w-auto"
            />
            <img
              src={assets.appStore}
              alt="Download on the App Store"
              className="h-9 w-auto"
            />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Quick Links</h2>

            <ul className="text-sm space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Link to="/theaters">Theaters</Link>
              </li>
              <li>
                <Link to="/favourite">Favourites</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Contact Us</h2>
            <div className="text-sm space-y-2">
              <p>
                Support:{" "}
                <a href="mailto:support@quickshow.com" className="underline">
                  support@quickshow.com
                </a>
              </p>
              <p>
                Business:{" "}
                <a href="mailto:business@quickshow.com" className="underline">
                  business@quickshow.com
                </a>
              </p>
              <p>Phone: +1-800-123-4567</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        &copy; {new Date().getFullYear()} QuickShow. Made with ❤️ by{" "}
        <a
          href="https://github.com/Itssanthoshhere"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Itssanthoshhere
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
