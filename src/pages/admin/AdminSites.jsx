import { useEffect, useState } from "react";
import {
  Globe,
  Search,
  Trash2,
  Pencil,
  ExternalLink,
  Server,
} from "lucide-react";

import { api } from "../../lib/api";

const AdminSites = () => {

  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const [editModal, setEditModal] = useState(false);

  const [selectedSite, setSelectedSite] = useState(null);

  const [formData, setFormData] = useState({
    subDomain: "",
    customDomain: "",
    serverIp: "",
    sitePublicLink: "",
  });

  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalSites: 0,
  });

  // ================= GET SITES =================
  const getSites = async () => {
    try {

      setError("");
      setSuccess("");

      setLoading(true);

      const res = await api(
        `/admin/get-all-sites?page=${page}&limit=10&search=${search}`
      );

      // console.log(res.data?.sites)

      setSites(res?.data?.sites || []);

      setPagination({
        totalPages: res?.data?.data?.totalPages || 1,
        totalSites: res?.data?.data?.totalSites || 0,
      });
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong get Site"
      );

      setSites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getSites();
    }, 400);

    return () => clearTimeout(delay);
  }, [page, search]);

  // ================= DELETE SITE =================
  const deleteSite = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this site?"
    );

    if (!confirmDelete) return;

    try {

      setError("");
      setSuccess("");

    const res =  await api(`/admin/site-delete/${id}`,"DELETE");

      setSuccess(
        res?.message || "Site Delete successfully"
      );

      setSites((prev) =>
        prev.filter((site) => site._id !== id)
      );
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong Delete Site"
      );
    }
  };

  // ================= UPDATE SITE =================
  const updateSite = async () => {
    try {

      setError("");
      setSuccess("");

   const res =   await api(
        `/admin/site-update/${selectedSite._id}`,
        "PUT",
        formData
      );

      setSuccess(
        res?.message || "Site Update successfully"
      );

      setEditModal(false);

      getSites();
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong update Site "
      );
    }
  };

  return (
    <div className="p-5">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Sites Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all hosted websites
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
              <Globe size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                All Sites
              </h2>

              <p className="text-sm text-gray-500">
                Total Sites: {pagination?.totalSites}
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
                  Sub Domain
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Custom Domain
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Server IP
                </th>

                <th className="text-left px-5 py-4 font-semibold">
                  Public Link
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
                    Loading sites...
                  </td>
                </tr>
              ) : sites?.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No sites found
                  </td>
                </tr>
              ) : (
                sites?.map((site) => (
                  <tr
                    key={site._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    {/* USER */}
                    <td className="px-5 py-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {site?.user?.userName}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {site?.user?.email}
                        </p>
                      </div>
                    </td>

                    {/* SUB DOMAIN */}
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm">
                        {site?.subDomain || "N/A"}
                      </span>
                    </td>

                    {/* CUSTOM DOMAIN */}
                    <td className="px-5 py-4 text-slate-700">
                      {site?.customDomain || "N/A"}
                    </td>

                    {/* SERVER IP */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Server size={16} />

                        {site?.serverIp || "N/A"}
                      </div>
                    </td>

                    {/* PUBLIC LINK */}
                    <td className="px-5 py-4">
                      {site?.sitePublicLink ? (
                        <a
                          href={site.sitePublicLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          Visit Site

                          <ExternalLink size={16} />
                        </a>
                      ) : (
                        <span className="text-gray-400">
                          Not Live
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* EDIT */}
                        <button
                          onClick={() => {
                            setSelectedSite(site);

                            setFormData({
                              subDomain: site?.subDomain || "",
                              customDomain: site?.customDomain || "",
                              serverIp: site?.serverIp || "",
                              sitePublicLink: site?.sitePublicLink || "",
                            });

                            setEditModal(true);
                          }}
                          className="p-2 cursor-pointer rounded-lg bg-blue-100 text-blue-600 hover:scale-105 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteSite(site._id)}
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
            Page {page} of {pagination?.totalPages}
          </p>

          <button
            disabled={page === pagination?.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 cursor-pointer rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Update Site
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Edit website information
                </p>
              </div>

              <button
                onClick={() => setEditModal(false)}
                className="w-10 h-10 cursor-pointer rounded-full hover:bg-slate-100 text-xl"
              >
                ×
              </button>
            </div>

            {/* BODY */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* SUBDOMAIN */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sub Domain
                </label>

                <input
                  type="text"
                  value={formData.subDomain}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subDomain: e.target.value,
                    })
                  }
                  placeholder="example.yourdomain.com"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* CUSTOM DOMAIN */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Custom Domain
                </label>

                <input
                  type="text"
                  value={formData.customDomain}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customDomain: e.target.value,
                    })
                  }
                  placeholder="mydomain.com"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SERVER IP */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Server IP
                </label>

                <input
                  type="text"
                  value={formData.serverIp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serverIp: e.target.value,
                    })
                  }
                  placeholder="192.168.1.1"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PUBLIC LINK */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Public Link
                </label>

                <input
                  type="text"
                  value={formData.sitePublicLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sitePublicLink: e.target.value,
                    })
                  }
                  placeholder="https://example.com"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-5 border-t flex items-center justify-end gap-3">

              <button
                onClick={() => setEditModal(false)}
                className="px-5 py-3 cursor-pointer rounded-xl border hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={updateSite}
                className="px-5 py-3 cursor-pointer rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSites;