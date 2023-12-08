import { ArrowLeftCircle, Paperclip } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useState } from "react";
// import { useLocation } from "react-router-dom";

function FilePreviewPage() {
  // const location = useLocation();
  const [activeButton, setActiveButton] = useState("private");
  const { id } = useParams();

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(completeUrl);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
    }
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    // Additional logic you may want to perform on button click
  };

  const completeUrl = `${window.location.origin}/f/${id}`;
  return (
    <>
      <div className="p-10">
        <section>
          <div>
            <Link to={"/dashboard"}>
              <button className="flex font-semibold text-lg items-center  gap-4 bg-slate-200 rounded-xl px-5 py-2">
                <ArrowLeftCircle />
                Go to Files
              </button>
            </Link>
          </div>
          <section className="flex justify-center flex-col w-full sm:flex-row ">
            <section className="w-full md:w-1/2 ">
              <div className="p-5 flex gap-4 items-center bg-blue-100 m-3 rounded-lg  border-2 border-dotted border-blue-500  ">
                <Paperclip />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Profile picture</p>
                  <p className="text-xs text-gray-500">Image/2 MB</p>
                </div>
              </div>
            </section>

            <section className="flex gap-4 flex-col justify-start p-5 w-full md:w-1/2">
              <div className="w-full">
                <label
                  htmlFor="ShortURL"
                  className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <span className="text-xs font-medium text-gray-700">
                    {" "}
                    Short URL{" "}
                  </span>

                  <input
                    type="text"
                    id="shortURL"
                    value={completeUrl}
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
              <div className="w-full">
                <div className="flex justify-between rounded-lg border border-gray-100 bg-gray-100 p-1">
                  <button
                    className={`inline-block rounded-md px-4 py-2 text-sm ${
                      activeButton === "private"
                        ? "text-blue-500 bg-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleButtonClick("private")}
                  >
                    Private
                  </button>

                  <button
                    className={`inline-block rounded-md px-4 py-2 text-sm ${
                      activeButton === "public"
                        ? "text-blue-500 bg-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleButtonClick("public")}
                  >
                    Public
                  </button>

                  <button
                    className={`inline-block rounded-md px-4 py-2 text-sm ${
                      activeButton === "password"
                        ? "text-blue-500 bg-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleButtonClick("password")}
                  >
                    Password
                  </button>
                </div>
              </div>
              <div>
                {activeButton === "private" && (
                  <div className="mt-5">
                    <p className="text-gray-500 text-sm">
                      Only people with the link can access this file
                    </p>
                  </div>
                )}
                {activeButton === "public" && (
                  <div className="mt-5">
                    <p className="text-gray-500 text-sm">
                      Anyone on the internet can access this file
                    </p>
                    <button
                      className="mt-2 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/75 focus:outline-none focus:ring focus:border-blue-300"
                      onClick={copyToClipboard}
                    >
                      {isCopied ? "Link Copied" : "Copy Link"}
                    </button>
                  </div>
                )}
                {activeButton === "password" && (
                  <div className="mt-5">
                    <p className="text-gray-500 text-sm">
                      Only people with the password can access this file
                    </p>
                    {/* //password */}

                    <div className="mt-4">
                      <label
                        htmlFor="Password"
                        className="block text-base font-medium text-gray-700"
                      >
                        {" "}
                        Password{" "}
                      </label>

                      <input
                        type="password"
                        id="Password"
                        name="password"
                        placeholder="Enter password"
                        className="mt-1 w-full rounded-md border-gray-200  p-4 shadow-sm sm:text-sm"
                      />
                      <button
                        type="sumit"
                        className="bg-primary py-2 px-4 rounded-md w-full text-white mt-2"
                      >
                        Save
                      </button>

                      <button
                        className="mt-2 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/75 focus:outline-none focus:ring focus:border-blue-300"
                        onClick={copyToClipboard}
                      >
                        {isCopied ? "Link Copied" : "Copy Link"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
        </section>
      </div>
    </>
  );
}

export default FilePreviewPage;
