import { useEffect, useState } from "react";
import {
  Trash2,
  FileText,
  Mail,
  User,
  CalendarDays,
} from "lucide-react";

import { api } from "../../lib/api";

const AdminMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  // ================= GET METHODS =================
  const getMethods = async () => {
    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const res = await api("/admin/get-all-methods");
console.log(res.data)
      setMethods(res.data || []);
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong get Methods"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMethods();
  }, []);

  // ================= DELETE METHOD =================
  const deleteMethod = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this method?"
    );

    if (!confirmDelete) return;

    try {

      setError("");
      setSuccess("");

     const res = await api(`/admin/delete-method/${id}`,"DELETE");


      setSuccess(
        res?.message || "Method Delete successfully"
      );

      setMethods((prev) =>
        prev.filter((method) => method._id !== id)
      );
    } catch (error) {
      // console.log(error);
      setError(
        error?.message || "Something went wrong Delete Methods"
      );
    }
  };

  return (
    <div className="p-5">
      {/* TOP */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Payment Methods
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all submitted payment methods
        </p>
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
        <div className="p-5 border-b flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
            <FileText size={22} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              All Methods
            </h2>

            <p className="text-sm text-gray-500">
              Total Methods: {methods.length}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading methods...
          </div>
        ) : methods.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No methods found
          </div>
        ) : (
          <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
            {methods.map((method) => (
              <div
                key={method._id}
                className="border rounded-2xl p-5 hover:shadow-lg transition bg-white"
              >
                {/* USER */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {method.userId?.userName || "Unknown"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {method.userId?.email}
                    </p>
                  </div>
                </div>

                {/* METHOD INFO */}
                <div className="space-y-4">

                  {/* FULL NAME */}
                  <div className="border rounded-xl p-3 bg-slate-50">
                    <p className="text-xs text-gray-500 mb-1">
                      Full Name
                    </p>

                    <h4 className="font-semibold text-slate-800">
                      {method.firstName} {method.lastName}
                    </h4>
                  </div>

                  {/* ADDRESS */}
                  <div className="border rounded-xl p-3 bg-slate-50">
                    <p className="text-xs text-gray-500 mb-1">
                      Address
                    </p>

                    <div className="text-sm text-slate-700 space-y-1">
                      <p>{method.addressLine1}</p>

                      {method.addressLine2 && (
                        <p>{method.addressLine2}</p>
                      )}

                      <p>
                        {method.city}, {method.country}
                      </p>

                      <p>ZIP: {method.zipCode}</p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="border rounded-xl p-3 bg-slate-50">
                    <p className="text-xs text-gray-500 mb-1">
                      Phone Number
                    </p>

                    <h4 className="font-medium text-slate-700">
                      {method.phoneNumber}
                    </h4>
                  </div>

                  {/* CARD */}
                  <div className="border rounded-xl p-3 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500">
                        Card Information
                      </p>

                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 uppercase">
                        {method.cardType}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      {/* CARD NUMBER */}
                      <div>
                        <p className="text-gray-500 text-xs">
                          Card Number
                        </p>

                        <h4 className="font-medium tracking-wider text-slate-800">
                          {method.cardNumber}
                        </h4>
                      </div>

                      {/* EXPIRY */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-xs">
                            Expiry
                          </p>

                          <h4 className="font-medium text-slate-700">
                            {method.expirationMonth}/
                            {method.expirationYear}
                          </h4>
                        </div>

                        {/* CVV */}
                        <div>
                          <p className="text-gray-500 text-xs">
                            CVN
                          </p>

                          <h4 className="font-medium text-slate-700">
                            {method.cvn}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={18}
                      className="text-gray-400 mt-1"
                    />

                    <div>
                      <p className="text-sm text-gray-500">
                        Submitted
                      </p>

                      <h4 className="font-medium text-slate-700">
                        {new Date(
                          method.createdAt
                        ).toLocaleDateString()}
                      </h4>
                    </div>
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="mt-5 pt-5 border-t">
                  <button
                    onClick={() => deleteMethod(method._id)}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl transition"
                  >
                    <Trash2 size={18} />

                    Delete Method
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

export default AdminMethods;