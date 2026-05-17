const comparisonFeatures = [
  {
    feature: "Websites",
    starter: "1 Website",
    business: "50 Websites",
    enterprise: "Unlimited",
  },
  {
    feature: "Storage",
    starter: "10 GB SSD",
    business: "100 GB NVMe",
    enterprise: "Unlimited NVMe",
  },
  {
    feature: "Free SSL",
    starter: "✓",
    business: "✓",
    enterprise: "✓",
  },
  {
    feature: "Free Domain",
    starter: "—",
    business: "✓",
    enterprise: "✓",
  },
  {
    feature: "Backups",
    starter: "Weekly",
    business: "Daily",
    enterprise: "Real-time",
  },
  {
    feature: "Bandwidth",
    starter: "100 GB",
    business: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Email Accounts",
    starter: "5",
    business: "50",
    enterprise: "Unlimited",
  },
  {
    feature: "CDN",
    starter: "—",
    business: "✓",
    enterprise: "✓",
  },
  {
    feature: "Priority Support",
    starter: "—",
    business: "✓",
    enterprise: "✓",
  },
  {
    feature: "Dedicated Resources",
    starter: "—",
    business: "—",
    enterprise: "✓",
  },
];

const ComparePlans = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">

          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            Compare Plans
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
            Compare our hosting plans
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Find the perfect hosting solution for your website,
            business, or growing online platform.
          </p>

        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border shadow-sm">

          <table className="w-full min-w-[900px] bg-white">

            {/* Head */}
            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="text-left p-6 text-gray-900 font-semibold">
                  Features
                </th>

                <th className="p-6 text-center">

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Starter
                    </h3>

                    <p className="text-indigo-600 font-semibold mt-1">
                      $2.99/mo
                    </p>
                  </div>

                </th>

                <th className="p-6 text-center bg-indigo-50 relative">

                  <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                    Popular
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Business
                    </h3>

                    <p className="text-indigo-600 font-semibold mt-1">
                      $7.99/mo
                    </p>
                  </div>

                </th>

                <th className="p-6 text-center">

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Enterprise
                    </h3>

                    <p className="text-indigo-600 font-semibold mt-1">
                      $15.99/mo
                    </p>
                  </div>

                </th>

              </tr>

            </thead>

            {/* Body */}
            <tbody>

              {comparisonFeatures.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-6 font-medium text-gray-900">
                    {item.feature}
                  </td>

                  <td className="p-6 text-center text-gray-600">
                    {item.starter}
                  </td>

                  <td className="p-6 text-center text-gray-600 bg-indigo-50">
                    {item.business}
                  </td>

                  <td className="p-6 text-center text-gray-600">
                    {item.enterprise}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">

          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition">
            Get Started Today
          </button>

        </div>

      </div>

    </section>
  );
};

export default ComparePlans;