'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuantumGateSimProps {
    onContinue: () => void;
}

type GateType = 'pauli-x' | 'hadamard' | 'cnot';
type QubitState = '|0⟩' | '|1⟩' | '|+⟩' | '|−⟩';

const gateInfo: Record<GateType, { name: string; symbol: string; color: string; matrix: string[][]; description: string }> = {
    'pauli-x': {
        name: 'Pauli-X',
        symbol: 'X',
        color: '#EF4444',
        matrix: [['0', '1'], ['1', '0']],
        description: 'Dreht den Zustand um 180° — das Quanten-NOT-Gatter. Wandelt |0⟩ in |1⟩ und umgekehrt.',
    },
    'hadamard': {
        name: 'Hadamard',
        symbol: 'H',
        color: '#6366F1',
        matrix: [['1/√2', '1/√2'], ['1/√2', '-1/√2']],
        description: 'Bringt ein Qubit in Superposition. Erzeugt gleiche Wahrscheinlichkeit für |0⟩ und |1⟩.',
    },
    'cnot': {
        name: 'CNOT',
        symbol: 'CX',
        color: '#10B981',
        matrix: [['1', '0', '0', '0'], ['0', '1', '0', '0'], ['0', '0', '0', '1'], ['0', '0', '1', '0']],
        description: 'Kontroll-Qubit bestimmt: Wenn es 1 ist, wird das Ziel invertiert. Erzeugt Verschränkung.',
    },
};

function applyGate(gate: GateType, input: QubitState): QubitState {
    if (gate === 'pauli-x') return input === '|0⟩' ? '|1⟩' : input === '|1⟩' ? '|0⟩' : input === '|+⟩' ? '|+⟩' : '|−⟩';
    if (gate === 'hadamard') return input === '|0⟩' ? '|+⟩' : input === '|1⟩' ? '|−⟩' : input === '|+⟩' ? '|0⟩' : '|1⟩';
    return input;
}

export default function QuantumGateSim({ onContinue }: QuantumGateSimProps) {
    const [selectedGate, setSelectedGate] = useState<GateType>('pauli-x');
    const [inputState, setInputState] = useState<QubitState>('|0⟩');
    const [applied, setApplied] = useState(false);

    const output = applyGate(selectedGate, inputState);
    const info = gateInfo[selectedGate];

    const handleApply = () => setApplied(true);
    const handleReset = () => { setApplied(false); };
    const handleInputToggle = () => {
        setApplied(false);
        setInputState(prev => prev === '|0⟩' ? '|1⟩' : prev === '|1⟩' ? '|+⟩' : prev === '|+⟩' ? '|−⟩' : '|0⟩');
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} className="w-full max-w-lg mx-auto">

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 sm:mb-2 px-2">
                Quantengatter Simulator
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-center text-xs sm:text-sm mb-4 sm:mb-6 px-2">
                Wähle ein Gatter und wende es auf ein Qubit an.
            </motion.p>

            {/* Gate Selector */}
            <div className="flex gap-1.5 sm:gap-2 justify-center mb-4 sm:mb-6">
                {(Object.keys(gateInfo) as GateType[]).map((gate) => (
                    <motion.button key={gate} whileTap={{ scale: 0.95 }} onClick={() => { setSelectedGate(gate); setApplied(false); }}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all
                            ${selectedGate === gate ? 'text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        style={selectedGate === gate ? { backgroundColor: info.color } : {}}>
                        {gateInfo[gate].name}
                    </motion.button>
                ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">

                {/* Circuit Visualization */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleInputToggle}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-800 text-white font-mono text-sm sm:text-base font-bold flex items-center justify-center soft-shadow">
                        {inputState}
                    </motion.button>

                    <div className="w-8 sm:w-12 h-0.5 bg-slate-300" />

                    <motion.div animate={{ scale: applied ? [1, 1.1, 1] : 1 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl soft-shadow"
                        style={{ backgroundColor: info.color }}>
                        {info.symbol}
                    </motion.div>

                    <div className="w-8 sm:w-12 h-0.5 bg-slate-300" />

                    <AnimatePresence mode="wait">
                        <motion.div key={applied ? output : '?'} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-mono text-sm sm:text-base font-bold flex items-center justify-center soft-shadow
                                ${applied ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                            {applied ? output : '?'}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Gate Matrix */}
                {selectedGate !== 'cnot' && (
                    <div className="flex justify-center mb-4">
                        <div className="inline-flex flex-col items-center">
                            <p className="text-[10px] sm:text-xs text-slate-400 mb-1">Matrix:</p>
                            <div className="border-l-2 border-r-2 border-slate-300 px-2 py-1">
                                {info.matrix.map((row, i) => (
                                    <div key={i} className="flex gap-3 sm:gap-4">
                                        {row.map((val, j) => (
                                            <span key={j} className="font-mono text-xs sm:text-sm text-slate-700 w-8 text-center">{val}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-xs sm:text-sm text-slate-500 text-center">{info.description}</p>

                <div className="flex gap-2 justify-center mt-4">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleApply} disabled={applied}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 text-white rounded-xl text-xs sm:text-sm font-medium disabled:opacity-50"
                        style={{ backgroundColor: info.color }}>
                        Anwenden
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleReset}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-medium">
                        Zurücksetzen
                    </motion.button>
                </div>
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
