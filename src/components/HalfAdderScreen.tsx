'use client';

import { motion } from 'framer-motion';
import Gate from './Gate';

interface HalfAdderScreenProps {
    onContinue: () => void;
}

export default function HalfAdderScreen({ onContinue }: HalfAdderScreenProps) {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }} className="w-full max-w-lg mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2 px-2">
                The Half Adder
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 text-sm sm:text-base mb-4 sm:mb-8 px-2">
                Two gates, one circuit — it adds single-digit binary numbers.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 soft-shadow-lg mb-4 sm:mb-6 inline-block">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-6 sm:gap-8">
                        <div className="text-right">
                            <p className="text-xs text-slate-400 mb-0.5">Ones place</p>
                            <p className="text-xs sm:text-sm font-semibold text-indigo-600">XOR</p>
                        </div>
                        <Gate type="xor" size={56} active />
                    </div>
                    <div className="flex items-center gap-6 sm:gap-8">
                        <div className="text-right">
                            <p className="text-xs text-slate-400 mb-0.5">Carry</p>
                            <p className="text-xs sm:text-sm font-semibold text-emerald-600">AND</p>
                        </div>
                        <Gate type="and" size={56} active />
                    </div>
                </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 max-w-sm mx-auto">
                XOR handles the sum bit, AND handles the carry. Together they form the fundamental building block of every computer processor.
            </motion.p>

            <div className="flex justify-center">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue}
                    className="w-full sm:w-auto px-10 py-3 sm:py-3.5 bg-slate-900 text-white rounded-full text-base sm:text-lg font-medium soft-shadow">
                    Continue
                </motion.button>
            </div>
        </motion.div>
    );
}
