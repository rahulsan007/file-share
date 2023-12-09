import { useState } from "react";
import Alert from "./Alert";
import FilePreview from "./FilePreview";
import { baseUrl } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";

function UploadForm() {
  const [files, setFiles] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFileSeletcted = (file) => {
    setFiles(null);
    if (file && file.size > 2500000) {
      setError("File is Greater than 2MB");
      return;
    }
    console.log(file);
    setError(null);
    setFiles(file);
    console.log("correct");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", files);

    try {
      const response = await fetch(`${baseUrl}/api/file/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the successful upload response as needed
      console.log("File uploaded successfully");
      setFiles(null);
      alert("File uploaded successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col items-center justify-center w-full m-4 mt-8">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-lg text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX Size 2MB)
              </p>
            </div>
            <input
              onChange={(e) => {
                onFileSeletcted(e.target.files[0]);
              }}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
          {error ? <Alert msg={error} /> : null}
          {files ? (
            <FilePreview file={files} removeFile={() => setFiles(null)} />
          ) : null}
          <button
            disabled={!files}
            type="submit"
            className="py-2 px-6 bg-primary text-white text-lg rounded-full m-5 disabled:bg-blue-200"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}

export default UploadForm;
