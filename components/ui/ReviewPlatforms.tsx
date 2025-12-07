"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  {
    name: "Clutch",
    rating: 5.0,
    reviews: 12,
    url: "https://clutch.co",
    logo: "C",
    color: "bg-orange-500",
  },
  {
    name: "Upwork",
    rating: 5.0,
    reviews: 28,
    url: "https://upwork.com",
    logo: "U",
    color: "bg-green-500",
  },
  {
    name: "Toptal",
    rating: 5.0,
    reviews: 8,
    url: "https://toptal.com",
    logo: "T",
    color: "bg-blue-500",
  },
  {
    name: "LinkedIn",
    rating: 5.0,
    reviews: 15,
    url: "https://linkedin.com",
    logo: "in",
    color: "bg-blue-600",
  },
];

interface ReviewPlatformsProps {
  className?: string;
}

export default function ReviewPlatforms({ className }: ReviewPlatformsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("", className)}
    >
      <p className="text-center text-sm text-muted-foreground mb-6">
        Verified reviews across platforms
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {platforms.map((platform, index) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300 group"
          >
            {/* Platform logo placeholder */}
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm",
                platform.color
              )}
            >
              {platform.logo}
            </div>

            {/* Rating info */}
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">
                  {platform.rating}
                </span>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="text-xs text-muted-foreground">
                {platform.reviews} reviews
              </div>
            </div>

            {/* External link icon */}
            <ExternalLink className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}