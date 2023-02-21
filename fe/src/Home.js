import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// const userList = [
//   { id: 1, name: "John Doe", email: "john.doe@example.com" },
//   { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
//   { id: 3, name: "Mark Smith", email: "mark.smith@example.com" },
//   { id: 4, name: "Mary Smith", email: "mary.smith@example.com" },
//   { id: 5, name: "David Johnson", email: "david.johnson@example.com" },
//   { id: 6, name: "Linda Johnson", email: "linda.johnson@example.com" },
//   { id: 7, name: "John Smith", email: "john.smith@example.com" },
//   { id: 8, name: "Jane Smith", email: "jane.smith@example.com" },
//   { id: 9, name: "Mark Johnson", email: "mark.johnson@example.com" },
//   { id: 10, name: "Mary Johnson", email: "mary.johnson@example.com" },
//   { id: 11, name: "David Smith", email: "david.smith@example.com" },
//   { id: 12, name: "Linda Smith", email: "linda.smith@example.com" },
// ];

const Home = () => {
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const itemsPerPage = 9;
  const navigate = useNavigate();
  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const handleClickPrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleClickNext = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const fetchData = async () => {
    const token = localStorage.getItem("Token");
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_API_HOST + `/users/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data.data;
    setUserList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const disabledPrev = page === 1 ? "opacity-50 cursor-not-allowed" : "";
  const disabledNext =
    page === totalPages ? "opacity-50 cursor-not-allowed" : "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const displayedUsers = userList.slice(startIndex, endIndex);

  const handleLogout = () => {
    Swal.fire("Success", "Success Logout", "success");
    localStorage.removeItem("Token");

    navigate("/");
  };
  return (
    <div className="container mx-auto px-4 max-w-screen-md mt-20 border border-black rounded-lg">
      <p className="font-bold text-xl mb-2 ml-5 mt-5">Daftar User</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {displayedUsers.map((user) => (
          <div
            className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            key={user.id}
          >
            <div className="px-4 py-3">
              <div className="font-bold text-xl mb-3">
                {user.firstname} {user.lastname}
              </div>
              <p className="text-gray-700 text-base mb-3">
                Email: {user.email}
              </p>
              <p className="text-gray-700 text-base mb-3">
                phone: {user.phone}
              </p>
              <p className="text-gray-700 text-base">alamat: {user.alamat}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="container flex justify-between mt-10 ml-2">
        <div>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div>
          <button
            className={`bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mb ${disabledPrev}`}
            onClick={handleClickPrev}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            className={`bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mb ${disabledNext}`}
            onClick={handleClickNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
