import { BsPass } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LuParkingSquare } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apiUsers } from "../utils/voucherAPI";
import Loading from "./Loading";

function Sidebar() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [notifikasi, setNotifikasi] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataUsers();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await apiUsers.logout();
      if (response.status === "success") {
        setNotifikasi(true);
        setMessage(response.message);
        setStatus(response.status);
        setTimeout(() => {
          setNotifikasi(false);
        }, 3000);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setNotifikasi(true);
      setTimeout(() => {
        setNotifikasi(false);
      }, 3000);
    }
  };

  const fetchDataUsers = async () => {
    try {
      const response = await apiUsers.detailUsers();
      setUserName(response.data.Name);
      setUserEmail(response.data.Email);
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  return (
    <aside className="w-56 bg-gradient-to-br to-gray-800 from-gray-700 text-white h-full p-5 rounded-xl flex flex-col">
      <div className="flex flex-row justify-start items-center space-x-4 mb-5">
        <div className="bg-white rounded-md p-1">
          <img src={"/logo.png"} alt="" className="w-14" />
        </div>
        <h1 className="text-xl">Monitoring</h1>
      </div>
      <div className="border-b border-white w-full mb-5"></div>
      <nav className="text-sm flex-grow">
        <ul>
          <li>
            <NavLink
              to="/dashboard/home"
              className={`block py-2.5 px-4 rounded hover:bg-gray-700 my-2 ${
                location.pathname === "/dashboard/home" ? "bg-slate-400" : ""
              }`}
            >
              <div className="flex flex-row justify-start items-center gap-x-2">
                <MdDashboard size={20} />
                Home
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/voucher"
              className={`block py-2.5 px-4 rounded hover:bg-gray-700 my-2 ${
                location.pathname === "/dashboard/voucher" ? "bg-slate-400" : ""
              }`}
            >
              <div className="flex flex-row justify-start items-center gap-x-2">
                <BsPass size={20} />
                Voucher
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/transactions"
              className={`block py-2.5 px-4 rounded hover:bg-gray-700 my-2 ${
                location.pathname === "/dashboard/transactions"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <div className="flex flex-row justify-start items-center gap-x-2">
                <LuParkingSquare size={20} />
                Parking
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="flex flex-row justify-start items-center py-2.5 px-4 space-x-2">
          <div className="w-8 h-8 rounded-full p-1 bg-amber-400 flex justify-center items-center">
            <FaUserAlt size={20} />
          </div>
          <div className="flex flex-col justify-start items-start">
            <p className="text-sm">{userName}</p>
            <p className="text-xs">{userEmail}</p>
          </div>
        </div>
        <NavLink
          onClick={handleLogout}
          className="block py-2.5 px-4 rounded hover:bg-gray-700 my-2"
        >
          <div className="flex flex-row justify-start items-center gap-x-2">
            <AiOutlineLogout size={20} />
            Logout
          </div>
        </NavLink>
      </div>

      {notifikasi && (
        <div
          className={`fixed bottom-0 right-0 m-5 p-4 rounded-lg ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
