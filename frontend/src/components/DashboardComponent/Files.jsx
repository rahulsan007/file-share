import { useState } from "react";
import FileTable from "./FileTable";
import { Demofile } from "../../utils/Constant";

const Files = () => {
  const [tableCount, setTableCount] = useState(0);

  const updateTableCount = () => {
    setTableCount(Demofile.length);
  };
  return (
    <div className="p-10">
      <p className="text-3xl font-bold ">My Files</p>
      <div className="text-gray-500 bg-slate-50 border rounded p-4 m-4 font-semibold">
        Total Files: {tableCount}
      </div>
      <div className="m-5">
        <FileTable updateTableCount={updateTableCount} />
      </div>
    </div>
  );
};

export default Files;
