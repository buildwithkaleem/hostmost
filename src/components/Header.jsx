import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { api } from "../lib/api";
import { FaSpinner } from "react-icons/fa";

const Header = () => {
  const { user,loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);

  const handelLogout = async () => {
    try {
      await api("/auth/logout", "POST", {});

      dispatch(setUser(null));

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-900"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>

          </div>

          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            HostMost
          </span>
        </Link>

        {/* DESKTOP NAV */}
        {/* <nav className="hidden md:flex items-center  gap-8 text-gray-700 font-medium">

          {["Home", "Pricing", "Contact","About","Blog"].map((item) => (
            <Link
              key={item}
              to={item === "Blog" ? "https://earnify.egrif.online" : item === "Home" ? "/" : `/${item.toLowerCase()}` }
              className="relative group transition"
            >
              {item}

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav> */}

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          {[
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
            { name: "Contact", path: "/contact" },
            { name: "About", path: "/about" },
          ].map((item) => {

            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative transition ${isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                  }`}
              >
                {item.name}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-600 transition-all duration-300 rounded-full w-0 group-hover:w-full ${isActive && "w-full"
                    }`}
                ></span>
              </Link>
            );
          })}

          {/* Blog */}
          <Link
            to="https://earnify.egrif.online"
            target="_blank"
            className="relative transition hover:text-indigo-600"
          >
            Blog
          </Link>

        </nav>

        {/* DESKTOP RIGHT Auth */}
        <div className="hidden md:flex items-center gap-4">

          {loading ? <FaSpinner className="animate-spin" /> : user ? (
            <>
              {/* Avatar */}
              <div 
              onClick={() => navigate("/profile")}
               className="w-10 h-10 cursor-pointer rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold uppercase">
                {user?.profilePic ? <img className="w-11 h-11 rounded-full object-cover" src={user?.profilePic} alt="profilePic" /> : user?.userName?.charAt(0)}
              </div>

              <button
                onClick={handelLogout}
                className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 cursor-pointer py-2 border-2 border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-600 hover:text-white transition duration-300"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileMenu(true)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-7 h-[3px] bg-gray-800 rounded-full"></span>
          <span className="w-7 h-[3px] bg-gray-800 rounded-full"></span>
          <span className="w-7 h-[3px] bg-gray-800 rounded-full"></span>
        </button>

      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 md:hidden right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">

          <h2 className="text-xl font-bold text-indigo-600">
            Menu
          </h2>

          <button
            onClick={() => setMobileMenu(false)}
            className="text-3xl text-gray-600"
          >
            ×
          </button>
        </div>

        {/* NAV LINKS */}
        {/* <div className="flex flex-col bg-white p-5 gap-5 text-lg font-medium text-gray-700">

          <Link to="/" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <Link to="/pricing" onClick={() => setMobileMenu(false)}>
            Pricing
          </Link>

          <Link to="/contact" onClick={() => setMobileMenu(false)}>
            Contact
          </Link>

          <Link to="/about" onClick={() => setMobileMenu(false)}>
            About
          </Link>

          <Link to="https://earnify.egrif.online" target="_blank" onClick={() => setMobileMenu(false)}>
            Blog
          </Link>

        </div> */}

        <div className="flex flex-col bg-white p-5 gap-5 text-lg font-medium">

          {[
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
            { name: "Contact", path: "/contact" },
            { name: "About", path: "/about" },
          ].map((item) => {

            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className={`transition ${isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            to="https://earnify.egrif.online"
            target="_blank"
            onClick={() => setMobileMenu(false)}
          >
            Blog
          </Link>

        </div>

        {/* MOBILE AUTH */}
        <div className="p-5 bg-white border-t mt-4">

          {user ? (
            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold uppercase">
                  {user?.userName?.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold">
                    {user?.userName}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handelLogout}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">

              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="block text-center px-5 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-600 hover:text-white transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                Get Started
              </Link>

            </div>
          )}
        </div>

      </div>

      {/* OVERLAY */}
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}
    </header >
  );
};

export default Header;