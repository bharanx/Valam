import React, { useState, useEffect, useRef } from 'react';
import { Sprout, Phone, Users, ShieldCheck, Compass, LayoutDashboard, Menu, X } from 'lucide-react';
import { FarmerProfile, Language } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeFarmer: FarmerProfile;
  onOpenFarmerModal: () => void;
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  activeFarmer,
  onOpenFarmerModal
}) => {
  const isTa = language === 'ta';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'navigator', icon: Compass, en: 'Need Navigator', ta: 'தேவை வழிகாட்டி' },
    { id: 'programs', icon: ShieldCheck, en: 'Support Programs', ta: 'அரசு திட்டங்கள்' },
    { id: 'phone-simulator', icon: Phone, en: 'Phone Simulator', ta: 'போன் சிமுலேட்டர்' },
    { id: 'assisted-mode', icon: Users, en: 'Assisted Mode', ta: 'உதவி மையம்' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LEFT: [VALAM logo] [Dashboard] */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="VALAM Official Logo"
              className="w-9 h-9 object-contain rounded-lg shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight text-[#14381E] leading-tight">
                {isTa ? 'வளம்' : 'VALAM'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4D2E] leading-none">
                Farmer Support
              </span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`hidden md:flex items-center gap-1.5 py-1 text-sm font-medium transition-colors ${
              currentTab === 'dashboard' ? 'text-[#1B4D2E] border-b border-[#1B4D2E]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{isTa ? 'முதன்மை பக்கம்' : 'Dashboard'}</span>
          </button>
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 py-1 text-sm font-medium transition-colors ${
                  currentTab === link.id ? 'text-[#1B4D2E] border-b border-[#1B4D2E]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isTa ? link.ta : link.en}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Language, Profile, CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Compact Language Selector */}
          <div className="flex items-center text-sm font-medium text-gray-500">
            <button
              onClick={() => setLanguage('en')}
              className={`hover:text-gray-900 transition-colors ${language === 'en' ? 'text-gray-900 font-bold' : ''}`}
            >
              EN
            </button>
            <span className="mx-1.5 text-gray-300">|</span>
            <button
              onClick={() => setLanguage('ta')}
              className={`hover:text-gray-900 transition-colors ${language === 'ta' ? 'text-gray-900 font-bold' : ''}`}
            >
              தமிழ்
            </button>
          </div>

          {/* Compact Profile Selector */}
          <button
            onClick={onOpenFarmerModal}
            className="flex flex-col items-end text-right focus:outline-none hover:opacity-80 transition-opacity"
          >
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              {activeFarmer.name}
            </span>
            <span className="text-xs text-gray-500 leading-tight">
              {activeFarmer.district} · {activeFarmer.landSizeAcres} ac
            </span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('navigator')}
            className="bg-[#1B4D2E] hover:bg-[#143B23] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            {isTa ? 'தொடங்குக' : 'Start Navigator'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 md:hidden" aria-hidden="true">
          {/* Drawer */}
          <div 
            ref={mobileMenuRef}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl flex flex-col transform transition-transform duration-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="VALAM Official Logo"
                  className="w-7 h-7 object-contain rounded"
                />
                <span className="font-display font-black text-lg tracking-tight text-[#14381E]">
                  {isTa ? 'வளம்' : 'VALAM'}
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-2 p-2 rounded text-left ${currentTab === 'dashboard' ? 'bg-[#EAF5EC] text-[#1B4D2E] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>{isTa ? 'முதன்மை பக்கம்' : 'Dashboard'}</span>
              </button>
              
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-2 p-2 rounded text-left ${currentTab === link.id ? 'bg-[#EAF5EC] text-[#1B4D2E] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{isTa ? link.ta : link.en}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
               {/* Language inside mobile menu */}
               <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Language</span>
                <div className="flex items-center font-medium text-gray-600">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`${language === 'en' ? 'text-[#1B4D2E] font-bold' : ''}`}
                  >
                    EN
                  </button>
                  <span className="mx-2 text-gray-300">|</span>
                  <button
                    onClick={() => setLanguage('ta')}
                    className={`${language === 'ta' ? 'text-[#1B4D2E] font-bold' : ''}`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              {/* Profile in mobile menu */}
              <button
                onClick={() => {
                  onOpenFarmerModal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-left p-2 -mx-2 rounded hover:bg-gray-200 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900">{activeFarmer.name}</div>
                  <div className="text-xs text-gray-500">{activeFarmer.district} · {activeFarmer.landSizeAcres} ac</div>
                </div>
                <span className="text-xs text-[#1B4D2E] font-medium">Switch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
