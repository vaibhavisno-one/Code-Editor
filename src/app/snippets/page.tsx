"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";

function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  // loading state
  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-primary-background">
      <NavigationHeader />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r
             from-accent-blue/10 to-accent-purple/10 text-sm text-text-secondary mb-6"
          >
            <BookOpen className="w-4 h-4" />
            Community Code Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-text-primary to-text-secondary text-transparent bg-clip-text mb-6"
          >
            Discover & Share Code Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary mb-8"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>

        {/* Filters Section */}
        <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="w-full pl-12 pr-4 py-4 bg-secondary-background/80 hover:bg-secondary-background text-text-primary
                  rounded-xl border border-primary-background hover:border-text-secondary/50 transition-all duration-200
                  placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary-background rounded-lg ring-1 ring-primary-background">
              <Tag className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">Languages:</span>
            </div>

            {popularLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
                className={`
                    group relative px-3 py-1.5 rounded-lg transition-all duration-200
                    ${
                      selectedLanguage === lang
                        ? "text-accent-blue bg-accent-blue/10 ring-2 ring-accent-blue/50"
                        : "text-text-secondary hover:text-text-primary bg-secondary-background hover:bg-primary-background ring-1 ring-primary-background"
                    }
                  `}
              >
                <div className="flex items-center gap-2">
                  <img src={`/${lang}.png`} alt={lang} className="w-4 h-4 object-contain" />
                  <span className="text-sm">{lang}</span>
                </div>
              </button>
            ))}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-text-secondary/70">
                {filteredSnippets.length} snippets found
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-secondary-background rounded-lg ring-1 ring-primary-background">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-all ${
                    view === "grid"
                      ? "bg-accent-blue/20 text-accent-blue"
                      : "text-text-secondary hover:text-text-primary hover:bg-primary-background"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md transition-all ${
                    view === "list"
                      ? "bg-accent-blue/20 text-accent-blue"
                      : "text-text-secondary hover:text-text-primary hover:bg-primary-background"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Snippets Grid */}
        <motion.div
          className={`grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* edge case: empty state */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden"
          >
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br 
                from-accent-blue/10 to-accent-purple/10 ring-1 ring-text-primary/10 mb-6"
              >
                <Code className="w-8 h-8 text-text-secondary" />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-3">No snippets found</h3>
              <p className="text-text-secondary mb-6">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>

              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-background text-text-secondary hover:text-text-primary rounded-lg
                    transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default SnippetsPage;