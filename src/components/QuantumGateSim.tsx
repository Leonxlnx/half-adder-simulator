'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuantumGateSimProps {
    onContinue: () => void;
}

type GateType = 'X' | 'H' | 'CNOT';

export default function QuantumGateSim({ onContinue }: QuantumGateSimProps) {
    const [qubit, setQubit] = useState<'|0⟩' | '|1⟩' | '|+⟩'>('|0⟩');
    const [qubit2, setQubit2] = useState<'|0⟩' | '|1⟩'>('|0⟩');
    const [activeGate, setActiveGate] = useState<GateType | null>(null);
    const [showEntangled, setShowEntangled] = useState(false);

    const applyGate = (gate: GateType) => {
        setActiveGate(gate);
        setTimeout(() => setActiveGate(null), 400);

        if (gate === 'X') {
            setQubit(q => q === '|0⟩' ? '|1⟩' : q === '|1⟩' ? '|0⟩' : q);
            setShowEntangled(false);
        } else if (gate === 'H') {
            setQubit('|+⟩');
            setShowEntangled(false);
        } else if (gate === 'CNOT') {
            if (qubit === '|1⟩') {
                setQubit2(q => q === '|0⟩' ? '|1⟩' : '|0⟩');
            } else if (qubit === '|+⟩') {
                setShowEntangled(true);
            }
        }
    };

    const resetAll = () => {
        setQubit('|0⟩');
        setQubit2('|0⟩');
        setShowEntangled(false);
    };

    const getQubitColor = (q: string) => {
        if (q === '|0⟩') return 'bg-slate-800';
        if (q === '|1⟩') return 'bg-blue-600';
        return 'bg-gradient-to-br from-indigo-400 to-violet-500';
    };

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="w-full max-w-lg mx-auto">

            {/* Tip Box */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-4 sm:mb-6">
                <p className="text-purple-700 text-xs sm:text-sm text-center">
                    💡 <strong>Tipp:</strong> Probiere: X-Gate (flippt), H-Gate (Superposition), dann CNOT (Verschränkung)!
                </p>
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1">
                Quantengatter
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2">
                Wende Gatter an und beobachte die Wirkung.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">

                {/* Qubits */}
                <div className="flex justify-center items-center gap-4 sm:gap-6 mb-5 sm:mb-6">
                    <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-slate-400 mb-1.5 uppercase font-medium">Qubit 1</p>
                        <AnimatePresence mode="wait">
                            <motion.div key={qubit}
                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${getQubitColor(qubit)}`}>
                                <span className="text-white font-mono text-sm sm:text-base font-bold">{qubit}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {showEntangled && (
                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                            className="text-indigo-400 text-lg sm:text-xl">⟷</motion.div>
                    )}

                    <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-slate-400 mb-1.5 uppercase font-medium">Qubit 2</p>
                        <AnimatePresence mode="wait">
                            <motion.div key={`${qubit2}-${showEntangled}`}
                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${showEntangled ? 'bg-gradient-to-br from-pink-400 to-indigo-500' : getQubitColor(qubit2)}`}>
                                <span className="text-white font-mono text-sm sm:text-base font-bold">{showEntangled ? 'Φ+' : qubit2}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {showEntangled && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center text-xs sm:text-sm text-indigo-600 mb-4">
                        Verschränkt! Beide Qubits sind nun untrennbar verbunden.
                    </motion.p>
                )}

                {/* Gate Buttons */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-3">
                    {(['X', 'H', 'CNOT'] as const).map((gate) => (
                        <motion.button key={gate} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => applyGate(gate)}
                            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all
                                ${activeGate === gate ? 'bg-indigo-600 text-white scale-95' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                            {gate}
                        </motion.button>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button onClick={resetAll} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                        Reset ↺
                    </button>
                </div>
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
