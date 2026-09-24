import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Heart,
  Bell,
  LogOut,
  Menu,
  X,
  Package,
  Truck,
  Building2,
  CheckCircle,
  Search,
  BarChart3,
  ShieldCheck,
  MoreVertical,
  MapPin,
  Clock,
  UserCheck,
  UserX,
  Eye,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // ================= LOCAL DATA =================

  const savedUsers = JSON.parse(
    localStorage.getItem("foodRescueUsers") || "[]"
  );

  const singleRegisteredUser = JSON.parse(
    localStorage.getItem("foodRescueUser") || "null"
  );

  const registeredUsers =
    savedUsers.length > 0
      ? savedUsers
      : singleRegisteredUser
      ? [singleRegisteredUser]
      : [];

  const demoUsers = [
    {
      id: "USR001",
      name: "Helping Hands NGO",
      email: "ngo@foodrescue.com",
      phone: "9876543210",
      role: "ngo",
      status: "Active",
      verified: true,
      joinedAt: "2026-09-12T10:00:00",
    },
    {
      id: "USR002",
      name: "Mansi Volunteer",
      email: "volunteer@foodrescue.com",
      phone: "9876543211",
      role: "volunteer",
      status: "Active",
      verified: true,
      joinedAt: "2026-09-13T11:30:00",
    },
    {
      id: "USR003",
      name: "Green Leaf Restaurant",
      email: "donor@foodrescue.com",
      phone: "9876543212",
      role: "donor",
      status: "Active",
      verified: true,
      joinedAt: "2026-09-14T09:15:00",
    },
    {
      id: "USR004",
      name: "Community Food Volunteer",
      email: "newvolunteer@foodrescue.com",
      phone: "9876543213",
      role: "volunteer",
      status: "Pending",
      verified: false,
      joinedAt: "2026-09-18T14:20:00",
    },
  ];

  const normalizeRole = (role) => {
    if (!role) return "user";

    const map = {
      donor: "donor",
      ngo: "ngo",
      volunteer: "volunteer",
      admin: "admin",
    };

    return map[role.toLowerCase()] || role.toLowerCase();
  };

  const usersFromRegistration = registeredUsers.map((user, index) => ({
    id: user.id || `USRLOCAL${index + 1}`,
    name: user.name || "Registered User",
    email: user.email || "unknown@example.com",
    phone: user.phone || "Not provided",
    role: normalizeRole(user.role),
    status: user.status || "Active",
    verified: user.verified ?? true,
    joinedAt: user.joinedAt || new Date().toISOString(),
  }));

  const allUsers = [...demoUsers];

  usersFromRegistration.forEach((user) => {
    const exists = allUsers.some(
      (demoUser) => demoUser.email.toLowerCase() === user.email.toLowerCase()
    );

    if (!exists) {
      allUsers.push(user);
    }
  });

  const savedDonations = JSON.parse(
    localStorage.getItem("foodRescueDonations") || "[]"
  );

  const demoDonations = [
    {
      id: "#FR1028",
      food: "Vegetable Biryani",
      category: "Cooked Meal",
      quantity: "12 kg",
      servings: 60,
      location: "Indirapuram, Ghaziabad",
      donor: "Green Leaf Restaurant",
      status: "Available",
      createdAt: "2026-09-22T10:00:00",
    },
    {
      id: "#FR1027",
      food: "Fresh Chapati & Dal",
      category: "Cooked Meal",
      quantity: "8 kg",
      servings: 40,
      location: "Vaishali, Ghaziabad",
      donor: "Community Kitchen",
      status: "Claimed",
      createdAt: "2026-09-22T11:30:00",
      claimedBy: "Helping Hands NGO",
    },
    {
      id: "#FR1026",
      food: "Bread & Sandwiches",
      category: "Bakery",
      quantity: "6 kg",
      servings: 30,
      location: "Kaushambi, Ghaziabad",
      donor: "Daily Bakes",
      status: "Pickup in Progress",
      createdAt: "2026-09-23T09:15:00",
      claimedBy: "Helping Hands NGO",
    },
    {
      id: "#FR1025",
      food: "Fresh Fruits",
      category: "Fruits",
      quantity: "15 kg",
      servings: 50,
      location: "Sector 62, Noida",
      donor: "Fresh Mart",
      status: "Completed",
      createdAt: "2026-09-21T08:15:00",
      claimedBy: "Helping Hands NGO",
      completedAt: "2026-09-21T15:30:00",
    },
  ];

  const normalizedDonations = savedDonations.map((donation, index) => ({
    ...donation,
    id: donation.id || `#LOCAL${index + 1}`,
    category: donation.category || "Other",
    status: donation.status || "Available",
    servings: Number(donation.servings) || 0,
  }));

  const allDonations = [...demoDonations];

  normalizedDonations.forEach((donation) => {
    const exists = allDonations.some(
      (demoDonation) => demoDonation.id === donation.id
    );

    if (!exists) {
      allDonations.unshift(donation);
    }
  });

  const totalUsers = allUsers.length;
  const totalDonations = allDonations.length;
  const availableDonations = allDonations.filter(
    (donation) => donation.status === "Available"
  ).length;
  const claimedDonations = allDonations.filter(
    (donation) => donation.status === "Claimed"
  ).length;
  const activePickups = allDonations.filter(
    (donation) =>
      donation.status === "Pickup in Progress" ||
      donation.status === "Volunteer Pickup Active"
  ).length;
  const completedDonations = allDonations.filter(
    (donation) => donation.status === "Completed"
  );
  const mealsDistributed = completedDonations.reduce(
    (total, donation) => total + (Number(donation.servings) || 0),
    0
  );

  const roleCounts = {
    donor: allUsers.filter((user) => user.role === "donor").length,
    ngo: allUsers.filter((user) => user.role === "ngo").length,
    volunteer: allUsers.filter((user) => user.role === "volunteer").length,
    admin: allUsers.filter((user) => user.role === "admin").length,
  };

  // ================= NAVIGATION =================

  const setAdminView = (nextView) => {
    setView(nextView);
    setSidebarOpen(false);
    setSearchTerm("");

    setTimeout(() => {
      document
        .getElementById("admin-content")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem("foodRescueUser");
    navigate("/");
  };

  // ================= USER ACTIONS =================

  const persistUsers = (updatedUsers) => {
    localStorage.setItem("foodRescueUsers", JSON.stringify(updatedUsers));
  };

  const updateUserStatus = (userId, nextStatus) => {
    const updatedUsers = allUsers.map((user) =>
      user.id === userId ? { ...user, status: nextStatus } : user
    );

    const customUsers = updatedUsers.filter((user) => !user.id.startsWith("USR00"));

    persistUsers(customUsers);

    alert(
      nextStatus === "Active"
        ? "User activated successfully."
        : "User suspended successfully."
    );

    window.location.reload();
  };

  const toggleVerification = (userId) => {
    const updatedUsers = allUsers.map((user) =>
      user.id === userId
        ? { ...user, verified: !user.verified }
        : user
    );

    const customUsers = updatedUsers.filter((user) => !user.id.startsWith("USR00"));

    persistUsers(customUsers);

    alert("Verification status updated.");
    window.location.reload();
  };

  // ================= FILTERS =================

  let filteredUsers = allUsers;

  if (roleFilter !== "All") {
    filteredUsers = filteredUsers.filter(
      (user) => user.role === roleFilter
    );
  }

  if (statusFilter !== "All") {
    filteredUsers = filteredUsers.filter(
      (user) => user.status === statusFilter
    );
  }

  if (searchTerm.trim()) {
    const search = searchTerm.toLowerCase();

    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search)
    );
  }

  let filteredDonations = allDonations;

  if (statusFilter !== "All") {
    filteredDonations = filteredDonations.filter(
      (donation) => donation.status === statusFilter
    );
  }

  if (searchTerm.trim()) {
    const search = searchTerm.toLowerCase();

    filteredDonations = filteredDonations.filter(
      (donation) =>
        donation.food.toLowerCase().includes(search) ||
        donation.location.toLowerCase().includes(search) ||
        donation.donor.toLowerCase().includes(search) ||
        donation.id.toLowerCase().includes(search)
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Total Donations",
      value: totalDonations,
      icon: Package,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Active Pickups",
      value: activePickups,
      icon: Truck,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Meals Distributed",
      value: mealsDistributed.toLocaleString(),
      icon: Heart,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  // ================= UI HELPERS =================

  const formatRole = (role) => {
    const labels = {
      donor: "Donor",
      ngo: "NGO",
      volunteer: "Volunteer",
      admin: "Admin",
    };

    return labels[role] || role;
  };

  const getRoleStyle = (role) => {
    if (role === "donor") {
      return "bg-green-100 text-green-700";
    }

    if (role === "ngo") {
      return "bg-blue-100 text-blue-700";
    }

    if (role === "volunteer") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-purple-100 text-purple-700";
  };

  const getStatusStyle = (status) => {
    if (status === "Active" || status === "Available") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending" || status === "Claimed") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Pickup in Progress") {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "Completed") {
      return "bg-purple-100 text-purple-700";
    }

    if (status === "Suspended") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
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
                  Admin Control Center
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => setAdminView("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "overview"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <LayoutDashboard size={19} />
              Overview
            </button>

            <button
              onClick={() => setAdminView("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "users"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Users size={19} />
              Users
            </button>

            <button
              onClick={() => setAdminView("ngos")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "ngos"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Building2 size={19} />
              NGOs
            </button>

            <button
              onClick={() => setAdminView("volunteers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "volunteers"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Truck size={19} />
              Volunteers
            </button>

            <button
              onClick={() => setAdminView("donations")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "donations"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Package size={19} />
              Donations
            </button>

            <button
              onClick={() => setAdminView("reports")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                view === "reports"
                  ? "bg-green-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <BarChart3 size={19} />
              Reports
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
                Admin Control Center
              </p>

              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Manage Food Rescue operations 👋
              </h1>
            </div>

            <div className="flex items-center gap-5">
              <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <Bell size={19} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                  A
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Food Rescue Admin
                  </p>

                  <p className="text-xs text-slate-500">
                    System Administrator
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-5 md:p-8 max-w-7xl mx-auto">
            {/* MOBILE WELCOME */}
            <div className="lg:hidden mb-7">
              <p className="text-sm text-slate-500">
                Admin Control Center
              </p>

              <h1 className="text-2xl font-bold mt-1">
                Manage Food Rescue operations 👋
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

            {/* OVERVIEW */}
            {view === "overview" && (
              <div id="admin-content" className="mt-7 space-y-6">
                <div className="grid lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold">
                          Donation Pipeline
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Current status of food rescue donations.
                        </p>
                      </div>

                      <button
                        onClick={() => setAdminView("donations")}
                        className="text-sm text-green-600 font-semibold"
                      >
                        View all
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-4 gap-4 mt-6">
                      {[
                        ["Available", availableDonations, "green"],
                        ["Claimed", claimedDonations, "blue"],
                        ["Pickup", activePickups, "orange"],
                        ["Completed", completedDonations.length, "purple"],
                      ].map(([label, value, color]) => (
                        <div
                          key={label}
                          className="bg-slate-50 rounded-xl p-4"
                        >
                          <p className="text-xs text-slate-500">
                            {label}
                          </p>

                          <p
                            className={`text-2xl font-bold mt-2 ${
                              color === "green"
                                ? "text-green-600"
                                : color === "blue"
                                ? "text-blue-600"
                                : color === "orange"
                                ? "text-orange-600"
                                : "text-purple-600"
                            }`}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{
                          width:
                            totalDonations > 0
                              ? `${Math.round(
                                  (completedDonations.length /
                                    totalDonations) *
                                    100
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      {totalDonations > 0
                        ? `${Math.round(
                            (completedDonations.length /
                              totalDonations) *
                              100
                          )}% of listed donations are completed.`
                        : "No donations yet."}
                    </p>
                  </div>

                  <div className="bg-slate-900 text-white rounded-2xl p-6">
                    <div className="w-12 h-12 bg-green-500/15 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="text-green-400" size={24} />
                    </div>

                    <h2 className="text-xl font-bold mt-5">
                      Platform Health
                    </h2>

                    <p className="text-slate-400 text-sm mt-2">
                      Monitor users, donations, pickups and completed
                      rescues from one place.
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          Verified NGOs
                        </span>

                        <span className="font-semibold">
                          {allUsers.filter(
                            (user) =>
                              user.role === "ngo" && user.verified
                          ).length}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          Active Volunteers
                        </span>

                        <span className="font-semibold">
                          {
                            allUsers.filter(
                              (user) =>
                                user.role === "volunteer" &&
                                user.status === "Active"
                            ).length
                          }
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          Pending Users
                        </span>

                        <span className="font-semibold">
                          {
                            allUsers.filter(
                              (user) => user.status === "Pending"
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Donors",
                      value: roleCounts.donor,
                      icon: Package,
                      style: "bg-green-50 text-green-600",
                      view: "users",
                    },
                    {
                      title: "NGOs",
                      value: roleCounts.ngo,
                      icon: Building2,
                      style: "bg-blue-50 text-blue-600",
                      view: "ngos",
                    },
                    {
                      title: "Volunteers",
                      value: roleCounts.volunteer,
                      icon: Truck,
                      style: "bg-orange-50 text-orange-600",
                      view: "volunteers",
                    },
                    {
                      title: "Completed",
                      value: completedDonations.length,
                      icon: CheckCircle,
                      style: "bg-purple-50 text-purple-600",
                      view: "donations",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.title}
                        onClick={() => {
                          if (item.title === "Donors") {
                            setRoleFilter("donor");
                          } else if (item.title === "NGOs") {
                            setRoleFilter("ngo");
                          } else if (item.title === "Volunteers") {
                            setRoleFilter("volunteer");
                          }

                          setAdminView(item.view);
                        }}
                        className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-500">
                              {item.title}
                            </p>

                            <p className="text-2xl font-bold mt-2">
                              {item.value}
                            </p>
                          </div>

                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.style}`}
                          >
                            <Icon size={21} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-lg font-bold">
                        Recent Donations
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Latest activity across the platform.
                      </p>
                    </div>

                    <button
                      onClick={() => setAdminView("donations")}
                      className="text-sm text-green-600 font-semibold"
                    >
                      View donations
                    </button>
                  </div>

                  <div className="space-y-3">
                    {allDonations.slice(0, 5).map((donation) => (
                      <div
                        key={donation.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">
                            {donation.food}
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            {donation.id} • {donation.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusStyle(
                              donation.status
                            )}`}
                          >
                            {donation.status}
                          </span>

                          <span className="text-sm font-semibold">
                            {donation.servings} meals
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* USERS / NGOs / VOLUNTEERS */}
            {(view === "users" ||
              view === "ngos" ||
              view === "volunteers") && (
              <div id="admin-content" className="mt-7">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-5 md:p-6 border-b border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">
                          {view === "users"
                            ? "All Users"
                            : view === "ngos"
                            ? "NGO Management"
                            : "Volunteer Management"}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Manage accounts and verification status.
                        </p>
                      </div>

                      <span className="text-sm text-slate-500">
                        {filteredUsers.filter((user) => {
                          if (view === "ngos") return user.role === "ngo";
                          if (view === "volunteers") {
                            return user.role === "volunteer";
                          }
                          return true;
                        }).length}{" "}
                        records
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-3 mt-5">
                      <div className="relative flex-1">
                        <Search
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search name, email or phone..."
                          className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-xl outline-none bg-white"
                      >
                        <option value="All">All Roles</option>
                        <option value="donor">Donors</option>
                        <option value="ngo">NGOs</option>
                        <option value="volunteer">Volunteers</option>
                        <option value="admin">Admins</option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-xl outline-none bg-white"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Verification</th>
                          <th className="px-6 py-4">Joined</th>
                          <th className="px-6 py-4 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredUsers
                          .filter((user) => {
                            if (view === "ngos") {
                              return user.role === "ngo";
                            }

                            if (view === "volunteers") {
                              return user.role === "volunteer";
                            }

                            return true;
                          })
                          .map((user) => (
                            <tr
                              key={user.id}
                              className="hover:bg-slate-50"
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                    {user.name.charAt(0).toUpperCase()}
                                  </div>

                                  <div>
                                    <p className="font-semibold text-slate-800">
                                      {user.name}
                                    </p>

                                    <p className="text-xs text-slate-500 mt-1">
                                      {user.email}
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                      {user.phone}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <span
                                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getRoleStyle(
                                    user.role
                                  )}`}
                                >
                                  {formatRole(user.role)}
                                </span>
                              </td>

                              <td className="px-6 py-5">
                                <span
                                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusStyle(
                                    user.status
                                  )}`}
                                >
                                  {user.status}
                                </span>
                              </td>

                              <td className="px-6 py-5">
                                <button
                                  onClick={() =>
                                    toggleVerification(user.id)
                                  }
                                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                    user.verified
                                      ? "text-green-600"
                                      : "text-orange-600"
                                  }`}
                                >
                                  {user.verified ? (
                                    <>
                                      <UserCheck size={15} />
                                      Verified
                                    </>
                                  ) : (
                                    <>
                                      <UserX size={15} />
                                      Pending
                                    </>
                                  )}
                                </button>
                              </td>

                              <td className="px-6 py-5 text-sm text-slate-600">
                                {new Date(
                                  user.joinedAt
                                ).toLocaleDateString()}
                              </td>

                              <td className="px-6 py-5">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() =>
                                      alert(
                                        `Name: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nRole: ${formatRole(
                                          user.role
                                        )}\nStatus: ${user.status}`
                                      )
                                    }
                                    className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                                    title="View"
                                  >
                                    <Eye size={16} />
                                  </button>

                                  {user.status === "Suspended" ? (
                                    <button
                                      onClick={() =>
                                        updateUserStatus(
                                          user.id,
                                          "Active"
                                        )
                                      }
                                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                                      title="Activate"
                                    >
                                      <UserCheck size={16} />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        updateUserStatus(
                                          user.id,
                                          "Suspended"
                                        )
                                      }
                                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                      title="Suspend"
                                    >
                                      <UserX size={16} />
                                    </button>
                                  )}

                                  <button
                                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                                    title="More"
                                  >
                                    <MoreVertical size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredUsers.filter((user) => {
                    if (view === "ngos") return user.role === "ngo";
                    if (view === "volunteers") {
                      return user.role === "volunteer";
                    }
                    return true;
                  }).length === 0 && (
                    <div className="p-12 text-center">
                      <Users
                        size={42}
                        className="mx-auto text-slate-300"
                      />

                      <h3 className="font-semibold text-slate-800 mt-4">
                        No users found
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Try another search or filter.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DONATIONS */}
            {view === "donations" && (
              <div id="admin-content" className="mt-7">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-5 md:p-6 border-b border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">
                          Donation Management
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Monitor every donation from listing to
                          completion.
                        </p>
                      </div>

                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <RefreshCw size={16} />
                        Refresh
                      </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-3 mt-5">
                      <div className="relative flex-1">
                        <Search
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search food, donor, location or ID..."
                          className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-xl outline-none bg-white"
                      >
                        <option value="All">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Claimed">Claimed</option>
                        <option value="Pickup in Progress">
                          Pickup in Progress
                        </option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-6 py-4">Donation</th>
                          <th className="px-6 py-4">Donor</th>
                          <th className="px-6 py-4">Location</th>
                          <th className="px-6 py-4">Meals</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredDonations.map((donation) => (
                          <tr
                            key={donation.id}
                            className="hover:bg-slate-50"
                          >
                            <td className="px-6 py-5">
                              <p className="font-semibold text-slate-800">
                                {donation.food}
                              </p>

                              <p className="text-xs text-slate-500 mt-1">
                                {donation.id} • {donation.category}
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                {donation.quantity}
                              </p>
                            </td>

                            <td className="px-6 py-5 text-sm text-slate-700">
                              {donation.donor}
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex items-start gap-2 text-sm text-slate-600">
                                <MapPin
                                  size={16}
                                  className="text-green-600 mt-0.5"
                                />

                                <span>{donation.location}</span>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <span className="font-semibold">
                                {donation.servings}
                              </span>

                              <span className="text-xs text-slate-500 ml-1">
                                meals
                              </span>
                            </td>

                            <td className="px-6 py-5">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusStyle(
                                  donation.status
                                )}`}
                              >
                                {donation.status}
                              </span>
                            </td>

                            <td className="px-6 py-5 text-right">
                              <button
                                onClick={() =>
                                  alert(
                                    `Donation ID: ${donation.id}\nFood: ${donation.food}\nCategory: ${donation.category}\nQuantity: ${donation.quantity}\nMeals: ${donation.servings}\nLocation: ${donation.location}\nDonor: ${donation.donor}\nStatus: ${donation.status}`
                                  )
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
                              >
                                <Eye size={15} />
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredDonations.length === 0 && (
                    <div className="p-12 text-center">
                      <Package
                        size={42}
                        className="mx-auto text-slate-300"
                      />

                      <h3 className="font-semibold text-slate-800 mt-4">
                        No donations found
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REPORTS */}
            {view === "reports" && (
              <div id="admin-content" className="mt-7 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">
                        Reports & Analytics
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        High-level metrics for the current frontend
                        dataset.
                      </p>
                    </div>

                    <BarChart3 className="text-green-600" size={24} />
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                    <div className="bg-green-50 rounded-2xl p-5">
                      <p className="text-sm text-slate-500">
                        Completion Rate
                      </p>

                      <p className="text-3xl font-bold text-green-600 mt-2">
                        {totalDonations > 0
                          ? `${Math.round(
                              (completedDonations.length /
                                totalDonations) *
                                100
                            )}%`
                          : "0%"}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5">
                      <p className="text-sm text-slate-500">
                        NGO Accounts
                      </p>

                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        {roleCounts.ngo}
                      </p>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-sm text-slate-500">
                        Volunteer Accounts
                      </p>

                      <p className="text-3xl font-bold text-orange-600 mt-2">
                        {roleCounts.volunteer}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-5">
                      <p className="text-sm text-slate-500">
                        Meals Rescued
                      </p>

                      <p className="text-3xl font-bold text-purple-600 mt-2">
                        {mealsDistributed.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg">
                      User Distribution
                    </h3>

                    <div className="space-y-4 mt-5">
                      {[
                        ["Donors", roleCounts.donor, "bg-green-500"],
                        ["NGOs", roleCounts.ngo, "bg-blue-500"],
                        [
                          "Volunteers",
                          roleCounts.volunteer,
                          "bg-orange-500",
                        ],
                        ["Admins", roleCounts.admin, "bg-purple-500"],
                      ].map(([label, value, color]) => (
                        <div key={label}>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">
                              {label}
                            </span>

                            <span className="font-semibold">
                              {value}
                            </span>
                          </div>

                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`${color} h-full rounded-full`}
                              style={{
                                width:
                                  totalUsers > 0
                                    ? `${Math.max(
                                        4,
                                        Math.round(
                                          (value / totalUsers) * 100
                                        )
                                      )}%`
                                    : "0%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white rounded-2xl p-6">
                    <p className="text-green-400 text-sm font-semibold">
                      PLATFORM IMPACT
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      Small actions create measurable food rescue.
                    </h3>

                    <p className="text-slate-400 text-sm mt-3">
                      This dashboard currently reads the frontend's
                      local data. The backend phase will replace these
                      values with live MongoDB analytics.
                    </p>

                    <button
                      onClick={() => setAdminView("overview")}
                      className="inline-flex items-center gap-2 mt-6 text-green-400 font-semibold"
                    >
                      Back to overview
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FOOTER INFO */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    FoodRescue Admin
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Frontend administration and monitoring panel.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} />
                  Data refreshes when the page reloads.
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
