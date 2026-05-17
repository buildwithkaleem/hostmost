import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const HostingPlane = () => {

const navigate = useNavigate()

const {user} = useSelector((state)=>state.user)

  return (
    <div >
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Choose Your Hosting Plan
            </h2>

            <p className="text-gray-500 mt-3">
              Fast, secure and affordable hosting for everyone 🚀
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* STARTER */}
            <div className="bg-white relative rounded-2xl shadow-lg p-8 border hover:scale-105 transition duration-300">

              {/* ofer bage */}
              <div className="inline-flex items-center absolute top-5 right-3 gap-3 px-4 py-2 text-sm rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold shadow-xl shadow-purple-200 border border-white/10 backdrop-blur-lg">

                <div className="relative flex h-3 w-3">

                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>

                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>

                </div>

                <span className="tracking-wide">
                  Limited Time Offer
                </span>

              </div>
       

              <h3 className="text-2xl font-bold text-gray-800">
                Starter
              </h3>

              <p className="text-gray-500 mt-2">
                Perfect for beginners
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-gray-400 line-through text-lg">
                  $20/mo
                </span>

                
                  <h2 className="text-4xl font-bold text-indigo-600 mt-1">
                    {/* $9/mo */}
                    Free
                  </h2>

                
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✔ 1 Website</li>
                <li>✔ 10GB SSD Storage</li>
                <li>✔ Free SSL Certificate</li>
                <li>✔ 24/7 Support</li>
              </ul>

              <button onClick={() =>{ { user ? navigate('/method') : navigate('/login') }

                }} className="w-full mt-8 py-3 bg-indigo-600 cursor-pointer text-white rounded-xl hover:bg-indigo-700 transition">
                Get Started
              </button>
            </div>

            {/* BUSINESS */}
            <div className="bg-indigo-600 text-white rounded-2xl shadow-2xl p-8 border relative hover:scale-105 transition duration-300">

              {/* Badge */}
              <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>

              <h3 className="text-2xl font-bold">
                Business
              </h3>

              <p className="text-indigo-100 mt-2">
                Best for growing businesses
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-indigo-200 line-through text-lg">
                  $40/mo
                </span>

                <h2 className="text-4xl font-bold mt-1">
                  $19/mo
                </h2>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                <li>✔ 10 Websites</li>
                <li>✔ 50GB NVMe Storage</li>
                <li>✔ Free Domain</li>
                <li>✔ Free SSL Certificate</li>
                <li>✔ Priority Support</li>
              </ul>

              <button className="w-full mt-8 py-3 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition font-semibold">
                Choose Plan
              </button>
            </div>

            {/* PREMIUM */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border hover:scale-105 transition duration-300">

              <h3 className="text-2xl font-bold text-gray-800">
                Premium
              </h3>

              <p className="text-gray-500 mt-2">
                For high performance projects
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-gray-400 line-through text-lg">
                  $70/mo
                </span>

                <h2 className="text-4xl font-bold text-indigo-600 mt-1">
                  $39/mo
                </h2>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✔ Unlimited Websites</li>
                <li>✔ 200GB NVMe Storage</li>
                <li>✔ Daily Backups</li>
                <li>✔ Free SSL & Domain</li>
                <li>✔ Dedicated Support</li>
              </ul>

              <button className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                Get Premium
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default HostingPlane
