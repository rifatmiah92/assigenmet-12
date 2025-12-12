import React, { useState } from "react";
import { useApp } from "../store";
import { ContestCard, SectionTitle } from "../components/ContestComponents";
import { ContestCategory, ContestStatus, UserRole } from "../script";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Trophy,
  Medal,
  Star,
  Target,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// --- HOME PAGE ---
export const Home = () => {
  const { contests } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const popularContests = contests
    .filter((c) => c.status === ContestStatus.CONFIRMED)
    .sort((a, b) => b.participantsCount - a.participantsCount)
    .slice(0, 8); // Show 8 items

  const highStakesContests = contests
    .filter((c) => c.status === ContestStatus.CONFIRMED && c.prizeMoney >= 1000)
    .sort((a, b) => b.prizeMoney - a.prizeMoney)
    .slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/all-contests?search=${searchTerm}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center bg-gray-900 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-950 to-black z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-primary-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Contests Happening Now
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Ignite Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400">
                  Creative Spark
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Join a global community of creators. Participate in design,
                coding, and writing challenges to win prizes and build your
                legacy.
              </p>

              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="relative max-w-lg mx-auto lg:mx-0"
              >
                <input
                  type="text"
                  placeholder="Search for challenges..."
                  className="w-full pl-6 pr-32 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white/15 transition-all shadow-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center"
                >
                  <Search size={20} />
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-400 text-sm font-medium">
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-primary-400" /> 12k+
                  Users
                </div>
                <div className="flex items-center">
                  <Trophy size={16} className="mr-2 text-yellow-400" /> $500k+
                  Paid
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="mr-2 text-blue-400" /> Global
                  Access
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content: Floating Cards */}
          <div className="hidden lg:block relative h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-10 right-10 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl z-20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  Trending
                </div>
                <Trophy className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                UI/UX Design Battle
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Redesign the future of banking apps.
              </p>
              <div className="flex justify-between items-center text-white">
                <span className="text-2xl font-bold">$2,500</span>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800"
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute bottom-20 left-10 w-72 bg-gradient-to-br from-primary-600 to-purple-700 rounded-3xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Star className="text-white" fill="white" size={20} />
                </div>
                <div>
                  <p className="text-white/80 text-xs font-bold uppercase">
                    Featured Creator
                  </p>
                  <p className="text-white font-bold">Sarah Jenkins</p>
                </div>
              </div>
              <p className="text-white text-sm">
                "Winning the Arena Code Fest changed my career forever."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* High Stakes Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                High Stakes Challenges
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                Big prizes for top-tier talent.
              </p>
            </div>
            <Link
              to="/all-contests"
              className="hidden md:flex items-center font-bold text-primary-600 hover:text-primary-700 transition"
            >
              View All <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highStakesContests.map((contest, index) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Contests */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Popular Contests"
            subtitle="Join the most active challenges happening right now."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularContests.map((contest, index) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/all-contests"
              className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Explore All Contests <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Arena?"
            subtitle="We provide the best ecosystem for you to grow."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Target className="w-8 h-8 text-primary-500" />,
                title: "Focused Challenges",
                desc: "Curated contests that test specific skills in Design, Coding, and Writing.",
              },
              {
                icon: <Shield className="w-8 h-8 text-green-500" />,
                title: "Secure Payments",
                desc: "Guaranteed prize payouts and secure entry fee processing for peace of mind.",
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-500" />,
                title: "Fast Recognition",
                desc: "Get feedback, win badges, and climb the global leaderboard instantly.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winner Advertisement */}
      <section className="py-24 bg-gradient-to-r from-primary-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Hall of Fame
            </h2>
            <p className="text-xl text-primary-200 mb-12 max-w-2xl mx-auto">
              Meet the champions who turned their skills into fortune. Will you
              be next?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Rivers",
                  prize: "$5,000",
                  role: "UI Designer",
                  img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
                },
                {
                  name: "Jordan Lee",
                  prize: "$3,200",
                  role: "Python Dev",
                  img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200",
                },
                {
                  name: "Casey Smith",
                  prize: "$1,500",
                  role: "Copywriter",
                  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
                },
              ].map((winner, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition"
                >
                  <img
                    src={winner.img}
                    alt={winner.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-400 object-cover"
                  />
                  <h3 className="text-xl font-bold text-white">
                    {winner.name}
                  </h3>
                  <p className="text-primary-300 text-sm mb-2">{winner.role}</p>
                  <div className="inline-block bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                    Won {winner.prize}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// --- ALL CONTESTS PAGE ---
export const AllContests = () => {
  const { contests } = useApp();
  const [activeTab, setActiveTab] = useState("All");
  const query = new URLSearchParams(location.hash.split("?")[1]);
  const searchQuery = query.get("search") || "";

  const categories = ["All", ...Object.values(ContestCategory)];

  const filteredContests = contests
    .filter((c) => c.status === ContestStatus.CONFIRMED)
    .filter((c) => activeTab === "All" || c.category === activeTab)
    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="All Contests"
        subtitle="Browse through hundreds of opportunities to showcase your talent."
      />

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === cat
                ? "bg-primary-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredContests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>

      {filteredContests.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-400">
            No contests found.
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

// --- LEADERBOARD PAGE ---
export const Leaderboard = () => {
  const { users, contests, submissions } = useApp();

  // Calculate wins per user
  const userWins = users
    .map((user) => {
      const wins = contests.filter((c) => c.winnerId === user.id).length;
      return { ...user, wins };
    })
    .filter((u) => u.wins > 0)
    .sort((a, b) => b.wins - a.wins);

  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4">
      <SectionTitle
        title="Leaderboard"
        subtitle="Top performers across all categories."
      />

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {userWins.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center p-6 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
          >
            <div className="w-12 text-center font-black text-2xl text-gray-300 mr-6">
              {index + 1 === 1 ? (
                <Medal className="text-yellow-400 mx-auto w-8 h-8" />
              ) : index + 1 === 2 ? (
                <Medal className="text-gray-400 mx-auto w-8 h-8" />
              ) : index + 1 === 3 ? (
                <Medal className="text-orange-400 mx-auto w-8 h-8" />
              ) : (
                `#${index + 1}`
              )}
            </div>
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-md mr-6"
            />
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-primary-600 dark:text-primary-400">
                {user.wins}
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Wins
              </div>
            </div>
          </div>
        ))}
        {userWins.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No winners yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
};
