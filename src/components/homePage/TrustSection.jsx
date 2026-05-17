import { Link } from "react-router";

const TrustSection = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm">
            WHY CHOOSE US
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Trusted Hosting Platform
            <span className="block text-indigo-600">
              For Modern Businesses
            </span>
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            HostMost provides blazing fast servers, enterprise-grade security,
            and 24/7 support trusted by thousands of developers and businesses worldwide.
          </p>
        </div>

        {/* TRUST STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {/* Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center border hover:shadow-xl transition duration-300">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl">
              ⚡
            </div>

            <h3 className="mt-5 text-4xl font-extrabold text-gray-900">
              99.9%
            </h3>

            <p className="mt-2 text-gray-500 font-medium">
              Uptime Guarantee
            </p>
          </div>

          {/* Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center border hover:shadow-xl transition duration-300">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
              🌍
            </div>

            <h3 className="mt-5 text-4xl font-extrabold text-gray-900">
              10K+
            </h3>

            <p className="mt-2 text-gray-500 font-medium">
              Active Customers
            </p>
          </div>

          {/* Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center border hover:shadow-xl transition duration-300">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl">
              🔒
            </div>

            <h3 className="mt-5 text-4xl font-extrabold text-gray-900">
              256-bit
            </h3>

            <p className="mt-2 text-gray-500 font-medium">
              SSL Security
            </p>
          </div>

          {/* Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center border hover:shadow-xl transition duration-300">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
              💬
            </div>

            <h3 className="mt-5 text-4xl font-extrabold text-gray-900">
              24/7
            </h3>

            <p className="mt-2 text-gray-500 font-medium">
              Expert Support
            </p>
          </div>

        </div>

        {/* Bottom Trust Box */}
        <div className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 lg:p-14 text-white shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div>

              <h2 className="text-4xl font-extrabold leading-tight">
                Your Website Deserves
                <span className="block text-yellow-300">
                  Premium Hosting
                </span>
              </h2>

              <p className="mt-5 text-indigo-100 text-lg">
                Experience ultra-fast speed, premium support,
                and unmatched reliability with HostMost hosting solutions.
              </p>

              <button className="mt-8 px-7 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-gray-100 transition">
                <Link to={'/register'}>Get Started</Link>
              </button>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="mt-2 text-indigo-100">
                  Global Server Locations
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-3xl font-bold">1-Click</h3>
                <p className="mt-2 text-indigo-100">
                  WordPress Installation
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-3xl font-bold">Free</h3>
                <p className="mt-2 text-indigo-100">
                  SSL & Daily Backups
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-3xl font-bold">AI</h3>
                <p className="mt-2 text-indigo-100">
                  Smart Performance Optimization
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustSection;