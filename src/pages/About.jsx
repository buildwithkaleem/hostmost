const stats = [
  {
    number: "99.9%",
    label: "Uptime Guarantee",
  },
  {
    number: "24/7",
    label: "Customer Support",
  },
  {
    number: "50K+",
    label: "Websites Hosted",
  },
  {
    number: "15+",
    label: "Global Servers",
  },
];

const features = [
  {
    title: "Fast Performance",
    description:
      "Our high-speed infrastructure ensures your websites load quickly for users worldwide.",
  },
  {
    title: "Secure Hosting",
    description:
      "Advanced security, SSL certificates, backups, and firewall protection keep your data safe.",
  },
  {
    title: "Easy Management",
    description:
      "Manage domains, emails, databases, and files easily with our modern control panel.",
  },
];

const About = () => {
  return (
    <section className="bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-24">

        <div className="max-w-7xl mx-auto px-4 text-center text-white">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            About HostMost
          </h1>

          <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
            We provide fast, secure, and reliable hosting solutions
            for developers, startups, and businesses around the world.
          </p>

        </div>

      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>

            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
              Who We Are
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-5 leading-tight">
              Hosting built for speed, security and growth
            </h2>

            <p className="text-gray-600 mt-6 leading-relaxed">
              HostMost was created with one mission — to make web hosting
              simple, powerful, and affordable for everyone. Whether
              you're launching a personal blog, an online store, or a
              business platform, our infrastructure is designed to deliver
              maximum uptime and blazing-fast performance.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              We focus on reliability, customer satisfaction, and modern
              technologies so developers and businesses can grow without
              worrying about server management.
            </p>

          </div>

          {/* Right Card */}
          <div className="bg-gray-50 border rounded-3xl p-8 shadow-sm">

            <div className="grid grid-cols-2 gap-6">

              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border"
                >

                  <h3 className="text-3xl font-bold text-indigo-600">
                    {item.number}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.label}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Features */}
      <div className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose HostMost?
            </h2>

            <p className="text-gray-500 mt-3">
              Powerful hosting features designed for modern websites
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-xl transition"
              >

                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {index + 1}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* CTA */}
      <div className="py-20">

        <div className="max-w-5xl mx-auto px-4">

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center text-white">

            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to launch your website?
            </h2>

            <p className="mt-5 text-indigo-100 max-w-2xl mx-auto">
              Start your hosting journey today with fast servers,
              premium security, and expert support.
            </p>

            <button className="mt-8 px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold hover:scale-105 transition">
              Get Started
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;