import { useEffect } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function FileTable({ updateTableCount, fileData }) {
  FileTable.propTypes = {
    updateTableCount: PropTypes.func.isRequired,
    fileData: PropTypes.isRequired,
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
              Visibility
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-900">
              Short URL
            </th>

            <th className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {fileData.map((item, index) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4 text-left font-medium text-gray-900">
                  {item.filename}
                </td>
                <td className="px-6 py-4 text-left text-gray-700">
                  {item.visibility}
                </td>
                <td className="px-6 py-4 text-left text-gray-700">
                  {item.shortURL}
                </td>

                <td className="px-6 py-4">
                  <Link
                    to={`/dashboard/file-preview/${item.shortURL}`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </Link>
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
