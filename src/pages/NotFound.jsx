import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-slate-50 to-slate-100 px-5
      "
    >
      <div
        className="
          max-w-xl w-full bg-white rounded-3xl
          shadow-xl border p-10 text-center
        "
      >
        {/* 404 */}
        <h1
          className="
            text-8xl font-extrabold
            bg-gradient-to-r from-blue-600 to-indigo-600
            bg-clip-text text-transparent
          "
        >
          404
        </h1>

        {/* Title */}
        <h2 className="mt-5 text-3xl font-bold text-slate-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-slate-500 leading-relaxed">
          Sorry, the page you are looking for does not exist
          or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Home */}
          <Link
            to="/"
            className="
              flex items-center gap-2
              px-6 py-3 rounded-xl
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              transition
            "
          >
            <Home size={18} />
            Go Home
          </Link>

          {/* Back */}
          <button
            onClick={() => window.history.back()}
            className="
              flex items-center gap-2
              px-6 py-3 rounded-xl
              border border-slate-300
              hover:bg-slate-100
              text-slate-700 font-medium
              transition
            "
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;