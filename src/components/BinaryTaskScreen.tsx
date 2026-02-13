'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Bit from './Bit';
import confetti from 'canvas-confetti';

interface BinaryTaskScreenProps {
    onContinue: () => void;
}

interface Row {
    a: 0 | 1;
    b: 0 | 1;
    carry: 0 | 1;
    sum: 0 | 1;
    correctCarry: 0 | 1;
    correctSum: 0 | 1;
}

export default function BinaryTaskScreen({ onContinue }: BinaryTaskScreenProps) {
    const [rows, setRows] = useState<Row[]>([
        { a: 0, b: 0, carry: 0, sum: 0, correctCarry: 0, correctSum: 0 },
        { a: 0, b: 1, carry: 0, sum: 0, correctCarry: 0, correctSum: 1 },
        { a: 1, b: 0, carry: 0, sum: 0, correctCarry: 0, correctSum: 1 },
        { a: 1, b: 1, carry: 0, sum: 0, correctCarry: 1, correctSum: 0 },
    ]);
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
    const [showContinue, setShowContinue] = useState(false);

    const allCorrect = rows.every(r => r.carry === r.correctCarry && r.sum === r.correctSum);

    const toggleBit = (rowIndex: number, field: 'carry' | 'sum') => {
        if (feedback === 'correct') return;
        setRows(prev => prev.map((row, i) => {
            if (i !== rowIndex) return row;
            const next = row[field] === 0 ? 1 : 0;
            return { ...row, [field]: next as 0 | 1 };
        }));
        setFeedback('none');
    };

    const check = () => {
        if (allCorrect) {
            setFeedback('correct');
            setShowContinue(true);
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 }, colors: ['#10B981', '#3B82F6', '#6366F1'] });
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg mx-auto"
        >
            {/* Tip Box */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 sm:mb-6"
            >
                <p className="text-blue-700 text-xs sm:text-sm text-center">
                    💡 <strong>Tipp:</strong> Tippe auf die Bits, um sie zwischen 0 und 1 umzuschalten. Ziel: Übertrag und Summe korrekt ausfüllen.
                </p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-500 text-sm sm:text-base mb-3 sm:mb-5 px-2"
            >
                Vervollständige die binäre Addition.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 soft-shadow-lg ${feedback === 'correct' ? 'ring-2 ring-emerald-400/50' : ''}`}
            >
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                    <span className="w-6 sm:w-8 text-center text-[10px] sm:text-xs text-slate-400 font-medium uppercase">A</span>
                    <span className="w-4 sm:w-5"></span>
                    <span className="w-6 sm:w-8 text-center text-[10px] sm:text-xs text-slate-400 font-medium uppercase">B</span>
                    <span className="w-4 sm:w-5"></span>
                    <div className="flex gap-1.5 sm:gap-2">
                        <span className="w-8 sm:w-10 text-center text-[10px] sm:text-xs text-emerald-500 font-semibold uppercase">Carry</span>
                        <span className="w-8 sm:w-10 text-center text-[10px] sm:text-xs text-indigo-500 font-semibold uppercase">Sum</span>
                    </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    {rows.map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 + i * 0.04 }}
                            className="flex items-center justify-center gap-2 sm:gap-3"
                        >
                            <span className="w-6 sm:w-8 text-center font-mono text-lg sm:text-xl text-slate-800">{row.a}</span>
                            <span className="text-slate-400 text-lg sm:text-xl">+</span>
                            <span className="w-6 sm:w-8 text-center font-mono text-lg sm:text-xl text-slate-800">{row.b}</span>
                            <span className="text-slate-400 text-lg sm:text-xl">=</span>
                            <div className="flex gap-1.5 sm:gap-2">
                                <Bit value={row.carry} interactive={feedback !== 'correct'} onClick={() => toggleBit(i, 'carry')} size="sm" variant="input" />
                                <Bit value={row.sum} interactive={feedback !== 'correct'} onClick={() => toggleBit(i, 'sum')} size="sm" variant="input" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {feedback !== 'none' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`text-center mt-4 sm:mt-6 text-xs sm:text-sm ${feedback === 'correct' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {feedback === 'correct' ? '🎉 Perfekt! Binäre Addition gemeistert.' : 'Nicht ganz — schau nochmal auf die Carry-Bits.'}
                    </motion.p>
                )}
            </motion.div>

            <div className="mt-5 sm:mt-7 flex flex-col items-center gap-2">
                {!showContinue ? (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={check}
                        className="w-full sm:w-auto px-10 py-3 rounded-full text-sm sm:text-base font-medium bg-slate-900 text-white soft-shadow hover:bg-slate-800 transition-all">
                        Prüfen
                    </motion.button>
                ) : (
                    <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onContinue}
                        className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-medium soft-shadow hover:bg-slate-800">
                        Weiter
                    </motion.button>
                )}
                {!showContinue && (
                    <button onClick={onContinue} className="text-xs text-slate-400 hover:text-slate-600 transition-colors py-1">
                        Überspringen →
                    </button>
                )}
            </div>
        </motion.div>
    );
}
