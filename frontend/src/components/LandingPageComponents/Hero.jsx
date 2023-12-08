import { Link } from "react-router-dom";
import { TEXTS } from "../../utils/Constant";

const Hero = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-28 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              It just simply.
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                Upload,Save,Share...{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">{TEXTS.desc}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/75 focus:outline-none focus:ring active:bg-primary/75 sm:w-auto"
                to="/sign-in"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
