import { useState } from "react";
import { Link, useNavigate, useSearchParams, } from "react-router";
import { api } from "../lib/api";
import PasswordInput from "../components/form/PasswordInput";

const ResetPassword = () => {

  const [searchParams] = useSearchParams();

  const token = searchParams.get('token')

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {

      setLoading(true);

      const res = await api(
        `/auth/reset-password/${token}`,
        "POST",
        { newPassword }
      );

      setMessage(res.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      setError(err.message || "Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">

        <h1 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={"Enter new password"}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {message && (
            <p className="text-green-600 text-sm">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        <div className="mt-4 text-center text-sm">
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ResetPassword;