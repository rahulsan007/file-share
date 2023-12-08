import { useEffect } from "react";
import { Demofile } from "../../utils/Constant";
import PropTypes from "prop-types";

function FileTable({ updateTableCount }) {
  FileTable.propTypes = {
    updateTableCount: PropTypes.func.isRequired,
  };

  useEffect(() => {
    updateTableCount();
  }, [updateTableCount]);
  return (
    <div className="overflow-x-auto ">
      <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-900">
              File Name
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-900">
              File Type
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-900">
              File Size
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {Demofile.map((item, index) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4 text-left font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-left text-gray-700">
                  {item.type}
                </td>
                <td className="px-6 py-4 text-left text-gray-700">
                  {item.size}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FileTable;
