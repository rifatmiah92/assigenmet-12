import React from "react";
import { Link } from "react-router-dom";
import { Contest } from "../script";
import {
  Users,
  Calendar,
  Trophy,
  ChevronRight,
  DollarSign,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";

interface ContestCardProps {
  contest: Contest;
}

export const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const isEnded = new Date(contest.deadline).getTime() < Date.now();
  const isTrending = contest.participantsCount > 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:border-primary-500/30 transition-all duration-300"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={contest.image}
          alt={contest.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
            {contest.category}
          </span>
          {isTrending && !isEnded && (
            <span className="bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg animate-pulse">
              <Flame size={12} className="mr-1" /> Trending
            </span>
          )}
        </div>

        {/* Prize Money Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
            <Trophy size={12} className="mr-1" /> ${contest.prizeMoney} Prize
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-primary-300 transition-colors">
            {contest.title}
          </h3>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
          {contest.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
            <DollarSign size={14} className="mr-2 text-gray-400" />
            <span className="font-semibold">Fee: ${contest.price}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
            <Users size={14} className="mr-2 text-blue-500" />
            <span className="font-semibold">
              {contest.participantsCount} Joined
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="flex items-center" title="Deadline">
            <Calendar
              size={16}
              className={`mr-2 ${isEnded ? "text-red-500" : "text-orange-500"}`}
            />
            <span className="font-medium">
              {isEnded
                ? "Ended"
                : new Date(contest.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Link
          to={`/contest/${contest.id}`}
          className="w-full flex justify-center items-center py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            View Contest{" "}
            <ChevronRight
              size={16}
              className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    )}
    <div className="w-20 h-1.5 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto mt-6 rounded-full opacity-80"></div>
  </div>
);
