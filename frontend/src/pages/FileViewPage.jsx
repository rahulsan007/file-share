import { useParams } from "react-router-dom";
import FileItem from "../components/FileViewComponent/FileItem";
function FileViewPage() {
  const { id } = useParams();
  return (
    <div className="p-5 bg-gray-200 h-screen w-full flex justify-center items-center flex-col gap-4">
      <FileItem file={id} />
    </div>
  );
}

export default FileViewPage;
