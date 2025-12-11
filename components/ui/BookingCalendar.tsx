"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface BookingCalendarProps {
  calendarUrl?: string;
  variant?: "inline" | "modal" | "button";
  className?: string;
}

// Meeting details
const meetingInfo = {
  duration: "30 minutes",
  type: "Video Call (Google Meet/Zoom)",
  topics: [
    "Discuss your project requirements",
    "Review your goals and timeline",
    "Answer any questions you have",
    "Provide a preliminary quote",
  ],
};

// Available times placeholder (for custom implementation)
const availableTimes = [
  { day: "Mon", date: "15", times: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { day: "Tue", date: "16", times: ["10:00 AM", "1:00 PM", "4:00 PM"] },
  { day: "Wed", date: "17", times: ["9:00 AM", "3:00 PM"] },
  { day: "Thu", date: "18", times: ["11:00 AM", "2:00 PM", "5:00 PM"] },
  { day: "Fri", date: "19", times: ["9:00 AM", "12:00 PM"] },
];

export default function BookingCalendar({
  calendarUrl = "https://calendly.com/jamesgabbitus",
  variant = "inline",
  className,
}: BookingCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Button variant - just opens external calendar
  if (variant === "button") {
    return (
      <Button
        size="lg"
        rightIcon={<ExternalLink className="w-4 h-4" />}
        onClick={() => window.open(calendarUrl, "_blank")}
        className={className}
      >
        Book a Discovery Call
      </Button>
    );
  }

  // Modal variant
  if (variant === "modal") {
    return (
      <>
        <Button
          size="lg"
          leftIcon={<Calendar className="w-5 h-5" />}
          onClick={() => setIsModalOpen(true)}
          className={className}
        >
          Schedule a Call
        </Button>

        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-card border border-border rounded-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-semibold text-foreground">
                  Book a Discovery Call
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-card-hover transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content - Embed Calendly or custom calendar */}
              <div className="p-6">
                <div className="aspect-video bg-background rounded-xl flex items-center justify-center">
                  {/* Option 1: Embed Calendly iframe */}
                  <iframe
                    src={calendarUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="rounded-xl"
                  />

                  {/* Option 2: Placeholder for custom calendar */}
                  {/* <div className="text-center">
                    <Calendar className="w-12 h-12 text-muted mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Calendar integration coming soon
                    </p>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </>
    );
  }

  // Inline variant - custom calendar UI
  return (
    <div className={cn("bg-card border border-border rounded-2xl overflow-hidden", className)}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Book a Discovery Call
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{meetingInfo.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span>{meetingInfo.type}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Left - What we'll discuss */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">
            What we'll discuss:
          </h4>
          <ul className="space-y-3">
            {meetingInfo.topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Calendar */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">
            Select a day:
          </h4>

          {/* Day selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {availableTimes.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDay(index);
                  setSelectedTime(null);
                }}
                className={cn(
                  "flex flex-col items-center px-4 py-3 rounded-xl border transition-all duration-300 flex-shrink-0",
                  selectedDay === index
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 text-muted-foreground"
                )}
              >
                <span className="text-xs font-medium uppercase">{day.day}</span>
                <span className="text-lg font-bold">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Time slots */}
          {selectedDay !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="text-sm font-medium text-foreground mb-3">
                Available times:
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {availableTimes[selectedDay].times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300",
                      selectedTime === time
                        ? "border-primary bg-primary text-white"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Book button */}
          <Button
            fullWidth
            disabled={!selectedTime}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              // Open Calendly with pre-selected time or handle custom booking
              window.open(calendarUrl, "_blank");
            }}
          >
            {selectedTime ? `Book ${selectedTime}` : "Select a time"}
          </Button>

          {/* Alternative link */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Or{" "}
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              view full calendar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}