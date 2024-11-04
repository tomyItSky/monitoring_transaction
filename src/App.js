import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./layout/Dashboard";
import ProtectAuth from "./component/ProtectAuth";
import DashboardLayout from "./layout/Dashboard";
import Login from "./pages/Login";
import Voucher from "./pages/Voucher";
import Parking from "./pages/Parking";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectAuth>
                <DashboardLayout />
              </ProtectAuth>
            }
          >
            <Route path="Home" element={<Home />} />
            <Route path="voucher" element={<Voucher />} />
            <Route path="transactions" element={<Parking />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
