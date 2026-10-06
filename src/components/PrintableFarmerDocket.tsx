import React from 'react';
import { FarmerProfile, Language, SupportProgram } from '../types';
import { DEMO_FARMERS, SUPPORT_PROGRAMS, SYSTEM_DOCUMENTS } from '../data/mockData';

interface PrintableFarmerDocketProps {
  farmer: FarmerProfile;
  program?: SupportProgram | null;
  language?: Language;
  operatorDetails?: {
    centreName: string;
    operatorName: string;
    block: string;
  };
}

export const PrintableFarmerDocket: React.FC<PrintableFarmerDocketProps> = ({
  farmer = DEMO_FARMERS[0],
  program = SUPPORT_PROGRAMS[0],
  language = 'en',
  operatorDetails = {
    centreName: 'VALAM Civic Extension Centre / Grama Seva Kendra',
    operatorName: 'Community Volunteer / VLE Field Worker',
    block: `${farmer.taluk || 'Local Block'}, ${farmer.district || 'Tamil Nadu'}`
  }
}) => {
  const isTa = language === 'ta';
  const effectiveProgram = program || SUPPORT_PROGRAMS[0];
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const verifiedDocs = farmer.documents?.filter((d) => d.available) || [];

  return (
    <div id="printable-farmer-docket" className="hidden print:block text-black bg-white p-6 max-w-4xl mx-auto font-sans leading-tight">
      {/* 1. Official Header Bar */}
      <div className="border-b-2 border-black pb-3 mb-4 flex justify-between items-start gap-4">
        <div className="flex items-start gap-3.5">
          <img
            src="/logo.png"
            alt="Valam Official Logo"
            className="w-14 h-14 object-contain shrink-0"
          />
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-gray-700">
              Government of Tamil Nadu · Agricultural Welfare & Civic Facilitation
            </div>
            <h1 className="text-xl font-extrabold uppercase tracking-tight text-black mt-0.5">
              வளம் · VALAM FARMER APPLICATION & SUBMISSION DOCKET
            </h1>
            <div className="text-xs font-semibold text-gray-800 mt-0.5">
              Pre-Screened Statutory Eligibility Certificate · அரசு நலத்திட்ட விண்ணப்ப முன்மதிப்பீட்டு சீட்டு
            </div>
          </div>
        </div>
        <div className="text-right border border-black p-2 rounded bg-gray-50 min-w-[170px]">
          <div className="text-[10px] uppercase font-bold text-gray-600">Application Token</div>
          <div className="text-sm font-mono font-extrabold text-black">
            {farmer.id ? `VLM-${farmer.id.replace('FARMER_', '')}` : 'VLM-TN-2026-8841'}
          </div>
          <div className="text-[10px] text-gray-700 mt-0.5">Date: {currentDate}</div>
        </div>
      </div>

      {/* 2. Notice to Bank Manager / Agricultural Officer */}
      <div className="border border-black bg-gray-50 p-2.5 mb-4 text-xs">
        <div className="font-bold text-black uppercase tracking-wide mb-0.5">
          To: The Branch Manager (Lead Bank) / Block Agricultural Officer (ADA) / VAO Office
        </div>
        <div className="text-gray-800 text-[11px] leading-relaxed">
          <strong>Official Note / குறிப்பு:</strong> This candidate's agricultural landholding, crop categorization, and statutory documents have been pre-evaluated by the Valam civic assistance desk. Please facilitate the application and accept the enclosed documentation without requiring additional middlemen.
        </div>
      </div>

      {/* 3. Candidate / Farmer Primary Profile (Clean Two-Column Grid) */}
      <div className="border border-black mb-4">
        <div className="bg-gray-200 px-3 py-1 text-xs font-extrabold uppercase tracking-wider border-b border-black flex justify-between">
          <span>1. Farmer / Candidate Profile Details (விவசாயியின் விவரங்கள்)</span>
          <span className="font-mono text-[11px]">ID: {farmer.id}</span>
        </div>
        <div className="p-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Farmer Full Name:</span>
            <span className="font-bold text-black text-sm">{farmer.name}</span>
          </div>
          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Contact Mobile:</span>
            <span className="font-bold text-black font-mono">{farmer.phone || '+91 94432 18901'}</span>
          </div>

          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Village & Taluk:</span>
            <span className="font-bold text-black">{farmer.village || 'Ammapettai'}, {farmer.taluk || 'Papanasam'}</span>
          </div>
          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">District & State:</span>
            <span className="font-bold text-black">{farmer.district}, {farmer.state}</span>
          </div>

          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Total Landholding:</span>
            <span className="font-bold text-black">{farmer.landSizeAcres} Acres ({farmer.category})</span>
          </div>
          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Standing / Main Crop:</span>
            <span className="font-bold text-black">{farmer.crop}</span>
          </div>

          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Irrigation Method:</span>
            <span className="font-bold text-black">{farmer.irrigationType}</span>
          </div>
          <div className="flex border-b border-gray-300 pb-1">
            <span className="w-36 text-gray-600 font-medium">Bank & DBT Link:</span>
            <span className="font-bold text-black">{farmer.bankName || 'Canara Bank'} (Aadhaar Seeded ✓)</span>
          </div>
        </div>
      </div>

      {/* 4. Target Support Scheme & Sanction Assessment */}
      <div className="border border-black mb-4">
        <div className="bg-gray-200 px-3 py-1 text-xs font-extrabold uppercase tracking-wider border-b border-black flex justify-between">
          <span>2. Applied Scheme & Entitlement Details (விண்ணப்பிக்கும் திட்டம் & மானிய விவரம்)</span>
          <span className="font-mono text-[11px]">{effectiveProgram.shortCode}</span>
        </div>
        <div className="p-3 text-xs space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-sm text-black">
                {effectiveProgram.name}
              </div>
              <div className="text-gray-700 text-[11px]">
                {effectiveProgram.nameTa}
              </div>
            </div>
            <div className="border border-black px-2.5 py-1 rounded bg-gray-100 font-bold text-xs uppercase text-right">
              Eligibility: 100% MATCHED (தகுதி உடையவர்)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 text-[11px]">
            <div>
              <span className="text-gray-600 block">Sponsoring Authority:</span>
              <span className="font-semibold text-black">{effectiveProgram.sponsoringBody}</span>
            </div>
            <div>
              <span className="text-gray-600 block">Applicable Subsidy / Benefit Rate:</span>
              <span className="font-bold text-black">{effectiveProgram.benefits?.en || 'Government Notified Subsidy'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Document Checklist & Physical Dossier Verified */}
      <div className="border border-black mb-4">
        <div className="bg-gray-200 px-3 py-1 text-xs font-extrabold uppercase tracking-wider border-b border-black">
          3. Attached Physical Documents Checklist (இணைக்கப்பட்டுள்ள அசல் / நகல் ஆவணங்கள்)
        </div>
        <div className="p-3 grid grid-cols-2 gap-2 text-xs">
          {SYSTEM_DOCUMENTS.map((doc) => {
            const isAttached = farmer.documents?.some((d) => d.documentId === doc.id && d.available);
            return (
              <div key={doc.id} className="flex items-center gap-2 border border-gray-200 p-1.5 rounded">
                <div className="w-4 h-4 border border-black flex items-center justify-center text-[11px] font-bold">
                  {isAttached ? '✓' : ' '}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-black text-[11px]">{doc.name}</div>
                  <div className="text-[10px] text-gray-600">{doc.nameTa}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Facilitating Volunteer / Extension Officer Details */}
      <div className="border border-black mb-6">
        <div className="bg-gray-200 px-3 py-1 text-xs font-extrabold uppercase tracking-wider border-b border-black">
          4. Facilitating Volunteer / CSC Centre Attestation (வழிகாட்டிய தன்னார்வலர் சான்றொப்பம்)
        </div>
        <div className="p-3 grid grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-gray-600 block text-[10px]">Assisting Centre:</span>
            <span className="font-bold text-black">{operatorDetails.centreName}</span>
          </div>
          <div>
            <span className="text-gray-600 block text-[10px]">Volunteer / Officer Name:</span>
            <span className="font-bold text-black">{operatorDetails.operatorName}</span>
          </div>
          <div>
            <span className="text-gray-600 block text-[10px]">Block & Jurisdiction:</span>
            <span className="font-bold text-black">{operatorDetails.block}</span>
          </div>
        </div>
      </div>

      {/* 7. Signatures & Official Receiving Slip */}
      <div className="pt-2">
        <div className="grid grid-cols-2 gap-12 text-xs">
          {/* Volunteer Signature */}
          <div className="border-t border-black pt-2 text-center">
            <div className="h-10"></div>
            <div className="font-bold text-black">Signature of Volunteer / CSC Operator with Seal</div>
            <div className="text-[10px] text-gray-600">வழிகாட்டிய தன்னார்வலர் / இ-சேவை மைய கையொப்பம்</div>
          </div>

          {/* Farmer Signature / Thumb Impression */}
          <div className="border-t border-black pt-2 text-center">
            <div className="h-10 flex items-center justify-center text-gray-400 text-[10px] italic">
              (Affix Left Thumb Impression / கையொப்பம்)
            </div>
            <div className="font-bold text-black">Farmer’s Signature / Left Thumb Impression</div>
            <div className="text-[10px] text-gray-600">விவசாயியின் கையொப்பம் / இடது கை கட்டைவிரல் ரேகை</div>
          </div>
        </div>

        {/* Bank / Official Receiving Section */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-black">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">
            --- For Official Bank / Agriculture Department Office Use Only (அலுவலக பயன்பாட்டிற்கு மட்டும்) ---
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs border border-gray-300 p-2.5 bg-gray-50">
            <div>
              <span className="text-gray-500 block text-[10px]">Application Received By:</span>
              <div className="h-6 border-b border-gray-400"></div>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Designation & Office Seal:</span>
              <div className="h-6 border-b border-gray-400"></div>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Application Reg. / Acknowledgment No:</span>
              <div className="h-6 border-b border-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
