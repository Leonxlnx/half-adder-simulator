'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Bit from './Bit';
import confetti from 'canvas-confetti';

interface BinaryTaskScreenProps {
    onContinue: () => void;
    onRestart: () => void;
}

interface Row {
    a: 0 | 1;
    b: 0 | 1;
    carry: 0 | 1 | null;
    sum: 0 | 1 | null;
    correctCarry: 0 | 1;
    correctSum: 0 | 1;
}

export default function BinaryTaskScreen({ onContinue, onRestart }: BinaryTaskScreenProps) {
    const [rows, setRows] = useState<Row[]>([
        { a: 0, b: 0, carry: null, sum: null, correctCarry: 0, correctSum: 0 },
        { a: 0, b: 1, carry: null, sum: null, correctCarry: 0, correctSum: 1 },
        { a: 1, b: 0, carry: null, sum: null, correctCarry: 0, correctSum: 1 },
        { a: 1, b: 1, carry: null, sum: null, correctCarry: 1, correctSum: 0 },
    ]);
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
    const [showContinue, setShowContinue] = useState(false);

    const allFilled = rows.every(r => r.carry !== null && r.sum !== null);
    const allCorrect = rows.every(r => r.carry === r.correctCarry && r.sum === r.correctSum);

    const toggleBit = (rowIndex: number, field: 'carry' | 'sum') => {
        if (feedback === 'correct') return;

        setRows(prev => prev.map((row, i) => {
            if (i !== rowIndex) return row;
            const current = row[field];
            const next = current === null ? 0 : current === 0 ? 1 : 0;
            return { ...row, [field]: next as 0 | 1 };
        }));
        setFeedback('none');
    };

    const check = () => {
        if (allCorrect) {
            setFeedback('correct');
            setShowContinue(true);
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#10B981', '#3B82F6', '#6366F1']
            });
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg"
        >
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-slate-500 text-lg mb-8"
            >
                Complete the binary sums.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`
          bg-white rounded-3xl p-8 soft-shadow-lg
          ${feedback === 'correct' ? 'ring-2 ring-emerald-400 ring-opacity-50' : ''}
        `}
            >
                <div className="space-y-4">
                    {rows.map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex items-center justify-center gap-3"
                        >
                            <span className="w-8 text-center font-mono text-xl text-slate-800">{row.a}</span>
                            <span className="text-slate-400 text-xl">+</span>
                            <span className="w-8 text-center font-mono text-xl text-slate-800">{row.b}</span>
                            <span className="text-slate-400 text-xl">=</span>

                            <div className="flex gap-2">
                                <Bit
                                    value={row.carry ?? 0}
                                    interactive={feedback !== 'correct'}
                                    onClick={() => toggleBit(i, 'carry')}
                                    size="sm"
                                    variant={row.carry === null ? 'default' : 'input'}
                                />
                                <Bit
                                    value={row.sum ?? 0}
                                    interactive={feedback !== 'correct'}
                                    onClick={() => toggleBit(i, 'sum')}
                                    size="sm"
                                    variant={row.sum === null ? 'default' : 'input'}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {feedback !== 'none' && (
                    <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`
              text-center mt-6 text-sm
              ${feedback === 'correct' ? 'text-emerald-600' : 'text-slate-500'}
            `}
                    >
                        {feedback === 'correct'
                            ? "Looks good. You've got it."
                            : "Not quite. Try adjusting one of the sums."}
                    </motion.p>
                )}
            </motion.div>

            <div className="mt-8 flex flex-col items-center gap-4">
                {!showContinue ? (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={check}
                        disabled={!allFilled}
                        className={`
              px-10 py-3.5 rounded-full text-lg font-medium
              transition-all duration-200
              ${allFilled
                                ? 'bg-slate-900 text-white soft-shadow hover:bg-slate-800'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
                    >
                        Check
                    </motion.button>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onContinue}
                        className="px-10 py-3.5 bg-slate-900 text-white rounded-full text-lg font-medium soft-shadow hover:bg-slate-800"
                    >
                        Continue
                    </motion.button>
                )}

                <button
                    onClick={onRestart}
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                    Start over
                </button>
            </div>
        </motion.div>
    );
}
