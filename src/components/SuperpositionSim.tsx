'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuperpositionSimProps {
    onContinue: () => void;
}

export default function SuperpositionSim({ onContinue }: SuperpositionSimProps) {
    const [inSuperposition, setInSuperposition] = useState(false);
    const [measurements, setMeasurements] = useState<(0 | 1)[]>([]);
    const [lastResult, setLastResult] = useState<0 | 1 | null>(null);
    const [measuring, setMeasuring] = useState(false);

    const applyHadamard = () => {
        setInSuperposition(!inSuperposition);
        setLastResult(null);
    };

    const measure = useCallback(() => {
        if (!inSuperposition) {
            setLastResult(0);
            setMeasurements(prev => [...prev, 0]);
            return;
        }
        setMeasuring(true);
        setTimeout(() => {
            const result: 0 | 1 = Math.random() < 0.5 ? 0 : 1;
            setLastResult(result);
            setMeasurements(prev => [...prev, result]);
            setInSuperposition(false);
            setMeasuring(false);
        }, 600);
    }, [inSuperposition]);

    const reset = () => {
        setInSuperposition(false);
        setMeasurements([]);
        setLastResult(null);
    };

    const zeros = measurements.filter(m => m === 0).length;
    const ones = measurements.filter(m => m === 1).length;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} className="w-full max-w-lg mx-auto">

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 sm:mb-2 px-2">
                Superposition Simulator
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-xs sm:text-sm mb-4 sm:mb-6 px-2">
                Nutze Hadamard um Superposition zu erzeugen, dann miss das Qubit.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">

                {/* Qubit Visualization */}
                <div className="flex flex-col items-center mb-4 sm:mb-6">
                    <motion.div
                        animate={{
                            scale: measuring ? [1, 1.2, 1] : 1,
                            boxShadow: inSuperposition
                                ? ['0 0 0px rgba(99,102,241,0.3)', '0 0 30px rgba(99,102,241,0.6)', '0 0 0px rgba(99,102,241,0.3)']
                                : '0 0 0px rgba(0,0,0,0)'
                        }}
                        transition={{ duration: inSuperposition ? 1.5 : 0.3, repeat: inSuperposition ? Infinity : 0 }}
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mb-3
                            ${inSuperposition ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : lastResult === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span key={inSuperposition ? 'super' : String(lastResult ?? 0)}
                                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                {inSuperposition ? '?' : (lastResult ?? 0)}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>
                    <p className="text-xs sm:text-sm text-slate-500 font-mono">
                        {inSuperposition ? '|ψ⟩ = (|0⟩ + |1⟩) / √2' : `|${lastResult ?? 0}⟩`}
                    </p>
                </div>

                {/* Probability Bars */}
                <div className="space-y-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm font-mono w-6 text-slate-500">|0⟩</span>
                        <div className="flex-1 h-5 sm:h-6 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div animate={{ width: inSuperposition ? '50%' : lastResult === 0 || lastResult === null ? '100%' : '0%' }}
                                className="h-full bg-slate-400 rounded-full" transition={{ duration: 0.3 }} />
                        </div>
                        <span className="text-xs font-mono w-8 text-right text-slate-400">
                            {inSuperposition ? '50%' : lastResult === 0 || lastResult === null ? '100%' : '0%'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm font-mono w-6 text-slate-500">|1⟩</span>
                        <div className="flex-1 h-5 sm:h-6 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div animate={{ width: inSuperposition ? '50%' : lastResult === 1 ? '100%' : '0%' }}
                                className="h-full bg-blue-500 rounded-full" transition={{ duration: 0.3 }} />
                        </div>
                        <span className="text-xs font-mono w-8 text-right text-slate-400">
                            {inSuperposition ? '50%' : lastResult === 1 ? '100%' : '0%'}
                        </span>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2 sm:gap-3 justify-center mb-4">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={applyHadamard}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-medium">
                        H (Hadamard)
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={measure} disabled={measuring}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-medium disabled:opacity-50">
                        Messen
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={reset}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-medium">
                        Reset
                    </motion.button>
                </div>

                {/* Statistics */}
                {measurements.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="pt-3 sm:pt-4 border-t border-slate-100">
                        <p className="text-xs sm:text-sm text-slate-500 text-center mb-2">
                            Messungen: {measurements.length}
                        </p>
                        <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                            <span className="font-mono text-slate-600">|0⟩: {zeros} ({measurements.length > 0 ? Math.round(zeros / measurements.length * 100) : 0}%)</span>
                            <span className="font-mono text-blue-600">|1⟩: {ones} ({measurements.length > 0 ? Math.round(ones / measurements.length * 100) : 0}%)</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="flex justify-center">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3 sm:py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow">
                    Weiter
                </motion.button>
            </div>
        </motion.div>
    );
}
