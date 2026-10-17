// CityShield AI — Guided Citizen Help Flow
// Multi-step journey: Category Selection -> Describe -> Evidence -> Triage Assessment -> Workspace

import React, { useState } from 'react';
import { 
  CreditCard, 
  Key, 
  AlertOctagon, 
  MessageSquareWarning, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  Lock, 
  Sparkles,
  RotateCcw,
  Building2
} from 'lucide-react';
import { CYBERCRIME_CATEGORIES, SYNTHETIC_SAMPLE_INCIDENTS } from '../../data/citizenData';
import EvidenceUploader from './EvidenceUploader';
import IncidentWorkspace from './IncidentWorkspace';

export default function CitizenHelpFlow({ 
  onBackToGateway, 
  preloadedSample = null 
}) {
  // Step tracker: 1 = Category, 2 = Describe, 3 = Evidence, 4 = Review & Triage, 5 = Workspace
  const [currentStep, setCurrentStep] = useState(preloadedSample ? 5 : 1);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (preloadedSample) {
      return CYBERCRIME_CATEGORIES.find(c => c.id === preloadedSample.category) || CYBERCRIME_CATEGORIES[0];
    }
    return null;
  });

  // Incident State
  const [date, setDate] = useState(preloadedSample?.date || new Date().toISOString().split('T')[0]);
  const [platform, setPlatform] = useState(preloadedSample?.platform || '');
  const [amountLost, setAmountLost] = useState(preloadedSample?.amountLost || '');
  const [description, setDescription] = useState(preloadedSample?.summary || '');
  const [contactInfo, setContactInfo] = useState('');
  
  // Evidence State
  const [evidenceFiles, setEvidenceFiles] = useState(() => {
    if (preloadedSample?.sampleEvidenceName) {
      return [
        {
          id: 'SAMPLE-FILE-01',
          name: preloadedSample.sampleEvidenceName,
          size: '142.5 KB',
          type: 'image/png',
          previewUrl: null,
          uploadedAt: 'Preloaded Synthetic Evidence'
        }
      ];
    }
    return [];
  });
  const [pastedText, setPastedText] = useState(preloadedSample?.messageText || '');

  // App-Generated CityShield Reference ID
  const [cityShieldRef] = useState(
    () => `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`
  );

  // Helper to load sample incident
  const handleLoadSample = (sampleId) => {
    const sample = SYNTHETIC_SAMPLE_INCIDENTS.find(s => s.id === sampleId);
    if (!sample) return;

    const cat = CYBERCRIME_CATEGORIES.find(c => c.id === sample.category);
    setSelectedCategory(cat);
    setDate(sample.date);
    setPlatform(sample.platform);
    setAmountLost(sample.amountLost);
    setDescription(sample.summary);
    setPastedText(sample.messageText);
    setEvidenceFiles([
      {
        id: 'SAMPLE-FILE-01',
        name: sample.sampleEvidenceName,
        size: '184.2 KB',
        type: 'image/png',
        previewUrl: null,
        uploadedAt: 'Preloaded Synthetic Evidence'
      }
    ]);
    setCurrentStep(4); // Jump directly to Review & Triage
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'CreditCard': return CreditCard;
      case 'Key': return Key;
      case 'AlertOctagon': return AlertOctagon;
      case 'MessageSquareWarning': return MessageSquareWarning;
      default: return HelpCircle;
    }
  };

  // Build current incident data payload
  const currentIncidentData = {
    category: selectedCategory?.id || 'other',
    categoryTitle: selectedCategory?.title || 'Cyber Incident',
    date,
    platform,
    amountLost,
    description,
    contactInfo,
    recommendedSteps: selectedCategory?.immediateSteps || []
  };

  // If in Workspace view (Step 5)
  if (currentStep === 5) {
    return (
      <IncidentWorkspace
        incidentData={currentIncidentData}
        evidenceFiles={evidenceFiles}
        pastedText={pastedText}
        cityShieldRef={cityShieldRef}
        onStartNew={() => {
          setSelectedCategory(null);
          setDescription('');
          setPastedText('');
          setEvidenceFiles([]);
          setAmountLost('');
          setCurrentStep(1);
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => {
            if (currentStep > 1) {
              setCurrentStep(currentStep - 1);
            } else {
              onBackToGateway();
            }
          }}
          className="flex items-center space-x-1.5 font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Exit to Portal Gateway' : 'Previous Step'}</span>
        </button>

        {/* Step Progress Indicators */}
        <div className="flex items-center space-x-2 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
          <span>Step {currentStep} of 4:</span>
          <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>
            {currentStep === 1 && 'Select Issue'}
            {currentStep === 2 && 'Describe'}
            {currentStep === 3 && 'Add Evidence'}
            {currentStep === 4 && 'Triage Assessment'}
          </span>
        </div>
      </div>

      {/* STEP 1: Select Category */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              What happened?
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              Select the option that best describes your situation. We will guide you on the safest immediate steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CYBERCRIME_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentStep(2);
                  }}
                  className="p-5 rounded-3xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400 flex items-start space-x-4"
                  style={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border-color)',
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)' }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm">{cat.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {cat.shortDesc}
                    </p>
                    <div className="pt-1 text-[11px] font-semibold text-cyan-400 flex items-center space-x-1">
                      <span>Get guidance</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Sample Selector for Evaluators */}
          <div 
            className="p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-4"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
          >
            <span className="font-bold">Judge / Evaluator Fast-Track:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleLoadSample('SAMPLE-01-ELEC-SMS')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
              >
                Sample 1: Phishing SMS
              </button>
              <button
                onClick={() => handleLoadSample('SAMPLE-02-UPI-FRAUD')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300"
              >
                Sample 2: UPI Fraud (1930)
              </button>
              <button
                onClick={() => handleLoadSample('SAMPLE-03-INSTA-EXTORTION')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300"
              >
                Sample 3: Account Takeover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Describe the Problem */}
      {currentStep === 2 && selectedCategory && (
        <div 
          className="p-6 sm:p-8 rounded-3xl border space-y-6"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase" style={{ color: 'var(--accent-primary)' }}>
              {selectedCategory.title}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
              Tell us a few details about what occurred
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Answer what you can. You do not need to know technical cybersecurity terms.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Date & Platform Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">When did this happen?</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Platform, App, or Bank Involved:</label>
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="e.g., WhatsApp, Instagram, PhonePe, SBI, Telegram"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Financial Loss (If applicable) */}
            {selectedCategory.id === 'financial_scam' && (
              <div>
                <label className="font-bold block mb-1 text-red-400">
                  Approximate Financial Loss Amount (Optional):
                </label>
                <input
                  type="text"
                  value={amountLost}
                  onChange={(e) => setAmountLost(e.target.value)}
                  placeholder="e.g., ₹15,000 or $200"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Reporting within 2 hours ("Golden Hour") gives police cyber units the highest chance to freeze fraudulent recipient accounts.
                </span>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="font-bold block mb-1">
                Briefly describe what happened in your own words:
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Received a call claiming to be electricity department officer telling me power will be cut unless I installed an app and scanned a QR code..."
                className="w-full p-3 rounded-2xl border text-xs focus:outline-none"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 shadow-md"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <span>Continue to Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Evidence Upload */}
      {currentStep === 3 && (
        <div 
          className="p-6 sm:p-8 rounded-3xl border space-y-6"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase" style={{ color: 'var(--accent-primary)' }}>
              Step 3 of 4: Evidence Review
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
              Add screenshots or copy-paste messages (Optional)
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Evidence helps cyber police investigate fraud. You can also proceed without uploading any files.
            </p>
          </div>

          <EvidenceUploader
            evidenceFiles={evidenceFiles}
            setEvidenceFiles={setEvidenceFiles}
            pastedText={pastedText}
            setPastedText={setPastedText}
          />

          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 shadow-md"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <span>Review Triage & Next Steps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Triage Assessment */}
      {currentStep === 4 && selectedCategory && (
        <div 
          className="p-6 sm:p-8 rounded-3xl border space-y-6"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold uppercase ${
                selectedCategory.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {selectedCategory.severity} Priority
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                Triage Assessment
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Recommended Immediate Actions for {selectedCategory.title}
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {selectedCategory.urgencyText}
            </p>
          </div>

          {/* Emergency 1930 Helpline Callout (If financial or critical) */}
          {selectedCategory.id === 'financial_scam' && (
            <div 
              className="p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-red-400">National Cyber Fraud Helpline: 1930</h4>
                  <p className="text-xs text-slate-300">
                    Call 1930 immediately to register the transaction with the Indian Cyber Crime Coordination Centre (I4C).
                  </p>
                </div>
              </div>

              <a
                href="tel:1930"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white flex items-center space-x-1.5 shadow-md flex-shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 1930 Now</span>
              </a>
            </div>
          )}

          {/* Structured Next Steps Preview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Immediate Emergency Steps:
            </h4>
            {selectedCategory.immediateSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border space-y-1"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{step.title}</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{step.priority}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Transition to Personal Workspace */}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Back to Evidence
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-3 rounded-2xl text-xs font-bold text-white flex items-center space-x-2 shadow-lg"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <span>Open My Incident Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
