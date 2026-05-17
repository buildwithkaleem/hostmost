import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "../lib/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api(`/auth/verify-email/${token}`, "GET");

        setStatus("success");
        setMessage("Your email has been verified successfully 🎉");

      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center">

        {status === "loading" && (
          <>
            <div className="text-5xl mb-4">⏳</div>
            <h2 className="text-xl font-bold">Verifying your email...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600">
              Email Verified!
            </h2>

            <p className="text-gray-600 mt-3">{message}</p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600">
              Verification Failed
            </h2>

            <p className="text-gray-600 mt-3">{message}</p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Go to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;