import { useState } from "react";
import { api } from "../lib/api";
import InputField from "../components/form/InputField";

const SendVerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await api("/auth/resend-verification", "POST", { email });

      setMessage("Verification email sent 📩 Check your inbox!");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center">

        {/* Icon */}
        <div className="text-5xl mb-4">📩</div>

        <h2 className="text-2xl font-bold text-gray-800">
          Verify Your Email
        </h2>

        <p className="text-gray-500 mt-3">
          We’ve sent a verification link to your email address.
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="mt-6 mb-3 bg-blue-50 text-blue-700 p-3 rounded-lg text-sm">
          If you don’t see the email, check your <b>Spam / Junk</b> folder.
        </div>

        {/* EMAIL INPUT */}
        <InputField
          type="email"
          placeholder="Enter your email to resend"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       
        {/* RESEND BUTTON */}
        <button
          onClick={handleResend}
          disabled={loading || !email}
          className="w-full cursor-pointer mt-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>

        {/* SUCCESS / ERROR */}
        {message && (
          <p className="text-green-600 text-sm mt-3">{message}</p>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-3">{error}</p>
        )}

      </div>
    </div>
  );
};

export default SendVerifyEmail;