// CityShield AI — Citizen Evidence Uploader
// Drag-and-drop, mobile file upload, text pasting, preview, safe validation, and privacy controls.

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Trash2, 
  Check, 
  Info 
} from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'text/plain'];

export default function EvidenceUploader({ 
  evidenceFiles, 
  setEvidenceFiles, 
  pastedText, 
  setPastedText 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redactPreview, setRedactPreview] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    setErrorMessage('');
    const newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(`"${file.name}" exceeds the 5MB size limit.`);
        continue;
      }

      // Validate type
      if (!ALLOWED_TYPES.includes(file.type) && !file.name.endsWith('.txt')) {
        setErrorMessage(`"${file.name}" is an unsupported file type. Please upload images, PDFs, or text files.`);
        continue;
      }

      // Generate object preview URL for images
      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;

      newFiles.push({
        id: `FILE-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type || 'text/plain',
        previewUrl,
        uploadedAt: new Date().toLocaleTimeString()
      });
    }

    if (newFiles.length > 0) {
      setEvidenceFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (id) => {
    setEvidenceFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      return filtered;
    });
  };

  // Redaction helper for text preview
  const getRedactedText = (text) => {
    if (!redactPreview) return text;
    // Mask 10-digit phone numbers and 16-digit card patterns
    return text
      .replace(/\b[6-9]\d{9}\b/g, 'XXXXXX****')
      .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '****-****-****-XXXX')
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, 'u***@domain.com');
  };

  return (
    <div className="space-y-6">
      {/* Privacy Warning Banner */}
      <div 
        className="p-4 rounded-2xl border flex items-start space-x-3 text-xs leading-relaxed"
        style={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.08)', 
          borderColor: 'rgba(239, 68, 68, 0.25)', 
          color: 'var(--text-primary)' 
        }}
      >
        <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-red-500 font-bold block mb-0.5">
            Privacy & Security Notice — Do Not Upload Passwords or PINs
          </strong>
          <span style={{ color: 'var(--text-secondary)' }}>
            Please ensure screenshots and text <strong>never include your bank passwords, ATM PINs, UPI PINs, or One-Time Passwords (OTPs)</strong>. Evidence uploaded here is stored exclusively inside your browser session and will never be shared without your explicit consent.
          </span>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`p-8 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-200 ${
          dragActive ? 'scale-[1.01] border-cyan-400 bg-cyan-500/5' : 'hover:border-slate-500'
        }`}
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: dragActive ? 'var(--accent-primary)' : 'var(--border-color)' 
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.txt"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <div 
          className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3 transition-transform hover:scale-105"
          style={{ 
            backgroundColor: 'var(--bg-surface)', 
            color: 'var(--accent-primary)' 
          }}
        >
          <UploadCloud className="w-7 h-7" />
        </div>

        <h4 className="text-sm font-bold mb-1">
          Drag & drop screenshots or evidence files here
        </h4>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Supports PNG, JPG, WebP, PDF, or TXT (Max 5MB each) • Or tap to browse from device
        </p>

        <span 
          className="inline-block mt-3 px-3 py-1 rounded-full text-[11px] font-semibold border"
          style={{ 
            backgroundColor: 'var(--badge-bg)', 
            color: 'var(--badge-text)', 
            borderColor: 'var(--badge-border)' 
          }}
        >
          Optional — You can proceed without uploading files
        </span>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center justify-between">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Uploaded Files Inventory */}
      {evidenceFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Uploaded Evidence Inventory ({evidenceFiles.length})
            </span>
            <button
              onClick={() => setEvidenceFiles([])}
              className="text-red-400 hover:underline text-[11px] flex items-center space-x-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evidenceFiles.map((file) => (
              <div
                key={file.id}
                className="p-3 rounded-2xl border flex items-center justify-between space-x-3 transition-all"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  {file.previewUrl ? (
                    <img 
                      src={file.previewUrl} 
                      alt={file.name} 
                      className="w-10 h-10 object-cover rounded-xl border flex-shrink-0"
                      style={{ borderColor: 'var(--border-color)' }}
                    />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)' }}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <div className="text-xs font-bold truncate">{file.name}</div>
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {file.size} • {file.uploadedAt}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
                  title="Remove this file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paste Suspicious Text Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold block" style={{ color: 'var(--text-secondary)' }}>
            Paste Suspicious Message, SMS, or Link Text (Optional):
          </label>

          {pastedText && (
            <button
              onClick={() => setRedactPreview(!redactPreview)}
              className="text-xs flex items-center space-x-1 font-semibold"
              style={{ color: 'var(--accent-primary)' }}
            >
              {redactPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{redactPreview ? 'Preview Masked' : 'Mask Numbers/Emails'}</span>
            </button>
          )}
        </div>

        <textarea
          rows={3}
          value={redactPreview ? getRedactedText(pastedText) : pastedText}
          onChange={(e) => {
            if (!redactPreview) setPastedText(e.target.value);
          }}
          readOnly={redactPreview}
          placeholder="Paste the exact phishing SMS text, suspicious WhatsApp message, scammer phone number, or malicious URL here..."
          className="w-full p-3.5 rounded-2xl border text-xs focus:outline-none transition-colors"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--border-color)', 
            color: 'var(--text-primary)' 
          }}
        />

        <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
          <span>Links are treated strictly as text and will never be automatically executed or visited.</span>
          <span>{pastedText.length} characters</span>
        </div>
      </div>
    </div>
  );
}
