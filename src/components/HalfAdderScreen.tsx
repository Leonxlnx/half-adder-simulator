'use client';

import { motion } from 'framer-motion';
import Gate from './Gate';
import Bit from './Bit';

interface HalfAdderScreenProps {
    onContinue: () => void;
}

export default function HalfAdderScreen({ onContinue }: HalfAdderScreenProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="w-full max-w-lg mx-auto">

            {/* Tip Box */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 sm:mb-6">
                <p className="text-amber-700 text-xs sm:text-sm text-center">
                    💡 So sieht der komplette Halbaddierer aus — XOR + AND = eine Schaltung, die addieren kann!
                </p>
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 text-center mb-1 px-2">
                Der Halbaddierer
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="text-slate-500 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2">
                XOR für die Summe, AND für den Übertrag.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 soft-shadow-lg mb-4 sm:mb-6">

                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-medium">A</span>
                        <Bit value={1} size="sm" variant="input" />
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-medium">B</span>
                        <Bit value={1} size="sm" variant="input" />
                    </div>
                </div>

                <div className="flex justify-center gap-6 sm:gap-8 mb-4 sm:mb-6">
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] sm:text-xs text-indigo-500 font-medium mb-1">XOR → Summe</p>
                        <Gate type="xor" size={56} active />
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <Bit value={0} size="sm" variant="output" />
                        </motion.div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] sm:text-xs text-emerald-500 font-medium mb-1">AND → Carry</p>
                        <Gate type="and" size={56} active />
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                            <Bit value={1} size="sm" variant="output" />
                        </motion.div>
                    </div>
                </div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-center text-xs sm:text-sm text-slate-500">
                    1 + 1 = <span className="font-mono font-bold text-slate-800">10</span> (binär) — Summe 0, Übertrag 1
                </motion.p>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-medium soft-shadow hover:bg-slate-800 transition-colors">
                    Weiter
                </motion.button>
            </div>
        </motion.div>
    );
}
