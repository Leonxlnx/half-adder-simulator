'use client';

import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

interface IntroScreenProps {
    onContinue: () => void;
}

export default function IntroScreen({ onContinue }: IntroScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-md"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-20 h-20 bg-white rounded-3xl soft-shadow-lg flex items-center justify-center mx-auto mb-8"
            >
                <Calculator className="w-10 h-10 text-indigo-500" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-semibold text-slate-900 tracking-tight mb-3"
            >
                Truthful Adding
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-slate-500 text-lg mb-10"
            >
                Let&apos;s get logic gates to add binary digits for us.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                className="px-12 py-4 bg-slate-900 text-white rounded-full text-lg font-medium soft-shadow hover:bg-slate-800 transition-colors"
            >
                Start
            </motion.button>
        </motion.div>
    );
}
