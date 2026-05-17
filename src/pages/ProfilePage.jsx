import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaSave,
} from "react-icons/fa";

import { api } from "../lib/api";
import useUser from "../hook/useUser";
import PasswordInput from "../components/form/PasswordInput";

const ProfilePage = () => {

  const { user, refetch } = useUser();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [profileFile, setProfileFile] = useState(null);


  // =========================
  // CHANGE PASSWORD
  // =========================
  const handleUpdatePassword = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");
      setSuccess("");

      const res = await api(
        "/auth/change-password",
        "POST",
        passwordData
      );

      setSuccess(res?.message);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {

      setError(
        error?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // UPLOAD PROFILE PIC
  // =========================
  const handleUploadProfile = async () => {

    if (!profileFile) {
      return setError("Please select image");
    }

    try {

      setUploading(true);

      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("profile", profileFile);

      const res = await api(
        "/auth/upload-profile-pic",
        "POST",
        formData
      );

      setSuccess(res?.message);

      setProfileFile(null);

      refetch();

    } catch (error) {

      setError(
        error?.message || "Upload failed"
      );

    } finally {

      setUploading(false);
      
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20">

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">

          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* Profile Image */}
            <div className="relative">

              {
                user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt="profile"
                    className="w-36 h-46 rounded-xl border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-6xl">
                    <FaUserCircle />
                  </div>
                )
              }

            </div>

            {/* USER INFO */}
            <div className="flex-1">

              <h1 className="text-4xl font-bold">
                {user?.userName}
              </h1>

              <div className="flex items-center gap-3 mt-4 text-indigo-100">

                <FaEnvelope />

                <span>
                  {user?.email}
                </span>

              </div>

              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm">

                <div className="w-3 h-3 rounded-full bg-green-400"></div>

                Account Active

              </div>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* PROFILE PIC */}
            <div className="bg-white rounded-3xl p-8 border shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Profile Picture
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Upload your profile image
                  </p>

                </div>

                <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                  <FaCamera />
                </div>

              </div>

              <div className="mt-8 border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center">

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfileFile(e.target.files[0])
                  }
                  className="block w-full border border-gray-300 rounded-xl p-3"
                />

                <button
                  onClick={handleUploadProfile}
                  disabled={uploading}
                  className="mt-6 cursor-pointer px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
                >

                  {
                    uploading
                      ? "Uploading..."
                      : "Upload Profile"
                  }

                </button>

              </div>

            </div>

            {/* ALERTS */}
            {
              error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  ❌ {error}
                </div>
              )
            }

            {
              success && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
                  ✅ {success}
                </div>
              )
            }


            {/* CHANGE PASSWORD */}
            <div className="bg-white rounded-3xl p-8 border shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Change Password
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Update your account password
                  </p>

                </div>

                <div className="h-14 w-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl">
                  <FaLock />
                </div>

              </div>

              <form
                onSubmit={handleUpdatePassword}
                className="mt-8 space-y-6"
              >

                {/* OLD PASSWORD */}
                <div>

                  <PasswordInput
                    label="Old Password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                    placeholder="Enter old password"
                  />

                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                    Old Password
                  </label>

                  <input
                    type="password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                    placeholder="Enter old password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  /> */}

                </div>

                {/* NEW PASSWORD */}
                <div>

                  <PasswordInput
                    label="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                  />

                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  /> */}

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3"
                >

                  <FaSave />

                  {
                    loading
                      ? "Updating..."
                      : "Update Password"
                  }

                </button>

              </form>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* ACCOUNT INFO */}
            <div className="bg-white rounded-3xl p-8 border shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                Account Information
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Username
                  </span>

                  <span className="font-semibold text-gray-900">
                    {user?.userName}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Email
                  </span>

                  <span className="font-semibold text-gray-900 break-all">
                    {user?.email}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Status
                  </span>

                  <span className="text-green-600 font-semibold capitalize">
                    {user?.status}
                  </span>

                </div>

              </div>

            </div>

            {/* SECURITY */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">

              <h2 className="text-2xl font-bold">
                Security Tips
              </h2>

              <ul className="mt-6 space-y-4 text-indigo-100 text-sm">

                <li>
                  • Use strong passwords
                </li>

                <li>
                  • Never share credentials
                </li>

                <li>
                  • Change password regularly
                </li>

                <li>
                  • Upload verified profile image
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProfilePage;