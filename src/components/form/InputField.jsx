

export default function InputField({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
}) {
  return (
    <div className="w-full">

      {/* Label */}
      {label && (
        <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
      />
    </div>
  );
}