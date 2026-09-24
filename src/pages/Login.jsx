import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart, ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login data:", formData);

    // Temporary role-based navigation
    const email = formData.email.toLowerCase();

    if (email.includes("donor")) {
      navigate("/donor");
    } else if (email.includes("ngo")) {
      navigate("/ngo");
    } else if (email.includes("volunteer")) {
      navigate("/volunteer");
    } else if (email.includes("admin")) {
      navigate("/admin");
    } else {
      alert(
        "For testing, use an email containing donor, ngo, volunteer, or admin."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
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
              Welcome back
            </h1>

            <p className="text-slate-500 mt-2">
              Sign in to continue your food rescue journey.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
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
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between items-center mb-2">

                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-green-600"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-600"
              >
                Remember me
              </label>

            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-green-600/20"
            >
              Sign In
            </button>

          </form>

          {/* Register */}
          <p className="text-center text-sm text-slate-600 mt-7">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Create account
            </Link>

          </p>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          FoodRescue • Rescue Food. Reduce Waste. Feed Communities.
        </p>

      </div>

    </div>
  );
}

export default Login;