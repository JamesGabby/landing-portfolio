'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Minimize2, Zap, Maximize2 } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const CHATBOT_URL = 'https://ai-support-agent-landing.vercel.app/embed';

  // Simulate new message notification after 5 seconds if chat is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  // Reset loading state when opening
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* Ambient Background Glow - Enhanced */}
      {isOpen && (
        <>
          <div className="fixed bottom-20 right-4 z-40 w-[420px] h-[620px] bg-gradient-to-br from-violet-500/25 via-purple-500/15 to-fuchsia-500/25 blur-3xl rounded-full pointer-events-none animate-pulse" />
          <div className="fixed bottom-40 right-20 z-40 w-[200px] h-[200px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-3xl rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isOpen
            ? isMinimized
              ? 'bottom-20 right-4 w-[400px] h-[72px]'
              : 'bottom-20 right-4 w-[400px] h-[600px]'
            : 'bottom-20 right-4 w-[400px] h-[600px] pointer-events-none'
        }`}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 ease-out transform ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Main Container with Glass Effect */}
          <div className={`w-full h-full bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/60 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Subtle inner border glow */}
            <div className="absolute inset-0 rounded-3xl border border-purple-200/30 pointer-events-none" />

            {/* Chat Content Area */}
            {!isMinimized && (
              <div className="relative h-[calc(100%-72px)] bg-gradient-to-br from-slate-50 via-white to-slate-100">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-200/50 to-fuchsia-200/50 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-200/50 to-cyan-200/50 rounded-full blur-3xl" />
                </div>

                {/* Loading State - Enhanced */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center z-10">
                    {/* Premium Loader */}
                    <div className="relative">
                      {/* Main loader box */}
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                        <Zap size={32} className="text-white animate-pulse" />
                      </div>
                      
                      {/* Orbiting elements */}
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                        <div className="absolute -top-2 left-1/2 w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full transform -translate-x-1/2 shadow-lg" />
                      </div>
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
                        <div className="absolute -bottom-2 left-1/2 w-3 h-3 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full transform -translate-x-1/2 shadow-lg" />
                      </div>
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }}>
                        <div className="absolute top-1/2 -right-2 w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full transform -translate-y-1/2 shadow-lg" />
                      </div>

                      {/* Glow ring */}
                      <div className="absolute inset-[-8px] rounded-3xl border-2 border-purple-300/30 animate-pulse" />
                    </div>
                    
                    <p className="mt-8 text-sm text-slate-600 font-semibold">Connecting to AI...</p>
                    <p className="mt-1 text-xs text-slate-400">This will only take a moment</p>
                    
                    {/* Loading dots */}
                    <div className="mt-4 flex gap-1.5">
                      <span className="w-2 h-2 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0s' }} />
                      <span className="w-2 h-2 bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.15s' }} />
                      <span className="w-2 h-2 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                )}

                {/* Iframe */}
                <iframe
                  src={CHATBOT_URL}
                  className={`relative w-full h-full border-none transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  title="Chat Support"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            )}

            {/* Minimized State Content - Enhanced */}
            {isMinimized && (
              <div 
                className="h-[calc(100%-72px)] flex items-center justify-between px-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
                onClick={() => setIsMinimized(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
                    <MessageCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Chat minimized</p>
                    <p className="text-xs text-slate-400">Click to expand</p>
                  </div>
                </div>
                <Maximize2 size={18} className="text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button - Enhanced */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Tooltip - Enhanced */}
        <div
          className={`absolute bottom-full right-0 mb-4 transition-all duration-300 ${
            showTooltip && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm px-5 py-3 rounded-2xl shadow-xl whitespace-nowrap border border-slate-700/50">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="font-semibold">Need help?</span>
              <span className="text-slate-300">Chat with our AI!</span>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-7 w-4 h-4 bg-slate-800 rotate-45 border-r border-b border-slate-700/50" />
          </div>
        </div>

        {/* Notification Badge - Enhanced */}
        {hasNewMessage && !isOpen && (
          <div className="absolute -top-1 -right-1 z-10">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-br from-rose-500 to-pink-500 items-center justify-center text-[11px] text-white font-bold shadow-lg">
                1
              </span>
            </span>
          </div>
        )}

        {/* Ripple effect backgrounds - Enhanced */}
        {!isOpen && (
          <>
            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 animate-ping opacity-20" />
            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 animate-pulse" />
            <div className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </>
        )}

        {/* Main Button - Enhanced */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
            setIsMinimized(false);
          }}
          onMouseEnter={() => {
            setShowTooltip(true);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
            setIsHovering(false);
          }}
          className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 transform ${
            isOpen
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rotate-0 scale-100 shadow-xl'
              : 'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:scale-110 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/50'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {/* Button inner glow */}
          <div className={`absolute inset-1 rounded-full transition-opacity duration-300 ${
            isOpen 
              ? 'bg-gradient-to-br from-white/10 to-transparent opacity-100' 
              : 'bg-gradient-to-br from-white/25 to-transparent opacity-100'
          }`} />

          {/* Icon container with animation */}
          <div className={`relative transition-all duration-500 ${isOpen ? 'rotate-0' : isHovering ? 'rotate-12' : 'rotate-0'}`}>
            {isOpen ? (
              <X size={26} className="text-white drop-shadow-md" />
            ) : (
              <MessageCircle size={26} className="text-white drop-shadow-md" />
            )}
          </div>

          {/* Sparkle decorations when closed */}
          {!isOpen && (
            <>
              <Sparkles 
                size={12} 
                className="absolute top-1.5 right-1.5 text-white/70 animate-pulse" 
                style={{ animationDelay: '0.5s' }}
              />
              <Sparkles 
                size={10} 
                className="absolute bottom-2.5 left-1.5 text-white/50 animate-pulse" 
                style={{ animationDelay: '1s' }}
              />
              <div className="absolute top-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            </>
          )}
        </button>

        {/* "Powered by" text below button when closed */}
        {!isOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Zap size={10} className="text-purple-400" />
              AI-Powered Support
            </span>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Smooth scrollbar for iframe content */
        iframe {
          scrollbar-width: thin;
          scrollbar-color: #a78bfa transparent;
        }
      `}</style>
    </>
  );
}