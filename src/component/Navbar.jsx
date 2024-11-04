import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between fixed top-0 left-72 right-0 z-10">
      <h1 className="text-xl font-bold">
        {format(new Date(), "dd MMMM yyyy")}
      </h1>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
