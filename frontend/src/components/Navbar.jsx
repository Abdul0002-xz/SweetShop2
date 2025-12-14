import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, isAdmin }) {

    const handleLogout = async() => {
        await axios.post("http://localhost:8000/api/v1/users/logout", {}, {withCredentials:true}).then((res)=>{
            alert("Logged out successfully");
        })
        localStorage.removeItem("loggesinUser");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
        window.location.reload();
    }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-semibold text-indigo-600">
            SweetsHome
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium">

            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </Link>

            <Link
              to="/sweets"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Sweets
            </Link>

            <Link
              to="/sweets/search"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Search
            </Link>

            {isAdmin && (
              <Link
                to="/admin/add-sweet"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Add Sweet
              </Link>
            )}

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
