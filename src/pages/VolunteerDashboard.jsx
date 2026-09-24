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
  Truck,
  ArrowUpRight,
  Filter,
  Navigation,
} from "lucide-react";

function VolunteerDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("available");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // ================= DEMO VOLUNTEER PICKUPS =================
  // These are seeded into localStorage so their status changes persist.

  const demoVolunteerPickups = [
    {
      id: "#VOL2001",
      food: "Vegetable Pulao",
      category: "Cooked Meal",
      quantity: "10 kg",
      servings: 50,
      pickupLocation: "Indirapuram, Ghaziabad",
      deliveryLocation: "Helping Hands Community Center",
      distance: "2.1 km",
      pickupBy: "Today, 8:30 PM",
      donor: "Green Kitchen",
      status: "Claimed",
      source: "demo",
    },
    {
      id: "#VOL2002",
      food: "Fresh Rotis & Sabzi",
      category: "Cooked Meal",
      quantity: "7 kg",
      servings: 35,
      pickupLocation: "Vaishali, Ghaziabad",
      deliveryLocation: "Hope Shelter, Ghaziabad",
      distance: "3.4 km",
      pickupBy: "Today, 8:00 PM",
      donor: "Community Kitchen",
      status: "Claimed",
      source: "demo",
    },
    {
      id: "#VOL2003",
      food: "Bread Packets",
      category: "Bakery",
      quantity: "5 kg",
      servings: 25,
      pickupLocation: "Kaushambi, Ghaziabad",
      deliveryLocation: "Helping Hands Community Center",
      distance: "4.0 km",
      pickupBy: "Today, 9:00 PM",
      donor: "Daily Bakes",
      status: "Claimed",
      source: "demo",
    },
  ];

  const categories = [
    "All",
    "Cooked Meal",
    "Bakery",
    "Fruits",
    "Vegetables",
    "Packaged Food",
  ];

  // ================= CATEGORY FORMATTER =================

  const formatCategory = (value) => {
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
  };

  // ================= INITIALIZE DEMO DATA =================

  const getDemoPickups = () => {
    const saved = localStorage.getItem("foodRescueVolunteerPickups");

    if (saved) {
      return JSON.parse(saved);
    }

    localStorage.setItem(
      "foodRescueVolunteerPickups",
      JSON.stringify(demoVolunteerPickups)
    );

    return demoVolunteerPickups;
  };

  const savedVolunteerPickups = getDemoPickups();

  // ================= REAL DONOR / NGO DATA =================

  const savedDonations = JSON.parse(
    localStorage.getItem("foodRescueDonations") || "[]"
  );

  // A donation becomes available to volunteers after an NGO claims it.
  const claimedDonations = savedDonations
    .filter(
      (donation) =>
        donation.status === "Claimed" ||
        donation.status === "Volunteer Assigned" ||
        donation.status === "Volunteer Pickup Active" ||
        donation.status === "Pickup in Progress" ||
        donation.status === "Completed"
    )
    .map((donation) => ({
      id: donation.id,
      food: donation.food,
      category: formatCategory(donation.category),
      quantity: donation.actualQuantity || donation.quantity,
      servings: Number(donation.servings) || 0,
      pickupLocation: donation.location,
      deliveryLocation: "Helping Hands Community Center",
      distance: "Nearby",
      pickupBy: donation.consumeBy
        ? new Date(donation.consumeBy).toLocaleString()
        : "Not specified",
      donor: "Food Rescue Donor",
      status: donation.status,
      volunteer: donation.volunteer,
      volunteerAcceptedAt: donation.volunteerAcceptedAt,
      pickupStartedAt: donation.pickupStartedAt,
      pickedUpAt: donation.pickedUpAt,
      deliveredAt: donation.deliveredAt,
      source: "donation",
    }));

  const allPickups = [...claimedDonations, ...savedVolunteerPickups];

  // ================= STATUS GROUPS =================

  const availablePickups = allPickups.filter(
    (pickup) => pickup.status === "Claimed"
  );

  const activePickups = allPickups.filter(
    (pickup) =>
      pickup.status === "Volunteer Pickup Active" ||
      pickup.status === "Pickup in Progress"
  );

  const completedPickups = allPickups.filter(
    (pickup) => pickup.status === "Completed"
  );

  const myPickups = allPickups.filter(
    (pickup) =>
      pickup.volunteer === "Mansi Volunteer" ||
      pickup.status === "Volunteer Assigned" ||
      pickup.status === "Volunteer Pickup Active" ||
      pickup.status === "Pickup in Progress"
  );

  // ================= SEARCH + FILTER =================

  let pickupList = availablePickups;

  if (view === "my") {
    pickupList = myPickups;
  }

  if (view === "active") {
    pickupList = activePickups;
  }

  if (view === "completed") {
    pickupList = completedPickups;
  }

  const search = searchTerm.toLowerCase();

  const filteredPickups = pickupList.filter((pickup) => {
    const matchesCategory =
      category === "All" || pickup.category === category;

    const matchesSearch =
      pickup.food.toLowerCase().includes(search) ||
      pickup.pickupLocation.toLowerCase().includes(search) ||
      pickup.deliveryLocation.toLowerCase().includes(search) ||
      pickup.donor.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  // ================= STATISTICS =================

  const mealsTransported = completedPickups.reduce(
    (total, pickup) => total + (Number(pickup.servings) || 0),
    0
  );

  const stats = [
    {
      title: "Available Pickups",
      value: availablePickups.length,
      icon: Package,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "My Pickups",
      value: myPickups.length,
      icon: Truck,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: activePickups.length,
      icon: Clock,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Meals Delivered",
      value: mealsTransported.toLocaleString(),
      icon: Users,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  // ================= UPDATE REAL DONATION =================

  const updateRealDonation = (donationId, updates) => {
    const donations = JSON.parse(
      localStorage.getItem("foodRescueDonations") || "[]"
    );

    const updated = donations.map((donation) => {
      if (donation.id === donationId) {
        return {
          ...donation,
          ...updates,
        };
      }

      return donation;
    });

    localStorage.setItem(
      "foodRescueDonations",
      JSON.stringify(updated)
    );
  };

  // ================= UPDATE DEMO PICKUP =================

  const updateDemoPickup = (donationId, updates) => {
    const pickups = JSON.parse(
      localStorage.getItem("foodRescueVolunteerPickups") || "[]"
    );

    const updated = pickups.map((pickup) => {
      if (pickup.id === donationId) {
        return {
          ...pickup,
          ...updates,
        };
      }

      return pickup;
    });

    localStorage.setItem(
      "foodRescueVolunteerPickups",
      JSON.stringify(updated)
    );
  };

  // ================= ACCEPT PICKUP =================

  const handleAcceptPickup = (pickup) => {
    const confirmed = window.confirm(
      "Do you want to accept this pickup request?"
    );

    if (!confirmed) return;

    const updates = {
      status: "Volunteer Assigned",
      volunteer: "Mansi Volunteer",
      volunteerAcceptedAt: new Date().toISOString(),
    };

    if (pickup.source === "donation") {
      updateRealDonation(pickup.id, updates);
    } else {
      updateDemoPickup(pickup.id, updates);
    }

    alert("Pickup accepted successfully!");
    window.location.reload();
  };

  // ================= START PICKUP =================

  const handleStartPickup = (pickup) => {
    const confirmed = window.confirm(
      "Are you ready to start this pickup?"
    );

    if (!confirmed) return;

    const updates = {
      status: "Volunteer Pickup Active",
      pickupStartedAt: new Date().toISOString(),
    };

    if (pickup.source === "donation") {
      updateRealDonation(pickup.id, updates);
    } else {
      updateDemoPickup(pickup.id, updates);
    }

    alert("Pickup started successfully!");
    window.location.reload();
  };

  // ================= MARK PICKED UP =================

  const handleMarkPickedUp = (pickup) => {
    const confirmed = window.confirm(
      "Have you picked up the food from the donor?"
    );

    if (!confirmed) return;

    const updates = {
      status: "Pickup in Progress",
      pickedUpAt: new Date().toISOString(),
    };

    if (pickup.source === "donation") {
      updateRealDonation(pickup.id, updates);
    } else {
      updateDemoPickup(pickup.id, updates);
    }

    alert("Food marked as picked up!");
    window.location.reload();
  };

  // ================= DELIVER =================

  const handleDeliver = (pickup) => {
    const confirmed = window.confirm(
      "Have you delivered the food to the receiving organization?"
    );

    if (!confirmed) return;

    const updates = {
      status: "Completed",
      deliveredAt: new Date().toISOString(),
    };

    if (pickup.source === "donation") {
      updateRealDonation(pickup.id, updates);
    } else {
      updateDemoPickup(pickup.id, updates);
    }

    alert("Delivery completed successfully!");
    window.location.reload();
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("foodRescueUser");
    navigate("/");
  };

  // ================= NAVIGATION =================

  const setDashboardView = (nextView) => {
    setView(nextView);
    setSidebarOpen(false);

    setTimeout(() => {
      document
        .getElementById("pickup-content")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {
    if (status === "Claimed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Volunteer Assigned") {
      return "bg-blue-100 text-blue-700";
    }

    if (
      status === "Volunteer Pickup Active" ||
      status === "Pickup in Progress"
    ) {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-purple-100 text-purple-700";
  };

  // ================= ACTION BUTTON =================

  const getAction = (pickup) => {
    if (pickup.status === "Claimed") {
      return (
        <button
          onClick={() => handleAcceptPickup(pickup)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Accept Pickup
        </button>
      );
    }

    if (pickup.status === "Volunteer Assigned") {
      return (
        <button
          onClick={() => handleStartPickup(pickup)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Start Pickup
        </button>
      );
    }

    if (
      pickup.status === "Volunteer Pickup Active" ||
      pickup.status === "Pickup in Progress"
    ) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleMarkPickedUp(pickup)}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Picked Up
          </button>

          <button
            onClick={() => handleDeliver(pickup)}
            className="bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Delivered
          </button>
        </div>
      );
    }

    return (
      <div className="w-full bg-slate-100 text-slate-600 py-2.5 rounded-lg text-sm font-semibold text-center">
        Delivery Completed
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
            <Heart size={19} className="text-white" fill="white" />
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
        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50
            w-64 h-screen bg-slate-950 text-white
            flex flex-col transition-transform duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="px-6 py-6 border-b border-slate-800">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Heart size={21} fill="white" />
              </div>

              <div>
                <p className="font-bold text-lg">
                  Food<span className="text-green-400">Rescue</span>
                </p>

                <p className="text-xs text-slate-400">
                  Volunteer Portal
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => setDashboardView("available")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "available"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <LayoutDashboard size={19} />
              Dashboard
            </button>

            <button
              onClick={() => setDashboardView("available")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <Search size={19} />
              Find Pickups
            </button>

            <button
              onClick={() => setDashboardView("my")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "my"
                  ? "bg-blue-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Truck size={19} />
              My Pickups
            </button>

            <button
              onClick={() => setDashboardView("active")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "active"
                  ? "bg-orange-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Clock size={19} />
              Active
            </button>

            <button
              onClick={() => setDashboardView("completed")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "completed"
                  ? "bg-purple-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <CheckCircle size={19} />
              Completed
            </button>
          </nav>

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

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* MAIN */}
        <main className="flex-1 min-w-0">
          <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-5 items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Volunteer Dashboard
              </p>

              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Help move food to communities 👋
              </h1>
            </div>

            <div className="flex items-center gap-5">
              <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <Bell size={19} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                  V
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Mansi Volunteer
                  </p>

                  <p className="text-xs text-slate-500">
                    Food Rescue Volunteer
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-5 md:p-8 max-w-7xl mx-auto">
            <div className="lg:hidden mb-7">
              <p className="text-sm text-slate-500">
                Volunteer Dashboard
              </p>

              <h1 className="text-2xl font-bold mt-1">
                Help move food to communities 👋
              </h1>
            </div>

            {/* STATS */}
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
                        <Icon size={21} className={stat.color} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SEARCH + FILTER */}
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search food, donor or location..."
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50">
                  <Filter size={18} />
                  Filters
                </button>
              </div>

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

            {/* PICKUP CONTENT */}
            <div id="pickup-content" className="mt-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {view === "available" && "Available Pickup Requests"}
                    {view === "my" && "My Pickup Requests"}
                    {view === "active" && "Active Pickups"}
                    {view === "completed" && "Completed Deliveries"}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {view === "available" &&
                      "Food claimed by NGOs and ready for volunteer pickup."}
                    {view === "my" &&
                      "Pickup requests currently assigned to you."}
                    {view === "active" &&
                      "Food currently being picked up or transported."}
                    {view === "completed" &&
                      "Food rescue deliveries you have completed."}
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {filteredPickups.length} requests
                </span>
              </div>

              {filteredPickups.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredPickups.map((pickup) => (
                    <div
                      key={`${pickup.source}-${pickup.id}`}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="h-32 bg-gradient-to-br from-green-100 via-emerald-50 to-blue-50 flex items-center justify-center">
                        <Truck size={44} className="text-green-600" />
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs text-green-600 font-semibold uppercase">
                              {pickup.category}
                            </p>

                            <h3 className="text-lg font-bold text-slate-900 mt-1">
                              {pickup.food}
                            </h3>
                          </div>

                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusStyle(
                              pickup.status
                            )}`}
                          >
                            {pickup.status === "Volunteer Pickup Active" ||
                            pickup.status === "Pickup in Progress"
                              ? "Pickup Active"
                              : pickup.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">
                          <div>
                            <p className="text-xs text-slate-400">
                              Quantity
                            </p>

                            <p className="text-sm font-semibold text-slate-700 mt-1">
                              {pickup.quantity}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Meals
                            </p>

                            <p className="text-sm font-semibold text-slate-700 mt-1">
                              {pickup.servings}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 mt-5">
                          <div className="flex items-start gap-2 text-sm text-slate-600">
                            <MapPin
                              size={17}
                              className="text-green-600 shrink-0 mt-0.5"
                            />

                            <div>
                              <p className="text-xs text-slate-400">
                                Pickup
                              </p>

                              <p className="font-medium">
                                {pickup.pickupLocation}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-sm text-slate-600">
                            <Navigation
                              size={17}
                              className="text-blue-600 shrink-0 mt-0.5"
                            />

                            <div>
                              <p className="text-xs text-slate-400">
                                Deliver to
                              </p>

                              <p className="font-medium">
                                {pickup.deliveryLocation}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock
                              size={16}
                              className="text-orange-500"
                            />

                            <span>
                              Pickup by {pickup.pickupBy}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                          <div>
                            <p className="text-xs text-slate-400">
                              Distance
                            </p>

                            <p className="text-sm font-semibold text-slate-700 mt-1">
                              {pickup.distance}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-slate-400">
                              Donor
                            </p>

                            <p className="text-sm font-semibold text-slate-700 mt-1">
                              {pickup.donor}
                            </p>
                          </div>
                        </div>

                        {pickup.volunteerAcceptedAt && (
                          <p className="text-xs text-slate-400 mt-4">
                            Accepted on{" "}
                            {new Date(
                              pickup.volunteerAcceptedAt
                            ).toLocaleString()}
                          </p>
                        )}

                        {pickup.pickupStartedAt && (
                          <p className="text-xs text-slate-400 mt-2">
                            Pickup started{" "}
                            {new Date(
                              pickup.pickupStartedAt
                            ).toLocaleString()}
                          </p>
                        )}

                        {pickup.pickedUpAt && (
                          <p className="text-xs text-slate-400 mt-2">
                            Food picked up{" "}
                            {new Date(
                              pickup.pickedUpAt
                            ).toLocaleString()}
                          </p>
                        )}

                        {pickup.deliveredAt && (
                          <p className="text-xs text-slate-400 mt-2">
                            Delivered{" "}
                            {new Date(
                              pickup.deliveredAt
                            ).toLocaleString()}
                          </p>
                        )}

                        <div className="mt-5">
                          {getAction(pickup)}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <button
                            onClick={() =>
                              alert(
                                `Pickup: ${pickup.food}\n\nPickup: ${pickup.pickupLocation}\n\nDelivery: ${pickup.deliveryLocation}\n\nQuantity: ${pickup.quantity}\n\nMeals: ${pickup.servings}\n\nDonor: ${pickup.donor}`
                              )
                            }
                            className="flex items-center justify-center gap-1 border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-semibold"
                          >
                            <Package size={14} />
                            Details
                          </button>

                          <button
                            onClick={() =>
                              alert(
                                `Map integration will be connected during the backend/maps phase.\n\nPickup: ${pickup.pickupLocation}`
                              )
                            }
                            className="flex items-center justify-center gap-1 border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-semibold"
                          >
                            <Navigation size={14} />
                            Navigate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                  <Truck
                    size={44}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="font-semibold text-slate-800 mt-4">
                    No pickup requests found
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {view === "available"
                      ? "Food pickup requests will appear here after an NGO claims a donation."
                      : "There are no requests in this section yet."}
                  </p>

                  {view !== "available" && (
                    <button
                      onClick={() => setDashboardView("available")}
                      className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
                    >
                      Find Pickups
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* IMPACT */}
            <div className="mt-8 bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <p className="text-green-400 font-semibold text-sm">
                  YOUR IMPACT
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Every delivery helps rescue surplus food.
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  Volunteer your time to move food from donors to
                  communities.
                </p>
              </div>

              <div className="flex items-center gap-2 text-green-400 font-semibold whitespace-nowrap">
                {mealsTransported.toLocaleString()} meals delivered
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
