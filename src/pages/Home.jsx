import Navbar from "../components/Navbar";
import {
  ArrowRight,
  Heart,
  Leaf,
  Users,
  Utensils,
  Truck,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAF7] text-slate-900">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Leaf size={16} />
                Turning surplus into impact
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">

                Rescue Food.
                <br />

                <span className="text-green-600">
                  Reduce Waste.
                </span>

                <br />

                Feed Communities.
              </h1>

              <p className="mt-7 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Food Rescue connects restaurants, households, canteens
                and events with NGOs and volunteers to make sure good
                food reaches people instead of landfills.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">

                <button className="group bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg shadow-green-600/20">
                  Donate Food
                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>

                <button className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-7 py-3.5 rounded-xl font-semibold transition">
                  Find Food
                </button>

              </div>

              {/* TRUST */}
              <div className="flex flex-wrap items-center gap-6 mt-9 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <Heart size={17} className="text-green-600" />
                  Community driven
                </div>

                <div className="flex items-center gap-2">
                  <Leaf size={17} className="text-green-600" />
                  Reduce food waste
                </div>

              </div>

            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">

              <div className="absolute -top-8 -right-8 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-60" />

              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50" />

              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

                {/* Image area */}
                <div className="h-72 bg-gradient-to-br from-green-100 via-emerald-50 to-yellow-50 flex items-center justify-center">

                  <div className="text-center">

                    <div className="w-28 h-28 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Utensils
                        size={52}
                        className="text-green-600"
                      />
                    </div>

                    <p className="mt-5 text-slate-700 font-semibold">
                      Good food deserves another table.
                    </p>

                  </div>

                </div>

                {/* Rescue card */}
                <div className="p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        Today's rescue
                      </p>

                      <h3 className="text-2xl font-bold text-slate-900">
                        248 meals
                      </h3>
                    </div>

                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Heart
                        size={23}
                        className="text-green-600"
                        fill="currentColor"
                      />
                    </div>

                  </div>

                  <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-green-600 rounded-full" />
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Community impact this week
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-900">
                12K+
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Meals Rescued
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-900">
                350+
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Food Donors
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-900">
                120+
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Partner NGOs
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-900">
                8K+
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                People Reached
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-green-600 font-semibold">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl font-bold text-slate-900 mt-3">
              From surplus to someone's plate
            </h2>

            <p className="text-slate-600 mt-4">
              A simple process that helps good food reach the people
              and communities who can use it.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {/* CARD 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition">

              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <Utensils className="text-green-600" size={27} />
              </div>

              <h3 className="text-xl font-bold mt-6">
                1. Donate
              </h3>

              <p className="text-slate-600 mt-3 leading-relaxed">
                Donors list their safe surplus food with quantity,
                location and pickup details.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition">

              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="text-blue-600" size={27} />
              </div>

              <h3 className="text-xl font-bold mt-6">
                2. Connect
              </h3>

              <p className="text-slate-600 mt-3 leading-relaxed">
                NGOs and verified collectors discover available food
                nearby and claim suitable donations.
              </p>

            </div>

            {/* CARD 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition">

              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <Truck className="text-orange-600" size={27} />
              </div>

              <h3 className="text-xl font-bold mt-6">
                3. Deliver
              </h3>

              <p className="text-slate-600 mt-3 leading-relaxed">
                Volunteers or collectors pick up the food and help
                deliver it to the people who need it.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section
        id="about"
        className="py-24 bg-slate-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-green-400 font-semibold">
                OUR MISSION
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                What if surplus food
                became someone's meal?
              </h2>

            </div>

            <div>

              <p className="text-slate-300 text-lg leading-relaxed">
                Food Rescue creates a bridge between people who have
                excess food and organizations that can distribute it.
                Instead of letting edible food go to waste, we help
                communities rescue, coordinate and deliver it.
              </p>

              <button className="mt-7 text-green-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Learn more
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="py-20 bg-[#F8FAF7]"
      >
        <div className="max-w-3xl mx-auto text-center px-6">

          <p className="text-green-600 font-semibold">
            GET INVOLVED
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Be part of the food rescue movement.
          </h2>

          <p className="text-slate-600 mt-4">
            Donate surplus food, volunteer your time or partner with
            us to help reduce food waste in your community.
          </p>

          <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 rounded-xl font-semibold transition">
            Get Started
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 py-8">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <p className="text-white font-bold text-lg">
              Food<span className="text-green-500">Rescue</span>
            </p>

            <p className="text-sm mt-1">
              Rescue food. Reduce waste. Feed communities.
            </p>
          </div>

          <p className="text-sm">
            © 2026 Food Rescue. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;