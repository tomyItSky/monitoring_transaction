import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { apiUsers } from '../utils/voucherAPI';
import Loading from '../component/Loading';
import ModalError from '../component/ModalError';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);

    try {
      const dataLogin = {
        identifier: identifier,
        password: password,
      };

      await apiUsers.login(dataLogin.identifier, dataLogin.password);
      navigate('/dashboard/home');

      setLoadingData(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg || 'Login failed');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoadingData(false);
    }
  };

  if (loadingData) {
    return <Loading />;
  }

  return (
    <div className="container m-auto max-h-screen w-full">
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center space-y-2 mb-3">
          <img src={'/logo.png'} alt="Logo skyparking" className="w-20" />
          <h1 className="text-lg font-bold">Monitoring</h1>
        </div>
        <div className="flex flex-col justify-start items-start border border-slate-300 p-3 w-1/4 rounded-md">
          <h1 className="text-base font-semibold">Selamat datang kembali,</h1>
          <h1 className="text-sm text-slate-400 mb-3">
            Silahkan login untuk memulai
          </h1>

          <div className="h-1 border-b border-slate-300 w-full mb-3"></div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 text-slate-500 bg-white w-full mb-2 text-sm"
              id="identifier"
              name="Identifier"
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Masukan email atau username"
            />
            <input
              type="password"
              className="border border-gray-300 rounded-md px-3 py-2 text-slate-500 bg-white w-full mb-2 text-sm"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
            />

            <button
              type="submit"
              className="bg-emerald-500 w-full py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {errorMessage && (
        <ModalError
          message={errorMessage}
          onClose={() => setErrorMessage(false)}
        />
      )}
    </div>
  );
}

export default Login;
