import { ArrowLeftCircle, Paperclip } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { baseUrl } from "../utils/Constant";
// import { useLocation } from "react-router-dom";

function FilePreviewPage() {
  // const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("PRIVATE");
  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/file/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Update the state with the fetched data
        setFileData(data);
        console.log(data);
        setActiveButton(data.visibility);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(completeUrl);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
    }
  };

  const handleButtonClick = async (buttonType) => {
    setIsLoading(true);
    setActiveButton(buttonType);
    try {
      const response = await fetch(
        `${baseUrl}/api/file/update-visibility/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visibility: buttonType }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();

      // Update the state with the fetched data
      setActiveButton(data.visibility);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
      setActiveButton(buttonType);
      // Set loading state to false after request completes
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/file/update-visibility/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      // const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
      setActiveButton("PASSWORD_PROTECTED");
      // Set loading state to false after request completes
      window.location.reload();
    }
  };

  const completeUrl = `${window.location.origin}/f/${id}`;

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/file/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("File Deleted");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
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
                  <p className="text-lg font-semibold">{fileData.filename}</p>
                  <p className="text-xs text-gray-500">{fileData.visibility}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-500 text-white font-semibold rounded-full"
                >
                  Delete File
                </button>
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
                    name="shortURL"
                    readOnly
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
              {!isLoading && (
                <>
                  <div className="w-full">
                    <div className="flex justify-between rounded-lg border border-gray-100 bg-gray-100 p-1">
                      <button
                        className={`inline-block rounded-md px-4 py-2 text-sm ${
                          activeButton === "PRIVATE"
                            ? "text-blue-500 bg-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => handleButtonClick("PRIVATE")}
                      >
                        Private
                      </button>

                      <button
                        className={`inline-block rounded-md px-4 py-2 text-sm ${
                          activeButton === "PUBLIC"
                            ? "text-blue-500 bg-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => handleButtonClick("PUBLIC")}
                      >
                        Public
                      </button>

                      <button
                        className={`inline-block rounded-md px-4 py-2 text-sm ${
                          activeButton === "PASSWORD_PROTECTED"
                            ? "text-blue-500 bg-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => handleButtonClick("PASSWORD_PROTECTED")}
                      >
                        Password
                      </button>
                    </div>
                  </div>
                  <div>
                    {activeButton === "PRIVATE" && (
                      <div className="mt-5">
                        <p className="text-gray-500 text-sm">
                          Only people with the link can access this file
                        </p>
                      </div>
                    )}
                    {activeButton === "PUBLIC" && (
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
                    {activeButton === "PASSWORD_PROTECTED" && (
                      <div className="mt-5">
                        <p className="text-gray-500 text-sm">
                          Only people with the password can access this file
                        </p>
                        {/* //password */}

                        <div className="mt-4">
                          <form onSubmit={handleSubmitPassword}>
                            {fileData.password &&
                            fileData.visibility === "PASSWORD_PROTECTED" ? (
                              <div className="flex items-center gap-4 p-4 border shadow-sm rounded-md mb-1">
                                <p className="block text-base font-medium text-gray-700">
                                  Current Password
                                </p>
                                <p className="text-sm text-gray-500">
                                  {fileData.password}
                                </p>
                              </div>
                            ) : (
                              <p>Loading...</p>
                            )}
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
                              onChange={handleChange}
                              value={formData.password}
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
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {isLoading && (
                <div className="mt-5">
                  <p>Loading...</p>
                </div>
              )}
            </section>
          </section>
        </section>
      </div>
    </>
  );
}

export default FilePreviewPage;
