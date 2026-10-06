import React from 'react';
import { Sprout } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const isTa = language === 'ta';
  const currentYear = new Date().getFullYear();
  const moaUrl = import.meta.env.VITE_MOA_URL;

  return (
    <footer className="bg-[#18231C] text-[#D1D5DB] border-t border-[#2D3748] mt-10 no-print text-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src="/logo.png"
                alt="VALAM Official Logo"
                className="w-8 h-8 object-contain rounded"
              />
              <span className="font-display font-black text-lg text-white tracking-tight">
                {isTa ? 'வளம்' : 'VALAM'}
              </span>
            </div>
            <p className="text-[#9CA3AF]">
              {isTa
                ? 'விவசாயிகளுக்கான கடைசி மைல் தகவல் இடைவெளியை நீக்கும் மக்கள் தொழில்நுட்ப தீர்வு.'
                : 'The Last-Mile Farmer Support Navigator.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">
              {isTa ? 'வழிகாட்டி பிரிவுகள்' : 'Navigation'}
            </h4>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">{isTa ? 'முதன்மை பக்கம்' : 'Dashboard'}</button></li>
              <li><button onClick={() => onNavigate('navigator')} className="hover:text-white transition-colors">{isTa ? 'தேவை வழிகாட்டி' : 'Need Navigator'}</button></li>
              <li><button onClick={() => onNavigate('programs')} className="hover:text-white transition-colors">{isTa ? 'அரசு திட்டங்கள்' : 'Support Programs'}</button></li>
              <li><button onClick={() => onNavigate('phone-simulator')} className="hover:text-white transition-colors">{isTa ? 'போன் சிமுலேட்டர்' : 'Phone Simulator'}</button></li>
              <li><button onClick={() => onNavigate('assisted-mode')} className="hover:text-white transition-colors">{isTa ? 'உதவி மையம்' : 'Assisted Mode'}</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">
              {isTa ? 'சட்டப்பூர்வ வழிகாட்டுதல்' : 'Legal'}
            </h4>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  {isTa ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  {isTa ? 'பயன்பாட்டு விதிமுறைகள்' : 'Terms & Conditions'}
                </button>
              </li>
              {moaUrl && (
                <li>
                  <a href={moaUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Ministry of Agriculture
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-[#2D3748] flex flex-col md:flex-row items-center justify-between text-xs text-[#6B7280]">
          <div>
            &copy; {currentYear} Valam. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
