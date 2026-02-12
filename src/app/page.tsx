'use client';

import { useState } from 'react';
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
import { ArrowLeft, ChevronRight, RotateCcw } from 'lucide-react';

// ─── Types ───
interface LessonStep {
  type: 'lesson';
  title: string;
  subtitle: string;
  sections: LessonSection[];
  buttonLabel?: string;
}

interface InteractiveStep {
  type: 'interactive';
  key: string;
}

type Step = LessonStep | InteractiveStep;

interface Chapter {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  steps: Step[];
}

// ─── Chapter Data ───
const CHAPTERS: Chapter[] = [
  {
    id: 'bits',
    title: 'Bits & Binärzahlen',
    description: 'Was sind Bits und wie rechnet man binär?',
    emoji: '💡',
    color: '#3B82F6',
    steps: [
      {
        type: 'lesson',
        title: 'Was ist ein Bit?',
        subtitle: 'Die kleinste Einheit der Information',
        sections: [
          { icon: '🔌', title: 'Strom an oder aus', content: 'Ein Bit (Binary Digit) ist die kleinste Informationseinheit in der digitalen Welt. Es kann nur zwei Zustände haben: 0 (aus) oder 1 (an). Jeder Computer, jedes Smartphone basiert auf diesen zwei Zuständen.' },
          { icon: '💡', title: 'Warum nur 0 und 1?', content: 'Computer nutzen elektrische Signale. Strom fließt (1) oder fließt nicht (0). Dieses einfache System ist extrem zuverlässig — es gibt keine Zwischenstufen, die Fehler verursachen könnten.' },
          { icon: '🔢', title: 'Binäre Addition', content: 'So wie wir im 10er-System rechnen, kann man auch im 2er-System addieren: 0+0=0, 0+1=1, 1+0=1 — aber 1+1=10! Die 1 wird als Übertrag (Carry) in die nächste Stelle verschoben.' },
          { icon: '🎯', title: 'Jetzt bist du dran', content: 'Im nächsten Schritt übst du die binäre Addition selbst. Tippe auf die Bits, um sie umzuschalten, und vervollständige die Wahrheitstabelle.' },
        ],
      },
      { type: 'interactive', key: 'binary-task' },
    ],
  },
  {
    id: 'gates',
    title: 'Logikgatter',
    description: 'Die Bausteine aller digitalen Schaltungen',
    emoji: '⚡',
    color: '#10B981',
    steps: [
      {
        type: 'lesson',
        title: 'Was sind Logikgatter?',
        subtitle: 'Sie verarbeiten Bits nach festen Regeln',
        sections: [
          { icon: '⚡', title: 'Logik im Computer', content: 'Logikgatter sind die fundamentalen Bausteine aller digitalen Schaltungen. Sie nehmen binäre Eingaben (0 oder 1) und erzeugen nach einer festen Regel eine Ausgabe.' },
          { icon: '🚫', title: 'NOT-Gatter', content: 'Das einfachste Gatter: Es kehrt das Signal um. Aus 0 wird 1, aus 1 wird 0. Wie ein Lichtschalter, der die Lampe umschaltet.' },
          { icon: '✅', title: 'AND-Gatter', content: 'Gibt nur dann 1 aus, wenn BEIDE Eingaben 1 sind. Denk an eine Tür mit zwei Schlössern — beide müssen offen sein (1), damit die Tür aufgeht.' },
          { icon: '🔀', title: 'XOR-Gatter', content: 'Gibt 1 aus, wenn die Eingaben UNTERSCHIEDLICH sind. Wie ein Lichtschalter an zwei Stellen — nur wenn einer an ist, leuchtet das Licht.' },
        ],
      },
      { type: 'interactive', key: 'xor-gate' },
      { type: 'interactive', key: 'and-gate' },
      {
        type: 'lesson',
        title: 'Der Halbaddierer',
        subtitle: 'Zwei Gatter, die zusammen addieren können',
        sections: [
          { icon: '🔧', title: 'Kombination', content: 'Wenn wir ein XOR-Gatter (für die Summe) und ein AND-Gatter (für den Übertrag) kombinieren, erhalten wir einen Halbaddierer — eine Schaltung, die zwei Binärziffern addieren kann!' },
          { icon: '📊', title: 'Zwei Ausgänge', content: 'Der Halbaddierer hat zwei Ausgänge: Die Summe (berechnet durch XOR) und den Übertrag/Carry (berechnet durch AND). Das ist die Grundlage aller Rechenoperationen im Computer.' },
          { icon: '🌍', title: 'Warum ist das wichtig?', content: 'Milliarden dieser winzigen Schaltungen arbeiten in deinem Prozessor zusammen. Alles, was dein Computer berechnet, basiert letztendlich auf diesen einfachen Logikgattern.' },
        ],
        buttonLabel: 'Schaltplan ansehen',
      },
      { type: 'interactive', key: 'half-adder' },
      { type: 'interactive', key: 'skill-check' },
    ],
  },
  {
    id: 'qubits',
    title: 'Qubits',
    description: 'Vom klassischen Bit zum Quantenbit',
    emoji: '🌀',
    color: '#6366F1',
    steps: [
      {
        type: 'lesson',
        title: 'Vom Bit zum Qubit',
        subtitle: 'In der Quantenwelt gelten andere Regeln',
        sections: [
          { icon: '🌍', title: 'Die Quantenwelt', content: 'In der Quantenmechanik verhalten sich Teilchen anders als in unserer Alltagswelt. Heutzutage programmieren wir in Hochsprachen und ignorieren die Hardware — aber bei Quantencomputern müssen wir auf die Ebene der Gatter schauen.' },
          { icon: '🎱', title: 'Superposition', content: 'Ein Qubit kann gleichzeitig 0 UND 1 sein! Das nennt man Superposition. Erst bei der Messung „entscheidet" es sich für einen Zustand. Ein Bit ist wie Nord oder Süd — ein Qubit ist ein Pfeil, der überall auf einer Kugel hinzeigen kann.' },
          { icon: '🌐', title: 'Die Bloch-Sphäre', content: 'Der Zustand eines Qubits wird als Punkt auf einer Kugel dargestellt (Bloch-Sphäre). Nordpol = |0⟩, Südpol = |1⟩, Äquator = Superposition. So können wir den Zustand geometrisch verstehen.' },
          { icon: '📈', title: 'Exponentielles Wachstum', content: '2 Qubits existieren in einer Superposition aus 4 Zuständen gleichzeitig. Die Leistung wächst exponentiell: N Qubits = 2^N Zustände! Das ist der Schlüssel zur Quantenüberlegenheit.' },
        ],
      },
      { type: 'interactive', key: 'superposition' },
    ],
  },
  {
    id: 'quantum-gates',
    title: 'Quantengatter',
    description: 'Pauli-X, Hadamard und CNOT verstehen',
    emoji: '🔮',
    color: '#8B5CF6',
    steps: [
      {
        type: 'lesson',
        title: 'Was sind Quantengatter?',
        subtitle: 'Sie manipulieren Qubits nach den Regeln der Quantenmechanik',
        sections: [
          { icon: '🔄', title: 'Pauli-X Gatter', content: 'Das „Quanten-NOT": Dreht den Zustand um 180° an der X-Achse der Bloch-Sphäre. |0⟩ wird zu |1⟩ und umgekehrt. Signalumkehrung — genau wie das klassische NOT-Gatter.' },
          { icon: '🌊', title: 'Hadamard Gatter (H)', content: 'DAS wichtigste Quantengatter! Es bringt ein Qubit in Superposition: |0⟩ → (|0⟩+|1⟩)/√2. Dadurch kann ein Quantencomputer alle möglichen Eingaben gleichzeitig verarbeiten.' },
          { icon: '🔗', title: 'CNOT Gatter', content: 'Controlled-NOT: Bedingtes Invertieren. Wenn das Kontroll-Qubit = 1 ist, wird das Ziel invertiert (NOT). So werden Qubits verschränkt — sie werden voneinander abhängig!' },
          { icon: '⚙️', title: 'Zusammenspiel', content: 'Aus diesen drei Gattern lassen sich alle Quantenalgorithmen bauen. Hadamard erzeugt Superposition, CNOT erzeugt Verschränkung, und Pauli-X dreht Zustände um.' },
        ],
      },
      { type: 'interactive', key: 'quantum-gate' },
    ],
  },
  {
    id: 'supremacy',
    title: 'Quantenüberlegenheit',
    description: 'Warum Quantencomputer so viel schneller sind',
    emoji: '🚀',
    color: '#F59E0B',
    steps: [
      {
        type: 'lesson',
        title: 'Quantenparallelismus',
        subtitle: 'Alle Möglichkeiten gleichzeitig berechnen',
        sections: [
          { icon: '⚡', title: 'Parallele Berechnung', content: 'N Qubits repräsentieren 2^N Zustände gleichzeitig durch Superposition. Eine einzige Rechenoperation wirkt auf ALLE diese Zustände parallel — das ist Quantenparallelismus.' },
          { icon: '🏎️', title: 'Massive Beschleunigung', content: 'Was herkömmliche Computer seriell (nacheinander) berechnen und dafür exponentiell viel Speicher und Zeit bräuchten, schafft ein Quantencomputer in Augenblicken statt Jahrtausenden.' },
          { icon: '🔬', title: 'Interferenz nutzen', content: 'Der Trick: Durch geschickte Interferenz werden falsche Antworten ausgelöscht und richtige verstärkt. So „findet" der Quantencomputer die Lösung, obwohl er alle Möglichkeiten gleichzeitig berechnet.' },
        ],
      },
      {
        type: 'lesson',
        title: 'Google Willow Chip',
        subtitle: 'Der Durchbruch in der Quantentechnologie',
        sections: [
          { icon: '🏆', title: 'Rechenleistung', content: 'Googles Willow-Chip demonstriert massive Quantenüberlegenheit: Berechnungen, für die klassische Supercomputer Septillionen Jahre bräuchten, schaffte er in wenigen Minuten.' },
          { icon: '🔧', title: 'Quantum Error Correction', content: 'Erstmals sinkt die Fehlerrate, wenn man MEHR Qubits einsetzt. Das ist der entscheidende Schritt von experimenteller Physik zum stabilen Quantencomputer.' },
          { icon: '🔮', title: 'Die Zukunft', content: 'Quantencomputer werden Medikamente simulieren, Verschlüsselungen brechen und Materialien entwerfen, die heute unmöglich sind. Die Technologie steht noch am Anfang, aber die Revolution hat begonnen.' },
        ],
      },
    ],
  },
  {
    id: 'deutsch-jozsa',
    title: 'Deutsch-Jozsa',
    description: 'Der erste Beweis quantenmechanischer Überlegenheit',
    emoji: '🧠',
    color: '#EC4899',
    steps: [
      {
        type: 'lesson',
        title: 'Der Deutsch-Jozsa Algorithmus',
        subtitle: 'Erster Nachweis eines exponentiellen Speedups',
        sections: [
          { icon: '🎯', title: 'Das Problem', content: 'Gegeben: Eine Funktion f(x), die garantiert entweder konstant (alle Ausgaben gleich) oder balanciert (50/50 verteilt) ist. Wie findest du heraus, welche Art es ist?' },
          { icon: '💻', title: 'Klassisch: Viele Abfragen', content: 'Ein klassischer Computer muss im schlimmsten Fall 2^(n-1)+1 Eingaben testen — das ist mehr als die Hälfte aller möglichen Inputs! Bei vielen Qubits wird das exponentiell aufwendig.' },
          { icon: '⚡', title: 'Quanten: Eine Abfrage', content: 'Ein Quantencomputer braucht NUR EINE einzige Abfrage! Durch Superposition aller Inputs, das Orakel und Interferenz wird die globale Eigenschaft der Funktion sofort offenbart.' },
          { icon: '🔮', title: 'Wie funktioniert es?', content: 'Erzeugung einer Superposition (Hadamard) → Das Orakel kodiert f(x) in die Phase → Interferenz löscht individuelle Werte aus, verstärkt aber die globale Eigenschaft → Eindeutige Messung.' },
        ],
      },
      { type: 'interactive', key: 'deutsch-jozsa' },
    ],
  },
  {
    id: 'summary',
    title: 'Zusammenfassung',
    description: 'Was du gelernt hast',
    emoji: '🎓',
    color: '#10B981',
    steps: [
      {
        type: 'lesson',
        title: 'Was du gelernt hast',
        subtitle: 'Von Bits bis Quantenalgorithmen — ein weiter Weg!',
        sections: [
          { icon: '💡', title: 'Bits & Binärzahlen', content: 'Computer rechnen mit 0 und 1. Binäre Addition funktioniert wie normale Addition, aber mit Überträgen bei 1+1=10.' },
          { icon: '⚡', title: 'Logikgatter & Halbaddierer', content: 'XOR und AND sind die Grundbausteine. Zusammen bilden sie einen Halbaddierer — die einfachste Rechenschaltung.' },
          { icon: '🌀', title: 'Qubits & Superposition', content: 'Qubits können 0, 1 oder beides gleichzeitig sein. N Qubits = 2^N Zustände gleichzeitig.' },
          { icon: '🔮', title: 'Quantengatter', content: 'Pauli-X dreht Zustände, Hadamard erzeugt Superposition, CNOT verschränkt Qubits.' },
          { icon: '🚀', title: 'Quantenüberlegenheit', content: 'Quantenparallelismus ermöglicht exponentiell schnellere Berechnungen. Der Deutsch-Jozsa Algorithmus beweist das mit nur einer Abfrage.' },
        ],
        buttonLabel: 'Nochmal von vorne',
      },
    ],
  },
];

// ─── Component ───
export default function Home() {
  const [view, setView] = useState<'overview' | 'chapter'>('overview');
  const [chapterIdx, setChapterIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());

  const chapter = CHAPTERS[chapterIdx];
  const step = chapter?.steps[stepIdx];
  const totalSteps = chapter?.steps.length ?? 0;

  const enterChapter = (idx: number) => {
    setChapterIdx(idx);
    setStepIdx(0);
    setView('chapter');
  };

  const nextStep = () => {
    if (stepIdx < totalSteps - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      // Chapter complete
      setCompletedChapters(prev => new Set(prev).add(chapter.id));
      if (chapter.id === 'summary') {
        // Restart from overview
        setCompletedChapters(new Set());
        setView('overview');
      } else {
        setView('overview');
      }
    }
  };

  const goBack = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    } else {
      setView('overview');
    }
  };

  const renderInteractive = (key: string) => {
    switch (key) {
      case 'binary-task': return <BinaryTaskScreen onContinue={nextStep} />;
      case 'xor-gate': return <XorGateScreen onContinue={nextStep} />;
      case 'and-gate': return <AndGateScreen onContinue={nextStep} />;
      case 'half-adder': return <HalfAdderScreen onContinue={nextStep} />;
      case 'skill-check': return <SkillCheckScreen onContinue={nextStep} />;
      case 'superposition': return <SuperpositionSim onContinue={nextStep} />;
      case 'quantum-gate': return <QuantumGateSim onContinue={nextStep} />;
      case 'deutsch-jozsa': return <DeutschJozsaSim onContinue={nextStep} />;
      default: return null;
    }
  };

  // ── Overview ──
  if (view === 'overview') {
    return (
      <main className="min-h-dvh bg-gray-50 overflow-x-hidden">
        <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl mb-4">⚛️</motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Quantenalgorithmen
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Interaktives Lernmodul — Von Bits bis Quantenüberlegenheit
            </p>
          </motion.div>

          <div className="space-y-3">
            {CHAPTERS.map((ch, i) => {
              const isCompleted = completedChapters.has(ch.id);
              return (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => enterChapter(i)}
                  className="w-full text-left bg-white rounded-2xl p-4 sm:p-5 soft-shadow hover:soft-shadow-lg transition-shadow group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
                      style={{ backgroundColor: ch.color + '18' }}>
                      {isCompleted ? '✅' : ch.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase">Kapitel {i + 1}</span>
                      </div>
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{ch.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm truncate">{ch.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // ── Chapter View ──
  return (
    <main className="min-h-dvh bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">
              {stepIdx > 0 ? 'Zurück' : 'Übersicht'}
            </span>
          </button>

          {/* Step Dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300
                  ${i === stepIdx ? 'w-5 sm:w-6' : ''}`}
                style={{
                  backgroundColor: i === stepIdx ? chapter.color : i < stepIdx ? chapter.color + '60' : '#E2E8F0',
                  borderRadius: '999px',
                }}
              />
            ))}
          </div>

          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
            {stepIdx + 1}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={`${chapterIdx}-${stepIdx}`} className="w-full">
            {step?.type === 'lesson' ? (
              <LessonPage
                title={step.title}
                subtitle={step.subtitle}
                sections={step.sections}
                onContinue={nextStep}
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
