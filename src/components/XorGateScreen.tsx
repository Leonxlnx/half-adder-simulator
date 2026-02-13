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
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="w-full max-w-lg mx-auto">

            {/* Tip Box */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mb-4 sm:mb-6">
                <p className="text-indigo-700 text-xs sm:text-sm text-center">
                    💡 <strong>Tipp:</strong> Schau dir die Ausgabe-Spalte an — welches Gatter passt zur Einerstelle?
                </p>
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 px-2">
                Addierer aus Gattern bauen
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2">
                Wähle das Gatter für die Einerstelle.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">
                <table className="w-full text-center mb-4 sm:mb-6">
                    <thead>
                        <tr className="text-slate-400 text-xs sm:text-sm">
                            <th className="py-1.5">A</th>
                            <th className="py-1.5">B</th>
                            <th className="py-1.5 text-indigo-500 font-semibold">1er</th>
                        </tr>
                    </thead>
                    <tbody>
                        {truthTable.map((row, i) => (
                            <tr key={i} className="font-mono text-sm sm:text-base">
                                <td className="py-1">{row.a}</td>
                                <td className="py-1">{row.b}</td>
                                <td className="py-1 text-indigo-600 font-semibold">{row.ones}</td>
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
                            <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5 uppercase font-medium">{gate}</p>
                        </motion.button>
                    ))}
                </div>

                {feedback !== 'none' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`text-center mt-3 text-xs sm:text-sm ${feedback === 'correct' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {feedback === 'correct' ? '✅ XOR gibt 1 aus, wenn genau ein Eingang 1 ist.' : 'Schau dir an, wann die Ausgabe 1 ist.'}
                    </motion.p>
                )}
            </motion.div>

            <div className="flex flex-col items-center gap-2">
                {feedback === 'correct' ? (
                    <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onContinue}
                        className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-medium soft-shadow">
                        Weiter
                    </motion.button>
                ) : (
                    <>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={check} disabled={!selected}
                            className={`w-full sm:w-auto px-10 py-3 rounded-full text-sm sm:text-base font-medium transition-all
                                ${selected ? 'bg-slate-900 text-white soft-shadow' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                            Prüfen
                        </motion.button>
                        <button onClick={onContinue} className="text-xs text-slate-400 hover:text-slate-600 transition-colors py-1">
                            Überspringen →
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}
