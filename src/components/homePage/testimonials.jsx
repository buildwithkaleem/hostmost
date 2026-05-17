import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ali Raza",
    role: "Frontend Developer",
    review:
      "HostMost is super fast and reliable. My websites load instantly and support is always helpful.",
  },
  {
    name: "Sara Khan",
    role: "UI/UX Designer",
    review:
      "Amazing hosting experience! Clean dashboard, easy setup, and great performance.",
  },
  {
    name: "Hassan Ahmed",
    role: "Freelancer",
    review:
      "I switched from another hosting and instantly noticed better speed and uptime.",
  },
  {
    name: "Usman Ali",
    role: "Backend Developer",
    review:
      "Server performance is excellent and deployment is very smooth.",
  },
  {
    name: "Ayesha Malik",
    role: "Graphic Designer",
    review:
      "Simple UI and very user-friendly experience. I love it!",
  },
  {
    name: "Bilal Shah",
    role: "Entrepreneur",
    review:
      "Best hosting I’ve used so far. Reliable and affordable.",
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  const cardsToShow = 3;
  const total = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + cardsToShow >= total ? 0 : prev + cardsToShow
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What our customers say
          </h2>
          <p className="text-gray-500 mt-3">
            Real feedback from developers and businesses using HostMost
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(total / cardsToShow) * 100}%`,
              transform: `translateX(-${index * (100 / total)}%)`,
            }}
          >

            {testimonials.map((item, i) => (
              <div
                key={i}
                className="w-1/3 px-4"
              >
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border h-full">

                  <div className="text-indigo-600 text-3xl">“</div>

                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {item.review}
                  </p>

                  <div className="mt-6 flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold uppercase">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.role}
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;