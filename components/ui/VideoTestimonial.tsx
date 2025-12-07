"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, StarRating } from "./TestimonialCard";

interface VideoTestimonialProps {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  thumbnailUrl: string;
  videoUrl: string;
  quote: string;
  rating?: number;
}

export default function VideoTestimonial({
  name,
  role,
  company,
  avatar,
  thumbnailUrl,
  videoUrl,
  quote,
  rating = 5,
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setIsPlaying(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
      >
        {/* Thumbnail */}
        <div
          className="relative aspect-video cursor-pointer"
          onClick={openModal}
        >
          <Image
            src={thumbnailUrl}
            alt={`${name} video testimonial`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-foreground">
            2:34
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <StarRating rating={rating} />

          <p className="text-muted-foreground mt-4 mb-4 line-clamp-2">
            "{quote}"
          </p>

          <div className="flex items-center gap-3">
            <Avatar src={avatar} name={name} size="sm" />
            <div>
              <p className="text-sm font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">
                {role}, {company}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-50"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            >
              <div className="relative w-full max-w-4xl">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Video */}
                <div className="relative aspect-video bg-card rounded-2xl overflow-hidden">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    poster={thumbnailUrl}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    playsInline
                    onClick={togglePlay}
                  />

                  {/* Controls overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          className="p-2 rounded-full bg-primary text-white"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5 ml-0.5" />
                          )}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="p-2 rounded-full bg-white/10 text-white"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Author info */}
                      <div className="flex items-center gap-3">
                        <Avatar src={avatar} name={name} size="sm" />
                        <div className="text-white">
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs opacity-70">{company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}