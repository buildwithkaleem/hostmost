import { useState } from "react";
import { Link } from "react-router";
import { api } from "../lib/api";
import InputField from "../components/form/InputField";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {

      setLoading(true);

      const res = await api(
        "/auth/forgot-password",
        "POST",
        { email }
      );

      setMessage(res.message || "Password reset link sent to your email");

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
          Forgot Password
        </h1>

        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <InputField
            label={"Email"}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;