/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FarmerSelectorModal } from './components/FarmerSelectorModal';
import { CreateFarmerModal } from './components/CreateFarmerModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NavigatorPage } from './pages/NavigatorPage';
import { PhoneSimulatorPage } from './pages/PhoneSimulatorPage';
import { AssistedModePage } from './pages/AssistedModePage';
import { ProgramsDirectoryPage } from './pages/ProgramsDirectoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { LegalPage } from './pages/LegalPage';
import { CookieConsent } from './components/CookieConsent';
import { PrintableFarmerDocket } from './components/PrintableFarmerDocket';
import { analytics } from './services/analytics';
import { DEMO_FARMERS, SUPPORT_PROGRAMS } from './data/mockData';
import { FarmerProfile, Language, SupportProgram } from './types';
import { AlertCircle, Home } from 'lucide-react';

const KNOWN_TABS = [
  'landing',
  'dashboard',
  'navigator',
  'programs',
  'phone-simulator',
  'assisted-mode',
  'profile',
  'privacy',
  'terms'
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [activeFarmer, setActiveFarmer] = useState<FarmerProfile>(DEMO_FARMERS[0]);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [presetProgram, setPresetProgram] = useState<SupportProgram | null>(null);

  // Sync title, language attribute and track page view
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    analytics.trackPageView(currentTab);
  }, [currentTab]);

  const handleSelectFarmer = (farmer: FarmerProfile) => {
    setActiveFarmer(farmer);
  };

  const handleUpdateFarmer = (updated: FarmerProfile) => {
    setActiveFarmer(updated);
  };

  const handleFarmerCreated = (newFarmer: FarmerProfile) => {
    setActiveFarmer(newFarmer);
  };

  const handleNavigateToNavigatorWithProgram = (program: SupportProgram) => {
    setPresetProgram(program);
    setCurrentTab('navigator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isKnownTab = KNOWN_TABS.includes(currentTab);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E231F]">
      {/* Top Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        activeFarmer={activeFarmer}
        onOpenFarmerModal={() => setIsFarmerModalOpen(true)}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            activeFarmer={activeFarmer}
            language={language}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFarmerModal={() => setIsFarmerModalOpen(true)}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onSelectProgramForPathway={handleNavigateToNavigatorWithProgram}
            onUpdateFarmerDocs={handleUpdateFarmer}
          />
        )}

        {currentTab === 'navigator' && (
          <NavigatorPage
            activeFarmer={activeFarmer}
            language={language}
            onUpdateFarmer={handleUpdateFarmer}
            onOpenFarmerModal={() => setIsFarmerModalOpen(true)}
          />
        )}

        {currentTab === 'programs' && (
          <ProgramsDirectoryPage
            activeFarmer={activeFarmer}
            language={language}
            onNavigateToNavigatorWithProgram={handleNavigateToNavigatorWithProgram}
            onUpdateFarmerDocs={handleUpdateFarmer}
          />
        )}

        {currentTab === 'phone-simulator' && (
          <PhoneSimulatorPage language={language} />
        )}

        {currentTab === 'assisted-mode' && (
          <AssistedModePage
            language={language}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfilePage
            activeFarmer={activeFarmer}
            language={language}
            onSaveFarmer={handleUpdateFarmer}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {currentTab === 'privacy' && (
          <LegalPage
            type="privacy"
            language={language}
            onBack={() => setCurrentTab('landing')}
          />
        )}

        {currentTab === 'terms' && (
          <LegalPage
            type="terms"
            language={language}
            onBack={() => setCurrentTab('landing')}
          />
        )}

        {/* 404 Fallback State */}
        {!isKnownTab && (
          <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-2xl text-[#111827]">
                {language === 'ta' ? 'பக்கம் காணப்படவில்லை (404)' : 'Page Not Found (404)'}
              </h1>
              <p className="text-sm text-[#6B7280]">
                {language === 'ta'
                  ? 'நீங்கள் தேடிய பக்கம் கிடைக்கவில்லை அல்லது முகவரி மாற்றப்பட்டுள்ளது.'
                  : 'The requested section could not be found or has been relocated.'}
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#1B4D2E] hover:bg-[#143B23] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{language === 'ta' ? 'முகப்புக்குச் செல்க' : 'Return to Dashboard'}</span>
            </button>
          </div>
        )}
      </main>

      {/* Global Farmer Selector Modal */}
      <FarmerSelectorModal
        isOpen={isFarmerModalOpen}
        onClose={() => setIsFarmerModalOpen(false)}
        activeFarmer={activeFarmer}
        onSelectFarmer={handleSelectFarmer}
        onOpenCreateModal={() => {
          setIsFarmerModalOpen(false);
          setIsCreateModalOpen(true);
        }}
        language={language}
      />

      {/* Global Create Farmer User ID Modal */}
      <CreateFarmerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onFarmerCreated={handleFarmerCreated}
        language={language}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent
        language={language}
        onNavigateToPrivacy={() => {
          setCurrentTab('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Official Printable Physical Docket for Candidate Handout to Bank / Officers */}
      <PrintableFarmerDocket
        farmer={activeFarmer}
        program={presetProgram}
        language={language}
      />

      {/* Civic Tech Footer */}
      <Footer
        language={language}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
