'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DeutschJozsaSimProps {
    onContinue: () => void;
}

type FunctionType = 'constant-0' | 'constant-1' | 'balanced-id' | 'balanced-not';

const functions: Record<FunctionType, { label: string; outputs: number[]; type: 'konstant' | 'balanciert' }> = {
    'constant-0': { label: 'f₁', outputs: [0, 0, 0, 0], type: 'konstant' },
    'constant-1': { label: 'f₂', outputs: [1, 1, 1, 1], type: 'konstant' },
    'balanced-id': { label: 'f₃', outputs: [0, 1, 0, 1], type: 'balanciert' },
    'balanced-not': { label: 'f₄', outputs: [1, 0, 1, 0], type: 'balanciert' },
};

export default function DeutschJozsaSim({ onContinue }: DeutschJozsaSimProps) {
    const [selectedFn, setSelectedFn] = useState<FunctionType>('constant-0');
    const [mode, setMode] = useState<'classical' | 'quantum'>('classical');
    const [classicalQueries, setClassicalQueries] = useState<number[]>([]);
    const [quantumDone, setQuantumDone] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const fn = functions[selectedFn];
    const inputs = ['00', '01', '10', '11'];

    const classicalQuery = (index: number) => {
        if (classicalQueries.includes(index)) return;
        const newQueries = [...classicalQueries, index];
        setClassicalQueries(newQueries);
        // Check if can determine: if we see two different outputs, it's balanced
        const outputs = newQueries.map(i => fn.outputs[i]);
        const unique = new Set(outputs);
        if (unique.size > 1 || newQueries.length >= 3) {
            setTimeout(() => setRevealed(true), 400);
        }
    };

    const quantumQuery = () => {
        setQuantumDone(true);
        setTimeout(() => setRevealed(true), 600);
    };

    const reset = () => {
        setClassicalQueries([]);
        setQuantumDone(false);
        setRevealed(false);
    };

    const switchMode = (m: 'classical' | 'quantum') => {
        setMode(m);
        reset();
    };

    const changeFn = (f: FunctionType) => {
        setSelectedFn(f);
        reset();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} className="w-full max-w-lg mx-auto">

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 sm:mb-2 px-2">
                Deutsch-Jozsa Simulator
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-xs sm:text-sm mb-4 sm:mb-6 px-2">
                Finde heraus: Ist f(x) konstant oder balanciert?
            </motion.p>

            {/* Function Selector */}
            <div className="flex gap-1.5 justify-center mb-3 sm:mb-4 flex-wrap">
                {(Object.keys(functions) as FunctionType[]).map((f) => (
                    <motion.button key={f} whileTap={{ scale: 0.95 }} onClick={() => changeFn(f)}
                        className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-mono font-medium transition-all
                            ${selectedFn === f ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        {functions[f].label}
                    </motion.button>
                ))}
            </div>

            {/* Mode Switch */}
            <div className="flex gap-1.5 sm:gap-2 justify-center mb-4 sm:mb-6">
                <button onClick={() => switchMode('classical')}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
                        ${mode === 'classical' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                    💻 Klassisch
                </button>
                <button onClick={() => switchMode('quantum')}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
                        ${mode === 'quantum' ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                    ⚛️ Quanten
                </button>
            </div>

            <motion.div layout className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">
                {mode === 'classical' ? (
                    <div>
                        <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 text-center">
                            Klicke auf Eingaben um f(x) abzufragen. Du brauchst genug Abfragen um sicher zu sein.
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                            {inputs.map((inp, i) => (
                                <motion.button key={i} whileTap={{ scale: 0.95 }}
                                    onClick={() => classicalQuery(i)}
                                    disabled={revealed || classicalQueries.includes(i)}
                                    className={`p-3 sm:p-4 rounded-xl text-center transition-all
                                        ${classicalQueries.includes(i) ? 'bg-amber-50 border-2 border-amber-300' : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'}
                                        ${revealed ? 'opacity-80' : ''}`}>
                                    <p className="font-mono text-xs sm:text-sm text-slate-400">x = {inp}</p>
                                    {classicalQueries.includes(i) ? (
                                        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            className="font-mono text-lg sm:text-xl font-bold text-amber-600 mt-1">
                                            {fn.outputs[i]}
                                        </motion.p>
                                    ) : (
                                        <p className="text-lg sm:text-xl font-bold text-slate-300 mt-1">?</p>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 text-center">
                            Abfragen: {classicalQueries.length} / 4
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">
                            Der Quantencomputer braucht nur EINE einzige Abfrage!
                        </p>

                        {/* Quantum Circuit */}
                        <div className="flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                                <span className="font-mono text-slate-400 w-6 sm:w-8">|0⟩</span>
                                <div className={`h-0.5 w-6 sm:w-8 ${quantumDone ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-bold flex items-center justify-center ${quantumDone ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-400'}`}>H</div>
                                <div className={`h-0.5 w-6 sm:w-8 ${quantumDone ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-bold flex items-center justify-center ${quantumDone ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-400'}`}>Uf</div>
                                <div className={`h-0.5 w-6 sm:w-8 ${quantumDone ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-bold flex items-center justify-center ${quantumDone ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-400'}`}>H</div>
                                <div className={`h-0.5 w-4 sm:w-6 ${quantumDone ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                                <span className="text-[10px] sm:text-xs">📊</span>
                            </div>
                        </div>

                        {!quantumDone ? (
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={quantumQuery}
                                className="px-5 sm:px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-medium">
                                ⚡ Eine Abfrage starten
                            </motion.button>
                        ) : (
                            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="text-xs sm:text-sm text-indigo-600 font-medium">
                                ✓ Ergebnis mit nur 1 Abfrage ermittelt!
                            </motion.p>
                        )}
                    </div>
                )}

                {/* Result */}
                {revealed && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs sm:text-sm text-slate-500 mb-1">Ergebnis:</p>
                        <p className={`text-base sm:text-lg font-bold ${fn.type === 'konstant' ? 'text-amber-600' : 'text-indigo-600'}`}>
                            {fn.label} ist {fn.type === 'konstant' ? '✅ Konstant' : '🔀 Balanciert'}
                        </p>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={reset}
                            className="mt-2 text-xs text-slate-400 hover:text-slate-600">
                            Nochmal versuchen
                        </motion.button>
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
