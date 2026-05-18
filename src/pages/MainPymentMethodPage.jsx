import { useState } from "react";
import { FaCreditCard, FaLock } from "react-icons/fa";
import { api } from "../lib/api";
import { useNavigate } from "react-router";

const MainPymentMethodPage = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    cardType: "visa",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvn: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key] && key !== "addressLine2") {
        return `${key} is required`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await api("/auth/method-create", "POST", formData);

      setSuccess(res?.message || "Payment method added successfully!");

      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        zipCode: "",
        phoneNumber: "",
        cardType: "",
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        cvn: "",
      });

      navigate('/success')

    } catch (error) {
      console.log(error);

      // 🔥 SAFE ERROR HANDLING
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      setError(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20">

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">

          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200">

            <FaLock className="text-sm" />

            Secure Payment

          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">
            Add Payment Method
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Your payment information is encrypted and securely processed.
          </p>


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT CARD */}
          <div className="lg:col-span-1">

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl sticky top-28">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-indigo-100">
                    Payment Card
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {formData.cardType}
                  </h2>
                </div>

                <FaCreditCard className="text-4xl opacity-80" />

              </div>

              <div className="mt-16">

                <p className="text-sm text-indigo-100 mb-2">
                  Card Number
                </p>

                <h3 className="text-2xl tracking-widest font-semibold">
                  {formData.cardNumber || "•••• •••• •••• ••••"}
                </h3>

              </div>

              <div className="flex justify-between mt-10">

                <div>
                  <p className="text-sm text-indigo-100 mb-1">
                    Card Holder
                  </p>

                  <h4 className="font-semibold uppercase">
                    {formData.firstName || "YOUR"}{" "}
                    {formData.lastName || "NAME"}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-indigo-100 mb-1">
                    Expires
                  </p>

                  <h4 className="font-semibold">
                    {formData.expirationMonth || "MM"}/
                    {formData.expirationYear || "YY"}
                  </h4>
                </div>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="lg:col-span-2">

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border shadow-sm p-8 md:p-10"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1
                  </label>

                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Street address"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Address 2 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>

                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* ZIP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>

                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Card Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Type
                  </label>

                  <select
                    name="cardType"
                    value={formData.cardType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {/* <option>select</option> */}
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="amex">American Express</option>
                  </select>
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>

                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Month
                  </label>

                  <input
                    type="number"
                    name="expirationMonth"
                    value={formData.expirationMonth}
                    onChange={handleChange}
                    placeholder="MM"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Year
                  </label>

                  <input
                    type="text"
                    name="expirationYear"
                    value={formData.expirationYear}
                    onChange={handleChange}
                    placeholder="YY"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* CVN */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVN / CVC
                  </label>

                  <input
                    type="password"
                    name="cvn"
                    value={formData.cvn}
                    onChange={handleChange}
                    placeholder="••••"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

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
                disabled={loading || !formData.firstName}
                className="w-full cursor-pointer mt-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition shadow-lg disabled:opacity-70"
              >
                {loading ? "Processing..." : "Add Payment Method"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default MainPymentMethodPage;