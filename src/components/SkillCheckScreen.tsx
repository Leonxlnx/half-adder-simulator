'use client';

import { motion } from 'framer-motion';

interface SkillCheckScreenProps {
    onContinue: () => void;
    chapterTitle?: string;
}

function TrophyIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
            <path d="M14 8h20v12c0 5.5-4.5 10-10 10s-10-4.5-10-10V8z" stroke="currentColor" strokeWidth="2.5" />
            <path d="M14 14H8c0 5 3 7 6 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 14h6c0 5-3 7-6 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="30" x2="24" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="38" x2="32" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

export default function SkillCheckScreen({ onContinue, chapterTitle }: SkillCheckScreenProps) {
    const displayTitle = chapterTitle || 'Kapitel';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg mx-auto text-center"
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"
            >
                <TrophyIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2"
            >
                {displayTitle} abgeschlossen!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8 px-4"
            >
                Nice! Du hast dieses Kapitel gemeistert. Weiter zum nächsten!
            </motion.p>

            <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinue}
                className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-medium soft-shadow hover:bg-slate-800 transition-colors"
            >
                Nächstes Kapitel
            </motion.button>
        </motion.div>
    );
}
