export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  rules = {},
  error,
}) {
  const isRequired = rules?.required;

  return (
    <div>
      <label className="block text-xs font-serif text-gray-300 mb-1">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...(register ? register(name, rules) : {})}
        className={`w-full bg-transparent border-b pb-1 text-sm text-white placeholder-gray-500 outline-none transition ${
          error
            ? "border-red-400"
            : "border-gray-500 focus:border-orange-400"
        }`}
      />
      {error && (
        <p className="text-[11px] text-red-400 mt-1">{error.message}</p>
      )}
    </div>
  );
}