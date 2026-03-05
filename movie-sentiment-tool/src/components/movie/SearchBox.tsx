"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SearchBoxProps {
  onSearch: (id: string) => void;
  loading: boolean;
}

export function SearchBox({ onSearch, loading }: SearchBoxProps) {
  const [imdbId, setImdbId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imdbId.trim()) {
      onSearch(imdbId.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Enter IMDb Movie ID (e.g., tt0133093)"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          className="pl-12 pr-32 h-14 text-lg glass-card focus-visible:ring-primary/50 rounded-2xl transition-all"
        />
        <Button
          type="submit"
          disabled={loading || !imdbId.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 rounded-xl font-medium"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Analyze"
          )}
        </Button>
      </form>
      <p className="mt-3 text-sm text-center text-muted-foreground/80">
        Try <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary">tt0133093</code> (The Matrix) or <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary">tt0111161</code> (The Shawshank Redemption)
      </p>
    </motion.div>
  );
}
