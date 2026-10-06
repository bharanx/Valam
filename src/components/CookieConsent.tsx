import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Language } from '../types';

interface CookieConsentProps {
  language: Language;
  onNavigateToPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  language,
  onNavigateToPrivacy
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isTa = language === 'ta';

  useEffect(() => {
    try {
      const consent = localStorage.getItem('valam_cookie_consent');
      if (!consent) {
        // Small delay so it transitions smoothly
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage disabled or unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('valam_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('valam_cookie_consent', 'declined');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xl text-[#1E231F] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[#1B4D2E]">
            <ShieldCheck className="w-5 h-5 shrink-0 text-[#1B4D2E]" />
            <h2 className="text-xs font-bold uppercase tracking-wider">
              {isTa ? 'தனியுரிமை & தரவு பாதுகாப்பு' : 'Civic Privacy & Cookie Notice'}
            </h2>
          </div>
          <button
            onClick={handleDecline}
            className="text-[#9CA3AF] hover:text-[#4B5563] p-1 rounded-md transition-colors"
            aria-label="Close notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#4B5563] leading-relaxed">
          {isTa
            ? 'Valam தளம் அமர்வு நினைவூட்டலுக்காக குறைந்தபட்ச உள்ளூர் சேமிப்பகத்தைப் பயன்படுத்துகிறது. உங்களின் தனிப்பட்ட விவரங்கள் மூன்றாம் தரப்புடன் பகிரப்படாது.'
            : 'Valam uses essential local storage strictly to remember farmer session context and selected language. We do not track personal data across third-party networks.'}
        </p>

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={onNavigateToPrivacy}
            className="text-xs font-semibold text-[#1B4D2E] hover:underline"
          >
            {isTa ? 'தனியுரிமைக் கொள்கை' : 'Read Privacy Notice'}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors cursor-pointer"
            >
              {isTa ? 'நிராகரி' : 'Decline'}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#1B4D2E] hover:bg-[#143B23] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {isTa ? 'ஏற்றுக்கொள்' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
