import { Link } from "react-router-dom";
import { LogOut, Mail, User, XCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/Constant";
import Cookie from "js-cookie";

const Account = ({ toggleAccountNav }) => {
  Account.propTypes = {
    toggleAccountNav: PropTypes.func.isRequired,
  };

  const [account, setAccount] = useState({});

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/user/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAccount();
  });

  const handleSignOut = async () => {
    Cookie.remove("token");
    window.location.reload();
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-between border-e bg-white">
        <div className="px-4">
          <button
            onClick={toggleAccountNav}
            className="flex bg-red-600 text-white rounded px-3 py-2 text-sm gap-2 ml-auto"
          >
            close
            <XCircle />
          </button>
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                className={`flex gap-4 rounded-lg items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary/95 
                    }`}
              >
                <Mail />
                {account.email}
              </Link>
            </li>
            <li>
              <Link
                className={`flex gap-4 rounded-lg items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary/95 
                    }`}
              >
                <User />
                {account.username}
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className={`flex gap-4 rounded-lg items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary/95 
                    }`}
              >
                <LogOut />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Account;
