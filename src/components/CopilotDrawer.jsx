// CityShield AI — Copilot Diagnostic Drawer
// AI-Style Incident Explainer with Deterministic Rule-Based Heuristics & Optional Gemini Hook

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckSquare, 
  Clock, 
  Users, 
  Eye, 
  Key, 
  Send, 
  FileText, 
  Check, 
  Copy,
  ChevronDown,
  Layers,
  HelpCircle
} from 'lucide-react';
import { generateIncidentCopilotReport, queryCopilotKnowledge } from '../services/copilotEngine';

export default function CopilotDrawer({ 
  isOpen, 
  onClose, 
  incident, 
  asset 
}) {
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [geminiKey, setGeminiKey] = useState(
    () => localStorage.getItem('cityshield_gemini_key') || ''
  );
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate deterministic report
  const report = useMemo(() => {
    return generateIncidentCopilotReport(incident, asset);
  }, [incident, asset]);

  if (!isOpen) return null;

  const handleSendQuery = (e) => {
    e?.preventDefault();
    if (!userQuery.trim()) return;

    const answerObj = queryCopilotKnowledge(userQuery, incident, asset);
    const newInteraction = {
      question: userQuery,
      answer: answerObj.answer,
      source: answerObj.source,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, newInteraction]);
    setUserQuery('');
  };

  const handleSaveKey = () => {
    localStorage.setItem('cityshield_gemini_key', geminiKey.trim());
    setShowKeyInput(false);
  };

  const handleCopyReport = () => {
    const text = report.sections.map(s => `${s.title}\n${s.content || s.list?.join('\n')}`).join('\n\n');
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-2xl bg-slate-900 border-l border-cyan-500/40 h-full flex flex-col shadow-2xl text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-cyan-glow">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-white font-mono">CityShield Copilot</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                  Expert System
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AI-Style Incident Explainer & Decision Support
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Optional Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyReport}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copy diagnostic to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Gemini Key Input Dropdown */}
        {showKeyInput && (
          <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold">Optional Gemini API Key:</span>
              <span className="text-[10px] text-slate-500">Stored locally in your browser</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSaveKey}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold"
              >
                Save
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              If omitted, CityShield Copilot uses its fully functional deterministic rule-based engine.
            </p>
          </div>
        )}

        {/* Source Disclaimer Banner */}
        <div className="px-5 py-2 bg-slate-950/90 border-b border-slate-800 text-[11px] flex items-center justify-between text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="font-mono text-cyan-300 font-semibold">{report.source}</span>
          </span>
          <span className="text-[10px] text-slate-500">100% Deterministic & Reproducible</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Target Incident Context Header */}
          {incident && (
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Active Incident: </span>
                <span className="font-bold text-white">{incident.scenario}</span>
              </div>
              <div className="font-mono font-bold text-cyan-400">
                Risk: {incident.riskScore}/100
              </div>
            </div>
          )}

          {/* Core Diagnostic Sections (1 to 8) */}
          <div className="space-y-3">
            {report.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
              >
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center space-x-2">
                  <span>{sec.title}</span>
                </div>

                {sec.content && (
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {sec.content}
                  </p>
                )}

                {sec.list && (
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 mt-1">
                    {sec.list.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Inquiry Stream / Conversation History */}
          {chatHistory.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Operator Inquiry History
              </div>
              {chatHistory.map((item, idx) => (
                <div key={idx} className="space-y-2 text-xs">
                  {/* Question */}
                  <div className="p-2.5 rounded-lg bg-slate-800 text-white font-medium text-right max-w-[85%] ml-auto">
                    {item.question}
                  </div>
                  {/* Answer */}
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-slate-200 leading-relaxed max-w-[90%] mr-auto">
                    <div className="text-[10px] text-cyan-400 font-mono mb-1">CityShield Copilot ({item.source}):</div>
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Query Pills */}
        <div className="px-5 py-2 bg-slate-950/80 border-t border-slate-800/60 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold flex-shrink-0">Quick Queries:</span>
          {[
            'Explain blast radius',
            'Why is water priority higher than lighting?',
            'Show containment playbook',
            'What is the CISA guidance?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setUserQuery(prompt);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Interactive Input Form */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form onSubmit={handleSendQuery} className="flex space-x-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask Copilot about blast radius, risk factors, or playbooks..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 shadow-cyan-glow transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
