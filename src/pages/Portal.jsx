import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, X, FileText, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import StickyNav from '../components/StickyNav';
import GridOverlay from '../components/GridOverlay';
import BackToHome from '../components/BackToHome';
import { base44 } from '@/api/base44Client';

const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 20;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const STORAGE_KEY = 'operator_portal_draft';

const PORTAL_TITLE = 'Portal — Submit Project | Operator.ink';
const PORTAL_DESC = 'Operator.ink portal: Submit your project brief, files, and get started. System initialization for web design, GEO/AEO/SEO, AI workflows, ads.';

export default function Portal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) {
        const { name: n, email: e, projectName: p, notes: no } = JSON.parse(draft);
        if (n) setName(n);
        if (e) setEmail(e);
        if (p) setProjectName(p);
        if (no) setNotes(no);
      }
    } catch {}
  }, []);

  // Save draft (notes only; files can't be stored)
  useEffect(() => {
    const draft = { name, email, projectName, notes };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [name, email, projectName, notes]);

  const handleFileAdd = (e) => {
    const incoming = Array.from(e.target.files);
    const valid = [];
    const newErrors = [];
    incoming.forEach(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(`"${file.name}" — PNG, JPG, WEBP or PDF only`);
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`"${file.name}" — max 10 MB`);
      } else if (files.length + valid.length >= MAX_FILES) {
        newErrors.push(`Max ${MAX_FILES} files`);
      } else {
        valid.push(file);
      }
    });
    if (newErrors.length) setErrors(prev => ({ ...prev, files: newErrors.join('. ') }));
    setFiles(prev => [...prev, ...valid]);
    e.target.value = '';
  };

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name required';
    if (!email.trim()) e.email = 'Email required';
    else if (!validateEmail(email)) e.email = 'Valid email required';
    if (!projectName.trim()) e.projectName = 'Project name required';
    if (!notes.trim()) e.notes = 'Please describe what you want';
    else if (notes.trim().length < 20) e.notes = 'At least 20 characters';
    setErrors(e);
    setTouched({ name: true, email: true, projectName: true, notes: true });
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploadedUrls.push(file_url);
      }

      await base44.entities.LeadSubmission.create({
        client_name: name,
        client_email: email,
        company: projectName,
        service: 'multiple',
        scope: `[Portal] ${notes}`,
        file_urls: uploadedUrls,
        status: 'new',
      });

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setProjectName('');
      setNotes('');
      setFiles([]);
      setTouched({});
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 6000);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border bg-black/40 text-[var(--retro-text)] placeholder-[var(--retro-text-dim)] focus:ring-1 outline-none transition-all ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:border-red-500'
        : 'border-[var(--retro-border)] focus:border-[var(--retro-border-bright)]'
    }`;

  return (
    <>
      <SEO title={PORTAL_TITLE} description={PORTAL_DESC} canonicalUrl="https://operator.ink/Portal" />
      <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", background: 'var(--retro-bg)' }}>
      <GridOverlay />
      <StickyNav currentPage="portal" />
      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <BackToHome />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">Client Portal</h1>
          <p className="text-[var(--retro-text-muted)] mb-8">
            Upload what you want for your website. Add images, leave notes, and we&apos;ll work through your project here.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="retro-card rounded-2xl p-6 lg:p-8 space-y-6"
        >
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-xl px-4 py-3 flex gap-3 text-sm ${
                submitStatus === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}
            >
              {submitStatus === 'success' ? (
                <>
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Project submitted!</p>
                    <p className="text-xs mt-1 opacity-90">We&apos;ll create your workspace and email you access. You can add more images and notes once you&apos;re in.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Something went wrong</p>
                    <p className="text-xs mt-1 opacity-90">Try again or email orders@operator.ink</p>
                  </div>
                </>
              )}
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--retro-text-dim)] mb-2">Your name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(p => ({ ...p, name: true }))}
                placeholder="Full name"
                className={inputClass('name')}
              />
              {touched.name && errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--retro-text-dim)] mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(p => ({ ...p, email: true }))}
                placeholder="name@company.com"
                className={inputClass('email')}
              />
              {touched.email && errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--retro-text-dim)] mb-2">Project / site name *</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setTouched(p => ({ ...p, projectName: true }))}
              placeholder="e.g. Acme Corp website"
              className={inputClass('projectName')}
            />
            {touched.projectName && errors.projectName && <p className="text-xs text-red-400 mt-1">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--retro-text-dim)] mb-2">Notes — what you want *</label>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => setTouched(p => ({ ...p, notes: true }))}
              placeholder="Describe your vision, look & feel, pages needed, examples you like, etc."
              className={`${inputClass('notes')} resize-none`}
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${touched.notes && errors.notes ? 'text-red-400' : 'text-[var(--retro-text-dim)]'}`}>
                {touched.notes && errors.notes ? errors.notes : `${notes.trim().length}/20 min`}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--retro-text-dim)] mb-2">
              Images — references, mockups, logos
            </label>
            <p className="text-xs text-[var(--retro-text-muted)] mb-2">PNG, JPG, WEBP, PDF — max {MAX_FILES} files, 10 MB each</p>
            <div
              className="relative rounded-xl border-2 border-dashed border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] p-6 text-center cursor-pointer transition-colors"
              onClick={() => document.getElementById('portal-file-upload').click()}
            >
              <Upload className="w-8 h-8 text-[var(--retro-text-dim)] mx-auto mb-2" />
              <p className="text-sm text-[var(--retro-text-muted)]">Click to upload or drag files</p>
              <input
                id="portal-file-upload"
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.webp,.pdf"
                onChange={handleFileAdd}
                className="sr-only"
              />
            </div>
            {errors.files && <p className="text-xs text-red-400 mt-1">{errors.files}</p>}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-black/40 border border-[var(--retro-border)]">
                    {file.type.startsWith('image/') ? (
                      <ImageIcon className="w-4 h-4 text-[#00ccff] flex-shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-[var(--retro-text-muted)] flex-shrink-0" />
                    )}
                    <span className="text-sm text-[var(--retro-text)] truncate flex-1">{file.name}</span>
                    <span className="text-xs text-[var(--retro-text-dim)]">{(file.size / 1024).toFixed(0)} KB</span>
                    <button type="button" onClick={() => removeFile(idx)} className="text-[var(--retro-text-dim)] hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="retro-rgb-btn w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit & create project'} <Check className="w-4 h-4" />
            </button>
            <p className="text-xs text-[var(--retro-text-dim)] mt-3 text-center">
              We&apos;ll create your account and workspace. Need service, budget & timeline? <Link to={`${createPageUrl('Home')}#intake`} className="retro-link">System Initialization</Link>
            </p>
          </div>
        </motion.form>

        <p className="text-xs text-[var(--retro-text-dim)] mt-8 text-center">
          Questions? <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a> or <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="retro-link">LinkedIn</a>
        </p>
      </main>
    </div>
    </>
  );
}
