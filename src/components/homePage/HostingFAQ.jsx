import { useState } from "react";


const faqs = [
  {
    question: "What is web hosting and why do I need it?",
    answer:
      "Web hosting is a service that stores your website files on a server so people can access your website online. Without hosting, your website cannot be live on the internet.",
  },
  {
    question: "How can I buy a hosting plan?",
    answer:
      "You can choose a hosting plan from our website, select your package, and complete the payment process. After that, your hosting will be activated instantly.",
  },
  {
    question: "What kind of support does web hosting have?",
    answer:
      "We provide 24/7 customer support via live chat, email, and tickets to help you with technical or account-related issues anytime.",
  },
  {
    question: "Do you offer a web hosting and domain package?",
    answer:
      "Yes, we offer bundled packages that include both domain and hosting for a complete website setup at a discounted price.",
  },
  {
    question: "What is the difference between hosting and domain?",
    answer:
      "A domain is your website address (like example.com), while hosting is the space where your website files are stored. Both are required to run a website.",
  },
  {
    question: "What are CPU, RAM, inode and disk limits in hosting?",
    answer:
      "These are resource limits that control website performance. CPU and RAM handle processing power, disk is storage space, and inodes are the number of files allowed on your hosting account.",
  },
  {
    question: "Can I migrate my existing website to HostMost?",
    answer:
      "Yes, we provide free website migration so you can easily move your existing website without downtime or data loss.",
  },
  {
    question: "Do I need web hosting for WordPress?",
    answer:
      "Yes, WordPress requires hosting to store your website files and make it accessible online. We also offer optimized WordPress hosting.",
  },
  {
    question: "What are the benefits of managed hosting?",
    answer:
      "Managed hosting provides automatic updates, security monitoring, backups, and performance optimization so you can focus on your website instead of server management.",
  },
  {
    question: "Do I need technical knowledge to use hosting services?",
    answer:
      "No, our hosting is beginner-friendly with an easy control panel, so you can manage everything without technical skills.",
  },
  {
    question: "Does managed hosting come with a control panel?",
    answer:
      "Yes, you get a powerful control panel where you can manage domains, emails, files, databases, and more easily.",
  },
  {
    question: "What server locations do you provide?",
    answer:
      "We provide multiple global server locations including USA, Europe, and Asia to ensure fast loading speed for all users.",
  },
];


const HostingFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Web Hosting FAQs
          </h2>
          <p className="text-gray-500 mt-3">
            Everything you need to know about our hosting services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">

          {faqs.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden shadow-sm"
            >

              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-800">
                  {item.question}
                </span>

                <span className="text-xl text-gray-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${activeIndex === index
                    ? "max-h-40 py-4"
                    : "max-h-0"
                  }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HostingFAQ;