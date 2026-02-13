'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DeutschJozsaSimProps {
    onContinue: () => void;
}

type FuncType = 'constant' | 'balanced';

export default function DeutschJozsaSim({ onContinue }: DeutschJozsaSimProps) {
    const [funcType, setFuncType] = useState<FuncType>('constant');
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [classicalQueries, setClassicalQueries] = useState(0);
    const [classicalResult, setClassicalResult] = useState<string | null>(null);
    const [classicalDone, setClassicalDone] = useState(false);

    const quantumRun = () => {
        setRunning(true);
        setResult(null);
        setClassicalQueries(0);
        setClassicalResult(null);
        setClassicalDone(false);

        setTimeout(() => {
            setResult(funcType === 'constant' ? 'Konstant' : 'Balanciert');
            setRunning(false);
            confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 }, colors: ['#6366F1', '#EC4899', '#3B82F6'] });
        }, 600);
    };

    const classicalStep = () => {
        if (classicalDone) return;
        const next = classicalQueries + 1;
        setClassicalQueries(next);
        if (next >= 3) {
            setClassicalDone(true);
            setClassicalResult(funcType === 'constant' ? 'Konstant' : 'Balanciert');
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="w-full max-w-lg mx-auto">

            {/* Tip Box */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="bg-pink-50 border border-pink-100 rounded-xl p-3 mb-4 sm:mb-6">
                <p className="text-pink-700 text-xs sm:text-sm text-center">
                    💡 <strong>Tipp:</strong> Wähle eine Funktion, vergleiche klassisch (mehrere Abfragen) mit Quantum (eine Abfrage!).
                </p>
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1">
                Deutsch-Jozsa Algorithmus
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2">
                Klassisch: viele Abfragen. Quantum: eine einzige.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">

                {/* Function Selection */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <button onClick={() => { setFuncType('constant'); setResult(null); setClassicalQueries(0); setClassicalResult(null); setClassicalDone(false); }}
                        className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
                            ${funcType === 'constant' ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300' : 'bg-slate-100 text-slate-500'}`}>
                        f(x) = konstant
                    </button>
                    <button onClick={() => { setFuncType('balanced'); setResult(null); setClassicalQueries(0); setClassicalResult(null); setClassicalDone(false); }}
                        className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
                            ${funcType === 'balanced' ? 'bg-pink-100 text-pink-700 ring-1 ring-pink-300' : 'bg-slate-100 text-slate-500'}`}>
                        f(x) = balanciert
                    </button>
                </div>

                {/* Two Columns */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Classical */}
                    <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-slate-500"><rect x="3" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /><line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="10" y1="13" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Klassisch</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 mb-2">Abfragen: {classicalQueries}/3</p>
                        <div className="flex gap-1 mb-2">
                            {[0, 1, 2].map(i => (
                                <div key={i} className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md transition-colors ${i < classicalQueries ? 'bg-slate-700' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                        <button onClick={classicalStep} disabled={classicalDone}
                            className={`w-full py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all
                                ${classicalDone ? 'bg-slate-200 text-slate-400' : 'bg-slate-700 text-white hover:bg-slate-800'}`}>
                            {classicalDone ? '✅ Fertig' : 'Nächste Abfrage'}
                        </button>
                        <AnimatePresence>
                            {classicalResult && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-[10px] sm:text-xs text-slate-600 mt-1.5 text-center font-medium">
                                    → {classicalResult}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Quantum */}
                    <div className="bg-indigo-50/50 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-indigo-500"><circle cx="10" cy="10" r="2" fill="currentColor" /><ellipse cx="10" cy="10" rx="8" ry="3" stroke="currentColor" strokeWidth="1.2" transform="rotate(-30 10 10)" /><ellipse cx="10" cy="10" rx="8" ry="3" stroke="currentColor" strokeWidth="1.2" transform="rotate(30 10 10)" /></svg>
                            <span className="text-xs sm:text-sm font-semibold text-indigo-700">Quantum</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-indigo-400 mb-2">Abfragen: {result ? '1' : '0'}/1</p>
                        <div className="flex gap-1 mb-2">
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md transition-colors ${result ? 'bg-indigo-600' : 'bg-indigo-200'}`} />
                        </div>
                        <button onClick={quantumRun} disabled={running}
                            className={`w-full py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all
                                ${result ? 'bg-indigo-200 text-indigo-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                            {running ? '⏳ ...' : result ? '✅ Fertig' : '⚡ Ausführen'}
                        </button>
                        <AnimatePresence>
                            {result && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-[10px] sm:text-xs text-indigo-600 mt-1.5 text-center font-medium">
                                    → {result}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
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
