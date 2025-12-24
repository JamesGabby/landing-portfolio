'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const CHATBOT_URL = 'https://ai-e-commerce-support-agent.vercel.app';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="flex flex-col w-[380px] h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden border">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
            <span className="font-semibold">Chat Support</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Iframe */}
          <iframe
            src={CHATBOT_URL}
            className="flex-1 w-full border-none"
            title="Chat Assistant"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}