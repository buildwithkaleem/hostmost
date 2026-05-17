import { Link } from "react-router";
import { FaCheckCircle, FaEnvelopeOpenText } from "react-icons/fa";

const PaymentSuccessPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-20">

      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-14 text-center">

        {/* Success Icon */}
        <div className="flex justify-center">

          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center shadow-lg">

            <FaCheckCircle className="text-6xl text-green-600" />

          </div>

        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-8">
          🎉 Congratulations!
        </h1>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
          Hi <span className="font-semibold text-indigo-600">Aslam</span>, 👋
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg">
          We’re excited to inform you that your application for our{" "}
          <span className="font-semibold text-indigo-600">
            Free Hosting Service
          </span>{" "}
          has been successfully approved.
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg">
          Your account is now in the setup phase. You will receive your{" "}
          <span className="font-semibold">
            cPanel access details
          </span>{" "}
          within{" "}
          <span className="font-semibold text-gray-900">
            3 to 5 business days
          </span>.
        </p>

        {/* Email Box */}
        <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">

          <div className="flex justify-center mb-4">

            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">

              <FaEnvelopeOpenText className="text-2xl" />

            </div>

          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            Please check your email
          </h3>

          <p className="mt-3 text-gray-600 leading-relaxed">
            We’ll send your hosting account credentials and setup instructions
            directly to your registered email address.
          </p>

        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

          <div className="rounded-2xl border border-gray-200 p-5 bg-gray-50">

            <h4 className="text-lg font-semibold text-gray-900">
              ⏳ Estimated Setup Time
            </h4>

            <p className="mt-2 text-gray-600">
              3–5 Business Days
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 p-5 bg-gray-50">

            <h4 className="text-lg font-semibold text-gray-900">
              📩 Access Details
            </h4>

            <p className="mt-2 text-gray-600">
              Will be sent via email
            </p>

          </div>

        </div>

        {/* Footer Text */}
        <p className="mt-10 text-gray-500 text-sm leading-relaxed">
          If you have any questions, feel free to contact our support team.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            to="/"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Go to Homepage
          </Link>

          <Link
            to="/contact"
            className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Contact Support
          </Link>

        </div>

      </div>

    </section>
  );
};

export default PaymentSuccessPage;