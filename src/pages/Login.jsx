import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router";
import { api } from "../lib/api";
import { BiHide, BiShowAlt } from "react-icons/bi";
import InputField from "../components/form/InputField";
import PasswordInput from "../components/form/PasswordInput";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { user, loading } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [form, setForm] = useState({
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

    try {
      const res = await api("/auth/login", "POST", form);

      const user = res.data.user

      dispatch(setUser(user));

    user.role === "admin" ? navigate("/dashboard/users") : navigate("/");

    } catch (err) {
      setError(err.message);
      if (err.message === "Please verify your email") {
        navigate("/send-verify-email");
        return;
      }
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-6">Login to your HostMost account</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <InputField
            label={"Email"}
            type="email"
            name={"email"}
            value={form.email}
            placeholder={"Enter your email"}
            onChange={handleChange}
          />

          <PasswordInput
            value={form.password}
            onChange={handleChange}
          />

          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:text-blue-700 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          If You Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;

