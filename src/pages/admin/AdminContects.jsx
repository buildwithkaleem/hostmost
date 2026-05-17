import { useEffect, useState } from "react";

import {
  Mail,
  Search,
  User,
  CalendarDays,
  MessageSquare,
  Trash2,
} from "lucide-react";

import { api } from "../../lib/api";

const AdminContects = () => {
  const [contects, setContects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ================= GET CONTACTS =================
  const getContects = async () => {
    try {
      setLoading(true);

      const res = await api("/admin/get-all-contects");

      setContects(res.data || []);
    } catch (error) {
      console.log(error);

      setContects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContects();
  }, []);

  // ================= DELETE CONTACT =================
  const deleteContect = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await api(`/admin/delete-contect/${id}`, "DELETE");

      setContects((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FILTERED CONTACTS =================
  const filteredContects = contects.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.email?.toLowerCase().includes(search.toLowerCase()) ||
    item.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      {/* ================= TOP ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all contact form submissions
          </p>
        </div>

        {/* SEARCH */}
      </div>

      {/* ================= CARD ================= */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        {/* HEADER */}
        <div className="p-5 border-b flex items-center gap-3">

          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
            <Mail size={22} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              All Messages
            </h2>

            <p className="text-sm text-gray-500">
              Total Messages: {filteredContects.length}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading messages...
          </div>
        ) : filteredContects.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No messages found
          </div>
        ) : (
          <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredContects.map((item) => (
              <div
                key={item._id}
                className="
                  border rounded-2xl p-5 bg-white
                  hover:shadow-lg transition
                  flex flex-col
                "
              >
                {/* USER */}
                <div className="flex items-center gap-3 mb-5">

                  <div
                    className="
                      w-12 h-12 rounded-full
                      bg-blue-100 text-blue-600
                      flex items-center justify-center
                    "
                  >
                    <User size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 break-all">
                      {item.email}
                    </p>
                  </div>
                </div>

                {/* SUBJECT */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    Subject
                  </p>

                  <div
                    className="
                      flex items-start gap-2
                      text-slate-700 font-medium
                      break-words
                    "
                  >
                    <MessageSquare
                      size={16}
                      className="mt-1 shrink-0"
                    />

                    <span className="break-words">
                      {item.subject || "No Subject"}
                    </span>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="mb-5 flex-1">
                  <p className="text-xs text-gray-500 mb-2">
                    Message
                  </p>

                  <div
                    className="
                      bg-slate-50 border rounded-xl
                      p-4 text-sm text-slate-700
                      leading-relaxed min-h-[120px]

                      break-words
                      whitespace-pre-wrap
                      overflow-hidden
                    "
                  >
                    {item.message}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between gap-3 border-t pt-4">

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={16} />

                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteContect(item._id)}
                    className="
                      flex items-center gap-2
                      px-3 py-2 cursor-pointer rounded-xl
                      bg-red-50 text-red-600
                      hover:bg-red-100 transition
                    "
                  >
                    <Trash2 size={16} />

                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContects;