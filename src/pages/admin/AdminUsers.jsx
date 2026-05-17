import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Pencil,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { api } from "../../lib/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    role: "",
  });

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalUsers: 0,
  });

  // ================= FETCH USERS =================
  const getUsers = async () => {
    try {

      setError("");
      setSuccess("");

      setLoading(true);

      const res = await api(
        `/admin/all-users?page=${page}&limit=10&search=${search}`
      );

      // console.log(res)      

      // setSuccess(
      //   res?.message || "Message sent successfully"
      // );

      setUsers(res.data.users);


      setPagination({
        totalPages: res.data.totalPages,
        totalUsers: res.data.totalUsers,
      });
    } catch (error) {
      console.log(error);
      setError(
        error?.message || "Something went wrong get User"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [page, search]);

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      setError("");
      setSuccess("");

     const res = await api(`/admin/delete-user/${id}`,"DELETE");

      setSuccess(
        res?.message || "User Delete Successfully"
      );

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong Delete User"
      );
    }
  };

  // ================= APPROVE / REJECT =================
  const updateStatus = async (id, status) => {
    try {

      setError("");
      setSuccess("");

     const res = await api(`/admin/status/${id}`,"PUT", {
        status,
      });

      setSuccess(
        res?.message || "User Status Update successfully"
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status } : user
        )
      );
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong"
      );
    }
  };

  // open edit
  const openEditModal = (user) => {
    setEditUser(user);
    setForm({
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  };

  const handleUpdateUser = async () => {
    try {

      setError("");
      setSuccess("");

    const res =  await api(`/admin/update-user/${editUser._id}`,"PUT", {
        userName: form.userName,
        email: form.email,
        role: form.role,
      });

      setSuccess(
        res?.message || "User Update successfully"
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === editUser._id
            ? { ...u, ...form }
            : u
        )
      );

      setEditUser(null);
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong Update User"
      );
    }
  };

  return (
    <div className="p-5">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Users Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all registered users
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-[350px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by email or username..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* error handling */}
      {error && (
        <div className="my-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="my-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
          ✅ {success}
        </div>
      )}

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* HEADER */}
        <div className="p-5 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <Users size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                All Users
              </h2>

              <p className="text-sm text-gray-500">
                Total Users: {pagination.totalUsers}
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="text-left px-5 py-4 font-semibold">
                  User
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Email
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Role
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Status
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Created
                </th>

                <th className="text-center px-5 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    {/* USER */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3  ">
                        {/* profile image */}
                        <div className=" w-10 h-10 cursor-pointer rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold uppercase">
                          {user?.profilePic ? <img className="w-11 h-11 rounded-full object-cover" src={user?.profilePic} alt="profilePic" /> : user?.userName?.charAt(0)}
                        </div>
                        {/* <img
                          src={
                            user?.profilePic
                          }
                          alt=""
                          className="w-11 h-11 rounded-full object-cover"
                        /> */}

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {user.userName}
                          </h3>

                          <p className="text-sm text-gray-500">
                            @{user.userName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-5 py-4 text-slate-700">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${user.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : user.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {user.status || "pending"}
                      </span>
                    </td>

                    {/* CREATED */}
                    <td className="px-5 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* APPROVE */}
                        <button
                          onClick={() =>
                            updateStatus(user._id, "approved")
                          }
                          className="p-2 cursor-pointer rounded-lg bg-green-100 text-green-600 hover:scale-105 transition"
                        >
                          <CheckCircle size={18} />
                        </button>

                        {/* REJECT */}
                        <button
                          onClick={() =>
                            updateStatus(user._id, "rejected")
                          }
                          className="p-2 cursor-pointer rounded-lg bg-yellow-100 text-yellow-600 hover:scale-105 transition"
                        >
                          <XCircle size={18} />
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 cursor-pointer rounded-lg bg-blue-100 text-blue-600 hover:scale-105 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="p-2 cursor-pointer rounded-lg bg-red-100 text-red-600 hover:scale-105 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 border-t flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 cursor-pointer rounded-lg border disabled:opacity-50"
          >
            Previous
          </button>

          <p className="text-sm text-gray-600">
            Page {page} of {pagination.totalPages}
          </p>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 cursor-pointer rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[400px] rounded-2xl p-6 shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Edit User
            </h2>

            {/* USERNAME */}
            <input
              className="w-full mb-3 p-3 border rounded-lg"
              value={form.userName}
              onChange={(e) =>
                setForm({ ...form, userName: e.target.value })
              }
              placeholder="User Name"
            />

            {/* EMAIL */}
            <input
              className="w-full mb-3 p-3 border rounded-lg"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
            />

            {/* ROLE */}
            <select
              className="w-full mb-4 p-3 border rounded-lg"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 cursor-pointer border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg"
              >
                Update
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;