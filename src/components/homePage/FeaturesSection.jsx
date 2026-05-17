const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
          Enjoy all this. At no extra cost
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div className="space-y-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xl">
              🛡️
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Total security
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Full protection from DDoS attacks, unlimited SSL security certificates,
              two-factor authentication, and regular automated back-ups.
            </p>
          </div>

          {/* Card 2 */}
          <div className="space-y-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xl">
              🔄
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Guaranteed 99.9% uptime
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Day and night your site will be up and running 99.9% of the time,
              and that’s a guarantee.
            </p>
          </div>

          {/* Card 3 */}
          <div className="space-y-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xl">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Full speed ahead
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rapid page-loading speeds and lower response times, no matter how high your site traffic spikes.
            </p>
          </div>

          {/* Card 4 */}
          <div className="space-y-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xl">
              💬
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Here to help 24/7
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Access expert WordPress support whenever you need it, from a multilingual team that typically responds in under 2 minutes.
            </p>
          </div>

          {/* Card 5 */}
          <div className="space-y-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xl">
              ✨
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Harness the power of AI
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Put the latest AI tools to work creating everything from SEO-optimized content to a brand-new logo.
            </p>
          </div>

          {/* Card 6 */}
          <div className="space-y-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xl">
              ⚙️
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              See and control it all
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Check your site’s performance and control everything from one, easy-to-use dashboard.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;