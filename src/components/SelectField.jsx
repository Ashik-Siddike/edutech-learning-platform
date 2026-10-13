export default function SelectField({
  label,
  name,
  options = [],
  placeholder = "Select an option...",
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
      <select
        {...(register ? register(name, rules) : {})}
        className={`w-full bg-[#070b14] border-b pb-1 text-sm text-white outline-none transition ${
          error
            ? "border-red-400"
            : "border-white/20 focus:border-cyan-400"
        }`}
      >
        {placeholder && (
          <option value="" className="bg-[#070b14] text-slate-400">
            {placeholder}
          </option>
        )}
        {options.map((item) => (
          <option
            key={item.value || item}
            value={item.value || item}
            className="bg-[#070b14]"
          >
            {item.label || item}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[11px] text-red-400 mt-1">{error.message}</p>
      )}
    </div>
  );
}
