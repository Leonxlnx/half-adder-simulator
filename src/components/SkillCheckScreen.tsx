'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Bit from './Bit';

interface SkillCheckScreenProps {
    onContinue: () => void;
}

export default function SkillCheckScreen({ onContinue }: SkillCheckScreenProps) {
    const [inputA, setInputA] = useState<0 | 1>(0);
    const [inputB, setInputB] = useState<0 | 1>(0);

    const sum = (inputA ^ inputB) as 0 | 1;
    const carry = (inputA & inputB) as 0 | 1;

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
                Wissenscheck
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-8 px-2">
                Schalte die Eingänge und beobachte den Signalfluss.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 soft-shadow-lg mb-6 sm:mb-8">
                <svg viewBox="0 0 400 200" className="w-full h-auto">
                    <foreignObject x="5" y="35" width="50" height="50">
                        <div className="flex items-center justify-center h-full">
                            <Bit value={inputA} interactive onClick={() => setInputA(inputA === 0 ? 1 : 0)} variant="input" size="sm" />
                        </div>
                    </foreignObject>
                    <text x="20" y="30" className="fill-slate-400 text-xs font-medium">A</text>

                    <foreignObject x="5" y="130" width="50" height="50">
                        <div className="flex items-center justify-center h-full">
                            <Bit value={inputB} interactive onClick={() => setInputB(inputB === 0 ? 1 : 0)} variant="input" size="sm" />
                        </div>
                    </foreignObject>
                    <text x="20" y="125" className="fill-slate-400 text-xs font-medium">B</text>

                    <motion.path d="M 55 60 L 90 60 L 90 45 L 140 45" stroke={inputA ? '#3B82F6' : '#CBD5E1'} strokeWidth="3" fill="none" strokeLinecap="round" animate={{ stroke: inputA ? '#3B82F6' : '#CBD5E1' }} transition={{ duration: 0.2 }} />
                    <motion.path d="M 55 60 L 90 60 L 90 125 L 140 125" stroke={inputA ? '#3B82F6' : '#CBD5E1'} strokeWidth="3" fill="none" strokeLinecap="round" animate={{ stroke: inputA ? '#3B82F6' : '#CBD5E1' }} transition={{ duration: 0.2 }} />
                    <motion.path d="M 55 155 L 110 155 L 110 65 L 140 65" stroke={inputB ? '#3B82F6' : '#CBD5E1'} strokeWidth="3" fill="none" strokeLinecap="round" animate={{ stroke: inputB ? '#3B82F6' : '#CBD5E1' }} transition={{ duration: 0.2 }} />
                    <motion.path d="M 55 155 L 110 155 L 110 145 L 140 145" stroke={inputB ? '#3B82F6' : '#CBD5E1'} strokeWidth="3" fill="none" strokeLinecap="round" animate={{ stroke: inputB ? '#3B82F6' : '#CBD5E1' }} transition={{ duration: 0.2 }} />

                    <motion.path d="M 145 30 Q 160 55 145 80 M 150 30 L 175 30 Q 215 30 215 55 Q 215 80 175 80 L 150 80 Q 165 55 150 30"
                        fill={sum ? '#6366F1' : '#9CA3AF'} stroke={sum ? '#4F46E5' : '#6B7280'} strokeWidth="2"
                        animate={{ fill: sum ? '#6366F1' : '#9CA3AF' }} transition={{ duration: 0.2 }} />
                    <motion.path d="M 145 110 L 175 110 Q 215 110 215 135 Q 215 160 175 160 L 145 160 Z"
                        fill={carry ? '#10B981' : '#9CA3AF'} stroke={carry ? '#059669' : '#6B7280'} strokeWidth="2"
                        animate={{ fill: carry ? '#10B981' : '#9CA3AF' }} transition={{ duration: 0.2 }} />

                    <motion.path d="M 215 55 L 290 55" stroke={sum ? '#6366F1' : '#CBD5E1'} strokeWidth="3" fill="none" strokeLinecap="round"
                        animate={{ stroke: sum ? '#6366F1' : '#CBD5E1' }} transition={{ duration: 0.2 }} />
                    <motion.path d="M 215 135 L 290 135" stroke={carry ? '#10B981' : '#CBD5E1'} strokeWidth="3" fill="none" strokeLinecap="round"
                        animate={{ stroke: carry ? '#10B981' : '#CBD5E1' }} transition={{ duration: 0.2 }} />

                    <foreignObject x="290" y="35" width="50" height="50">
                        <div className="flex items-center justify-center h-full">
                            <Bit value={sum} variant="output" size="sm" />
                        </div>
                    </foreignObject>
                    <text x="298" y="30" className="fill-indigo-500 text-xs font-medium">Summe</text>

                    <foreignObject x="290" y="115" width="50" height="50">
                        <div className="flex items-center justify-center h-full">
                            <Bit value={carry} variant="output" size="sm" />
                        </div>
                    </foreignObject>
                    <text x="293" y="110" className="fill-emerald-500 text-xs font-medium">Übertrag</text>
                </svg>

                <div className="text-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100">
                    <p className="text-slate-500 text-xs sm:text-sm mb-1 sm:mb-2">Binäre Addition:</p>
                    <p className="font-mono text-lg sm:text-xl text-slate-800">
                        {inputA} + {inputB} = <span className="text-indigo-600">{carry}{sum}</span>
                    </p>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex justify-center">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3 sm:py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow">
                    Weiter
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
