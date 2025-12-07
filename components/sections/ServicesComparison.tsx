"use client";

import { motion } from "framer-motion";
import { Check, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = {
  features: [
    { name: "Custom Design", category: "Design" },
    { name: "Responsive Layout", category: "Design" },
    { name: "Micro-animations", category: "Design" },
    { name: "Design System", category: "Design" },
    { name: "Next.js Development", category: "Development" },
    { name: "CMS Integration", category: "Development" },
    { name: "Database Setup", category: "Development" },
    { name: "Authentication", category: "Development" },
    { name: "API Development", category: "Development" },
    { name: "SEO Optimization", category: "Marketing" },
    { name: "Analytics Setup", category: "Marketing" },
    { name: "A/B Testing Ready", category: "Marketing" },
    { name: "Revision Rounds", category: "Support" },
    { name: "Post-launch Support", category: "Support" },
    { name: "Priority Support", category: "Support" },
  ],
  packages: [
    {
      name: "Starter",
      values: [true, true, "Basic", false, true, false, false, false, false, true, "Basic", false, "1 round", "7 days", false],
    },
    {
      name: "Professional",
      values: [true, true, true, true, true, true, "Basic", false, false, true, true, true, "3 rounds", "30 days", false],
    },
    {
      name: "Enterprise",
      values: [true, true, true, true, true, true, true, true, true, true, true, true, "Unlimited", "90 days", true],
    },
  ],
};

const FeatureValue = ({ value }: { value: boolean | string }) => {
  if (value === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
        <Check className="w-4 h-4 text-success" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-6 h-6 rounded-full bg-muted/10 flex items-center justify-center">
        <Minus className="w-4 h-4 text-muted" />
      </div>
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
};

export default function ServicesComparison() {
  const categories = [...new Set(comparisonData.features.map((f) => f.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-20 overflow-x-auto"
    >
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Detailed Comparison
        </h3>
        <p className="text-muted-foreground">
          See exactly what's included in each package
        </p>
      </div>

      <div className="min-w-[600px]">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">
                Features
              </th>
              {comparisonData.packages.map((pkg, index) => (
                <th
                  key={pkg.name}
                  className={cn(
                    "py-4 px-6 text-center",
                    index === 1 && "bg-primary/5 rounded-t-2xl"
                  )}
                >
                  <span
                    className={cn(
                      "font-semibold",
                      index === 1 ? "text-primary" : "text-foreground"
                    )}
                  >
                    {pkg.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {categories.map((category) => (
              <>
                {/* Category header */}
                <tr key={category}>
                  <td
                    colSpan={4}
                    className="pt-6 pb-2 px-4 text-sm font-semibold text-primary uppercase tracking-wider"
                  >
                    {category}
                  </td>
                </tr>

                {/* Features in category */}
                {comparisonData.features
                  .filter((f) => f.category === category)
                  .map((feature, featureIndex) => {
                    const globalIndex = comparisonData.features.findIndex(
                      (f) => f.name === feature.name
                    );
                    return (
                      <tr
                        key={feature.name}
                        className="border-b border-border/50 hover:bg-card/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {feature.name}
                        </td>
                        {comparisonData.packages.map((pkg, pkgIndex) => (
                          <td
                            key={`${pkg.name}-${feature.name}`}
                            className={cn(
                              "py-4 px-6 text-center",
                              pkgIndex === 1 && "bg-primary/5"
                            )}
                          >
                            <div className="flex justify-center">
                              <FeatureValue value={pkg.values[globalIndex]} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}