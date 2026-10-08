import { useState, useRef, useEffect } from "react";

export default function SearchableSelect({
  label,
  name,
  options = [],
  placeholder = "Select an option...",
  isMulti = false,
  register,
  setValue,
  watch,
  rules = {},
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const rawValue = watch ? watch(name) : undefined;
  const selectedArray = Array.isArray(rawValue) ? rawValue : [];
  const selectedSingle = typeof rawValue === "string" ? rawValue : "";
  const isRequired = rules?.required;

  // Sync display value with form state changes or reset
  useEffect(() => {
    if (isMulti) {
      if (setValue && (!rawValue || !Array.isArray(rawValue))) {
        setValue(name, [], { shouldValidate: false });
      }
    } else {
      if (selectedSingle) {
        const match = options.find((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          return val === selectedSingle;
        });
        if (match) {
          setSearchTerm(typeof match === "string" ? match : match.label);
        } else {
          setSearchTerm(selectedSingle);
        }
      } else {
        setSearchTerm("");
      }
    }
  }, [selectedSingle, rawValue, isMulti, options]);

  // Close dropdown when clicking outside component
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (!isMulti) {
          if (!selectedSingle) {
            setSearchTerm("");
          } else {
            const match = options.find((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              return val === selectedSingle;
            });
            setSearchTerm(match ? (typeof match === "string" ? match : match.label) : selectedSingle);
          }
        } else {
          setSearchTerm("");
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedSingle, isMulti, options]);

  // Real-time case-insensitive search filter
  const filteredOptions = options.filter((opt) => {
    const text = typeof opt === "string" ? opt : opt.label;
    return text.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  // Handle option selection for single and multi-select modes
  const handleSelect = (option) => {
    const value = typeof option === "string" ? option : option.value;
    const text = typeof option === "string" ? option : option.label;

    if (isMulti) {
      let updated;
      if (selectedArray.includes(value)) {
        updated = selectedArray.filter((v) => v !== value);
      } else {
        updated = [...selectedArray, value];
      }
      if (setValue) {
        setValue(name, updated, { shouldValidate: true });
      }
      setSearchTerm("");
    } else {
      setSearchTerm(text);
      if (setValue) {
        setValue(name, value, { shouldValidate: true });
      }
      setIsOpen(false);
    }
  };

  // Remove tag chip in multi-select mode
  const handleRemoveItem = (itemToRemove) => {
    if (isMulti && setValue) {
      const updated = selectedArray.filter((v) => v !== itemToRemove);
      setValue(name, updated, { shouldValidate: true });
    }
  };

  // Handle typing inside search input
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setIsOpen(true);
    if (!isMulti && val === "" && setValue) {
      setValue(name, "", { shouldValidate: true });
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {register && (
        <input type="hidden" {...register(name, rules)} />
      )}

      {label && (
        <label className="block text-xs font-serif text-gray-300 mb-1">
          {label} {isRequired && <span className="text-red-400">*</span>}
        </label>
      )}

      {isMulti && selectedArray.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1.5 pt-0.5">
          {selectedArray.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#6e3333] text-orange-200 text-xs rounded border border-orange-900/50"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(item);
                }}
                className="text-orange-300 hover:text-white font-bold text-xs"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={isMulti && selectedArray.length > 0 ? "Add more..." : placeholder}
          autoComplete="off"
          className={`w-full bg-transparent border-b pb-1 pr-6 text-sm text-white placeholder-gray-500 outline-none transition ${
            error
              ? "border-red-400"
              : "border-gray-500 focus:border-orange-400"
          }`}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-0 top-1 text-gray-400 hover:text-white transition-transform duration-200"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {error && (
        <p className="text-[11px] text-red-400 mt-1">{error.message}</p>
      )}

      {isOpen && (
        <ul className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#191b24] border border-gray-700 rounded-lg shadow-2xl py-1 text-xs">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const text = typeof opt === "string" ? opt : opt.label;
              const isSelected = isMulti
                ? selectedArray.includes(val)
                : selectedSingle === val;

              return (
                <li
                  key={index}
                  onClick={() => handleSelect(opt)}
                  className={`px-3 py-2 cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? "bg-[#6e3333] text-white font-medium"
                      : "text-gray-300 hover:bg-[#6e3333]/50 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isMulti && (
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isSelected
                            ? "bg-orange-500 border-orange-400 text-white font-bold"
                            : "border-gray-500 bg-transparent text-transparent"
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    )}
                    <span>{text}</span>
                  </span>

                  {!isMulti && isSelected && (
                    <svg className="w-3.5 h-3.5 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-3 text-center text-gray-400">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
