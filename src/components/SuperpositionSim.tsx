'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuperpositionSimProps {
    onContinue: () => void;
}

export default function SuperpositionSim({ onContinue }: SuperpositionSimProps) {
    const [measured, setMeasured] = useState(false);
    const [result, setResult] = useState<0 | 1>(0);
    const [measuring, setMeasuring] = useState(false);
    const [measurements, setMeasurements] = useState<number[]>([]);

    const measure = () => {
        if (measuring) return;
        setMeasuring(true);
        setMeasured(false);
        setTimeout(() => {
            const r = Math.random() < 0.5 ? 0 : 1 as 0 | 1;
            setResult(r);
            setMeasured(true);
            setMeasuring(false);
            setMeasurements(prev => [...prev, r]);
        }, 400);
    };

    const reset = () => {
        setMeasured(false);
    };

    const zeroCount = measurements.filter(m => m === 0).length;
    const oneCount = measurements.filter(m => m === 1).length;
    const total = measurements.length;

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="w-full max-w-lg mx-auto">

            {/* Tip Box */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="bg-violet-50 border border-violet-100 rounded-xl p-3 mb-4 sm:mb-6">
                <p className="text-violet-700 text-xs sm:text-sm text-center">
                    💡 <strong>Tipp:</strong> Miss das Qubit mehrmals! Beobachte, wie sich die Verteilung 50:50 annähert.
                </p>
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1">
                Superposition
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2">
                Ein Qubit ist gleichzeitig 0 und 1 — bis du misst.
            </motion.p>

            {/* Qubit Visualization */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 soft-shadow-lg mb-4 sm:mb-6">

                <div className="flex justify-center mb-5 sm:mb-6">
                    <AnimatePresence mode="wait">
                        {!measured ? (
                            <motion.div key="superp"
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25 }}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
                                />
                                <span className="text-white font-mono text-lg font-bold tracking-wider">|ψ⟩</span>
                            </motion.div>
                        ) : (
                            <motion.div key="result"
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25, type: 'spring', stiffness: 250, damping: 18 }}
                                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center ${result === 0 ? 'bg-slate-800' : 'bg-blue-600'}`}>
                                <span className="text-white font-mono text-3xl font-bold">|{result}⟩</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 sm:gap-3 mb-4">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={measure}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors">
                        {measured ? 'Nochmal messen' : '🔍 Messen'}
                    </motion.button>
                    {measured && (
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={reset}
                            className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-medium hover:bg-slate-300 transition-colors">
                            Zurücksetzen
                        </motion.button>
                    )}
                </div>

                {/* Stats */}
                {total > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="bg-slate-50 rounded-xl p-3 sm:p-4">
                        <p className="text-xs text-slate-400 text-center mb-2">{total} Messungen</p>
                        <div className="flex gap-2 h-4 sm:h-5 rounded-full overflow-hidden">
                            <motion.div className="bg-slate-800 rounded-l-full" animate={{ flex: zeroCount || 0.01 }} transition={{ duration: 0.3 }} />
                            <motion.div className="bg-blue-600 rounded-r-full" animate={{ flex: oneCount || 0.01 }} transition={{ duration: 0.3 }} />
                        </div>
                        <div className="flex justify-between mt-1.5 text-xs text-slate-500 font-mono">
                            <span>|0⟩ {total > 0 ? Math.round((zeroCount / total) * 100) : 0}%</span>
                            <span>|1⟩ {total > 0 ? Math.round((oneCount / total) * 100) : 0}%</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="flex flex-col items-center gap-2">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-medium soft-shadow hover:bg-slate-800 transition-colors">
                    Weiter
                </motion.button>
                <button onClick={onContinue} className="text-xs text-slate-400 hover:text-slate-600 transition-colors py-1">
                    Überspringen →
                </button>
            </div>
        </motion.div>
    );
}
