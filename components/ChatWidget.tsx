'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Sparkles, Zap, Maximize2 } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const CHATBOT_URL = 'https://ai-support-agent-landing.vercel.app/embed';

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle body scroll and viewport on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isMobile]);

  // Simulate new message notification
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
    }
  }, [isOpen]);

  // Focus iframe when opened and after loading
  useEffect(() => {
    if (isOpen && !isLoading && iframeRef.current) {
      // Small delay to ensure iframe is ready
      const timer = setTimeout(() => {
        iframeRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoading]);

  // Handle click on container to refocus iframe
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only refocus if clicking on the container background, not the iframe itself
    if (e.target === containerRef.current) {
      iframeRef.current?.focus();
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    // Focus iframe after load
    setTimeout(() => {
      iframeRef.current?.focus();
    }, 200);
  };

  return (
    <>
      {/* Ambient Background Glow - Desktop only */}
      {isOpen && !isMobile && (
        <>
          <div className="fixed bottom-20 right-4 z-40 w-[420px] h-[620px] bg-gradient-to-br from-violet-500/25 via-purple-500/15 to-fuchsia-500/25 blur-3xl rounded-full pointer-events-none animate-pulse" />
          <div className="fixed bottom-40 right-20 z-40 w-[200px] h-[200px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-3xl rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 ${
            isMobile
              ? 'inset-0 w-full h-full'
              : isMinimized
                ? 'bottom-20 right-4 w-[400px] h-[72px]'
                : 'bottom-20 right-4 w-[400px] h-[600px]'
          }`}
          style={isMobile ? {
            height: '100dvh', // Use dynamic viewport height for mobile
          } : undefined}
        >
          {/* Main Container */}
          <div 
            className={`w-full h-full bg-white flex flex-col overflow-hidden ${
              isMobile ? 'rounded-none' : 'rounded-3xl shadow-2xl border border-white/60'
            }`}
          >
            {/* Mobile Header */}
            {isMobile && (
              <div 
                className="flex-shrink-0 flex items-center justify-between px-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600"
                style={{ 
                  paddingTop: 'max(12px, env(safe-area-inset-top))',
                  paddingBottom: '12px'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base">AI Support</h3>
                    <p className="text-white/70 text-xs">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95"
                  aria-label="Close chat"
                  type="button"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            )}

            {/* Chat Content Area */}
            {!isMinimized && (
              <div 
                ref={containerRef}
                onClick={handleContainerClick}
                className="flex-1 relative bg-white overflow-hidden"
                style={{
                  minHeight: 0,
                  // Ensure proper height calculation on mobile
                  height: isMobile ? '100%' : 'calc(100% - 0px)',
                }}
              >
                {/* Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center z-20">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                        <Zap size={32} className="text-white animate-pulse" />
                      </div>
                      
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                        <div className="absolute -top-2 left-1/2 w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full transform -translate-x-1/2 shadow-lg" />
                      </div>
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
                        <div className="absolute -bottom-2 left-1/2 w-3 h-3 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full transform -translate-x-1/2 shadow-lg" />
                      </div>
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }}>
                        <div className="absolute top-1/2 -right-2 w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full transform -translate-y-1/2 shadow-lg" />
                      </div>

                      <div className="absolute inset-[-8px] rounded-3xl border-2 border-purple-300/30 animate-pulse" />
                    </div>
                    
                    <p className="mt-8 text-sm text-slate-600 font-semibold">Connecting to AI...</p>
                    <p className="mt-1 text-xs text-slate-400">This will only take a moment</p>
                    
                    <div className="mt-4 flex gap-1.5">
                      <span className="w-2 h-2 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0s' }} />
                      <span className="w-2 h-2 bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.15s' }} />
                      <span className="w-2 h-2 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                )}

                {/* Iframe */}
                <iframe
                  ref={iframeRef}
                  src={CHATBOT_URL}
                  className="w-full h-full border-none"
                  style={{
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s',
                    display: 'block',
                    // Critical mobile styles
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  title="Chat Support"
                  onLoad={handleIframeLoad}
                  allow="microphone; camera; geolocation; clipboard-write; clipboard-read"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation allow-popups-to-escape-sandbox"
                  // Important for mobile keyboard
                  tabIndex={0}
                />
              </div>
            )}

            {/* Minimized State - Desktop only */}
            {isMinimized && !isMobile && (
              <div 
                className="flex-1 flex items-center justify-between px-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
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

            {/* Safe area bottom padding for mobile */}
            {isMobile && (
              <div 
                className="flex-shrink-0 bg-white"
                style={{ 
                  height: 'env(safe-area-inset-bottom, 0px)',
                  minHeight: 'env(safe-area-inset-bottom, 0px)',
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div 
        className={`fixed z-[60] transition-opacity duration-300 ${
          isOpen && isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100 bottom-4 right-4'
        }`}
        style={!isOpen || !isMobile ? {
          bottom: '16px',
          right: '16px',
        } : undefined}
      >
        {/* Tooltip - Desktop only */}
        {!isMobile && (
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
              <div className="absolute -bottom-2 right-7 w-4 h-4 bg-slate-800 rotate-45 border-r border-b border-slate-700/50" />
            </div>
          </div>
        )}

        {/* Notification Badge */}
        {hasNewMessage && !isOpen && (
          <div className="absolute -top-1 -right-1 z-10">
            <span className="relative flex h-5 w-5 sm:h-6 sm:w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-br from-rose-500 to-pink-500 items-center justify-center text-[10px] sm:text-[11px] text-white font-bold shadow-lg">
                1
              </span>
            </span>
          </div>
        )}

        {/* Ripple effects */}
        {!isOpen && (
          <>
            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 animate-ping opacity-20" />
            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 animate-pulse" />
          </>
        )}

        {/* Main Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
            setIsMinimized(false);
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setShowTooltip(true);
              setIsHovering(true);
            }
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
            setIsHovering(false);
          }}
          className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-500 transform ${
            isOpen
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 shadow-xl'
              : 'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:scale-110 active:scale-95 shadow-2xl shadow-purple-500/40'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          type="button"
        >
          <div className={`absolute inset-1 rounded-full ${
            isOpen 
              ? 'bg-gradient-to-br from-white/10 to-transparent' 
              : 'bg-gradient-to-br from-white/25 to-transparent'
          }`} />

          <div className={`relative transition-all duration-500 ${isOpen ? 'rotate-0' : isHovering ? 'rotate-12' : 'rotate-0'}`}>
            {isOpen ? (
              <X size={isMobile ? 22 : 26} className="text-white drop-shadow-md" />
            ) : (
              <MessageCircle size={isMobile ? 22 : 26} className="text-white drop-shadow-md" />
            )}
          </div>

          {!isOpen && (
            <>
              <Sparkles 
                size={isMobile ? 10 : 12} 
                className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 text-white/70 animate-pulse" 
                style={{ animationDelay: '0.5s' }}
              />
              <Sparkles 
                size={isMobile ? 8 : 10} 
                className="absolute bottom-2 left-1 sm:bottom-2.5 sm:left-1.5 text-white/50 animate-pulse" 
                style={{ animationDelay: '1s' }}
              />
            </>
          )}
        </button>

        {/* Powered by text - Desktop only */}
        {!isOpen && !isMobile && (
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
        /* Prevent pull-to-refresh when chat is open */
        html {
          overscroll-behavior: none;
        }
        
        /* Ensure iframe receives all touch events */
        iframe {
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
        }

        /* Fix for iOS keyboard pushing content */
        @supports (-webkit-touch-callout: none) {
          .chat-container {
            height: -webkit-fill-available;
          }
        }

        /* Smooth scrollbar */
        iframe {
          scrollbar-width: thin;
          scrollbar-color: #a78bfa transparent;
        }

        /* Ensure proper z-index stacking */
        input, textarea {
          font-size: 16px !important; /* Prevents iOS zoom on focus */
        }
      `}</style>
    </>
  );
}