'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Gate from './Gate';
import confetti from 'canvas-confetti';

interface AndGateScreenProps {
    onContinue: () => void;
}

export default function AndGateScreen({ onContinue }: AndGateScreenProps) {
    const [selected, setSelected] = useState<'and' | 'xor' | 'or' | null>(null);
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');

    const handleSelect = (gate: 'and' | 'xor' | 'or') => {
        if (feedback === 'correct') return;
        setSelected(gate);
        setFeedback('none');
    };

    const check = () => {
        if (selected === 'and') {
            setFeedback('correct');
            confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#10B981', '#3B82F6', '#6366F1'] });
        } else {
            setFeedback('incorrect');
        }
    };

    const truthTable = [
        { a: 0, b: 0, twos: 0 },
        { a: 0, b: 1, twos: 0 },
        { a: 1, b: 0, twos: 0 },
        { a: 1, b: 1, twos: 1 },
    ];

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }} className="w-full max-w-lg mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 sm:mb-2 px-2">
                Now the Twos Place
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-8 px-2">
                Pick the gate for the carry bit.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">
                <table className="w-full text-center mb-4 sm:mb-6">
                    <thead>
                        <tr className="text-slate-400 text-xs sm:text-sm">
                            <th className="py-1.5 sm:py-2">A</th>
                            <th className="py-1.5 sm:py-2">B</th>
                            <th className="py-1.5 sm:py-2 text-emerald-500 font-semibold">2s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {truthTable.map((row, i) => (
                            <tr key={i} className="font-mono text-sm sm:text-base">
                                <td className="py-1 sm:py-1.5">{row.a}</td>
                                <td className="py-1 sm:py-1.5">{row.b}</td>
                                <td className="py-1 sm:py-1.5 text-emerald-600 font-semibold">{row.twos}</td>
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
                        {feedback === 'correct' ? 'AND only outputs 1 when both inputs are 1.' : 'The output is 1 in only one case.'}
                    </motion.p>
                )}
            </motion.div>

            <div className="flex justify-center">
                {feedback === 'correct' ? (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue}
                        className="w-full sm:w-auto px-10 py-3 sm:py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow">
                        Continue
                    </motion.button>
                ) : (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={check} disabled={!selected}
                        className={`w-full sm:w-auto px-10 py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-medium transition-all
                            ${selected ? 'bg-slate-900 text-white soft-shadow' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                        Check
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
