import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4002";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.password.trim()) return "Password is required";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) return "Email is invalid";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSignup = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/deepseekai/signup`,
        formData,
        {
          withCredentials: true,
        }
      );

      alert(data.message || "Signup Succeeded");
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.errors ||
        err?.response?.data?.message ||
        err.message ||
        "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="DeepSeek Logo"
          className="mx-auto mb-4 w-20 h-20"
        />

        {/* Heading */}
        <h1 className="text-white text-center text-2xl font-semibold mb-4">
          Signup
        </h1>

        {/* First Name */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4 mt-2 relative">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-3 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <span className="text-red-600 text-sm mb-4 block">{error}</span>
        )}

        {/* Terms & Condition */}
        <p className="text-xs text-gray-400 mt-4 mb-6">
          By signing up or logging in, you consent to DeepSeek's{" "}
          <a className="underline" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="underline" href="#">
            Privacy Policy
          </a>
          .
        </p>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <Link
            to="/login"
            className="text-[#7a6ff6] hover:underline cursor-pointer"
          >
            Already registered? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
