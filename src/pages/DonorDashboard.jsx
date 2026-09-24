import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  CheckCircle,
  Users,
  MapPin,
  Clock,
  Menu,
  X,
  LogOut,
  Heart,
  Bell,
  ArrowUpRight,
} from "lucide-react";

function DonorDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get saved donations from localStorage
  const savedDonations = JSON.parse(
    localStorage.getItem("foodRescueDonations") || "[]"
  );

  const demoDonations = [
    {
      id: "#FR1024",
      food: "Vegetable Biryani",
      quantity: "25 servings",
      location: "Indirapuram, Ghaziabad",
      expiry: "Today, 8:00 PM",
      status: "Available",
    },
    {
      id: "#FR1023",
      food: "Fresh Chapati & Dal",
      quantity: "40 servings",
      location: "Vaishali, Ghaziabad",
      expiry: "Today, 7:00 PM",
      status: "Claimed",
    },
    {
      id: "#FR1022",
      food: "Rice & Mixed Vegetables",
      quantity: "30 servings",
      location: "Kaushambi, Ghaziabad",
      expiry: "Yesterday, 9:00 PM",
      status: "Completed",
    },
    {
      id: "#FR1021",
      food: "Sandwiches",
      quantity: "20 servings",
      location: "Noida Sector 62",
      expiry: "Yesterday, 6:00 PM",
      status: "Completed",
    },
  ];

  // Show newly created donations first
  const donations = [...savedDonations, ...demoDonations];

  const totalDonations = donations.length;

  const activeDonations = donations.filter(
    (donation) => donation.status === "Available"
  ).length;

  const completedDonations = donations.filter(
    (donation) => donation.status === "Completed"
  ).length;

  const totalMeals = donations.reduce((total, donation) => {
    const servings = parseInt(donation.quantity) || 0;
    return total + servings;
  }, 0);

  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: Package,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Active Donations",
      value: activeDonations,
      icon: Clock,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Completed",
      value: completedDonations,
      icon: CheckCircle,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Meals Helped",
      value: totalMeals.toLocaleString(),
      icon: Users,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("foodRescueUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* MOBILE HEADER */}
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

        {/* SIDEBAR */}
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
                  Donor Portal
                </p>
              </div>

            </Link>

          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">

            <Link
              to="/donor"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-600 text-white font-medium"
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            <Link
              to="/donor/add"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
              onClick={() => setSidebarOpen(false)}
            >
              <PlusCircle size={19} />
              Add Donation
            </Link>

            <button
              onClick={() => {
                document
                  .getElementById("recent-donations")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <Package size={19} />
              My Donations
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("recent-donations")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
                setSidebarOpen(false);
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

        {/* MAIN */}
        <main className="flex-1 min-w-0">

          {/* TOPBAR */}
          <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-5 items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Donor Dashboard
              </p>

              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Welcome back, Mansi 👋
              </h1>
            </div>

            <div className="flex items-center gap-5">

              <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
                <Bell size={19} />

                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                  M
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Mansi
                  </p>

                  <p className="text-xs text-slate-500">
                    Food Donor
                  </p>
                </div>

              </div>

            </div>

          </header>

          {/* CONTENT */}
          <div className="p-5 md:p-8 max-w-7xl mx-auto">

            {/* MOBILE WELCOME */}
            <div className="lg:hidden mb-7">

              <p className="text-sm text-slate-500">
                Donor Dashboard
              </p>

              <h1 className="text-2xl font-bold mt-1">
                Welcome back, Mansi 👋
              </h1>

            </div>

            {/* QUICK ACTION */}
            <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div>

                <p className="text-green-100 text-sm font-medium">
                  Make an impact today
                </p>

                <h2 className="text-2xl md:text-3xl font-bold mt-1">
                  Have surplus food?
                </h2>

                <p className="text-green-100 mt-2 max-w-xl">
                  List your extra food and help someone in your community.
                </p>

              </div>

              <Link
                to="/donor/add"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition shrink-0"
              >
                <PlusCircle size={19} />
                Add Food Donation
              </Link>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-7">

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

            {/* RECENT DONATIONS */}
            <div
              id="recent-donations"
              className="bg-white border border-slate-200 rounded-2xl mt-7 overflow-hidden"
            >

              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold">
                    Recent Donations
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Track your recent food rescue activity.
                  </p>

                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("recent-donations")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="hidden sm:flex items-center gap-1 text-sm text-green-600 font-semibold hover:text-green-700"
                >
                  View all
                  <ArrowUpRight size={16} />
                </button>

              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50">

                    <tr className="text-left text-xs uppercase tracking-wide text-slate-500">

                      <th className="px-6 py-4 font-semibold">
                        Donation
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Quantity
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Pickup Location
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Consume By
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {donations.map((donation) => (

                      <tr
                        key={donation.id}
                        className="hover:bg-slate-50 transition"
                      >

                        <td className="px-6 py-5">

                          <p className="font-semibold text-slate-900">
                            {donation.food}
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            {donation.id}
                          </p>

                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {donation.quantity}
                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin
                              size={15}
                              className="text-green-600"
                            />
                            {donation.location}
                          </div>

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock size={15} />
                            {donation.expiry}
                          </div>

                        </td>

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              donation.status === "Available"
                                ? "bg-green-100 text-green-700"
                                : donation.status === "Claimed"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {donation.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-slate-100">

                {donations.map((donation) => (

                  <div
                    key={donation.id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="font-semibold">
                          {donation.food}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {donation.id}
                        </p>

                      </div>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                          donation.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : donation.status === "Claimed"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {donation.status}
                      </span>

                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-slate-500">

                      <div>

                        <p className="text-xs text-slate-400">
                          Quantity
                        </p>

                        <p className="mt-1 text-slate-700">
                          {donation.quantity}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-400">
                          Consume By
                        </p>

                        <p className="mt-1 text-slate-700">
                          {donation.expiry}
                        </p>

                      </div>

                      <div className="col-span-2 flex items-center gap-2">
                        <MapPin
                          size={15}
                          className="text-green-600"
                        />
                        {donation.location}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default DonorDashboard;