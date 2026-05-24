import { useNavigate } from "react-router";
import ComparePlans from "../components/pricig/comparisonFeatures";
import { useSelector } from "react-redux";

const plans = [
  {
    name: "Starter",
    price: "$2.99",
    description: "Perfect for personal websites and beginners.",
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "Free SSL Certificate",
      "Weekly Backups",
      "24/7 Support",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Business",
    price: "$7.99",
    description: "Best for growing businesses and startups.",
    features: [
      "50 Websites",
      "100 GB NVMe Storage",
      "Free Domain",
      "Daily Backups",
      "Unlimited Bandwidth",
      "Priority Support",
    ],
    button: "Choose Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$15.99",
    description: "Advanced hosting for high-traffic websites.",
    features: [
      "Unlimited Websites",
      "Unlimited NVMe Storage",
      "Free CDN",
      "Advanced Security",
      "Dedicated Resources",
      "24/7 Premium Support",
    ],
    button: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {

  const { user } = useSelector((state) => state.user)

  const navigate = useNavigate()

  return (
    <>
      <section className="bg-gray-50 min-h-screen py-20">

        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-16">

            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
              Pricing Plans
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-5">
              Simple & Transparent Pricing
            </h1>

            <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
              Choose the perfect hosting plan for your website,
              business, or growing online platform.
            </p>

          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl border bg-white p-8 shadow-sm hover:shadow-2xl transition duration-300 ${plan.popular
                  ? "border-indigo-600 scale-105"
                  : "border-gray-200"
                  }`}
              >

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Plan */}
                <h2 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>

                <p className="text-gray-500 mt-3">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-8 flex items-end gap-1">

                  <h3 className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </h3>

                  <span className="text-gray-500 mb-2">
                    /month
                  </span>

                </div>

                {/* Features */}
                <ul className="mt-8 space-y-4">

                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-700"
                    >

                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">
                        ✓
                      </div>

                      {feature}

                    </li>
                  ))}

                </ul>

                {/* Button */}
                <button
                  onClick={() => user ? navigate("/payment-method") : navigate("/login")}
                  className={`w-full mt-10 py-4 cursor-pointer rounded-xl font-semibold transition ${plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-900 text-white hover:bg-black"
                    }`}
                >
                  {plan.button}
                </button>

              </div>
            ))}

          </div>

          {/* Bottom Text */}
          <div className="text-center mt-16">

            <p className="text-gray-500">
              All plans include free SSL, 99.9% uptime guarantee,
              and 24/7 customer support.
            </p>

          </div>

        </div>

      </section>
      <ComparePlans />
    </>
  );
};

export default Pricing;