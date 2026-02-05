'use client';

import { motion } from 'framer-motion';

interface GateProps {
    type: 'and' | 'xor' | 'or';
    size?: number;
    active?: boolean;
    className?: string;
}

export default function Gate({ type, size = 80, active = false, className = '' }: GateProps) {
    const colors = {
        and: active ? '#10B981' : '#9CA3AF',
        xor: active ? '#6366F1' : '#9CA3AF',
        or: active ? '#F59E0B' : '#9CA3AF'
    };

    const renderGate = () => {
        switch (type) {
            case 'and':
                return (
                    <svg viewBox="0 0 100 70" width={size} height={size * 0.7}>
                        <motion.path
                            d="M10,10 L45,10 Q85,10 85,35 Q85,60 45,60 L10,60 Z"
                            fill={colors.and}
                            initial={{ fill: '#9CA3AF' }}
                            animate={{ fill: colors.and }}
                            transition={{ duration: 0.3 }}
                        />
                        <line x1="0" y1="22" x2="10" y2="22" stroke="#64748B" strokeWidth="3" />
                        <line x1="0" y1="48" x2="10" y2="48" stroke="#64748B" strokeWidth="3" />
                        <line x1="85" y1="35" x2="100" y2="35" stroke="#64748B" strokeWidth="3" />
                    </svg>
                );
            case 'xor':
                return (
                    <svg viewBox="0 0 100 70" width={size} height={size * 0.7}>
                        <motion.path
                            d="M20,10 Q35,35 20,60 M25,10 L50,10 Q90,10 90,35 Q90,60 50,60 L25,60 Q40,35 25,10"
                            fill={colors.xor}
                            initial={{ fill: '#9CA3AF' }}
                            animate={{ fill: colors.xor }}
                            transition={{ duration: 0.3 }}
                        />
                        <line x1="0" y1="22" x2="24" y2="22" stroke="#64748B" strokeWidth="3" />
                        <line x1="0" y1="48" x2="24" y2="48" stroke="#64748B" strokeWidth="3" />
                        <line x1="90" y1="35" x2="100" y2="35" stroke="#64748B" strokeWidth="3" />
                    </svg>
                );
            case 'or':
                return (
                    <svg viewBox="0 0 100 70" width={size} height={size * 0.7}>
                        <motion.path
                            d="M10,10 Q25,35 10,60 L45,60 Q90,60 90,35 Q90,10 45,10 Z"
                            fill={colors.or}
                            initial={{ fill: '#9CA3AF' }}
                            animate={{ fill: colors.or }}
                            transition={{ duration: 0.3 }}
                        />
                        <line x1="0" y1="22" x2="18" y2="22" stroke="#64748B" strokeWidth="3" />
                        <line x1="0" y1="48" x2="18" y2="48" stroke="#64748B" strokeWidth="3" />
                        <line x1="90" y1="35" x2="100" y2="35" stroke="#64748B" strokeWidth="3" />
                    </svg>
                );
        }
    };

    return (
        <motion.div
            className={`inline-flex ${className}`}
            whileHover={{ scale: 1.02 }}
        >
            {renderGate()}
        </motion.div>
    );
}
