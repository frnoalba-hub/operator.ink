import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Upload, X, FileText, AlertCircle, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SERVICE_OPTIONS = [
  { value: 'web-design', label: 'Web Design & Operations' },
  { value: 'seo', label: 'GEO, AEO & SEO Search' },
  { value: 'workflows', label: 'Workflows & AI Agents' },
  { value: 'ads', label: 'Ads & Brand Identity' },
  { value: 'multiple', label: 'Multiple Services' },
];

const BUDGET_RANGES = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-plus', label: '3+ months' },
  { value: 'flexible', label: 'Flexible' },
];

const CONDITIONAL_FIELDS = {
  'web-design': {
    label: 'Do you have an existing website?',
    options: ['Yes, needs redesign', 'Yes, needs updates', 'No, starting fresh'],
  },
  'seo': {
    label: 'What is your current search presence?',
    options: ['No SEO done yet', 'Some basic SEO', 'Active SEO but poor results', 'Switching providers'],
  },
  'workflows': {
    label: 'What tools do you currently use?',
    options: ['CRM (HubSpot, Salesforce, etc.)', 'Project management (Asana, Monday, etc.)', 'Custom internal tools', 'Mostly manual / spreadsheets'],
  },
  'ads': {
    label: 'Do you have existing brand assets?',
    options: ['Full brand guidelines', 'Logo only', 'Nothing yet'],
  },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function IntakeForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    company: '',
    service: '',
    conditionalAnswer: '',
    budget: '',
    timeline: '',
    clientNeeds: '',
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    const saved = localStorage.getItem('intakeFormData');
    if (saved) {
      try { setFormData(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('intakeFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'service') next.conditionalAnswer = '';
      return next;
    });
    if (errors[field]) {
      setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = null;
    const v = formData[field];
    switch (field) {
      case 'clientName':
        if (!v.trim()) error = 'Name is required';
        else if (v.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'clientEmail':
        if (!v.trim()) error = 'Email is required';
        else if (!validateEmail(v)) error = 'Enter a valid email address';
        break;
      case 'service':
        if (!v) error = 'Please select a service';
        break;
      case 'clientNeeds':
        if (!v.trim()) error = 'Please describe your project scope';
        else if (v.trim().length < 20) error = 'Please provide at least 20 characters';
        break;
    }
    setErrors(prev => {
      const n = { ...prev };
      if (error) n[field] = error; else delete n[field];
      return n;
    });
    return error;
  };

  const validateAll = () => {
    const required = ['clientName', 'clientEmail', 'service', 'clientNeeds'];
    let hasError = false;
    const allTouched = {};
    required.forEach(f => { allTouched[f] = true; });
    setTouched(prev => ({ ...prev, ...allTouched }));

    required.forEach(f => {
      if (validateField(f)) hasError = true;
    });
    return !hasError;
  };

  const handleFileAdd = (e) => {
    const incoming = Array.from(e.target.files);
    const newErrors = [];
    const valid = [];

    incoming.forEach(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(`"${file.name}" — unsupported file type`);
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`"${file.name}" — exceeds 10 MB limit`);
      } else if (files.length + valid.length >= 5) {
        newErrors.push(`"${file.name}" — max 5 files allowed`);
      } else {
        valid.push(file);
      }
    });

    if (newErrors.length) {
      setErrors(prev => ({ ...prev, files: newErrors.join('. ') }));
      setTimeout(() => setErrors(prev => { const n = { ...prev }; delete n.files; return n; }), 5000);
    }
    setFiles(prev => [...prev, ...valid]);
    e.target.value = '';
  };

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Upload files if any
      const uploadedUrls = [];
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploadedUrls.push(file_url);
      }

      // Save to local storage as backup
      localStorage.setItem('backup_lead', JSON.stringify({
        payload: { ...formData, file_urls: uploadedUrls },
        ts: Date.now()
      }));

      setSubmitStatus('success');
      setFormData({ clientName: '', clientEmail: '', company: '', service: '', conditionalAnswer: '', budget: '', timeline: '', clientNeeds: '' });
      setFiles([]);
      setTouched({});
      localStorage.removeItem('intakeFormData');
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const conditionalField = CONDITIONAL_FIELDS[formData.service];

  const inputClass = (field) =>
    `w-full px-5 py-3 rounded-2xl bg-black border text-white placeholder-zinc-600 focus:ring-1 outline-none transition-all ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
        : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
    }`;

  const selectClass = (field) =>
    `w-full px-5 py-3 rounded-2xl bg-black border text-white appearance-none cursor-pointer focus:ring-1 outline-none transition-all ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
        : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Initialize Project Form"
      className="rounded-[36px] border border-zinc-800 p-7 lg:p-8 flex flex-col gap-5"
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))' }}
    >
      {/* Success / Error Banner */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl px-5 py-4 flex items-start gap-3 text-sm font-medium ${
              submitStatus === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {submitStatus === 'success' ? (
              <>
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Request received successfully!</p>
                  <p className="text-xs mt-1 opacity-80">We'll review your project details and respond within 24 hours with a custom deployment plan.</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Something went wrong</p>
                  <p className="text-xs mt-1 opacity-80">Please try again or email us directly at orders@operator.ink</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper label="Name" error={touched.clientName && errors.clientName} required>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            onBlur={() => handleBlur('clientName')}
            placeholder="Full name"
            className={inputClass('clientName')}
            style={{ minHeight: '52px' }}
          />
        </FieldWrapper>
        <FieldWrapper label="Email" error={touched.clientEmail && errors.clientEmail} required>
          <input
            type="email"
            value={formData.clientEmail}
            onChange={(e) => handleChange('clientEmail', e.target.value)}
            onBlur={() => handleBlur('clientEmail')}
            placeholder="name@company.com"
            className={inputClass('clientEmail')}
            style={{ minHeight: '52px' }}
          />
        </FieldWrapper>
      </div>

      {/* Company */}
      <FieldWrapper label="Company" sublabel="Optional">
        <input
          type="text"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="Company or brand name"
          className={inputClass('company')}
          style={{ minHeight: '52px' }}
        />
      </FieldWrapper>

      {/* Service Selection */}
      <FieldWrapper label="Service Needed" error={touched.service && errors.service} required>
        <div className="relative">
          <select
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            onBlur={() => handleBlur('service')}
            className={selectClass('service')}
            style={{ minHeight: '52px' }}
          >
            <option value="" disabled>Select a service…</option>
            {SERVICE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▾</div>
        </div>
      </FieldWrapper>

      {/* Conditional Field */}
      <AnimatePresence mode="wait">
        {conditionalField && (
          <motion.div
            key={formData.service}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FieldWrapper label={conditionalField.label}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {conditionalField.options.map(opt => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleChange('conditionalAnswer', opt)}
                    className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                      formData.conditionalAnswer === opt
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-semibold'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FieldWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Budget & Timeline Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper label="Budget Range" sublabel="Optional">
          <div className="relative">
            <select
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              className={selectClass('budget')}
              style={{ minHeight: '52px' }}
            >
              <option value="" disabled>Select range…</option>
              {BUDGET_RANGES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▾</div>
          </div>
        </FieldWrapper>
        <FieldWrapper label="Timeline" sublabel="Optional">
          <div className="relative">
            <select
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', e.target.value)}
              className={selectClass('timeline')}
              style={{ minHeight: '52px' }}
            >
              <option value="" disabled>Select timeline…</option>
              {TIMELINE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▾</div>
          </div>
        </FieldWrapper>
      </div>

      {/* Scope */}
      <FieldWrapper label="Project Scope" error={touched.clientNeeds && errors.clientNeeds} required>
        <textarea
          rows={5}
          value={formData.clientNeeds}
          onChange={(e) => handleChange('clientNeeds', e.target.value)}
          onBlur={() => handleBlur('clientNeeds')}
          placeholder="Describe your project goals, current challenges, and what success looks like…"
          className={`${inputClass('clientNeeds')} resize-none`}
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${formData.clientNeeds.trim().length < 20 && touched.clientNeeds ? 'text-red-400' : 'text-zinc-600'}`}>
            {formData.clientNeeds.trim().length}/20 min
          </span>
        </div>
      </FieldWrapper>

      {/* File Upload */}
      <FieldWrapper label="Attachments" sublabel="Optional — max 5 files, 10 MB each" error={errors.files}>
        <div
          className="relative rounded-2xl border border-dashed border-zinc-700 hover:border-zinc-500 transition-colors p-5 text-center cursor-pointer"
          onClick={() => document.getElementById('file-upload').click()}
        >
          <Upload className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
          <p className="text-sm text-zinc-400">Click to upload or drag files here</p>
          <p className="text-xs text-zinc-600 mt-1">PDF, DOCX, PNG, JPG, WEBP</p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
            onChange={handleFileAdd}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
                <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-zinc-300 truncate flex-1">{file.name}</span>
                <span className="text-xs text-zinc-600 flex-shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
                <button type="button" onClick={() => removeFile(idx)} className="text-zinc-500 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </FieldWrapper>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black font-extrabold text-base hover:bg-zinc-200 disabled:opacity-50 transition-colors mt-1"
        style={{ minHeight: '56px' }}
      >
        {submitting ? 'Submitting…' : 'Execute Request'} <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

function FieldWrapper({ label, sublabel, error, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {sublabel && <span className="text-xs text-zinc-600">{sublabel}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}