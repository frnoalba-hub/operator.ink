import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function BackToHome() {
  return (
    <motion.a
      href={createPageUrl('Home')}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-2 text-sm text-[var(--retro-text-muted)] hover:text-[var(--retro-text)] mb-8 retro-link"
    >
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </motion.a>
  );
}
