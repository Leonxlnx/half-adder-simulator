'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Gate from './Gate';
import confetti from 'canvas-confetti';

interface XorGateScreenProps {
    onContinue: () => void;
}

export default function XorGateScreen({ onContinue }: XorGateScreenProps) {
    const [selected, setSelected] = useState<'and' | 'xor' | 'or' | null>(null);
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');

    const handleSelect = (gate: 'and' | 'xor' | 'or') => {
        if (feedback === 'correct') return;
        setSelected(gate);
        setFeedback('none');
    };

    const check = () => {
        if (selected === 'xor') {
            setFeedback('correct');
            confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#6366F1', '#3B82F6', '#10B981'] });
        } else {
            setFeedback('incorrect');
        }
    };

    const truthTable = [
        { a: 0, b: 0, ones: 0 },
        { a: 0, b: 1, ones: 1 },
        { a: 1, b: 0, ones: 1 },
        { a: 1, b: 1, ones: 0 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto"
        >
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 sm:mb-2 px-2">
                Ein Addierer aus Logikgattern...
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-8 px-2">
                Wähle ein Gatter für die Einerstelle (1s).
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">
                <table className="w-full text-center mb-4 sm:mb-6">
                    <thead>
                        <tr className="text-slate-400 text-xs sm:text-sm">
                            <th className="py-1.5 sm:py-2">A</th>
                            <th className="py-1.5 sm:py-2">B</th>
                            <th className="py-1.5 sm:py-2 text-indigo-500 font-semibold">1s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {truthTable.map((row, i) => (
                            <tr key={i} className="font-mono text-sm sm:text-base">
                                <td className="py-1 sm:py-1.5">{row.a}</td>
                                <td className="py-1 sm:py-1.5">{row.b}</td>
                                <td className="py-1 sm:py-1.5 text-indigo-600 font-semibold">{row.ones}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center gap-2 sm:gap-4">
                    {(['and', 'xor', 'or'] as const).map((gate) => (
                        <motion.button key={gate} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSelect(gate)}
                            className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all
                                ${selected === gate ? 'bg-slate-100 ring-2 ring-slate-400' : 'bg-gray-50 hover:bg-slate-100'}`}>
                            <Gate type={gate} size={48} active={selected === gate} />
                            <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 uppercase font-medium">{gate}</p>
                        </motion.button>
                    ))}
                </div>

                {feedback !== 'none' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`text-center mt-3 sm:mt-4 text-xs sm:text-sm ${feedback === 'correct' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {feedback === 'correct' ? 'XOR gibt 1 aus, wenn genau ein Eingang 1 ist.' : 'Schau dir an, wann die Ausgabe 1 ist.'}
                    </motion.p>
                )}
            </motion.div>

            <div className="flex justify-center">
                {feedback === 'correct' ? (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue}
                        className="w-full sm:w-auto px-10 py-3 sm:py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow">
                        Weiter
                    </motion.button>
                ) : (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={check} disabled={!selected}
                        className={`w-full sm:w-auto px-10 py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-medium transition-all
                            ${selected ? 'bg-slate-900 text-white soft-shadow' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                        Prüfen
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
