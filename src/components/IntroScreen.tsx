'use client';

import { motion } from 'framer-motion';

interface IntroScreenProps {
    onContinue: () => void;
}

function AtomIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="4" fill="currentColor" />
            <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(60 24 24)" />
            <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(120 24 24)" />
        </svg>
    );
}

export default function IntroScreen({ onContinue }: IntroScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-md"
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="w-20 h-20 bg-white rounded-3xl soft-shadow-lg flex items-center justify-center mx-auto mb-8"
            >
                <AtomIcon className="w-10 h-10 text-indigo-500" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-3xl font-semibold text-slate-900 tracking-tight mb-3"
            >
                Binär Addieren
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="text-slate-500 text-lg mb-10"
            >
                Logikgatter lernen, die für uns rechnen.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinue}
                className="px-12 py-4 bg-slate-900 text-white rounded-full text-lg font-medium soft-shadow hover:bg-slate-800 transition-colors"
            >
                Los geht&apos;s
            </motion.button>
        </motion.div>
    );
}
