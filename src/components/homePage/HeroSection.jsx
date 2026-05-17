import { Link } from "react-router";

const HeroSection = () => {
  return (
    
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Badge */}
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
              🚀 Fast & Secure Web Hosting
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight">
              Launch Your Website
              <span className="block text-yellow-300">
                With Powerful Hosting
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-indigo-100 max-w-xl">
              Get lightning-fast hosting, free SSL certificates,
              instant setup, and 24/7 support — all at unbeatable prices.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link to={'/register'} className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-gray-100 transition">
                Get Started
              </Link>

              <Link to={'/pricing'} className="px-6 py-3 border border-white/40 rounded-xl hover:bg-white/10 transition">
                View Plans
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">

              <div>
                <h3 className="text-3xl font-bold">99.9%</h3>
                <p className="text-indigo-100 text-sm">Uptime Guarantee</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-indigo-100 text-sm">Expert Support</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-indigo-100 text-sm">Happy Clients</p>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE/CARD */}
          <div className="relative flex justify-center">

            {/* Glow */}
            <div className="absolute w-72 h-72 bg-pink-400 blur-3xl opacity-30 rounded-full"></div>

            {/* Main Card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  Premium Hosting
                </h3>

                <span className="bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  LIVE
                </span>
              </div>

              {/* Fake server bars */}
              <div className="mt-8 space-y-4">

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span>32%</span>
                  </div>

                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[32%] h-full bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span>78%</span>
                  </div>

                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[78%] h-full bg-yellow-300 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bandwidth</span>
                    <span>56%</span>
                  </div>

                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[56%] h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>

              </div>

              {/* Bottom */}
              <div className="mt-8 p-4 rounded-xl bg-white/10 border border-white/10">
                <p className="text-sm text-indigo-100">
                  ⚡ Your server is optimized and running smoothly.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;