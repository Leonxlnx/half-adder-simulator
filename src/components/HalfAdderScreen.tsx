'use client';

import { motion } from 'framer-motion';
import Gate from './Gate';

interface HalfAdderScreenProps {
    onContinue: () => void;
}

export default function HalfAdderScreen({ onContinue }: HalfAdderScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg"
        >
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold text-slate-900 text-center mb-2"
            >
                You built a Half Adder
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-center mb-8"
            >
                Two gates that add two binary digits together.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-3xl p-8 soft-shadow-lg mb-8"
            >
                {/* Circuit Diagram */}
                <svg viewBox="0 0 400 200" className="w-full h-auto">
                    {/* Input Labels */}
                    <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        x="20" y="60"
                        className="fill-blue-600 font-semibold text-lg"
                    >
                        A
                    </motion.text>
                    <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        x="20" y="160"
                        className="fill-blue-600 font-semibold text-lg"
                    >
                        B
                    </motion.text>

                    {/* Wires from inputs */}
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        d="M 40 55 L 80 55 L 80 45 L 140 45"
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        d="M 40 55 L 80 55 L 80 125 L 140 125"
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        d="M 40 155 L 100 155 L 100 65 L 140 65"
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        d="M 40 155 L 100 155 L 100 145 L 140 145"
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* XOR Gate */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        <path
                            d="M 145 30 Q 160 55 145 80 M 150 30 L 175 30 Q 215 30 215 55 Q 215 80 175 80 L 150 80 Q 165 55 150 30"
                            fill="#6366F1"
                            stroke="#4F46E5"
                            strokeWidth="2"
                        />
                        <text x="170" y="90" className="fill-slate-500 text-xs">XOR</text>
                    </motion.g>

                    {/* AND Gate */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.55, duration: 0.3 }}
                    >
                        <path
                            d="M 145 110 L 175 110 Q 215 110 215 135 Q 215 160 175 160 L 145 160 Z"
                            fill="#10B981"
                            stroke="#059669"
                            strokeWidth="2"
                        />
                        <text x="170" y="170" className="fill-slate-500 text-xs">AND</text>
                    </motion.g>

                    {/* Output Wires */}
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        d="M 215 55 L 320 55"
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.65, duration: 0.4 }}
                        d="M 215 135 L 320 135"
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Output Labels */}
                    <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        x="330" y="60"
                        className="fill-indigo-600 font-semibold text-sm"
                    >
                        Sum
                    </motion.text>
                    <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        x="330" y="140"
                        className="fill-emerald-600 font-semibold text-sm"
                    >
                        Carry
                    </motion.text>
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinue}
                    className="px-10 py-3.5 bg-slate-900 text-white rounded-full text-lg font-medium soft-shadow"
                >
                    Try it out
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
