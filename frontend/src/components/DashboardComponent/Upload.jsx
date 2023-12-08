import UploadForm from "./UploadForm";

function Upload() {
  return (
    <>
      <div className="p-10 ">
        <p className="text-3xl font-bold text-center ">
          Start <span className="text-primary">Uploading</span> Files
        </p>
        <UploadForm />
      </div>
    </>
  );
}

export default Upload;
