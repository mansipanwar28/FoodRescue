import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <Heart className="text-white" size={21} fill="white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Food<span className="text-green-600">Rescue</span>
            </h1>
            <p className="text-[10px] text-slate-500 tracking-wider">
              REDUCE • RESCUE • REUSE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-slate-700 hover:text-green-600 font-medium transition"
          >
            Home
          </Link>

          <a
            href="#how-it-works"
            className="text-slate-700 hover:text-green-600 font-medium transition"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-slate-700 hover:text-green-600 font-medium transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-slate-700 hover:text-green-600 font-medium transition"
          >
            Contact
          </a>

          <Link
            to="/login"
            className="text-slate-700 hover:text-green-600 font-semibold transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4">

          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 font-medium"
          >
            How It Works
          </a>

          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 font-medium"
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 font-medium"
          >
            Contact
          </a>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;