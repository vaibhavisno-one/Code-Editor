import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Activity, Code2, Star, Timer, TrendingUp, Trophy, UserIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Id } from "../../../../convex/_generated/dataModel";

import { UserResource } from "@clerk/types";

interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    proSince?: number | undefined;
    lemonSqueezyCustomerId?: string | undefined;
    lemonSqueezyOrderId?: string | undefined;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}

function ProfileHeader({ userStats, userData, user }: ProfileHeaderProps) {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      color: "from-accent-blue to-sky-500",
      gradient: "group-hover:via-accent-blue/80",
      description: "Total code runs",
      metric: {
        label: "Last 24h",
        value: userStats?.last24Hours ?? 0,
        icon: Timer,
      },
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: Star,
      color: "from-accent-purple to-pink-500",
      gradient: "group-hover:via-accent-purple/80",
      description: "Saved for later",
      metric: {
        label: "Most starred",
        value: userStats?.mostStarredLanguage ?? "N/A",
        icon: Trophy,
      },
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      color: "from-accent-purple to-pink-500", // Or use accent-blue for variety: "from-accent-blue to-sky-500"
      gradient: "group-hover:via-accent-purple/80", // Match above: "group-hover:via-accent-blue/80"
      description: "Different languages",
      metric: {
        label: "Most used",
        value: userStats?.favoriteLanguage ?? "N/A",
        icon: TrendingUp,
      },
    },
  ];

  return (
    <div
      className="relative mb-8 bg-gradient-to-br from-secondary-background to-primary-background rounded-2xl p-8 border
     border-primary-background/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-text-primary/[0.02] bg-[size:32px]" />
      <div className="relative flex items-center gap-8">
        <div className="relative group">
          <div
            className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full
          blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
          />
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary-background relative z-10 group-hover:scale-105 transition-transform"
          />
          {userData.isPro && (
            <div
              className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-purple to-accent-purple/90 p-2
             rounded-full z-20 shadow-lg animate-pulse"
            >
              <Zap className="w-4 h-4 text-text-primary" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-text-primary">{userData.name}</h1>
            {userData.isPro && (
              <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-sm font-medium">
                Pro Member
              </span>
            )}
          </div>
          <p className="text-text-secondary flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            {userData.email}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {STATS.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
            className="group relative bg-gradient-to-br from-primary-background/70 to-primary-background/40 rounded-2xl overflow-hidden"
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-all 
              duration-500 ${stat.gradient}`}
            />

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-text-secondary">{stat.description}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <stat.icon className="w-5 h-5 text-text-primary" />
                </div>
              </div>

              {/* Additional metric */}
              <div className="flex items-center gap-2 pt-4 border-t border-primary-background/50">
                <stat.metric.icon className="w-4 h-4 text-text-secondary/70" />
                <span className="text-sm text-text-secondary">{stat.metric.label}:</span>
                <span className="text-sm font-medium text-text-primary">{stat.metric.value}</span>
              </div>
            </div>

            {/* Interactive hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-text-primary/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default ProfileHeader;