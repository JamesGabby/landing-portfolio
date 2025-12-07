"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisons = [
  {
    aspect: "Communication",
    typical: "Weekly emails if lucky",
    myWay: "Daily updates + weekly video calls",
  },
  {
    aspect: "Timeline",
    typical: "Unclear, often delayed",
    myWay: "Fixed timeline with milestone tracking",
  },
  {
    aspect: "Revisions",
    typical: "Limited, extra charges",
    myWay: "Unlimited until you're happy",
  },
  {
    aspect: "Process",
    typical: "Black box, surprises",
    myWay: "Transparent, you're involved at every step",
  },
  {
    aspect: "Post-launch",
    typical: "Ghost after payment",
    myWay: "Support period included + ongoing availability",
  },
  {
    aspect: "Code Quality",
    typical: "Works, but messy",
    myWay: "Clean, documented, maintainable",
  },
];

export default function ProcessComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Aspect
            </th>
            <th className="text-left py-4 px-4">
              <div className="flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  Typical Experience
                </span>
              </div>
            </th>
            <th className="text-left py-4 px-4 bg-primary/5 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-foreground">
                  Working With Me
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((row, index) => (
            <motion.tr
              key={row.aspect}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-t border-border"
            >
              <td className="py-4 px-4 font-medium text-foreground">
                {row.aspect}
              </td>
              <td className="py-4 px-4 text-muted-foreground text-sm">
                {row.typical}
              </td>
              <td className="py-4 px-4 bg-primary/5 text-foreground text-sm font-medium">
                {row.myWay}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}