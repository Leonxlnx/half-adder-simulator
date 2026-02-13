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
function IconChevronRight({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
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
interface InteractiveStep { type: 'interactive'; key: string; }
type Step = LessonStep | InteractiveStep;
interface Chapter { id: string; title: string; description: string; icon: ReactNode; color: string; steps: Step[]; }

// Chapter Data — ALL GERMAN
const CHAPTERS: Chapter[] = [
  {
    id: 'bits',
    title: 'Bits & Binär',
    description: 'Was sind Bits und wie rechnet man binär?',
    icon: <IconBit className="w-6 h-6" />,
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
      { type: 'interactive', key: 'binary-task' },
    ],
  },
  {
    id: 'gates',
    title: 'Logikgatter',
    description: 'Die Bausteine aller digitalen Schaltungen',
    icon: <IconGate className="w-6 h-6" />,
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
      { type: 'interactive', key: 'xor-gate' },
      { type: 'interactive', key: 'and-gate' },
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
      { type: 'interactive', key: 'half-adder' },
      { type: 'interactive', key: 'skill-check' },
    ],
  },
  {
    id: 'qubits',
    title: 'Qubits',
    description: 'Von klassischen Bits zu Quantenbits',
    icon: <IconQubit className="w-6 h-6" />,
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
      { type: 'interactive', key: 'superposition' },
    ],
  },
  {
    id: 'quantum-gates',
    title: 'Quantengatter',
    description: 'Pauli-X, Hadamard und CNOT erklärt',
    icon: <IconQuantumGate className="w-6 h-6" />,
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
      { type: 'interactive', key: 'quantum-gate' },
    ],
  },
  {
    id: 'supremacy',
    title: 'Quantenüberlegenheit',
    description: 'Warum Quantencomputer exponentiell schneller sind',
    icon: <IconRocket className="w-6 h-6" />,
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
    icon: <IconBrain className="w-6 h-6" />,
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
      { type: 'interactive', key: 'deutsch-jozsa' },
    ],
  },
  {
    id: 'summary',
    title: 'Zusammenfassung',
    description: 'Was du gelernt hast',
    icon: <IconGrad className="w-6 h-6" />,
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

export default function Home() {
  const [view, setView] = useState<'overview' | 'chapter'>('overview');
  const [chapterIdx, setChapterIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());

  const chapter = CHAPTERS[chapterIdx];
  const step = chapter?.steps[stepIdx];
  const totalSteps = chapter?.steps.length ?? 0;

  const enterChapter = (idx: number) => { setChapterIdx(idx); setStepIdx(0); setView('chapter'); };

  const nextStep = () => {
    if (stepIdx < totalSteps - 1) { setStepIdx(stepIdx + 1); }
    else {
      setCompletedChapters(prev => new Set(prev).add(chapter.id));
      if (chapter.id === 'summary') setCompletedChapters(new Set());
      setView('overview');
    }
  };

  const skipToNext = () => {
    // Skip to the next lesson or end of chapter
    for (let i = stepIdx + 1; i < totalSteps; i++) {
      if (chapter.steps[i].type === 'lesson') { setStepIdx(i); return; }
    }
    // No more lessons, complete chapter
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

  // Overview
  if (view === 'overview') {
    return (
      <main className="min-h-dvh bg-gray-50 overflow-x-hidden">
        <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={pageTransition} className="text-center mb-8 sm:mb-10">
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ delay: 0.08 }}
              className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl soft-shadow-lg flex items-center justify-center text-indigo-500">
              <IconQubit className="w-8 h-8" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">Quantenalgorithmen</h1>
            <p className="text-slate-500 text-sm sm:text-base">Interaktiv lernen — von Bits bis Quantenüberlegenheit</p>
          </motion.div>

          <div className="space-y-3">
            {CHAPTERS.map((ch, i) => {
              const isCompleted = completedChapters.has(ch.id);
              return (
                <motion.button key={ch.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, ...pageTransition }}
                  onClick={() => enterChapter(i)}
                  className="w-full text-left bg-white rounded-2xl p-4 sm:p-5 soft-shadow hover:soft-shadow-lg transition-shadow group">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: ch.color + '18', color: ch.color }}>
                      {isCompleted ? <IconCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : ch.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase">Kapitel {i + 1}</span>
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{ch.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm truncate">{ch.description}</p>
                    </div>
                    <IconChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // Chapter View
  return (
    <main className="min-h-dvh bg-gray-50 flex flex-col overflow-x-hidden">
      <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors">
            <IconArrowLeft className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">{stepIdx > 0 ? 'Zurück' : 'Übersicht'}</span>
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === stepIdx ? 'w-5 sm:w-6' : ''}`}
                style={{
                  backgroundColor: i === stepIdx ? chapter.color : i < stepIdx ? chapter.color + '60' : '#E2E8F0',
                  borderRadius: '999px',
                }}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">{stepIdx + 1}/{totalSteps}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={`${chapterIdx}-${stepIdx}`} className="w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
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
