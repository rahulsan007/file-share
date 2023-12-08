import { CircleUserRound, Menu } from "lucide-react";
import PropTypes from "prop-types";

function TopSidebar({ toggleMobileNav, toggleAccountNav }) {
  TopSidebar.propTypes = {
    toggleMobileNav: PropTypes.func.isRequired,
    toggleAccountNav: PropTypes.func.isRequired,
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="block md:hidden">
              <button
                onClick={toggleMobileNav}
                className="rounded bg-gray-100 p-2 text-primary transition hover:text-primary/75"
              >
                <Menu />
              </button>
            </div>
            <div className="text-primary ml-auto ">
              {/*  */}
              <button onClick={toggleAccountNav}>
                <CircleUserRound />
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </header>
    </div>
  );
}

export default TopSidebar;
