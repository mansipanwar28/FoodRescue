import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Upload,
  MapPin,
  Clock,
  Info,
  CheckCircle,
} from "lucide-react";

function AddDonation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    quantity: "",
    servings: "",
    preparedAt: "",
    consumeBy: "",
    location: "",
    allergens: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a unique donation ID
    const donationId = `#FR${Date.now().toString().slice(-6)}`;

    // Convert form data into dashboard donation format
    const newDonation = {
      id: donationId,
      food: formData.foodName,
      quantity: `${formData.servings} servings`,
      location: formData.location,
      expiry: formData.consumeBy
        ? new Date(formData.consumeBy).toLocaleString()
        : "Not specified",
      status: "Available",

      // Keep additional information too
      category: formData.category,
      actualQuantity: formData.quantity,
      servings: Number(formData.servings),
      preparedAt: formData.preparedAt,
      consumeBy: formData.consumeBy,
      allergens: formData.allergens,
      description: formData.description,
      imageName: image ? image.name : "",
      createdAt: new Date().toISOString(),
    };

    // Get existing donations
    const existingDonations = JSON.parse(
      localStorage.getItem("foodRescueDonations") || "[]"
    );

    // Add newest donation at the beginning
    const updatedDonations = [
      newDonation,
      ...existingDonations,
    ];

    // Save donations
    localStorage.setItem(
      "foodRescueDonations",
      JSON.stringify(updatedDonations)
    );

    console.log("Donation created:", newDonation);

    alert("Donation listing created successfully!");

    // Return to donor dashboard
    navigate("/donor");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-slate-200">

        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link
            to="/donor"
            className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition"
          >
            <ArrowLeft size={19} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2">

            <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
              <Heart
                size={19}
                className="text-white"
                fill="white"
              />
            </div>

            <span className="font-bold text-lg">
              Food<span className="text-green-600">Rescue</span>
            </span>

          </div>

        </div>

      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* Page Heading */}
        <div className="mb-8">

          <p className="text-green-600 font-semibold text-sm">
            DONATE SURPLUS FOOD
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Create a Food Donation
          </h1>

          <p className="text-slate-500 mt-3 max-w-2xl">
            Provide accurate information about your surplus food so
            verified collectors can safely claim and distribute it.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ================= BASIC INFORMATION ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">

            <div className="flex items-start gap-3 mb-7">

              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Info
                  size={20}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Food Information
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Tell us what food you are donating.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Food Name */}
              <div className="md:col-span-2">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Food Name *
                </label>

                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  placeholder="e.g. Vegetable Biryani"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

              </div>

              {/* Category */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Food Category *
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="cooked-meal">
                    Cooked Meal
                  </option>

                  <option value="bakery">
                    Bakery
                  </option>

                  <option value="fruits">
                    Fruits
                  </option>

                  <option value="vegetables">
                    Vegetables
                  </option>

                  <option value="packaged">
                    Packaged Food
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>

              </div>

              {/* Quantity */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Quantity *
                </label>

                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 10 kg"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

              </div>

              {/* Servings */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Estimated Servings *
                </label>

                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

              </div>

            </div>

          </section>

          {/* ================= TIME ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">

            <div className="flex items-start gap-3 mb-7">

              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Clock
                  size={20}
                  className="text-orange-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Food Safety & Timing
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Accurate timing helps collectors prioritize food.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Prepared At */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Prepared / Packed At *
                </label>

                <input
                  type="datetime-local"
                  name="preparedAt"
                  value={formData.preparedAt}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* Consume By */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Consume By *
                </label>

                <input
                  type="datetime-local"
                  name="consumeBy"
                  value={formData.consumeBy}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

            </div>

            <div className="mt-5 bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">

              <Info
                size={18}
                className="text-orange-600 shrink-0 mt-0.5"
              />

              <p className="text-sm text-orange-800">
                Please only list food that is safe for human
                consumption and provide an accurate consume-by time.
              </p>

            </div>

          </section>

          {/* ================= PICKUP LOCATION ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">

            <div className="flex items-start gap-3 mb-7">

              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <MapPin
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Pickup Location
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Where should the collector pick up the food?
                </p>
              </div>

            </div>

            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter complete pickup address"
              rows="3"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-green-500"
            />

            <p className="text-xs text-slate-500 mt-2">
              Example: Shop 12, Main Market, Sector 62, Noida
            </p>

          </section>

          {/* ================= IMAGE ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">

            <div className="flex items-start gap-3 mb-7">

              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Upload
                  size={20}
                  className="text-purple-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Food Image
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a clear image of the food.
                </p>
              </div>

            </div>

            <label className="block border-2 border-dashed border-slate-300 hover:border-green-400 rounded-2xl p-8 text-center cursor-pointer transition">

              <Upload
                size={32}
                className="mx-auto text-slate-400"
              />

              <p className="font-semibold text-slate-700 mt-3">
                {image
                  ? image.name
                  : "Upload food image"}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                PNG, JPG or JPEG up to 5MB
              </p>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          </section>

          {/* ================= EXTRA DETAILS ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">

            <h2 className="text-xl font-bold">
              Additional Details
            </h2>

            <p className="text-sm text-slate-500 mt-1 mb-6">
              Add information that may be important for the collector.
            </p>

            {/* Allergens */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Allergens
              </label>

              <input
                type="text"
                name="allergens"
                value={formData.allergens}
                onChange={handleChange}
                placeholder="e.g. Contains dairy, nuts"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            {/* Description */}
            <div className="mt-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description / Instructions
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add any important instructions..."
                rows="4"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-green-500"
              />

            </div>

          </section>

          {/* ================= SAFETY CHECK ================= */}
          <section className="bg-green-50 border border-green-200 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle
                size={21}
                className="text-green-600 shrink-0 mt-0.5"
              />

              <div>

                <p className="font-semibold text-green-800">
                  Food Safety Confirmation
                </p>

                <p className="text-sm text-green-700 mt-1">
                  By submitting this donation, you confirm that the
                  food is safe for human consumption and the information
                  provided is accurate.
                </p>

              </div>

            </div>

          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pb-10">

            <Link
              to="/donor"
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-center hover:bg-white transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-lg shadow-green-600/20"
            >
              Create Donation Listing
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default AddDonation;