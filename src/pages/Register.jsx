import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Heart,
  Utensils,
  Users,
  Truck,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check role
    if (!formData.role) {
      alert("Please select a role.");
      return;
    }

    // Temporary registration storage
    // This will later be replaced by the backend/database.
    const registeredUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
    };

    localStorage.setItem(
      "foodRescueUser",
      JSON.stringify(registeredUser)
    );

    alert("Account created successfully! Please sign in.");

    // Go to login
    navigate("/login");
  };

  const roles = [
    {
      value: "donor",
      title: "Food Donor",
      description: "I have surplus food to donate",
      icon: Utensils,
    },
    {
      value: "ngo",
      title: "NGO / Collector",
      description: "I collect and distribute food",
      icon: Users,
    },
    {
      value: "volunteer",
      title: "Volunteer",
      description: "I want to help with pickups",
      icon: Truck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF7] px-6 py-10">

      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
              <Heart
                size={28}
                className="text-white"
                fill="white"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-slate-900">
              Create your account
            </h1>

            <p className="text-slate-500 mt-2">
              Join the Food Rescue community.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

            </div>

            {/* Phone */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

            </div>

            {/* Role */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-3">
                I want to join as
              </label>

              <div className="grid md:grid-cols-3 gap-3">

                {roles.map((role) => {
                  const Icon = role.icon;
                  const selected = formData.role === role.value;

                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          role: role.value,
                        })
                      }
                      className={`text-left p-4 rounded-xl border-2 transition ${
                        selected
                          ? "border-green-600 bg-green-50"
                          : "border-slate-200 hover:border-green-300"
                      }`}
                    >
                      <Icon
                        size={23}
                        className={
                          selected
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      />

                      <p className="font-semibold text-slate-800 mt-3">
                        {role.title}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {role.description}
                      </p>
                    </button>
                  );
                })}

              </div>

              {!formData.role && (
                <p className="text-xs text-slate-500 mt-2">
                  Please select a role.
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">

              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 accent-green-600"
              />

              <p className="text-sm text-slate-600">
                I agree to the Food Rescue terms and understand that
                food safety requirements must be followed.
              </p>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!formData.role}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-600 mt-7">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;