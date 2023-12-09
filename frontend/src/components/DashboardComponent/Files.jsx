import { useEffect, useState } from "react";
import FileTable from "./FileTable";
import { baseUrl } from "../../utils/Constant";

const Files = () => {
  const [tableCount, setTableCount] = useState(0);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the server endpoint using fetch
        const response = await fetch(`${baseUrl}/api/file/all`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if the response is successful (status code 200)
        if (response.ok) {
          // Parse the response JSON
          const data = await response.json();

          // Update the state with the fetched data
          setFileData(data);
          console.log(data);
        } else {
          // Handle errors, e.g., setFileData([]) or display an error message
          console.error(`Failed to fetch data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        // Handle other errors, e.g., setFileData([]) or display an error message
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const updateTableCount = () => {
    setTableCount(fileData.length);
  };
  return (
    <div className="p-10">
      <p className="text-3xl font-bold ">My Files</p>
      <div className="text-gray-500 bg-slate-50 border rounded p-4 m-4 font-semibold">
        Total Files: {tableCount}
      </div>
      <div className="m-5">
        <FileTable updateTableCount={updateTableCount} fileData={fileData} />
      </div>
    </div>
  );
};

export default Files;
