import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BackToHome() {
  return (
    <Link
      to={createPageUrl('Home')}
      className="inline-flex items-center gap-2 text-sm text-[var(--retro-text-muted)] hover:text-[var(--retro-text)] mb-8 retro-link"
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </motion.div>
    </Link>
  );
}
