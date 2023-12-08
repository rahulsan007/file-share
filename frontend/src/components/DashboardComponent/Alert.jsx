import { AlertCircle } from "lucide-react";
import PropType from "prop-types";

function Alert({ msg }) {
  Alert.propTypes = {
    msg: PropType.string.isRequired,
  };
  return (
    <div className="p-5 bg-red-600 m-2 rounded-lg flex text-white gap-4">
      <AlertCircle />
      <p>{msg}</p>
    </div>
  );
}

export default Alert;
