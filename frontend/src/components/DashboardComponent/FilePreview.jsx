import { Paperclip, X } from "lucide-react";
import PropType from "prop-types";

function FilePreview({ file, removeFile }) {
  FilePreview.propTypes = {
    file: PropType.isRequired,
    removeFile: PropType.isRequired,
  };
  return (
    <div className="p-6 flex gap-4 items-center bg-blue-100 m-3 rounded-lg w-1/2 border-2 border-dotted border-blue-500  ">
      <Paperclip />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{file.name}</p>
        <p className="text-xs text-gray-500">
          {file?.type}/{(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <X
        className="ml-auto text-red-500 cursor-pointer"
        onClick={() => removeFile()}
      />
    </div>
  );
}

export default FilePreview;
