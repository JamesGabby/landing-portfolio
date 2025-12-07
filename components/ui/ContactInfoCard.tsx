"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { contactInfo, socialLinks } from "@/lib/data/contact";

export default function ContactInfoCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      action: copyEmail,
      actionIcon: copied ? Check : Copy,
      actionLabel: copied ? "Copied!" : "Copy",
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactInfo.location,
    },
    {
      icon: Clock,
      label: "Response Time",
      value: contactInfo.responseTime,
    },
    {
      icon: Calendar,
      label: "Availability",
      value: contactInfo.availability,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info items */}
      <div className="space-y-4">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          const ActionIcon = item.actionIcon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl transition-colors duration-300",
                item.highlight
                  ? "bg-success/10 border border-success/20"
                  : "bg-card border border-border hover:border-primary/30"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  item.highlight
                    ? "bg-success/20 text-success"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p
                  className={cn(
                    "font-medium truncate",
                    item.highlight ? "text-success" : "text-foreground"
                  )}
                >
                  {item.value}
                </p>
              </div>
              {item.action && ActionIcon && (
                <button
                  onClick={item.action}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ActionIcon className="w-3 h-3" />
                  {item.actionLabel}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Social links */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">Connect with me</p>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  social.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Book a call CTA */}
      <motion.a
        href={contactInfo.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Book a Discovery Call</p>
            <p className="text-sm text-muted-foreground">
              Free 30-minute consultation
            </p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.a>
    </div>
  );
}