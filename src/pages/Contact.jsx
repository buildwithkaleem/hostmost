import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { api } from "../lib/api";

const Contact = () => {
  

  const [loading,setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    subject:"",
    message:"",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const hendelContect = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");
      setSuccess("");

      const res = await api(
        "/auth/contect",
        "POST",
        formData
      );

      setSuccess(
        res?.message || "Message sent successfully"
      );

      // ✅ clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {

      // console.log(error);

      setError(
        error?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <section className="bg-gray-50 min-h-screen py-20">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            Contact Us
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-5">
            We’d love to hear from you
          </h1>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            Have questions about hosting, domains, or support?
            Our team is always ready to help you.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Info */}
          <div className="sticky lg:top-28" >

            <div className="bg-white rounded-3xl p-8 shadow-sm border ">

              <h2 className="text-2xl font-bold text-gray-900">
                Contact Information
              </h2>

              <p className="text-gray-500 mt-3">
                Reach out to us anytime through email, phone,
                or visit our office location.
              </p>

              {/* Contact Items */}
              <div className="mt-10 space-y-6">

                {/* Email */}
                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Email Address
                    </h4>

                    <p className="text-gray-500 mt-1">
                      support@hostmost.com
                    </p>
                  </div>

                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Phone Number
                    </h4>

                    <p className="text-gray-500 mt-1">
                      +1 (234) 567-890
                    </p>
                  </div>

                </div>

                {/* Address */}
                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Office Address
                    </h4>

                    <p className="text-gray-500 mt-1">
                      422 E 72nd St, New York, NY 10021
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border">

              <h2 className="text-2xl font-bold text-gray-900">
                Send us a message
              </h2>

              <p className="text-gray-500 mt-3">
                Fill out the form and our team will get back to you shortly.
              </p>

              <form className="mt-8 space-y-6" onSubmit={hendelContect} >

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    rows="5"
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  ></textarea>
                </div>

                {/* error handling */}
                {error && (
                  <div className="my-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div className="my-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
                    ✅ {success}
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Contact;