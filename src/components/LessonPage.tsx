'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface LessonSection {
    icon: ReactNode;
    title: string;
    content: string;
}

interface LessonPageProps {
    title: string;
    subtitle: string;
    sections: LessonSection[];
    onContinue: () => void;
    onSkip?: () => void;
    buttonLabel?: string;
}

export default function LessonPage({ title, subtitle, sections, onContinue, onSkip, buttonLabel = 'Weiter' }: LessonPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="text-xl sm:text-2xl font-semibold text-slate-900 text-center mb-1.5 px-2"
            >
                {title}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-5 sm:mb-7 px-2"
            >
                {subtitle}
            </motion.p>

            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-7">
                {sections.map((section, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.06, duration: 0.25 }}
                        className="bg-white rounded-2xl p-3.5 sm:p-4 soft-shadow"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                                {section.icon}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-0.5">
                                    {section.title}
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 + sections.length * 0.06 }}
                className="flex flex-col items-center gap-2"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-medium soft-shadow hover:bg-slate-800 transition-colors"
                >
                    {buttonLabel}
                </motion.button>
                {onSkip && (
                    <button onClick={onSkip} className="text-xs text-slate-400 hover:text-slate-600 transition-colors py-1">
                        Überspringen →
                    </button>
                )}
            </motion.div>
        </motion.div>
    );
}
