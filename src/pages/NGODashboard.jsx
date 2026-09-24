import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Package,
  CheckCircle,
  Heart,
  Bell,
  LogOut,
  Menu,
  X,
  MapPin,
  Clock,
  Users,
  Utensils,
  ArrowUpRight,
  Filter,
} from "lucide-react";

function NGODashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showClaims, setShowClaims] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // ================= DEMO DONATIONS =================

  const demoDonations = [
    {
      id: "FR1028",
      food: "Vegetable Biryani",
      category: "Cooked Meal",
      quantity: "12 kg",
      servings: 60,
      location: "Indirapuram, Ghaziabad",
      distance: "2.4 km",
      consumeBy: "Today, 8:00 PM",
      donor: "Green Leaf Restaurant",
      status: "Available",
    },
    {
      id: "FR1027",
      food: "Fresh Chapati & Dal",
      category: "Cooked Meal",
      quantity: "8 kg",
      servings: 40,
      location: "Vaishali, Ghaziabad",
      distance: "3.1 km",
      consumeBy: "Today, 7:30 PM",
      donor: "Community Kitchen",
      status: "Available",
    },
    {
      id: "FR1026",
      food: "Bread & Sandwiches",
      category: "Bakery",
      quantity: "6 kg",
      servings: 30,
      location: "Kaushambi, Ghaziabad",
      distance: "4.2 km",
      consumeBy: "Today, 9:00 PM",
      donor: "Daily Bakes",
      status: "Available",
    },
    {
      id: "FR1025",
      food: "Fresh Fruits",
      category: "Fruits",
      quantity: "15 kg",
      servings: 50,
      location: "Sector 62, Noida",
      distance: "6.8 km",
      consumeBy: "Tomorrow, 10:00 AM",
      donor: "Fresh Mart",
      status: "Available",
    },
  ];

  // ================= CATEGORY FORMATTER =================

  function formatCategory(value) {
    if (!value) return "Other";

    const categoryMap = {
      "cooked-meal": "Cooked Meal",
      bakery: "Bakery",
      fruits: "Fruits",
      vegetables: "Vegetables",
      packaged: "Packaged Food",
      other: "Other",
    };

    return categoryMap[value] || value;
  }

  // ================= GET DONATIONS =================

  const savedDonations = JSON.parse(
    localStorage.getItem("foodRescueDonations") || "[]"
  );

  // Convert donor donation format into NGO format
  const donorDonations = savedDonations.map((donation) => ({
    id: donation.id.replace("#", ""),
    food: donation.food,
    category: formatCategory(donation.category),
    quantity: donation.actualQuantity || donation.quantity,
    servings: donation.servings || 0,
    location: donation.location,
    distance: "Nearby",
    consumeBy: donation.consumeBy
      ? new Date(donation.consumeBy).toLocaleString()
      : "Not specified",
    donor: "Food Rescue Donor",
    status: donation.status || "Available",
    claimedBy: donation.claimedBy,
    claimedAt: donation.claimedAt,
    pickupStartedAt: donation.pickupStartedAt,
    completedAt: donation.completedAt,
    description: donation.description,
    allergens: donation.allergens,
    preparedAt: donation.preparedAt,
    imageName: donation.imageName,
    createdAt: donation.createdAt,
  }));

  // Combine demo + real frontend donations
  const allDonations = [...donorDonations, ...demoDonations];

  // ================= AVAILABLE DONATIONS =================

  const availableDonations = allDonations.filter(
    (donation) => donation.status === "Available"
  );

  // ================= SEARCH + CATEGORY FILTER =================

  const filteredDonations = availableDonations.filter((donation) => {
    const matchesCategory =
      category === "All" || donation.category === category;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      donation.food.toLowerCase().includes(search) ||
      donation.location.toLowerCase().includes(search) ||
      donation.donor.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  // ================= CLAIMED DONATIONS =================

  const claimedDonations = allDonations.filter(
    (donation) => donation.status === "Claimed"
  );

  // ================= PICKUP IN PROGRESS =================

  const pickupDonations = allDonations.filter(
    (donation) => donation.status === "Pickup in Progress"
  );

  // ================= COMPLETED DONATIONS =================

  const completedDonations = allDonations.filter(
    (donation) => donation.status === "Completed"
  );

  // ================= STATISTICS =================

  const mealsDistributed = completedDonations.reduce(
    (total, donation) => total + (Number(donation.servings) || 0),
    0
  );

  const stats = [
    {
      title: "Available Donations",
      value: availableDonations.length,
      icon: Package,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Claimed",
      value: claimedDonations.length,
      icon: CheckCircle,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Pickup Active",
      value: pickupDonations.length,
      icon: Clock,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Meals Distributed",
      value: mealsDistributed.toLocaleString(),
      icon: Users,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  // ================= CATEGORIES =================

  const categories = [
    "All",
    "Cooked Meal",
    "Bakery",
    "Fruits",
    "Vegetables",
    "Packaged Food",
  ];

  // ================= CLAIM FOOD =================

  const handleClaim = (donationId) => {
    const confirmed = window.confirm(
      "Do you want to claim this food donation?"
    );

    if (!confirmed) return;

    const savedDonations = JSON.parse(
      localStorage.getItem("foodRescueDonations") || "[]"
    );

    const updatedDonations = savedDonations.map((donation) => {
      if (donation.id === `#${donationId}`) {
        return {
          ...donation,
          status: "Claimed",
          claimedBy: "Helping Hands NGO",
          claimedAt: new Date().toISOString(),
        };
      }

      return donation;
    });

    localStorage.setItem(
      "foodRescueDonations",
      JSON.stringify(updatedDonations)
    );

    alert("Food donation claimed successfully!");

    window.location.reload();
  };

  // ================= START PICKUP =================

  const handleStartPickup = (donationId) => {
    const confirmed = window.confirm(
      "Are you ready to start pickup for this donation?"
    );

    if (!confirmed) return;

    const savedDonations = JSON.parse(
      localStorage.getItem("foodRescueDonations") || "[]"
    );

    const updatedDonations = savedDonations.map((donation) => {
      if (donation.id === `#${donationId}`) {
        return {
          ...donation,
          status: "Pickup in Progress",
          pickupStartedAt: new Date().toISOString(),
        };
      }

      return donation;
    });

    localStorage.setItem(
      "foodRescueDonations",
      JSON.stringify(updatedDonations)
    );

    alert("Pickup started successfully!");

    window.location.reload();
  };

  // ================= COMPLETE PICKUP =================

  const handleCompletePickup = (donationId) => {
    const confirmed = window.confirm(
      "Have you successfully picked up and delivered this food?"
    );

    if (!confirmed) return;

    const savedDonations = JSON.parse(
      localStorage.getItem("foodRescueDonations") || "[]"
    );

    const updatedDonations = savedDonations.map((donation) => {
      if (donation.id === `#${donationId}`) {
        return {
          ...donation,
          status: "Completed",
          completedAt: new Date().toISOString(),
        };
      }

      return donation;
    });

    localStorage.setItem(
      "foodRescueDonations",
      JSON.stringify(updatedDonations)
    );

    alert("Donation marked as completed!");

    window.location.reload();
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("foodRescueUser");
    navigate("/");
  };

  // ================= RENDER =================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= MOBILE HEADER ================= */}

      <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between sticky top-0 z-40">

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

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-700"
        >
          {sidebarOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50
            w-64 h-screen bg-slate-950 text-white
            flex flex-col
            transition-transform duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >

          {/* Logo */}

          <div className="px-6 py-6 border-b border-slate-800">

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">

                <Heart
                  size={21}
                  fill="white"
                />

              </div>

              <div>

                <p className="font-bold text-lg">
                  Food<span className="text-green-400">Rescue</span>
                </p>

                <p className="text-xs text-slate-400">
                  NGO / Collector Portal
                </p>

              </div>

            </Link>

          </div>

          {/* Navigation */}

          <nav className="flex-1 px-4 py-6 space-y-2">

            {/* Dashboard */}

            <Link
              to="/ngo"
              onClick={() => {
                setShowClaims(false);
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-600 text-white font-medium"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            {/* Find Food */}

            <button
              onClick={() => {
                setShowClaims(false);

                document
                  .getElementById("available-food")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });

                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <Search size={19} />
              Find Food
            </button>

            {/* My Claims */}

            <button
              onClick={() => {
                setShowClaims("claims");
                setSidebarOpen(false);

                setTimeout(() => {
                  document
                    .getElementById("my-claims")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <Package size={19} />
              My Claims
            </button>

            {/* Completed */}

            <button
              onClick={() => {
                setShowClaims("completed");
                setSidebarOpen(false);

                setTimeout(() => {
                  document
                    .getElementById("completed-donations")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <CheckCircle size={19} />
              Completed
            </button>

          </nav>

          {/* Logout */}

          <div className="px-4 py-5 border-t border-slate-800">

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
            >
              <LogOut size={19} />
              Logout
            </button>

          </div>

        </aside>

        {/* Overlay */}

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* ================= MAIN ================= */}

        <main className="flex-1 min-w-0">

          {/* ================= TOPBAR ================= */}

          <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-5 items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                NGO / Collector Dashboard
              </p>

              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Find food to rescue 👋
              </h1>

            </div>

            <div className="flex items-center gap-5">

              <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">

                <Bell size={19} />

                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />

              </button>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  N
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Helping Hands NGO
                  </p>

                  <p className="text-xs text-slate-500">
                    Verified Collector
                  </p>

                </div>

              </div>

            </div>

          </header>

          {/* ================= CONTENT ================= */}

          <div className="p-5 md:p-8 max-w-7xl mx-auto">

            {/* Mobile Welcome */}

            <div className="lg:hidden mb-7">

              <p className="text-sm text-slate-500">
                NGO / Collector Dashboard
              </p>

              <h1 className="text-2xl font-bold mt-1">
                Find food to rescue 👋
              </h1>

            </div>

            {/* ================= STATS ================= */}

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

              {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="bg-white border border-slate-200 rounded-2xl p-5"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-sm text-slate-500">
                          {stat.title}
                        </p>

                        <p className="text-3xl font-bold text-slate-900 mt-2">
                          {stat.value}
                        </p>

                      </div>

                      <div
                        className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center`}
                      >

                        <Icon
                          size={21}
                          className={stat.color}
                        />

                      </div>

                    </div>

                  </div>
                );

              })}

            </div>

            {/* ================= SEARCH ================= */}

            {!showClaims && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 mt-7">

                <div className="flex flex-col lg:flex-row gap-4">

                  <div className="relative flex-1">

                    <Search
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      placeholder="Search food, donor or location..."
                      className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                    />

                  </div>

                  <button className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50">
                    <Filter size={18} />
                    Filters
                  </button>

                </div>

                {/* Categories */}

                <div className="flex gap-2 overflow-x-auto mt-5 pb-1">

                  {categories.map((item) => (

                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${
                        category === item
                          ? "bg-green-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>
            )}

            {/* ================= AVAILABLE FOOD ================= */}

            {!showClaims && (
              <div
                id="available-food"
                className="mt-7"
              >

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-xl font-bold">
                      Available Food Nearby
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Donations currently available for pickup.
                    </p>

                  </div>

                  <span className="text-sm text-slate-500">
                    {filteredDonations.length} listings
                  </span>

                </div>

                {/* Cards */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                  {filteredDonations.map((donation) => (

                    <div
                      key={donation.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                    >

                      {/* Image */}

                      <div className="h-36 bg-gradient-to-br from-green-100 via-emerald-50 to-yellow-50 flex items-center justify-center">

                        <Utensils
                          size={42}
                          className="text-green-600"
                        />

                      </div>

                      <div className="p-5">

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-xs text-green-600 font-semibold uppercase">
                              {donation.category}
                            </p>

                            <h3 className="text-lg font-bold text-slate-900 mt-1">
                              {donation.food}
                            </h3>

                          </div>

                          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                            Available
                          </span>

                        </div>

                        {/* Details */}

                        <div className="grid grid-cols-2 gap-3 mt-5">

                          <div>

                            <p className="text-xs text-slate-400">
                              Quantity
                            </p>

                            <p className="text-sm font-semibold text-slate-700 mt-1">
                              {donation.quantity}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-slate-400">
                              Servings
                            </p>

                            <p className="text-sm font-semibold text-slate-700 mt-1">
                              {donation.servings} meals
                            </p>

                          </div>

                        </div>

                        {/* Location */}

                        <div className="flex items-start gap-2 mt-5 text-sm text-slate-600">

                          <MapPin
                            size={16}
                            className="text-green-600 shrink-0 mt-0.5"
                          />

                          <div>

                            <p>{donation.location}</p>

                            <p className="text-xs text-slate-400 mt-0.5">
                              {donation.distance} away
                            </p>

                          </div>

                        </div>

                        {/* Expiry */}

                        <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">

                          <Clock
                            size={16}
                            className="text-orange-500"
                          />

                          <span>
                            Consume by {donation.consumeBy}
                          </span>

                        </div>

                        {/* Donor */}

                        <p className="text-xs text-slate-400 mt-4">

                          Donated by{" "}

                          <span className="font-medium text-slate-600">
                            {donation.donor}
                          </span>

                        </p>

                        {/* Actions */}

                        <div className="flex gap-2 mt-5">

                          <button
                            onClick={() => setSelectedDonation(donation)}
                            className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg text-sm font-semibold transition"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() =>
                              handleClaim(donation.id)
                            }
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
                          >
                            Claim Food
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* Empty State */}

                {filteredDonations.length === 0 && (

                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

                    <Package
                      size={40}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="font-semibold text-slate-800 mt-4">
                      No donations found
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Try another search or food category.
                    </p>

                  </div>

                )}

              </div>
            )}

            {/* ================= MY CLAIMS ================= */}

            {showClaims === "claims" && (
              <div
                id="my-claims"
                className="mt-7"
              >

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-xl font-bold">
                      My Claimed Food
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Food donations you have claimed for pickup.
                    </p>

                  </div>

                  <button
                    onClick={() => setShowClaims(false)}
                    className="text-sm text-slate-500 hover:text-slate-800 font-medium"
                  >
                    Back to Available Food
                  </button>

                </div>

                {/* Claimed + Pickup in Progress */}

                {claimedDonations.length > 0 ? (

                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {claimedDonations.map((donation) => (

                      <div
                        key={donation.id}
                        className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-xs text-blue-600 font-semibold uppercase">
                              {donation.category}
                            </p>

                            <h3 className="text-lg font-bold text-slate-900 mt-1">
                              {donation.food}
                            </h3>

                          </div>

                          <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">
                            Claimed
                          </span>

                        </div>

                        {/* Donation details */}

                        <div className="space-y-3 mt-5">

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <Package
                              size={16}
                              className="text-blue-600"
                            />

                            <span>
                              {donation.quantity}
                            </span>

                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <Users
                              size={16}
                              className="text-blue-600"
                            />

                            <span>
                              {donation.servings} meals
                            </span>

                          </div>

                          <div className="flex items-start gap-2 text-sm text-slate-600">

                            <MapPin
                              size={16}
                              className="text-blue-600 shrink-0 mt-0.5"
                            />

                            <span>
                              {donation.location}
                            </span>

                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <Clock
                              size={16}
                              className="text-orange-500"
                            />

                            <span>
                              Consume by {donation.consumeBy}
                            </span>

                          </div>

                        </div>

                        {/* Claim information */}

                        <div className="mt-5 pt-4 border-t border-slate-100">

                          <p className="text-xs text-slate-400">
                            Claimed by
                          </p>

                          <p className="text-sm font-semibold text-slate-700 mt-1">
                            {donation.claimedBy ||
                              "Helping Hands NGO"}
                          </p>

                          {donation.claimedAt && (
                            <p className="text-xs text-slate-400 mt-1">
                              Claimed on{" "}
                              {new Date(
                                donation.claimedAt
                              ).toLocaleString()}
                            </p>
                          )}

                        </div>

                        {/* Start Pickup */}

                        <button
                          onClick={() =>
                            handleStartPickup(donation.id)
                          }
                          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
                        >
                          Start Pickup
                        </button>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

                    <Package
                      size={42}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="font-semibold text-slate-800 mt-4">
                      No claimed donations yet
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Claim available food to see it here.
                    </p>

                    <button
                      onClick={() => setShowClaims(false)}
                      className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
                    >
                      Find Food
                    </button>

                  </div>

                )}

                {/* ================= PICKUP IN PROGRESS ================= */}

                {pickupDonations.length > 0 && (

                  <div className="mt-10">

                    <div className="mb-5">

                      <h2 className="text-xl font-bold">
                        Active Pickups
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Donations currently being picked up.
                      </p>

                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                      {pickupDonations.map((donation) => (

                        <div
                          key={donation.id}
                          className="bg-white border border-orange-200 rounded-2xl p-5"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <p className="text-xs text-orange-600 font-semibold uppercase">
                                {donation.category}
                              </p>

                              <h3 className="text-lg font-bold text-slate-900 mt-1">
                                {donation.food}
                              </h3>

                            </div>

                            <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-semibold">
                              Pickup Active
                            </span>

                          </div>

                          <div className="space-y-3 mt-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600">

                              <Package
                                size={16}
                                className="text-orange-600"
                              />

                              <span>
                                {donation.quantity}
                              </span>

                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600">

                              <Users
                                size={16}
                                className="text-orange-600"
                              />

                              <span>
                                {donation.servings} meals
                              </span>

                            </div>

                            <div className="flex items-start gap-2 text-sm text-slate-600">

                              <MapPin
                                size={16}
                                className="text-orange-600 shrink-0 mt-0.5"
                              />

                              <span>
                                {donation.location}
                              </span>

                            </div>

                            {donation.pickupStartedAt && (
                              <div className="flex items-center gap-2 text-sm text-slate-600">

                                <Clock
                                  size={16}
                                  className="text-orange-500"
                                />

                                <span>
                                  Started{" "}
                                  {new Date(
                                    donation.pickupStartedAt
                                  ).toLocaleString()}
                                </span>

                              </div>
                            )}

                          </div>

                          <button
                            onClick={() =>
                              handleCompletePickup(donation.id)
                            }
                            className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
                          >
                            Mark as Completed
                          </button>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>
            )}

            {/* ================= COMPLETED DONATIONS ================= */}

            {showClaims === "completed" && (
              <div
                id="completed-donations"
                className="mt-7"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold">
                      Completed Donations
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Food rescue deliveries that have been successfully completed.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowClaims(false)}
                    className="text-sm text-slate-500 hover:text-slate-800 font-medium"
                  >
                    Back to Available Food
                  </button>
                </div>

                {completedDonations.length > 0 ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {completedDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="bg-white border border-green-200 rounded-2xl p-5 hover:shadow-lg transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs text-green-600 font-semibold uppercase">
                              {donation.category}
                            </p>
                            <h3 className="text-lg font-bold text-slate-900 mt-1">
                              {donation.food}
                            </h3>
                          </div>

                          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                            Completed
                          </span>
                        </div>

                        <div className="space-y-3 mt-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Package size={16} className="text-green-600" />
                            <span>{donation.quantity}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users size={16} className="text-green-600" />
                            <span>{donation.servings} meals</span>
                          </div>

                          <div className="flex items-start gap-2 text-sm text-slate-600">
                            <MapPin
                              size={16}
                              className="text-green-600 shrink-0 mt-0.5"
                            />
                            <span>{donation.location}</span>
                          </div>

                          {donation.completedAt && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle
                                size={16}
                                className="text-green-600"
                              />
                              <span>
                                Completed{" "}
                                {new Date(
                                  donation.completedAt
                                ).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100">
                          <p className="text-xs text-slate-400">
                            Donation ID
                          </p>
                          <p className="text-sm font-semibold text-slate-700 mt-1">
                            #{donation.id}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                    <CheckCircle
                      size={42}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="font-semibold text-slate-800 mt-4">
                      No completed donations yet
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Completed food pickups will appear here.
                    </p>

                    <button
                      onClick={() => setShowClaims(true)}
                      className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
                    >
                      View My Claims
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= DONATION DETAILS MODAL ================= */}

            {selectedDonation && (
              <div
                className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
                onClick={() => setSelectedDonation(null)}
              >
                <div
                  className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-green-600 font-semibold uppercase">
                        {selectedDonation.category}
                      </p>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1">
                        {selectedDonation.food}
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Donation ID: #{selectedDonation.id}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedDonation(null)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400">Quantity</p>
                        <p className="font-semibold text-slate-800 mt-1">
                          {selectedDonation.quantity || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400">Servings</p>
                        <p className="font-semibold text-slate-800 mt-1">
                          {selectedDonation.servings || 0} meals
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-green-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Pickup Location</p>
                          <p className="text-sm font-medium text-slate-700 mt-1">
                            {selectedDonation.location || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock size={18} className="text-orange-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Consume By</p>
                          <p className="text-sm font-medium text-slate-700 mt-1">
                            {selectedDonation.consumeBy || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users size={18} className="text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Donor</p>
                          <p className="text-sm font-medium text-slate-700 mt-1">
                            {selectedDonation.donor || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5 space-y-4">
                      <div>
                        <p className="text-xs text-slate-400">Description</p>
                        <p className="text-sm text-slate-700 mt-1 leading-6">
                          {selectedDonation.description || "No description provided by the donor."}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Allergens</p>
                        <p className="text-sm text-slate-700 mt-1">
                          {selectedDonation.allergens || "No allergens specified."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl p-4">
                      <div>
                        <p className="text-xs text-slate-500">Current Status</p>
                        <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                          {selectedDonation.status}
                        </span>
                      </div>
                      {selectedDonation.distance && (
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Distance</p>
                          <p className="text-sm font-semibold text-slate-700 mt-1">
                            {selectedDonation.distance}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedDonation(null)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= IMPACT CTA ================= */}

            {!showClaims && (
              <div className="mt-8 bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-5">

                <div>

                  <p className="text-green-400 font-semibold text-sm">
                    YOUR IMPACT
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    Every claimed donation can become a meal.
                  </h2>

                  <p className="text-slate-400 text-sm mt-2">
                    Help move surplus food from kitchens to communities.
                  </p>

                </div>

                <button className="inline-flex items-center gap-2 text-green-400 font-semibold whitespace-nowrap">
                  View impact
                  <ArrowUpRight size={18} />
                </button>

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default NGODashboard;