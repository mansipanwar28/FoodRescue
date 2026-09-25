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
  Search,
  ChevronRight,
} from "lucide-react";

function DonorDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState(null);

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
      category: "Meals",
    },
    {
      id: "#FR1023",
      food: "Fresh Chapati & Dal",
      quantity: "40 servings",
      location: "Vaishali, Ghaziabad",
      expiry: "Today, 7:00 PM",
      status: "Claimed",
      category: "Meals",
    },
    {
      id: "#FR1022",
      food: "Rice & Mixed Vegetables",
      quantity: "30 servings",
      location: "Kaushambi, Ghaziabad",
      expiry: "Yesterday, 9:00 PM",
      status: "Completed",
      category: "Meals",
      completedAt: "Yesterday",
    },
    {
      id: "#FR1021",
      food: "Sandwiches",
      quantity: "20 servings",
      location: "Noida Sector 62",
      expiry: "Yesterday, 6:00 PM",
      status: "Completed",
      category: "Bakery",
      completedAt: "Yesterday",
    },
  ];

  const donations = [...savedDonations, ...demoDonations];

  const completedDonations = donations.filter(
    (donation) => donation.status === "Completed"
  );

  const filteredDonations = donations.filter((donation) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      donation.food?.toLowerCase().includes(search) ||
      donation.id?.toLowerCase().includes(search) ||
      donation.location?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredCompleted = completedDonations.filter((donation) =>
    `${donation.food} ${donation.id} ${donation.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalMeals = donations.reduce(
    (total, donation) => total + (parseInt(donation.quantity) || 0),
    0
  );

  const stats = [
    ["Total Donations", donations.length, Package],
    [
      "Active Donations",
      donations.filter((d) => d.status === "Available").length,
      Clock,
    ],
    ["Completed", completedDonations.length, CheckCircle],
    ["Meals Helped", totalMeals.toLocaleString(), Users],
  ];

  const statusClass = (status) => {
    if (status === "Available") return "bg-green-100 text-green-700";
    if (status === "Completed") return "bg-blue-100 text-blue-700";
    return "bg-orange-100 text-orange-700";
  };

  const handleLogout = () => {
    localStorage.removeItem("foodRescueUser");
    navigate("/");
  };

  const changeView = (view) => {
    setActiveView(view);
    setSearchTerm("");
    setStatusFilter("All");
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
            <Heart size={19} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-lg">
            Food<span className="text-green-600">Rescue</span>
          </span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <div className="flex">
        <aside
          className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-slate-950 text-white flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
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
                <p className="text-xs text-slate-400">Donor Portal</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => changeView("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                activeView === "dashboard"
                  ? "bg-green-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard size={19} /> Dashboard
            </button>

            <Link
              to="/donor/add"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <PlusCircle size={19} /> Add Donation
            </Link>

            <button
              onClick={() => changeView("donations")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                activeView === "donations"
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Package size={19} /> My Donations
            </button>

            <button
              onClick={() => changeView("completed")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                activeView === "completed"
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <CheckCircle size={19} /> Completed
            </button>
          </nav>

          <div className="px-4 py-5 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={19} /> Logout
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        <main className="flex-1 min-w-0">
          <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-5 items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Donor Dashboard</p>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                {activeView === "dashboard"
                  ? "Welcome back, Mansi 👋"
                  : activeView === "donations"
                  ? "My Donations"
                  : "Your Impact"}
              </h1>
            </div>
            <div className="flex items-center gap-5">
              <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Bell size={19} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                M
              </div>
            </div>
          </header>

          <div className="p-5 md:p-8 max-w-7xl mx-auto">
            {activeView === "dashboard" && (
              <>
                <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Make an impact today
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold mt-1">
                      Have surplus food?
                    </h2>
                    <p className="text-green-100 mt-2">
                      List your extra food and help someone in your community.
                    </p>
                  </div>
                  <Link
                    to="/donor/add"
                    className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold"
                  >
                    <PlusCircle size={19} /> Add Food Donation
                  </Link>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-7">
                  {stats.map(([title, value, Icon]) => (
                    <div
                      key={title}
                      className="bg-white border border-slate-200 rounded-2xl p-5"
                    >
                      <p className="text-sm text-slate-500">{title}</p>
                      <p className="text-3xl font-bold mt-2">{value}</p>
                      <Icon size={20} className="text-green-600 mt-3" />
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl mt-7 overflow-hidden">
                  <div className="px-6 py-5 border-b flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Recent Donations</h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Your latest rescue activity.
                      </p>
                    </div>
                    <button
                      onClick={() => changeView("donations")}
                      className="text-sm text-green-600 font-semibold"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="divide-y">
                    {donations.slice(0, 4).map((donation) => (
                      <button
                        key={donation.id}
                        onClick={() => setSelectedDonation(donation)}
                        className="w-full text-left px-6 py-5 hover:bg-slate-50"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">{donation.food}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {donation.id} • {donation.location}
                            </p>
                          </div>
                          <span className={`w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusClass(donation.status)}`}>
                            {donation.status}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeView === "donations" && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold text-green-600">DONOR PORTAL</p>
                    <h2 className="text-3xl font-bold mt-1">My Donations</h2>
                    <p className="text-slate-500 mt-2">
                      Manage your donations and track their rescue journey.
                    </p>
                  </div>
                  <Link
                    to="/donor/add"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
                  >
                    <PlusCircle size={18} /> New Donation
                  </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    ["Total", donations.length],
                    ["Available", donations.filter(d => d.status === "Available").length],
                    ["Claimed", donations.filter(d => d.status === "Claimed").length],
                    ["In Progress", donations.filter(d => ["Pickup in Progress", "Volunteer Pickup Active", "Volunteer Assigned"].includes(d.status)).length],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5">
                      <p className="text-sm text-slate-500">{label}</p>
                      <p className="text-2xl font-bold mt-2">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search food, ID or location..."
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-slate-200 rounded-xl"
                  >
                    <option>All</option>
                    <option>Available</option>
                    <option>Claimed</option>
                    <option>Volunteer Assigned</option>
                    <option>Pickup in Progress</option>
                    <option>Volunteer Pickup Active</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="h-24 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                        <Package size={38} className="text-green-600" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold">{donation.food}</h3>
                            <p className="text-xs text-slate-500 mt-1">{donation.id}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(donation.status)}`}>
                            {donation.status}
                          </span>
                        </div>

                        <div className="space-y-3 mt-5 text-sm text-slate-600">
                          <div className="flex gap-2"><Users size={16} className="text-green-600" /> {donation.quantity}</div>
                          <div className="flex gap-2"><MapPin size={16} className="text-green-600" /> {donation.location}</div>
                          <div className="flex gap-2"><Clock size={16} className="text-green-600" /> {donation.expiry}</div>
                        </div>

                        <button
                          onClick={() => setSelectedDonation(donation)}
                          className="w-full mt-5 border border-slate-200 hover:border-green-500 hover:text-green-700 py-2.5 rounded-xl font-semibold"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredDonations.length === 0 && (
                  <div className="bg-white border border-dashed rounded-2xl p-12 text-center">
                    <Package size={42} className="mx-auto text-slate-300" />
                    <h3 className="font-bold mt-4">No donations found</h3>
                    <p className="text-sm text-slate-500 mt-1">Try changing your filters.</p>
                  </div>
                )}
              </div>
            )}

            {activeView === "completed" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-7 md:p-9 text-white">
                  <p className="text-green-100 text-sm font-semibold">YOUR IMPACT</p>
                  <h2 className="text-3xl font-bold mt-1">Completed Donations</h2>
                  <p className="text-green-100 mt-2 max-w-2xl">
                    A record of food successfully rescued and delivered through your donations.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-green-100 text-sm">Donations Rescued</p>
                      <p className="text-3xl font-bold mt-1">{completedDonations.length}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-green-100 text-sm">Meals Rescued</p>
                      <p className="text-3xl font-bold mt-1">
                        {completedDonations.reduce((sum, d) => sum + (parseInt(d.quantity) || 0), 0)}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 col-span-2 md:col-span-1">
                      <p className="text-green-100 text-sm">Status</p>
                      <p className="font-bold mt-2 flex items-center gap-2">
                        <CheckCircle size={20} /> Successfully Rescued
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search completed donations..."
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredCompleted.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold">{donation.food}</h3>
                              <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Successfully Rescued
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{donation.id}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedDonation(donation)}
                          className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-green-500 hover:text-green-700 px-4 py-2.5 rounded-xl font-semibold"
                        >
                          View Details <ChevronRight size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-400">Quantity</p>
                          <p className="font-semibold mt-1">{donation.quantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Pickup Location</p>
                          <p className="font-semibold mt-1">{donation.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Status</p>
                          <p className="font-semibold text-green-700 mt-1">Delivered Successfully</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCompleted.length === 0 && (
                  <div className="bg-white border border-dashed rounded-2xl p-12 text-center">
                    <CheckCircle size={42} className="mx-auto text-slate-300" />
                    <h3 className="font-bold mt-4">No completed donations yet</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Completed donations will appear here after delivery.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {selectedDonation && (
          <div
            className="fixed inset-0 z-[70] bg-slate-950/60 flex items-center justify-center p-4"
            onClick={() => setSelectedDonation(null)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-start justify-between">
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase">
                    Donation Details
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{selectedDonation.food}</h3>
                  <p className="text-sm text-slate-500 mt-1">{selectedDonation.id}</p>
                </div>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="w-10 h-10 rounded-xl bg-slate-100 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400">Quantity</p>
                    <p className="font-semibold mt-1">{selectedDonation.quantity}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400">Status</p>
                    <p className="font-semibold text-green-700 mt-1">{selectedDonation.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Pickup Location</p>
                  <p className="font-semibold mt-1">{selectedDonation.location}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Consume By</p>
                  <p className="font-semibold mt-1">{selectedDonation.expiry}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-3">Rescue Journey</p>
                  <div className="space-y-3">
                    {[
                      "Donation Listed",
                      "Claimed by NGO",
                      "Pickup in Progress",
                      "Delivered Successfully",
                    ].map((step, index) => {
                      const done =
                        index === 0 ||
                        (index === 1 &&
                          ["Claimed", "Volunteer Assigned", "Pickup in Progress", "Volunteer Pickup Active", "Completed"].includes(selectedDonation.status)) ||
                        (index === 2 &&
                          ["Pickup in Progress", "Volunteer Pickup Active", "Completed"].includes(selectedDonation.status)) ||
                        (index === 3 && selectedDonation.status === "Completed");

                      return (
                        <div key={step} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              done
                                ? "bg-green-600 text-white"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {done ? <CheckCircle size={17} /> : index + 1}
                          </div>
                          <span className={done ? "font-semibold" : "text-slate-400"}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorDashboard;
