import "./App.css";
import Swal from "sweetalert2";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
function App() {
  const PrivateRoute = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      return <Outlet />;
    } else {
      Swal.fire("Warning", "Please login first", "error");
      return <Navigate to="/" />;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
