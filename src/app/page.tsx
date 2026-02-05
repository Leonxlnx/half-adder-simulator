'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import BinaryTaskScreen from '@/components/BinaryTaskScreen';
import XorGateScreen from '@/components/XorGateScreen';
import AndGateScreen from '@/components/AndGateScreen';
import HalfAdderScreen from '@/components/HalfAdderScreen';
import SkillCheckScreen from '@/components/SkillCheckScreen';
import ProgressBar from '@/components/ProgressBar';

const TOTAL_STEPS = 6;

export default function Home() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 0 && <IntroScreen key="intro" onContinue={nextStep} />}
          {step === 1 && <BinaryTaskScreen key="binary" onContinue={nextStep} onRestart={restart} />}
          {step === 2 && <XorGateScreen key="xor" onContinue={nextStep} />}
          {step === 3 && <AndGateScreen key="and" onContinue={nextStep} />}
          {step === 4 && <HalfAdderScreen key="halfadder" onContinue={nextStep} />}
          {step === 5 && <SkillCheckScreen key="skillcheck" onRestart={restart} />}
        </AnimatePresence>
      </div>
    </main>
  );
}
