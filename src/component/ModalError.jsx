import { AiOutlineCloseCircle } from "react-icons/ai";

function ModalError({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <AiOutlineCloseCircle className="text-red-500 text-4xl mr-4" />
          <h2 className="text-xl font-bold text-red-600">Error</h2>
        </div>
        <p className="mt-4 text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ModalError;
