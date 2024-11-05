import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

function ModalSuccess({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <AiOutlineCheckCircle className="text-green-500 text-4xl mr-4" />
          <h2 className="text-xl font-bold text-green-600">Success</h2>
        </div>
        <p className="mt-4 text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

ModalSuccess.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalSuccess;
