
import { useState } from "react";
import {
  Users,
  Globe,
  FileText,
  Menu,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";

import { Link, NavLink, useNavigate, } from "react-router";
import { api } from "../../lib/api";

const AdminSidebar = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const menus = [
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/dashboard/users",
    },
    {
      name: "Sites",
      icon: <Globe size={20} />,
      path: "/dashboard/sites",
    },
    {
      name: "Methods",
      icon: <FileText size={20} />,
      path: "/dashboard/methods",
    },
    {
      name: "Contects",
      icon: <Mail size={20} />,
      path: "/dashboard/contects",
    },
  ];

  const handelLogout = async () => {
      try {
        await api("/auth/logout", "POST");
  
        // dispatch(setUser(null));
  
        navigate("/login");
      } catch (error) {
        console.log(error.message);
      }
    };

 

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/40 z-40 lg:hidden transition-all duration-300 ease-in-out
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-[#0F172A] text-white
          transition-all duration-300 ease-in-out border-r border-white/10
          
          ${open ? "w-[260px]" : "w-[90px]"}
          
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* ================= HEADER ================= */}
        <div
          className={`
            h-16 border-b border-white/10
            flex items-center
            ${open ? "justify-between px-4" : "justify-center px-2"}
          `}
        >
          {open && (
            <Link
              to="/dashboard/users"
              className="text-2xl font-bold tracking-wide"
            >
              Admin
            </Link>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="
              p-2 rounded-xl cursor-pointer
              hover:bg-white/10 transition
            "
          >
            {open ? (
              <ChevronLeft size={22} />
            ) : (
              <ChevronRight size={22} />
            )}
          </button>
        </div>

        {/* ================= MENU ================= */}
        <div className="mt-5 flex flex-col gap-2 px-3">
          {menus.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center
                ${open ? "gap-3 px-3" : "justify-center px-2"}
                
                py-3 rounded-xl transition-all duration-200
                
                ${isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-white/10 text-gray-300"
                }
              `
              }
            >
              {/* ICON */}
              <span>{item.icon}</span>

              {/* TEXT */}
              {open && (
                <span className="font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="absolute bottom-5 left-0 w-full px-3">
          <button
            onClick={handelLogout}
            className={`
              w-full flex items-center
              ${open ? "gap-3 px-3" : "justify-center px-2"}
              
              py-3 rounded-xl cursor-pointer
              hover:bg-red-500/20 text-red-400 transition
            `}
          >
            <LogOut size={20} />

            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MOBILE TOPBAR ================= */}
      <div
        className="
          lg:hidden fixed top-0 left-0 right-0 z-30
          h-16 bg-white shadow-sm border-b
          flex items-center px-4
        "
      >
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl border cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <h1 className="ml-4 text-lg font-semibold text-slate-800">
          Admin Dashboard
        </h1>
      </div>
    </>
  );
};

export default AdminSidebar;