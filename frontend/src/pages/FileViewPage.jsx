import { useParams } from "react-router-dom";
import FileItem from "../components/FileViewComponent/FileItem";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/Constant";
import Loading from "../assets/loading.gif";

function FileViewPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState();
  const [privateVisible, setPrivateVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/file/check-visibility/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Update the state with the fetched data

        console.log(data);
        setVisible(data.visibility);
        if (data.visibility === "private") {
          setPrivateVisible(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="p-5 bg-gray-200 h-screen w-full flex justify-center items-center flex-col gap-4">
      {loading ? (
        <img src={Loading} alt="loading" />
      ) : (
        <>
          {privateVisible ? (
            <div className="p-5 bg-gray-200 h-screen w-full flex justify-center items-center flex-col gap-4">
              <p className="text-3xl font-bold text-center">
                This file is private.
              </p>
              <p className="text-xl font-semibold text-center">
                Please contact the owner of this file.
              </p>
            </div>
          ) : (
            <FileItem file={id} visibility={visible} />
          )}
        </>
      )}
    </div>
  );
}

export default FileViewPage;
