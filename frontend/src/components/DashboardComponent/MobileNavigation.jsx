import { Link } from "react-router-dom";
import { SideBarIcon } from "../../utils/Constant";
import { useState } from "react";
import { XCircle } from "lucide-react";
import PropTypes from "prop-types";

const MobileNavigation = ({ toggleMobileNav }) => {
  MobileNavigation.propTypes = {
    toggleMobileNav: PropTypes.func.isRequired,
  };

  const location = window.location.pathname;
  const [activeLink, setActiveLink] = useState(location);

  // const location = useLocation()

  const handleLinkClick = (path) => {
    setActiveLink(path);
    toggleMobileNav();
  };

  return (
    <>
      <div className="flex md:hidden h-screen flex-col justify-between border-e bg-white">
        <div className="px-4">
          <button
            onClick={toggleMobileNav}
            className="flex bg-red-600 text-white rounded px-3 py-2 text-sm gap-2 ml-auto"
          >
            close
            <XCircle />
          </button>
          <ul className="mt-6 space-y-1">
            {SideBarIcon.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex gap-4 rounded-lg items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary/95  ${
                      activeLink === item.path ? "text-primary" : ""
                    }`}
                    onClick={() => handleLinkClick(item.path)}
                  >
                    <item.icon />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
