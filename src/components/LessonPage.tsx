'use client';

import { motion } from 'framer-motion';

export interface LessonSection {
    icon: string;
    title: string;
    content: string;
}

interface LessonPageProps {
    title: string;
    subtitle: string;
    sections: LessonSection[];
    onContinue: () => void;
    buttonLabel?: string;
}

export default function LessonPage({ title, subtitle, sections, onContinue, buttonLabel = 'Weiter' }: LessonPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-semibold text-slate-900 text-center mb-2 px-2"
            >
                {title}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-6 sm:mb-8 px-2"
            >
                {subtitle}
            </motion.p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {sections.map((section, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        className="bg-white rounded-2xl p-4 sm:p-5 soft-shadow"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{section.icon}</span>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + sections.length * 0.08 }}
                className="flex justify-center"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow hover:bg-slate-800 transition-colors"
                >
                    {buttonLabel}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
