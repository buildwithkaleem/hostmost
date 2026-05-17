import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/user/userSlice";
import { useNavigate } from "react-router";
import { api } from "../lib/api";
import InputField from "../components/form/InputField";
import PasswordInput from "../components/form/PasswordInput";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    dispatch(setLoading(true));

    try {
      const res = await api("/auth/register","POST", form);

      setSuccess("Account created! Please check your email to verify.");

      console.log(res.data.user)

      dispatch(setLoading(false));

      // optional redirect after delay
      setTimeout(() => {
        navigate("/send-verify-email");
      }, 2000);

    } catch (err) {
      setError(err.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800">Create Account 🚀</h2>
        <p className="text-gray-500 mb-6">Join HostMost today</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <InputField
            label={"User Name"}
            type="text"
            name="userName"
            placeholder="Enter your User Name"
            value={form.userName}
            onChange={handleChange}
          />

          <InputField
            label={"Email"}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <PasswordInput
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;