import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import SearchableSelect from "./SearchableSelect";
import Button from "./Button";
import { bangladeshDistricts } from "../data/districts";
import { coursesList } from "../data/courses";

export default function ReactHookForm({ initialCourse = "" }) {
  // Persisted user list from localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [showUsers, setShowUsers] = useState(false);

  // React Hook Form initialization with touched mode validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      course: initialCourse ? [initialCourse] : [],
    },
  });

  // Automatically sync course selection when redirected from Courses page
  useEffect(() => {
    if (initialCourse) {
      setValue("course", [initialCourse], { shouldValidate: true });
    }
  }, [initialCourse, setValue]);

  // Watch password value to validate confirmPassword match
  const password = watch("password");

  // Save new registration to state and localStorage
  const onSubmit = (data) => {
    const newUser = { id: Date.now(), ...data };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    reset();
  };

  const handleReset = () => {
    reset();
  };

  // Remove a single user record
  const handleDeleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  // Clear all saved user records
  const handleClearAll = () => {
    setUsers([]);
    localStorage.removeItem("users");
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-700/60 relative bg-[#212430]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#b0401d] via-[#c44c25] to-[#df5d2c] [clip-path:polygon(0_65%,100%_50%,100%_100%,0_100%)] md:[clip-path:polygon(40%_0,100%_0,100%_100%,57%_100%)] pointer-events-none transition-all duration-300"
        />

        <div className="relative z-10 flex flex-col md:flex-row w-full">
          <div className="w-full md:w-[50%] p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-serif text-white font-bold text-center mb-6 tracking-wide">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <InputField
                label="Username"
                name="name"
                placeholder="Enter your username"
                register={register}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                }}
                error={errors.name}
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="example@mail.com"
                register={register}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                }}
                error={errors.email}
              />

              <SearchableSelect
                label="Location / District"
                name="district"
                placeholder="Search or select district..."
                options={bangladeshDistricts}
                register={register}
                setValue={setValue}
                watch={watch}
                rules={{
                  required: "This field is required",
                }}
                error={errors.district}
              />

              <SearchableSelect
                label="Preferred Course / Track"
                name="course"
                placeholder="Search or select courses..."
                options={coursesList}
                isMulti={true}
                register={register}
                setValue={setValue}
                watch={watch}
                rules={{
                  validate: (val) =>
                    (Array.isArray(val) && val.length > 0) ||
                    "Please select at least one course",
                }}
                error={errors.course}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                register={register}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                error={errors.password}
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                register={register}
                rules={{
                  required: "This field is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                error={errors.confirmPassword}
              />

              <div className="pt-2">
                <Button type="submit" variant="primary">
                  Sign Up
                </Button>
              </div>

              <div className="text-center font-serif text-xs text-gray-300 pt-1">
                <p>
                  Already have an account?{" "}
                  <span className="font-semibold text-white hover:underline cursor-pointer">
                    Sign In
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700/60">
                <Button variant="link" onClick={() => setShowUsers(!showUsers)}>
                  {showUsers ? "Hide Users" : `Show All Users (${users.length})`}
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </form>
          </div>

          <div className="w-full md:w-[50%] p-8 md:p-10 flex flex-col justify-center items-center text-center min-h-[280px]">
            <h3 className="text-3xl font-serif font-bold text-white tracking-widest leading-tight drop-shadow-sm">
              Form 
              <br />
              validator with
             
            </h3>
            <p className="mt-4 text-xs font-serif text-orange-100/90 leading-relaxed max-w-[220px]">
              Enter your details and start your journey with modern form validation.
            </p>
          </div>
        </div>
      </div>

      {showUsers && (
        <div className="w-full mt-6 bg-[#212430] border border-gray-700/60 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-gray-700">
            <h4 className="text-sm font-serif font-bold text-white tracking-wide">
              Registered Users ({users.length})
            </h4>
            {users.length > 0 && (
              <Button variant="danger" onClick={handleClearAll}>
                Clear All
              </Button>
            )}
          </div>

          <div className="mt-4">
            {users.length === 0 ? (
              <p className="text-xs font-serif text-gray-400 text-center py-4">
                No users saved yet. Submit the form above to add a user.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 bg-[#191b24] border border-gray-700/80 rounded-xl text-xs flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-white font-serif">{user.name}</p>
                      <p className="text-gray-400">{user.email}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <span className="px-2 py-0.5 bg-[#6e3333]/50 text-orange-200 border border-orange-900/40 rounded text-[10px] font-medium uppercase">
                          {user.district}
                        </span>
                        {Array.isArray(user.course) ? (
                          user.course.map((c, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gray-800/80 text-gray-200 border border-gray-700 rounded text-[10px] font-medium"
                            >
                              {c}
                            </span>
                          ))
                        ) : user.course ? (
                          <span className="px-2 py-0.5 bg-gray-800/80 text-gray-200 border border-gray-700 rounded text-[10px] font-medium">
                            {user.course}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
