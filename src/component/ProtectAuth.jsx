import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUsers } from '../utils/voucherAPI';
import PropTypes from 'prop-types';

const ProtectAuth = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiUsers.verifyToken();
        if (response.statusCode === 200) {
          setIsAuthenticated(true);
        } else {
          handleAuthFailure(response.message, response.status);
        }
      } catch (error) {
        handleAuthFailure(
          error.response.data.message,
          error.response.data.status
        );
      }

      setAuthChecked(true);
    };

    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked, navigate]);

  const handleAuthFailure = (message, status) => {
    setIsAuthenticated(false);
    setMessage(message);
    setStatus(status);
    setIsModalOpen(true);

    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/');
    }, 2000);
  };

  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? (
    children
  ) : (
    <>
      {isModalOpen && (
        <div
          className={`fixed top-10 right-0 m-5 p-4 rounded-lg shadow-lg bg-white transition-transform transform border border-gray-300 ${
            isModalOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          } ${status === 'success' ? 'text-green-500' : ' text-red-500'}`}
          style={{ transition: 'transform 0.5s, opacity 0.5s' }}
        >
          <p className="font-semibold text-xl uppercase text-start">{status}</p>
          <p className="font-normal text-gray-400 text-start">{message}</p>
        </div>
      )}
    </>
  );
};

ProtectAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectAuth;
