'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface BitProps {
    value: 0 | 1;
    interactive?: boolean;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'input' | 'output';
}

export default function Bit({
    value,
    interactive = false,
    onClick,
    size = 'md',
    variant = 'default'
}: BitProps) {
    const sizeClasses = {
        sm: 'w-8 h-8 text-base sm:w-10 sm:h-10 sm:text-lg',
        md: 'w-11 h-11 text-lg sm:w-14 sm:h-14 sm:text-xl',
        lg: 'w-14 h-14 text-xl sm:w-16 sm:h-16 sm:text-2xl'
    };

    const getBackground = () => {
        if (variant === 'input') {
            return value === 1 ? 'bg-blue-600' : 'bg-slate-800';
        }
        if (variant === 'output') {
            return value === 1 ? 'bg-blue-600' : 'bg-slate-300';
        }
        return value === 1 ? 'bg-blue-600' : 'bg-slate-200';
    };

    const getTextColor = () => {
        if (variant === 'input') return 'text-white';
        if (variant === 'output') return value === 1 ? 'text-white' : 'text-slate-600';
        return value === 1 ? 'text-white' : 'text-slate-600';
    };

    return (
        <motion.button
            whileHover={interactive ? { scale: 1.05 } : {}}
            whileTap={interactive ? { scale: 0.95 } : {}}
            onClick={interactive ? onClick : undefined}
            className={`
        ${sizeClasses[size]}
        ${getBackground()}
        ${getTextColor()}
        rounded-xl font-mono font-bold
        flex items-center justify-center
        transition-colors duration-200
        ${interactive ? 'cursor-pointer' : 'cursor-default'}
        soft-shadow
      `}
            disabled={!interactive}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    );
}
