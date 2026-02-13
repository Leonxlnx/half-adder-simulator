'use client';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SkillCheckScreenProps {
    onContinue: () => void;
    chapterTitle: string;
}

/* Custom trophy SVG icon */
function TrophyIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8h20v14c0 5.523-4.477 10-10 10s-10-4.477-10-10V8z" fill="currentColor" opacity="0.2" />
            <path d="M14 8h20v14c0 5.523-4.477 10-10 10s-10-4.477-10-10V8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M14 12H8c0 4 2 7 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34 12h6c0 4-2 7-6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="24" y1="32" x2="24" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="38" x2="32" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

export default function SkillCheckScreen({ onContinue, chapterTitle }: SkillCheckScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#6366F1', '#3B82F6', '#10B981', '#F59E0B'] });
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} className="w-full max-w-md mx-auto text-center">

            <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl flex items-center justify-center soft-shadow-lg">
                <TrophyIcon className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                Chapter Complete!
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-slate-500 text-sm sm:text-base mb-8 sm:mb-10">
                You finished &ldquo;{chapterTitle}&rdquo;
            </motion.p>

            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue}
                className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow hover:bg-slate-800 transition-colors">
                Back to Overview
            </motion.button>
        </motion.div>
    );
}
