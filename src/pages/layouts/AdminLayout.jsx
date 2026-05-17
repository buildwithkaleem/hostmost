
import { Outlet, useNavigate } from "react-router";
import AdminSidebar from "../../components/dashboard/AdminSidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const AdminLayout = () => {

  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const [open, setOpen] = useState(true);

  
    loading ? <Loading /> : !user ? navigate("/login") :
      user?.role === "user" && navigate("/")
  

  return (
    <>
      

      <div className="flex bg-gray-100 min-h-screen">

        {/* SIDEBAR */}
        <AdminSidebar open={open} setOpen={setOpen} />

        {/* MAIN CONTENT */}
        <div
          className={`flex-1 p-5 transition-all duration-300
        ${open ? "lg:ml-[260px]" : "lg:ml-[90px]"}`}
        >
          <Outlet />
        </div>

      </div>
    </>
  );
};

export default AdminLayout;