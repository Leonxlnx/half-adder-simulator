'use client';

import { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LessonPage, { LessonSection } from '@/components/LessonPage';
import BinaryTaskScreen from '@/components/BinaryTaskScreen';
import XorGateScreen from '@/components/XorGateScreen';
import AndGateScreen from '@/components/AndGateScreen';
import HalfAdderScreen from '@/components/HalfAdderScreen';
import SkillCheckScreen from '@/components/SkillCheckScreen';
import SuperpositionSim from '@/components/SuperpositionSim';
import QuantumGateSim from '@/components/QuantumGateSim';
import DeutschJozsaSim from '@/components/DeutschJozsaSim';

// Custom SVG Icons
function IconBit({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" /><text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="monospace">01</text></svg>;
}
function IconGate({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M4 6h8c4.418 0 8 3.582 8 8H4V6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><line x1="2" y1="9" x2="4" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><line x1="2" y1="14" x2="4" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><line x1="20" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function IconQubit({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.5" /><circle cx="12" cy="4" r="2" fill="currentColor" /><line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" /></svg>;
}
function IconQuantumGate({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" /><text x="12" y="14.5" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="monospace">H</text><line x1="2" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><line x1="17" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function IconRocket({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2C12 2 8 6 8 14l4 4 4-4c0-8-4-12-4-12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8 14l-2 2 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 14l2 2-2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="10" r="2" fill="currentColor" /></svg>;
}
function IconBrain({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2a5 5 0 00-4.9 4 4 4 0 00-1.1 7.5A4.5 4.5 0 009 22h6a4.5 4.5 0 002.9-8.5A4 4 0 0016.9 6 5 5 0 0012 2z" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2v20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" /></svg>;
}
function IconGrad({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M2 10l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M6 12v5c0 2 2.686 3 6 3s6-1 6-3v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="22" y1="10" x2="22" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function IconCheck({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" /><path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconArrowLeft({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconChevronDown({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconPlay({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><polygon points="8,5 20,12 8,19" fill="currentColor" /></svg>;
}
function IconBook({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M4 4h6a2 2 0 012 2v14a1 1 0 00-1-1H4V4z" stroke="currentColor" strokeWidth="1.8" /><path d="M20 4h-6a2 2 0 00-2 2v14a1 1 0 011-1h7V4z" stroke="currentColor" strokeWidth="1.8" /></svg>;
}

// Lesson Section Icons (small)
const ic = "w-5 h-5";
function LiPlug({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><line x1="7" y1="2" x2="7" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="13" y1="2" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="4" y="8" width="12" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" /><line x1="10" y1="13" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiBulb({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M10 2a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9z" stroke="currentColor" strokeWidth="1.5" /><line x1="7" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiHash({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><line x1="4" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="4" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="8" y1="4" x2="6" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="14" y1="4" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiTarget({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="10" r="1" fill="currentColor" /></svg>; }
function LiZap({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>; }
function LiBlock({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>; }
function LiSplit({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><line x1="10" y1="2" x2="10" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 8L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 8L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiWrench({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M14.5 3a4 4 0 00-4.27 6.6L4 16l2 2 6.4-6.23A4 4 0 0014.5 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>; }
function LiBar({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><rect x="3" y="10" width="3" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" /><rect x="8.5" y="6" width="3" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" /><rect x="14" y="3" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.3" /></svg>; }
function LiGlobe({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><ellipse cx="10" cy="10" rx="3.5" ry="7" stroke="currentColor" strokeWidth="1" /><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1" /></svg>; }
function LiOrbit({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><circle cx="10" cy="10" r="2" fill="currentColor" /><ellipse cx="10" cy="10" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(-30 10 10)" /><ellipse cx="10" cy="10" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(30 10 10)" /></svg>; }
function LiWave({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M2 10c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiLink({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M8 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 10a3 3 0 010-4l2-2a3 3 0 014 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M14 10a3 3 0 010 4l-2 2a3 3 0 01-4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiGear({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2v2m0 12v2M2 10h2m12 0h2M4.22 4.22l1.42 1.42m8.72 8.72l1.42 1.42M15.78 4.22l-1.42 1.42M5.64 14.36l-1.42 1.42" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>; }
function LiRace({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M3 17L5 3h10l2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><line x1="5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" /><line x1="6" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.2" /></svg>; }
function LiMicroscope({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" /><line x1="10" y1="9" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="6" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="4" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiTrophy({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M6 4h8v5c0 2.2-1.8 4-4 4s-4-1.8-4-4V4z" stroke="currentColor" strokeWidth="1.5" /><path d="M6 6H4c0 2 1 3 2 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M14 6h2c0 2-1 3-2 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><line x1="10" y1="13" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function LiCrystal({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M10 2L3 8l7 10 7-10-7-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M3 8h14" stroke="currentColor" strokeWidth="1" opacity="0.5" /><path d="M6 8l4 10 4-10" stroke="currentColor" strokeWidth="1" opacity="0.5" /></svg>; }
function LiChart({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><polyline points="2,14 6,8 10,11 14,5 18,9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function LiPC({ className }: { className?: string }) { return <svg viewBox="0 0 20 20" fill="none" className={className}><rect x="3" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /><line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="10" y1="13" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }

// Types
interface LessonStep { type: 'lesson'; title: string; subtitle: string; sections: LessonSection[]; buttonLabel?: string; }
interface InteractiveStep { type: 'interactive'; key: string; label: string; }
type Step = LessonStep | InteractiveStep;
interface Chapter { id: string; title: string; description: string; icon: ReactNode; color: string; steps: Step[]; }

// Interactive step labels map
const INTERACTIVE_LABELS: Record<string, string> = {
  'binary-task': 'Binäre Addition üben',
  'xor-gate': 'XOR-Gatter finden',
  'and-gate': 'AND-Gatter finden',
  'half-adder': 'Halbaddierer-Schaltung',
  'skill-check': 'Wissens-Check',
  'superposition': 'Superposition simulieren',
  'quantum-gate': 'Quantengatter testen',
  'deutsch-jozsa': 'Deutsch-Jozsa Simulation',
};

// Chapter Data — ALL GERMAN
const CHAPTERS: Chapter[] = [
  {
    id: 'bits',
    title: 'Bits & Binär',
    description: 'Was sind Bits und wie rechnet man binär?',
    icon: <IconBit className="w-7 h-7" />,
    color: '#3B82F6',
    steps: [
      {
        type: 'lesson',
        title: 'Was ist ein Bit?',
        subtitle: 'Die kleinste Einheit der Information',
        sections: [
          { icon: <LiPlug className={ic} />, title: 'An oder Aus', content: 'Ein Bit ist entweder 0 oder 1 — aus oder an. Jeder Computer basiert auf diesen zwei Zuständen.' },
          { icon: <LiBulb className={ic} />, title: 'Warum nur 0 & 1?', content: 'Strom fließt (1) oder nicht (0). Kein Graubereich = keine Fehler. Maximal zuverlässig.' },
          { icon: <LiHash className={ic} />, title: 'Binäre Addition', content: '0+0=0, 0+1=1, 1+0=1 — aber 1+1=10! Die extra 1 wird zum Übertrag, genau wie im Dezimalsystem.' },
          { icon: <LiTarget className={ic} />, title: 'Jetzt du!', content: 'Gleich füllst du eine binäre Additionstabelle aus — einfach Bits antippen!' },
        ],
      },
      { type: 'interactive', key: 'binary-task', label: 'Binäre Addition üben' },
    ],
  },
  {
    id: 'gates',
    title: 'Logikgatter',
    description: 'Die Bausteine aller digitalen Schaltungen',
    icon: <IconGate className="w-7 h-7" />,
    color: '#10B981',
    steps: [
      {
        type: 'lesson',
        title: 'Was sind Logikgatter?',
        subtitle: 'Sie verarbeiten Bits nach festen Regeln',
        sections: [
          { icon: <LiZap className={ic} />, title: 'Logik pur', content: 'Logikgatter nehmen Eingaben und erzeugen eine Ausgabe nach einer festen Regel. Sie sind die Atome jeder digitalen Schaltung.' },
          { icon: <LiBlock className={ic} />, title: 'NOT-Gatter', content: 'Dreht das Signal um — 0 wird 1, 1 wird 0. Das einfachste Gatter überhaupt.' },
          { icon: <LiTarget className={ic} />, title: 'AND-Gatter', content: 'Gibt nur 1 aus, wenn BEIDE Eingaben 1 sind. Wie eine Tür mit zwei Schlössern.' },
          { icon: <LiSplit className={ic} />, title: 'XOR-Gatter', content: 'Gibt 1 aus, wenn die Eingaben verschieden sind. Wie ein Flurschalter mit zwei Schaltern.' },
        ],
      },
      { type: 'interactive', key: 'xor-gate', label: 'XOR-Gatter finden' },
      { type: 'interactive', key: 'and-gate', label: 'AND-Gatter finden' },
      {
        type: 'lesson',
        title: 'Der Halbaddierer',
        subtitle: 'Zwei Gatter, die zusammen addieren',
        sections: [
          { icon: <LiWrench className={ic} />, title: 'Kombination', content: 'XOR für die Summe + AND für den Übertrag = eine Schaltung, die zwei Binärziffern addiert!' },
          { icon: <LiBar className={ic} />, title: 'Zwei Ausgaben', content: 'Summe (XOR) und Übertrag (AND). Das ist die Grundlage jeder Berechnung, die dein Computer durchführt.' },
          { icon: <LiGlobe className={ic} />, title: 'Warum wichtig?', content: 'Milliarden dieser winzigen Schaltungen arbeiten in deinem Prozessor. Alles führt auf diese simplen Gatter zurück.' },
        ],
        buttonLabel: 'Schaltung ansehen',
      },
      { type: 'interactive', key: 'half-adder', label: 'Halbaddierer-Schaltung' },
      { type: 'interactive', key: 'skill-check', label: 'Wissens-Check' },
    ],
  },
  {
    id: 'qubits',
    title: 'Qubits',
    description: 'Von klassischen Bits zu Quantenbits',
    icon: <IconQubit className="w-7 h-7" />,
    color: '#6366F1',
    steps: [
      {
        type: 'lesson',
        title: 'Vom Bit zum Qubit',
        subtitle: 'Die Quantenwelt spielt nach anderen Regeln',
        sections: [
          { icon: <LiGlobe className={ic} />, title: 'Quantenwelt', content: 'Auf Quantenebene verhalten sich Teilchen völlig anders als im Alltag. Quantencomputer nutzen genau das aus.' },
          { icon: <LiOrbit className={ic} />, title: 'Superposition', content: 'Ein Qubit kann gleichzeitig 0 UND 1 sein. Erst beim Messen „entscheidet" es sich für einen Zustand.' },
          { icon: <LiGlobe className={ic} />, title: 'Bloch-Kugel', content: 'Der Zustand eines Qubits ist ein Punkt auf einer Kugel. Nordpol = |0⟩, Südpol = |1⟩, Äquator = Superposition.' },
          { icon: <LiChart className={ic} />, title: 'Exponentielles Wachstum', content: 'N Qubits = 2^N Zustände gleichzeitig. Das ist der Schlüssel zum Quantenvorteil.' },
        ],
      },
      { type: 'interactive', key: 'superposition', label: 'Superposition simulieren' },
    ],
  },
  {
    id: 'quantum-gates',
    title: 'Quantengatter',
    description: 'Pauli-X, Hadamard und CNOT erklärt',
    icon: <IconQuantumGate className="w-7 h-7" />,
    color: '#8B5CF6',
    steps: [
      {
        type: 'lesson',
        title: 'Was sind Quantengatter?',
        subtitle: 'Sie manipulieren Qubits mit Quantenmechanik',
        sections: [
          { icon: <LiSplit className={ic} />, title: 'Pauli-X', content: 'Das Quanten-NOT — dreht den Zustand um 180° auf der X-Achse. |0⟩ wird |1⟩ und umgekehrt.' },
          { icon: <LiWave className={ic} />, title: 'Hadamard (H)', content: 'DAS wichtigste Quantengatter. Es versetzt ein Qubit in Superposition: |0⟩ → (|0⟩+|1⟩)/√2.' },
          { icon: <LiLink className={ic} />, title: 'CNOT', content: 'Controlled-NOT: flippt das Ziel-Qubit, wenn das Kontroll-Qubit 1 ist. Das erzeugt Verschränkung.' },
          { icon: <LiGear className={ic} />, title: 'Zusammen', content: 'Diese drei Gatter können jeden Quantenalgorithmus bauen. H erzeugt Superposition, CNOT erzeugt Verschränkung.' },
        ],
      },
      { type: 'interactive', key: 'quantum-gate', label: 'Quantengatter testen' },
    ],
  },
  {
    id: 'supremacy',
    title: 'Quantenüberlegenheit',
    description: 'Warum Quantencomputer exponentiell schneller sind',
    icon: <IconRocket className="w-7 h-7" />,
    color: '#F59E0B',
    steps: [
      {
        type: 'lesson',
        title: 'Quantenparallelismus',
        subtitle: 'Alle Möglichkeiten auf einmal berechnen',
        sections: [
          { icon: <LiZap className={ic} />, title: 'Parallele Berechnung', content: 'N Qubits in Superposition = 2^N Zustände. Eine Operation wirkt auf ALLE gleichzeitig.' },
          { icon: <LiRace className={ic} />, title: 'Massiver Speedup', content: 'Was klassische Computer seriell abarbeiten, löst ein Quantencomputer in Momenten statt Jahrtausenden.' },
          { icon: <LiMicroscope className={ic} />, title: 'Interferenz', content: 'Falsche Antworten löschen sich aus, richtige verstärken sich. Der Quantencomputer „findet" die Lösung von selbst.' },
        ],
      },
      {
        type: 'lesson',
        title: 'Google Willow Chip',
        subtitle: 'Ein Durchbruch in der Quantentechnik',
        sections: [
          { icon: <LiTrophy className={ic} />, title: 'Leistung', content: 'Googles Willow-Chip löste in Minuten, wofür klassische Supercomputer Septillionen Jahre bräuchten.' },
          { icon: <LiWrench className={ic} />, title: 'Fehlerkorrektur', content: 'Erstmals sinkt die Fehlerrate, je mehr Qubits man hinzufügt. Ein kritischer Meilenstein.' },
          { icon: <LiCrystal className={ic} />, title: 'Zukunft', content: 'Quantencomputer werden Medikamente simulieren, Verschlüsselung brechen und unmögliche Materialien designen.' },
        ],
      },
    ],
  },
  {
    id: 'deutsch-jozsa',
    title: 'Deutsch-Jozsa',
    description: 'Der erste Beweis für Quantenvorteil',
    icon: <IconBrain className="w-7 h-7" />,
    color: '#EC4899',
    steps: [
      {
        type: 'lesson',
        title: 'Der Deutsch-Jozsa Algorithmus',
        subtitle: 'Erste Demonstration exponentieller Beschleunigung',
        sections: [
          { icon: <LiTarget className={ic} />, title: 'Das Problem', content: 'Gegeben: f(x) ist garantiert konstant oder balanciert — wie findet man heraus welches?' },
          { icon: <LiPC className={ic} />, title: 'Klassisch: viele Abfragen', content: 'Klassisch braucht man bis zu 2^(n-1)+1 Abfragen — mehr als die Hälfte aller Eingaben.' },
          { icon: <LiZap className={ic} />, title: 'Quantum: eine Abfrage', content: 'Ein Quantencomputer braucht nur EINE Abfrage. Superposition + Interferenz zeigt die Antwort sofort.' },
          { icon: <LiCrystal className={ic} />, title: 'So funktioniert es', content: 'Hadamard → Oracle kodiert f(x) in die Phase → Interferenz → Eine deterministische Messung.' },
        ],
      },
      { type: 'interactive', key: 'deutsch-jozsa', label: 'Deutsch-Jozsa Simulation' },
    ],
  },
  {
    id: 'summary',
    title: 'Zusammenfassung',
    description: 'Was du gelernt hast',
    icon: <IconGrad className="w-7 h-7" />,
    color: '#10B981',
    steps: [
      {
        type: 'lesson',
        title: 'Was du gelernt hast',
        subtitle: 'Von Bits bis Quantenalgorithmen — nicht schlecht!',
        sections: [
          { icon: <LiBulb className={ic} />, title: 'Bits & Binär', content: 'Computer rechnen mit 0en und 1en. Binäre Addition funktioniert wie dezimal, mit Überträgen.' },
          { icon: <LiZap className={ic} />, title: 'Gatter & Halbaddierer', content: 'XOR + AND = Halbaddierer. Die einfachste Schaltung, die addieren kann.' },
          { icon: <LiOrbit className={ic} />, title: 'Qubits & Superposition', content: 'Qubits können gleichzeitig 0 und 1 sein. N Qubits = 2^N Zustände auf einmal.' },
          { icon: <LiWave className={ic} />, title: 'Quantengatter', content: 'Pauli-X flippt, Hadamard superponiert, CNOT verschränkt.' },
          { icon: <LiRace className={ic} />, title: 'Quantenüberlegenheit', content: 'Quantenparallelismus + Interferenz = exponentieller Speedup. Deutsch-Jozsa beweist es in einer Abfrage.' },
        ],
        buttonLabel: 'Nochmal starten',
      },
    ],
  },
];

// Smooth animation config
const pageTransition = { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const };

// Step name helper
function getStepName(step: Step): string {
  if (step.type === 'lesson') return step.title;
  return step.label;
}

export default function Home() {
  const [view, setView] = useState<'overview' | 'chapter'>('overview');
  const [chapterIdx, setChapterIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const chapter = CHAPTERS[chapterIdx];
  const step = chapter?.steps[stepIdx];
  const totalSteps = chapter?.steps.length ?? 0;

  const enterChapterAt = (chIdx: number, stIdx: number) => {
    setChapterIdx(chIdx);
    setStepIdx(stIdx);
    setView('chapter');
  };

  const toggleExpand = (id: string) => {
    setExpandedChapter(prev => prev === id ? null : id);
  };

  const nextStep = () => {
    if (stepIdx < totalSteps - 1) { setStepIdx(stepIdx + 1); }
    else {
      setCompletedChapters(prev => new Set(prev).add(chapter.id));
      if (chapter.id === 'summary') setCompletedChapters(new Set());
      setView('overview');
    }
  };

  const skipToNext = () => {
    for (let i = stepIdx + 1; i < totalSteps; i++) {
      if (chapter.steps[i].type === 'lesson') { setStepIdx(i); return; }
    }
    setCompletedChapters(prev => new Set(prev).add(chapter.id));
    setView('overview');
  };

  const goBack = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
    else setView('overview');
  };

  const renderInteractive = (key: string) => {
    switch (key) {
      case 'binary-task': return <BinaryTaskScreen onContinue={nextStep} />;
      case 'xor-gate': return <XorGateScreen onContinue={nextStep} />;
      case 'and-gate': return <AndGateScreen onContinue={nextStep} />;
      case 'half-adder': return <HalfAdderScreen onContinue={nextStep} />;
      case 'skill-check': return <SkillCheckScreen onContinue={nextStep} chapterTitle={chapter.title} />;
      case 'superposition': return <SuperpositionSim onContinue={nextStep} />;
      case 'quantum-gate': return <QuantumGateSim onContinue={nextStep} />;
      case 'deutsch-jozsa': return <DeutschJozsaSim onContinue={nextStep} />;
      default: return null;
    }
  };

  // ─── OVERVIEW ─────────────────────────────────────────────
  if (view === 'overview') {
    return (
      <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-gray-100 overflow-x-hidden">
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
          <div className="max-w-2xl mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={pageTransition} className="text-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 bg-white rounded-3xl soft-shadow-lg flex items-center justify-center text-indigo-500">
                <IconQubit className="w-10 h-10 sm:w-12 sm:h-12" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">Quantenalgorithmen</h1>
              <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto">Interaktiv lernen — von Bits bis Quantenüberlegenheit</p>
            </motion.div>
          </div>
        </div>

        {/* Chapter List */}
        <div className="max-w-2xl mx-auto px-5 pb-8">
          <div className="space-y-3 sm:space-y-4">
            {CHAPTERS.map((ch, i) => {
              const isCompleted = completedChapters.has(ch.id);
              const isExpanded = expandedChapter === ch.id;
              return (
                <motion.div key={ch.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, ...pageTransition }}
                  className="bg-white rounded-2xl sm:rounded-3xl soft-shadow overflow-hidden"
                >
                  {/* Chapter Header */}
                  <button onClick={() => toggleExpand(ch.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center gap-4 sm:gap-5 group hover:bg-slate-50/50 transition-colors">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: ch.color + '15', color: ch.color }}>
                      {isCompleted ? <IconCheck className="w-6 h-6 sm:w-7 sm:h-7" /> : ch.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: ch.color }}>
                          Kapitel {i + 1}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium">✓ fertig</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-tight">{ch.title}</h3>
                      <p className="text-slate-400 text-sm sm:text-base mt-0.5 truncate">{ch.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-300 font-medium hidden sm:block">{ch.steps.length} Schritte</span>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <IconChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded Sub-Steps */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                          <div className="border-t border-slate-100 pt-3 sm:pt-4 space-y-1">
                            {ch.steps.map((s, si) => (
                              <button key={si} onClick={() => enterChapterAt(i, si)}
                                className="w-full flex items-center gap-3 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-slate-50 transition-colors text-left group/step">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: ch.color + '10', color: ch.color }}>
                                  {s.type === 'lesson'
                                    ? <IconBook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    : <IconPlay className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                  }
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm sm:text-base text-slate-700 font-medium group-hover/step:text-slate-900 transition-colors truncate block">
                                    {getStepName(s)}
                                  </span>
                                  <span className="text-[11px] sm:text-xs text-slate-400">
                                    {s.type === 'lesson' ? 'Lektion' : 'Interaktiv'}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-300 font-mono">{si + 1}/{ch.steps.length}</span>
                              </button>
                            ))}
                            {/* Start Full Chapter Button */}
                            <div className="pt-2">
                              <button onClick={() => enterChapterAt(i, 0)}
                                className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white transition-all hover:opacity-90 active:scale-[0.98]"
                                style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.color}CC)` }}>
                                Kapitel starten →
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Footer — Team Credits */}
          <motion.footer
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-12 sm:mt-16 pb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 mb-4">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide">Wissenschaftswoche</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
              {['Rijad Besic', 'Leon Lin', 'Christian Raileanu'].map(name => (
                <span key={name} className="text-sm sm:text-base text-slate-500 font-medium">{name}</span>
              ))}
            </div>
            <p className="text-xs text-slate-300">Interaktives Lernmodul · 2025</p>
          </motion.footer>
        </div>
      </main>
    );
  }

  // ─── CHAPTER VIEW ────────────────────────────────────────
  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-gray-100 flex flex-col overflow-x-hidden">
      {/* Bigger Nav Bar */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/40">
        <div className="max-w-2xl mx-auto px-5 py-4 sm:py-5 flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
            <IconArrowLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base font-medium">{stepIdx > 0 ? 'Zurück' : 'Übersicht'}</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === stepIdx ? 24 : 10,
                    backgroundColor: i === stepIdx ? chapter.color : i < stepIdx ? chapter.color + '50' : '#E2E8F0',
                  }}
                />
              ))}
            </div>
          </div>
          <span className="text-xs sm:text-sm text-slate-400 font-semibold tabular-nums">{stepIdx + 1} / {totalSteps}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-8 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={`${chapterIdx}-${stepIdx}`} className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {step?.type === 'lesson' ? (
              <LessonPage
                title={step.title}
                subtitle={step.subtitle}
                sections={step.sections}
                onContinue={nextStep}
                onSkip={skipToNext}
                buttonLabel={step.buttonLabel}
              />
            ) : step?.type === 'interactive' ? (
              renderInteractive(step.key)
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
