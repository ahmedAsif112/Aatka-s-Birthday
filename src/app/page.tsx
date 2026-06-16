"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════
   FLOATING PETALS
══════════════════════════════════════════════════════ */
const PETALS = ["🌸", "💕", "✨", "🌺", "💗", "⭐", "🌼", "💖"];
function FloatingPetals() {
  const [items, setItems] = useState<
    { id: number; sym: string; left: number; delay: number; dur: number; size: number }[]
  >([]);
  useEffect(() => {
    setItems(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      sym: PETALS[i % PETALS.length],
      left: Math.random() * 100,
      delay: Math.random() * 12,
      dur: 10 + Math.random() * 10,
      size: 12 + Math.random() * 14,
    })));
  }, []);
  return (
    <>
      {items.map(p => (
        <span key={p.id} className="petal" style={{
          left: `${p.left}%`, fontSize: `${p.size}px`,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
        }}>{p.sym}</span>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   REVEAL HOOK
══════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════════════════ */
const BDAY = new Date("2026-06-16T00:00:00");
function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [past, setPast] = useState(false);
  useEffect(() => {
    const tick = () => {
      const diff = BDAY.getTime() - Date.now();
      if (diff <= 0) { setPast(true); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (past) return (
    <p className="font-dancing text-3xl" style={{ color: "#c0546e" }}>
      🎉 It&apos;s your birthday TODAY! 🎉
    </p>
  );
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {[["Days", t.d], ["Hrs", t.h], ["Min", t.m], ["Sec", t.s]].map(([l, v]) => (
        <div key={l as string} className="flex flex-col items-center">
          <div className="card w-16 h-16 flex items-center justify-center text-2xl font-bold"
            style={{ color: "#c0546e" }}>
            {String(v).padStart(2, "0")}
          </div>
          <span className="text-xs mt-1" style={{ color: "#c0546e", opacity: .7 }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MOUNTAIN SVG DECORATION
══════════════════════════════════════════════════════ */
function MountainScene() {
  return (
    <div className="w-full overflow-hidden" style={{ maxHeight: 200 }}>
      <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd1dc" />
            <stop offset="100%" stopColor="#fff5f7" />
          </linearGradient>
          <linearGradient id="mt1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8829a" />
            <stop offset="100%" stopColor="#ffb6c1" />
          </linearGradient>
          <linearGradient id="mt2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c0546e" />
            <stop offset="100%" stopColor="#e8829a" />
          </linearGradient>
          <linearGradient id="mt3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffc0cb" />
            <stop offset="100%" stopColor="#ffd1dc" />
          </linearGradient>
        </defs>
        <rect width="800" height="200" fill="url(#sky)" />
        {/* Stars / sparkles */}
        {[[60, 30], [200, 20], [400, 15], [580, 25], [720, 18]].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="14" textAnchor="middle" opacity=".6">✨</text>
        ))}
        {/* Background mountains */}
        <polygon points="0,200 120,60 240,200" fill="url(#mt3)" opacity=".5" />
        <polygon points="130,200 300,40 470,200" fill="url(#mt3)" opacity=".6" />
        <polygon points="400,200 550,70 700,200" fill="url(#mt3)" opacity=".5" />
        <polygon points="560,200 700,50 800,200" fill="url(#mt3)" opacity=".55" />
        {/* Mid mountains */}
        <polygon points="0,200 150,80 320,200" fill="url(#mt1)" opacity=".75" />
        <polygon points="200,200 420,30 640,200" fill="url(#mt2)" opacity=".8" />
        <polygon points="500,200 680,60 800,200" fill="url(#mt1)" opacity=".75" />
        {/* Snow caps */}
        <polygon points="390,30 420,30 405,10" fill="white" opacity=".9" />
        <polygon points="140,80 165,80 152,62" fill="white" opacity=".8" />
        <polygon points="668,60 690,60 679,43" fill="white" opacity=".8" />
        {/* Pine trees silhouette */}
        {[50, 100, 650, 700, 740].map((x, i) => (
          <g key={i} transform={`translate(${x},150)`}>
            <polygon points="0,-35 8,0 -8,0" fill="#7a3352" opacity=".4" />
            <polygon points="0,-25 10,5 -10,5" fill="#7a3352" opacity=".35" />
            <rect x="-3" y="5" width="6" height="10" fill="#7a3352" opacity=".3" />
          </g>
        ))}
        {/* Two tiny figures on top of center mountain */}
        <g transform="translate(405,26)" opacity=".85">
          <circle cx="-6" cy="-8" r="3" fill="#c0546e" />
          <line x1="-6" y1="-5" x2="-6" y2="2" stroke="#c0546e" strokeWidth="1.5" />
          <circle cx="6" cy="-8" r="3" fill="#e8829a" />
          <line x1="6" y1="-5" x2="6" y2="2" stroke="#e8829a" strokeWidth="1.5" />
          <line x1="-3" y1="-4" x2="3" y2="-4" stroke="#ffb6c1" strokeWidth="1" />
          <text x="0" y="-18" fontSize="8" textAnchor="middle">💕</text>
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   BALLOON POP MINI-GAME
══════════════════════════════════════════════════════ */
type Balloon = { id: number; x: number; emoji: string; speed: number; y: number };
function BalloonGame() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);
  const [done, setDone] = useState(false);

  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback((finalScore: number) => {
    setRunning(false); setDone(true);
    setBalloons([]);
    setBest(b => Math.max(b, finalScore));
    [spawnRef, moveRef, timerRef].forEach(r => { if (r.current) clearInterval(r.current); });
  }, []);

  const start = () => {
    setScore(0); setTimeLeft(30); setBalloons([]); setDone(false); setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    spawnRef.current = setInterval(() => {
      setBalloons(prev => [...prev, {
        id: Date.now() + Math.random(),
        x: 5 + Math.random() * 82,
        emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
        speed: 0.8 + Math.random() * 0.8,
        y: 0,
      }]);
    }, 750);
    moveRef.current = setInterval(() => {
      setBalloons(prev => prev.map(b => ({ ...b, y: b.y + b.speed })).filter(b => b.y < 110));
    }, 80);
    let localScore = 0;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { stop(localScore); return 0; }
        return t - 1;
      });
    }, 1000);
    const scoreListener = (s: number) => { localScore = s; };
    setScore(s => { scoreListener(s); return s; });
    return () => { [spawnRef, moveRef, timerRef].forEach(r => { if (r.current) clearInterval(r.current); }); };
  }, [running, stop]);

  const pop = (id: number) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
  };

  return (
    <div className="card p-5">
      <h3 className="font-dancing text-2xl text-center mb-1" style={{ color: "#c0546e" }}>🎈 Balloon Pop!</h3>
      <p className="text-center text-sm mb-3" style={{ color: "#a0546e" }}>Catch the petals before they float away!</p>
      <div className="flex justify-between items-center mb-2 text-sm font-semibold" style={{ color: "#c0546e" }}>
        <span>💕 Score: {score}</span>
        <span className={timeLeft <= 5 && running ? "animate-pulse text-red-500" : ""}>⏱ {timeLeft}s</span>
        <span>🏆 Best: {best}</span>
      </div>
      <div className="relative rounded-2xl overflow-hidden select-none"
        style={{ height: 260, background: "linear-gradient(180deg,#fff5f7 0%,#ffd1dc 100%)", border: "1px solid #ffb6c1" }}>
        {balloons.map(b => (
          <button key={b.id} onClick={() => pop(b.id)}
            className="absolute text-3xl transition-transform hover:scale-125 active:scale-150 cursor-pointer bg-transparent border-0"
            style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translateX(-50%)" }}>
            {b.emoji}
          </button>
        ))}
        {!running && !done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-5xl float">🎈</span>
            <p className="font-dancing text-xl" style={{ color: "#c0546e" }}>Ready to play?</p>
          </div>
        )}
        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "rgba(255,245,247,.92)" }}>
            <span className="text-5xl">🎊</span>
            <p className="font-dancing text-2xl" style={{ color: "#c0546e" }}>Score: {score} 💕</p>
            {score === best && score > 0 && <p className="text-sm font-bold" style={{ color: "#e8829a" }}>🌟 New Best!</p>}
          </div>
        )}
      </div>
      <button className="btn w-full mt-3 justify-center" onClick={start} disabled={running}>
        {running ? "Playing… 🌸" : "Start Game! 🎈"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MEMORY MATCH GAME
══════════════════════════════════════════════════════ */
const MATCH_POOL = ["💕", "🌸", "💖", "🎂", "✨", "🏔️", "🌺", "🎀"];
type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };
function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [sel, setSel] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const init = useCallback(() => {
    const deck = [...MATCH_POOL, ...MATCH_POOL]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
    setCards(deck); setSel([]); setMoves(0); setWon(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  const flip = (id: number) => {
    if (sel.length === 2) return;
    const c = cards[id];
    if (c.flipped || c.matched) return;
    const next = [...sel, id];
    setCards(p => p.map(x => x.id === id ? { ...x, flipped: true } : x));
    setSel(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next;
      if (cards[a].emoji === c.emoji) {
        setTimeout(() => {
          setCards(p => {
            const updated = p.map(x => x.id === a || x.id === b ? { ...x, matched: true } : x);
            if (updated.every(x => x.matched)) setWon(true);
            return updated;
          });
          setSel([]);
        }, 300);
      } else {
        setTimeout(() => {
          setCards(p => p.map(x => x.id === a || x.id === b ? { ...x, flipped: false } : x));
          setSel([]);
        }, 900);
      }
    }
  };

  return (
    <div className="card p-5">
      <h3 className="font-dancing text-2xl text-center mb-1" style={{ color: "#c0546e" }}>🌸 Memory Match</h3>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold" style={{ color: "#c0546e" }}>Moves: {moves}</span>
        <button className="btn text-sm py-1 px-4" onClick={init}>Restart</button>
      </div>
      {won ? (
        <div className="text-center py-8 space-y-3">
          <span className="text-5xl block">🎉</span>
          <p className="font-dancing text-2xl" style={{ color: "#c0546e" }}>Perfect match! 💕</p>
          <p className="text-sm" style={{ color: "#a0546e" }}>Done in {moves} moves!</p>
          <button className="btn" onClick={init}>Play Again!</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {cards.map(c => (
            <button key={c.id} onClick={() => flip(c.id)}
              className="h-14 rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 border-0"
              style={{
                background: c.flipped || c.matched
                  ? "linear-gradient(135deg,#ffd1dc,#ffb6c1)"
                  : "linear-gradient(135deg,#c0546e,#e8829a)",
                opacity: c.matched ? .5 : 1,
                transform: c.flipped || c.matched ? "scale(.95)" : "scale(1)",
                boxShadow: "0 2px 8px rgba(192,84,110,.25)",
              }}>
              {(c.flipped || c.matched) ? c.emoji : "💕"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SPIN THE WHEEL
══════════════════════════════════════════════════════ */
const WHEEL = [
  { l: "Send a Hug 🤗", col: "#FFB6C1" },
  { l: "Blow a Kiss 💋", col: "#E8829A" },
  { l: "Say I Love You 💕", col: "#FFD1DC" },
  { l: "Tell a Joke 😂", col: "#ff94bc" },
  { l: "Dance Together 💃", col: "#FFB6C1" },
  { l: "Make a Wish ⭐", col: "#E8829A" },
  { l: "Plan a Hike 🏔️", col: "#FFD1DC" },
  { l: "Share a Dream 🌙", col: "#ff94bc" },
];
function SpinWheel() {
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true); setResult(null);
    const extra = 360 * (5 + Math.floor(Math.random() * 5)) + Math.random() * 360;
    const final = rot + extra;
    setRot(final);
    setTimeout(() => {
      const slice = 360 / WHEEL.length;
      const idx = Math.floor(((360 - (final % 360)) / slice)) % WHEEL.length;
      setResult(WHEEL[idx].l);
      setSpinning(false);
    }, 3200);
  };

  const S = 220, cx = S / 2, cy = S / 2, r = S / 2 - 6;
  const n = WHEEL.length, a = (2 * Math.PI) / n;

  return (
    <div className="card p-5 text-center">
      <h3 className="font-dancing text-2xl mb-1" style={{ color: "#c0546e" }}>🎡 Love Wheel</h3>
      <p className="text-sm mb-4" style={{ color: "#a0546e" }}>Spin to see what to do next!</p>
      <div className="flex justify-center mb-3">
        <div className="relative" style={{ width: S + 12, height: S + 12 }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl z-10" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,.2))" }}>▼</div>
          <svg width={S} height={S} style={{
            margin: 6,
            transform: `rotate(${rot}deg)`,
            transition: spinning ? "transform 3.2s cubic-bezier(.17,.67,.12,.99)" : "none",
            borderRadius: "50%",
            boxShadow: "0 4px 24px rgba(192,84,110,.3)",
          }}>
            {WHEEL.map((item, i) => {
              const sa = i * a - Math.PI / 2, ea = sa + a;
              const x1 = cx + r * Math.cos(sa), y1 = cy + r * Math.sin(sa);
              const x2 = cx + r * Math.cos(ea), y2 = cy + r * Math.sin(ea);
              const ma = sa + a / 2, tx = cx + (r * .65) * Math.cos(ma), ty = cy + (r * .65) * Math.sin(ma);
              const deg = ((i * 360 / n) + (180 / n));
              return (
                <g key={i}>
                  <path d={`M${cx} ${cy}L${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}Z`}
                    fill={item.col} stroke="white" strokeWidth="1.5" />
                  <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fill="#7a3352" fontFamily="Dancing Script" fontWeight="700"
                    transform={`rotate(${deg},${tx},${ty})`}>
                    {item.l.substring(0, 13)}
                  </text>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r="14" fill="white" stroke="#E8829A" strokeWidth="2" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="16">💕</text>
          </svg>
        </div>
      </div>
      {result && (
        <div className="card px-5 py-3 mb-4" style={{ background: "rgba(255,209,220,.35)" }}>
          <p className="font-dancing text-xl" style={{ color: "#c0546e" }}>🎉 {result}</p>
        </div>
      )}
      <button className="btn" onClick={spin} disabled={spinning}>
        {spinning ? "Spinning… 🌸" : "Spin! 🎡"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LOVE QUIZ
══════════════════════════════════════════════════════ */
const QUIZ = [
  {
    q: "What does he love most about you? 💕",
    opts: ["Your beautiful smile 😊", "Your kindness 💗", "Your laughter 😂", "Everything about you 🌸"],
    correct: 3,
    why: "Honestly? It's everything. There isn't just one thing — you are the whole package, Aatka.",
  },
  {
    q: "How many times a day does he think about you? 💭",
    opts: ["A few times", "Many times", "Almost always", "Every single second 💖"],
    correct: 3,
    why: "You live in his thoughts constantly. Even when he's busy, you're always there in the background.",
  },
  {
    q: "What's the best thing about your birthday? 🎂",
    opts: ["The cake! 🍰", "The gifts 🎁", "The celebration 🎉", "That you exist! 💕"],
    correct: 3,
    why: "Your birthday isn't just a party — it's a celebration of the most wonderful person in the world.",
  },
  {
    q: "If he could give you one gift, it would be... 🎁",
    opts: ["A diamond 💎", "A trip around the world ✈️", "All the happiness in the universe 🌟", "His heart 💖"],
    correct: 2,
    why: "More than anything, he wants you to have a life overflowing with joy, peace, and happiness.",
  },
  {
    q: "How special are you to him? ⭐",
    opts: ["Pretty special", "Very special", "Extremely special", "More special than words can say 💕"],
    correct: 3,
    why: "There aren't enough words in any language to describe how special you truly are to him.",
  },
  {
    q: "What does your smile do to him? 😊",
    opts: ["Makes him happy", "Makes him smile back", "Makes his day 🌟", "Melts his entire heart 💗"],
    correct: 3,
    why: "One smile from you and everything feels right with the world. You have that kind of power.",
  },
  {
    q: "On a scale of 1–10, how much does he love you? 💖",
    opts: ["8", "9", "10", "Off the charts! ∞"],
    correct: 3,
    why: "Love doesn't have a scale big enough for you. It's infinite, boundless, and grows every day.",
  },
  {
    q: "What's your superpower, Aatka? ✨",
    opts: ["Your intelligence 🧠", "Your beauty 🌸", "Your kindness 💕", "Making everyone fall in love with you 💖"],
    correct: 3,
    why: "You walk into a room and instantly make it warmer. That's a rare and beautiful gift.",
  },
];

function LoveQuiz() {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [ans, setAns] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const q = QUIZ[cur];
  const score = ans.filter(Boolean).length;

  const choose = (i: number) => {
    if (sel !== null) return;
    setSel(i);
    setAns(p => [...p, i === q.correct]);
  };
  const next = () => {
    setSel(null);
    if (cur + 1 < QUIZ.length) setCur(c => c + 1);
    else setDone(true);
  };
  const restart = () => { setCur(0); setSel(null); setAns([]); setDone(false); };

  const RESULTS = [
    { min: 0, max: 2, e: "🌱", t: "Just Getting Started!", d: "Like us — just beginning, and already so full of promise." },
    { min: 3, max: 4, e: "🌸", t: "You Know Us Well!", d: "You feel the connection — it's real and it's growing." },
    { min: 5, max: 6, e: "💖", t: "You Know His Heart!", d: "Perfect. You already know exactly what this is — something beautiful." },
  ];
  const res = RESULTS.find(r => score >= r.min && score <= r.max)!;

  if (done) return (
    <div className="card p-8 text-center">
      <span className="text-6xl block mb-4">{res?.e}</span>
      <div className="font-dancing text-4xl mb-2" style={{ color: "#c0546e" }}>{score}/{QUIZ.length}</div>
      <h3 className="font-dancing text-2xl mb-3" style={{ color: "#e8829a" }}>{res?.t}</h3>
      <p className="font-cormorant italic text-lg mb-6" style={{ color: "#7a3352" }}>{res?.d}</p>
      <p className="font-dancing text-xl mb-6" style={{ color: "#c0546e" }}>
        No matter what the score says — you are perfectly, infinitely loved. 💕
      </p>
      <button className="btn" onClick={restart}>Try Again 💖</button>
    </div>
  );

  return (
    <div className="card p-6">
      <h3 className="font-dancing text-2xl text-center mb-1" style={{ color: "#c0546e" }}>💖 Our Love Quiz</h3>
      {/* Progress bar */}
      <div className="h-2 rounded-full mb-5 overflow-hidden" style={{ background: "#ffd1dc" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((cur + (sel !== null ? 1 : 0)) / QUIZ.length) * 100}%`, background: "linear-gradient(to right,#c0546e,#e8829a)" }} />
      </div>
      <p className="font-cormorant text-lg font-semibold mb-4" style={{ color: "#3d1a2b" }}>
        {cur + 1}. {q.q}
      </p>
      <div className="space-y-3 mb-4">
        {q.opts.map((opt, i) => {
          let cls = "opt-btn";
          if (sel !== null) {
            if (i === q.correct) cls += " correct";
            else if (i === sel) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={sel !== null}>
              <span className="mr-2 font-bold text-xs opacity-60">{["A", "B", "C", "D"][i]}.</span>{opt}
              {sel !== null && i === q.correct && <span className="float-right">✅</span>}
              {sel === i && i !== q.correct && <span className="float-right">❌</span>}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(255,209,220,.35)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#c0546e" }}>
            {sel === q.correct ? "💖 Exactly right!" : "💕 Almost — but here's the truth:"}
          </p>
          <p className="font-cormorant italic" style={{ color: "#7a3352" }}>{q.why}</p>
        </div>
      )}
      {sel !== null && (
        <button className="btn w-full justify-center" onClick={next}>
          {cur + 1 < QUIZ.length ? "Next →" : "See Results 🎉"}
        </button>
      )}
      <p className="text-center text-xs mt-3" style={{ color: "#c0546e", opacity: .6 }}>
        Question {cur + 1} of {QUIZ.length}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   BUCKET LIST
══════════════════════════════════════════════════════ */
const BUCKET = [
  {
    icon: "🏔️",
    place: "Explore the North of Pakistan Together",
    desc: "One day we'll pack our bags and disappear into the north — from the magical meadows to the valleys, from quiet rivers to the roads that lead all the way toward the China border. No rush, no plans… just us discovering places, taking photos, drinking chai, and collecting memories that become our favourite stories.",
    dream: "our adventure begins here 💕"
  },

  {
    icon: "✨",
    place: "Build a Whole Life Together",
    desc: "More than trips, I want the ordinary things with you — good mornings, random conversations, celebrating small wins, being there on difficult days, growing older side by side, and creating a life that feels safe, peaceful, and full of love.",
    dream: "my forever plan"
  },

  {
    icon: "🌙",
    place: "Late Night Talks & Long Drives",
    desc: "Drive with no destination, soft music playing, windows open, talking about dreams, childhood stories, fears, and everything in between until we lose track of time.",
    dream: "just us and the road"
  },

  {
    icon: "☕",
    place: "Tiny Everyday Moments",
    desc: "Morning chai together, surprise messages, laughing over nothing, grocery runs, watching sunsets, and turning ordinary days into memories we never forget.",
    dream: "a beautiful routine"
  },

  {
    icon: "🌊",
    place: "See Places That Don't Feel Real",
    desc: "Turquoise lakes, hidden valleys, peaceful rivers, quiet corners of the world — places that make us stop and look at each other and think: we actually made it here together.",
    dream: "worth every journey"
  },

  {
    icon: "🎂",
    place: "Celebrate Every Version of You",
    desc: "Your birthdays, achievements, hard days, random victories, and everything life brings. I want to be there — in every happiness and every sadness — reminding you that you never have to face anything alone.",
    dream: "every year together"
  },

  {
    icon: "📸",
    place: "Create a Memory Collection",
    desc: "Photos, videos, ticket stubs, random notes, blurry selfies, and moments that don't seem important now but become the things we smile about years later.",
    dream: "our story album"
  },

  {
    icon: "💖",
    place: "Grow Old Side by Side",
    desc: "And one day, when we look back at everything — the adventures, the difficult moments, the ordinary days — I want us to smile and say: we built a beautiful life together.",
    dream: "forever sounds nice with you"
  }
];


function BucketList() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setChecked(p => {
    const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n;
  });
  return (
    <div className="space-y-3">
      {BUCKET.map((item, i) => (
        <button key={i} onClick={() => toggle(i)}
          className="w-full text-left card p-4 flex gap-4 items-start transition-all duration-300 hover:scale-[1.01]"
          style={{ opacity: checked.has(i) ? .7 : 1, background: checked.has(i) ? "rgba(255,209,220,.45)" : "rgba(255,255,255,.7)" }}>
          <span className="text-3xl shrink-0 mt-1">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-dancing text-lg font-bold" style={{ color: "#c0546e" }}>{item.place}</span>
              {checked.has(i) && <span className="text-green-500 text-sm font-bold">✓ Dreamed!</span>}
            </div>
            <p className="text-sm mb-1" style={{ color: "#7a3352" }}>{item.desc}</p>
            <span className="text-xs italic" style={{ color: "#e8829a" }}>✨ {item.dream}</span>
          </div>
        </button>
      ))}
      {checked.size > 0 && (
        <p className="text-center font-dancing text-xl" style={{ color: "#c0546e" }}>
          {checked.size} dream{checked.size > 1 ? "s" : ""} marked — let&apos;s make them real 💕
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   WISH BOXES
══════════════════════════════════════════════════════ */
const WISHES = [
  { icon: "🌟", t: "Joy Without End", w: "May every single morning begin with something that makes your heart glad — a small thing, a big thing, but always something." },
  { icon: "🏔️", t: "Mountain Mornings", w: "May you stand on as many peaks as your heart desires, breathing air so clean and cold it makes everything else feel simple and clear." },
  { icon: "💪", t: "Brave New Goals", w: "This year, may you dare to start the thing you've been thinking about. You are more capable than you know, Aatka." },
  { icon: "🌺", t: "Good Health", w: "May your body feel strong, your mind feel light, and your spirit feel lit from within — every day of this whole new year." },
  { icon: "😂", t: "Endless Laughter", w: "May you laugh until your stomach hurts and your eyes are bright with happy tears. Life is best lived with a lot of that." },
  { icon: "✈️", t: "Adventures Ahead", w: "May this year take you somewhere new — a mountain you haven't climbed, a road you haven't walked, a view that steals your breath." },
  { icon: "🧘", t: "Inner Peace", w: "In every season, may you find a quiet stillness inside yourself that no noise or rush can reach. You deserve that calm." },
  { icon: "💕", t: "To Be Loved Well", w: "May you always, always know — clearly and without doubt — that you are loved deeply, genuinely, and without condition." },
  { icon: "🌙", t: "Peaceful Nights", w: "After every full and beautiful day, may you rest easily, with a full heart and the knowledge that tomorrow holds something wonderful." },
  { icon: "🌈", t: "Beautiful Surprises", w: "May life surprise you this year with moments so unexpectedly lovely that you stop and think — I didn't know it could be this good." },
  { icon: "📖", t: "Wisdom & Growth", w: "May you grow this year — in knowing yourself, in trusting yourself, in being the version of you that you are becoming. She's wonderful." },
  { icon: "🎂", t: "This Day, You", w: "Most of all — may today remind you how special it is that you exist. The world is genuinely better because you are in it, Aatka." },
];
function WishBoxes() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const openAll = () => setOpen(new Set(WISHES.map((_, i) => i)));
  return (
    <div>
      <div className="flex justify-center mb-5">
        <button className="btn" onClick={openAll}>✨ Unwrap All 12 Wishes</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {WISHES.map((w, i) => (
          <button key={i} onClick={() => setOpen(p => { const n = new Set(p); n.add(i); return n; })}
            className="card p-4 text-center transition-all duration-500 hover:scale-[1.03] cursor-pointer border-0"
            style={{ minHeight: 130, background: open.has(i) ? "rgba(255,209,220,.45)" : "rgba(255,255,255,.75)" }}>
            {open.has(i) ? (
              <>
                <div className="text-3xl mb-2">{w.icon}</div>
                <p className="font-dancing text-base font-bold mb-1" style={{ color: "#c0546e" }}>{w.t}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#7a3352" }}>{w.w}</p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <span className="text-4xl animate-bounce">🎁</span>
                <span className="font-dancing text-base" style={{ color: "#c0546e" }}>Wish #{i + 1}</span>
                <span className="text-xs" style={{ color: "#e8829a" }}>tap to unwrap</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {open.size === WISHES.length && (
        <div className="card p-6 text-center mt-6" style={{ background: "rgba(255,209,220,.3)" }}>
          <span className="text-4xl block mb-3">🎊</span>
          <p className="font-dancing text-2xl" style={{ color: "#c0546e" }}>
            All 12 wishes are yours, Aatka. Every single one. 💕
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION WRAPPER
══════════════════════════════════════════════════════ */
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className={`reveal px-4 md:px-8 py-14 max-w-3xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function SectionHead({ emoji, title, sub }: { emoji: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-10">
      <div className="text-5xl mb-3 float inline-block">{emoji}</div>
      <h2 className="font-dancing text-4xl md:text-5xl shimmer mb-2">{title}</h2>
      {sub && <p className="font-cormorant italic text-lg" style={{ color: "#a0546e" }}>{sub}</p>}
      <div className="petal-line mt-4"><span className="text-rose-300 font-dancing text-base" style={{ color: "#e8829a" }}>✦</span></div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CONFETTI
══════════════════════════════════════════════════════ */
function Confetti({ active }: { active: boolean }) {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    e: ["🎉", "🎊", "💕", "🌸", "✨", "🎂", "💖", "🥳", "🏔️"][i % 9],
    delay: Math.random() * 1.5,
  }));
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <span key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: "-30px",
          fontSize: "22px", animationDelay: `${p.delay}s`,
          animation: `drift ${2 + p.delay}s ease-out forwards`,
        }}>{p.e}</span>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function Page() {
  const [confetti, setConfetti] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<"balloon" | "memory" | "wheel">("balloon");
  const heroRef = useRef<HTMLDivElement>(null);

  const celebrate = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen pt-12" style={{ background: "linear-gradient(160deg,#fff5f7 0%,#ffe8ef 40%,#fff0f5 100%)" }}>
      <Confetti active={confetti} />

      {/* ── HERO ──────────────────────────────────── */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden" style={{ zIndex: 1 }}>
        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: .04, fontSize: "clamp(5rem,20vw,14rem)", fontFamily: "Dancing Script", color: "#c0546e", lineHeight: 1 }}>
          Aatka
        </div>

        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="text-7xl hbeat inline-block">🎂</div>
          <h1 className="font-dancing shimmer" style={{ fontSize: "clamp(3rem,10vw,6rem)", lineHeight: 1.1 }}>
            Happy Birthday
          </h1>
          <h2 className="font-dancing" style={{ fontSize: "clamp(2.5rem,8vw,5rem)", color: "#c0546e", lineHeight: 1.1 }}>
            Aatka 💕
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl leading-relaxed" style={{ color: "#7a3352" }}>
            We may have just met — but something in me already knows<br />
            this is the beginning of something really, truly beautiful.
          </p>

          <div className="pt-2">
            <Countdown />
          </div>

          <div className="flex gap-3 justify-center flex-wrap pt-2">
            <button className="btn" onClick={celebrate}>🎉 Celebrate!</button>
            <button className="btn" style={{ background: "linear-gradient(135deg,#e8829a,#ffb6c1)" }}
              onClick={() => scrollTo("letter")}>
              Read My Letter
            </button>
            <button className="btn" style={{ background: "linear-gradient(135deg,#9b6b8a,#c0546e)" }}
              onClick={() => scrollTo("mountains")}>
              Our Bucket List
            </button>
          </div>

          <button onClick={() => scrollTo("letter")}
            className="block mx-auto mt-8 animate-bounce border-0 bg-transparent cursor-pointer"
            style={{ color: "#e8829a", fontSize: "2rem" }}>
            ↓
          </button>
        </div>
      </div>

      {/* ── LETTER ───────────────────────────────── */}
      <Section id="letter">
        <SectionHead emoji="💌" title="A Letter For You" sub="from my heart, with no filter" />
        {!letterOpen ? (
          <div className="flex flex-col items-center gap-6">
            {/* Envelope */}
            <div onClick={() => setLetterOpen(true)}
              className="relative w-72 h-52 cursor-pointer hover:scale-105 transition-transform duration-500"
              style={{ filter: "drop-shadow(0 8px 24px rgba(192,84,110,.25))" }}>
              {/* Body */}
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(135deg,#ffd1dc,#ffb6c1)" }} />
              {/* Flap */}
              <div className="absolute top-0 left-0 right-0" style={{
                height: "50%",
                background: "linear-gradient(180deg,#e8829a,#ffb6c1)",
                clipPath: "polygon(0 0,100% 0,50% 100%)",
                borderRadius: "24px 24px 0 0",
              }} />
              {/* Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg,#c0546e,#e8829a)", boxShadow: "0 4px 16px rgba(192,84,110,.4)" }}>
                💕
              </div>
              {/* Lines */}
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                {[1, .75, .5].map((w, i) => (
                  <div key={i} className="h-px rounded" style={{ width: `${w * 100}%`, background: "rgba(255,255,255,.5)" }} />
                ))}
              </div>
            </div>
            <p className="font-dancing text-xl" style={{ color: "#c0546e" }}>Tap the envelope to open 💕</p>
            <button className="btn" onClick={() => setLetterOpen(true)}>💌 Open My Letter</button>
          </div>
        ) : (
          <div className="card p-8 md:p-12 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,.8)" }}>
            <div className="absolute top-5 left-5 text-3xl opacity-30">🌸</div>
            <div className="absolute top-5 right-5 text-3xl opacity-30">🌸</div>
            <div className="absolute bottom-5 left-5 text-3xl opacity-30">💕</div>
            <div className="absolute bottom-5 right-5 text-3xl opacity-30">💕</div>

            <p className="font-dancing text-2xl mb-6 text-center" style={{ color: "#e8829a" }}>Dear Aatka, 🌸</p>

            <div className="space-y-6 font-cormorant text-lg leading-relaxed" style={{ color: "#3d1a2b" }}>
              {[
                { e: "🌸", p: "I want to be honest with you — we haven’t known each other for very long. And maybe that’s exactly why I’m writing this. Because sometimes, unexpectedly, you meet someone and something inside you quietly says: this person is going to matter. You became that person for me, Aatka. Not because of time, but because of the way your presence already feels meaningful in places words can’t fully explain." },

                { e: "💕", p: "I don’t have years of memories with you to look back on — not yet. But I have something I think is even more beautiful: the sincere wish to create them. With you. The unforgettable adventures, the ordinary days, the random conversations, the moments that seem small but become the ones we carry forever in our hearts." },

                { e: "🏔️", p: "I know how much you love the mountains. And I love that about you — that your heart belongs to places that are quiet, endless, and real. One day, I want to stand beside you on a mountain peak, feel the cold wind together, and watch your eyes light up while the world stretches endlessly in front of us. And not just there — wherever life takes us, I want to stand beside you always." },

                { e: "✨", p: "I want to be the person who shows up — for your birthdays, your ordinary Tuesdays, your difficult days, and your brightest moments. I want to be someone who reminds you, again and again, that you never have to carry life alone. I want to stand beside you through every happiness and every sadness, every victory and every challenge — not only when life feels beautiful, but especially when it doesn’t." },

                { e: "💖", p: "So here’s my birthday promise to you: I want to give us the patience, care, and honesty it takes to build something real. Not perfect — real. Something made of laughter, late-night talks, mountain trails, comfort, understanding, and the kind of love that quietly says: I’m here, and I’m not leaving when things get hard." },

                { e: "🎂", p: "Happy Birthday, Aatka. I’m truly grateful you were born. And maybe even more grateful that somehow, among all the places and all the paths, ours crossed. I don’t know what the future looks like yet — but I know that if life gives me the chance, I want to keep making memories with you, standing beside you through every joy and every storm. Here’s to this birthday… and every beautiful one after it. 💕" }

              ].map((para, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-xl shrink-0 mt-1">{para.e}</span>
                  <p>{para.p}</p>
                </div>
              ))}
            </div>

            <div className="petal-line mt-8">
              <span className="font-dancing text-xl" style={{ color: "#e8829a" }}>with all my heart</span>
            </div>
            <p className="font-dancing text-3xl text-center mt-4 hbeat" style={{ color: "#c0546e" }}>
              Your Ahmed💕
            </p>
          </div>
        )}
      </Section>

      {/* ── MOUNTAINS ────────────────────────────── */}
      <Section id="mountains">
        <SectionHead emoji="🏔️" title="Our Mountain Bucket List" sub="places we'll go, peaks we'll stand on — together" />
        <MountainScene />
        <div className="mt-6 card p-5 mb-8" style={{ background: "rgba(255,209,220,.3)" }}>
          <p className="font-cormorant italic text-lg text-center" style={{ color: "#7a3352" }}>
            You love the mountains — their silence, their scale, their honesty.
            So here are the places I want to discover with you, one summit at a time.
            Tap each one to mark it as a dream. 💕
          </p>
        </div>
        <BucketList />
      </Section>

      {/* ── FUTURE ───────────────────────────────── */}
      <Section>
        <SectionHead emoji="🌸" title="What I Want For Us" sub="honest thoughts from someone just getting started" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { e: "🌱", t: "To grow slowly", d: "I don't want to rush us. I want to learn you — your favourite kind of silence, what makes you laugh past midnight, what your eyes do when you're thinking hard." },
            { e: "🏔️", t: "To chase peaks", d: "Literally and figuratively. I want us to be the kind of couple who books the trek, wakes before dawn, and stands at the top exhausted and absolutely glad." },
            { e: "🤝", t: "To be your person", d: "The one you text first. The one who already knows what you need. The one who shows up — every time, without exception, without conditions." },
            { e: "😂", t: "To laugh — a lot", d: "About nothing, about everything. I want our inside jokes to be so layered they need a whole timeline to explain. I want us to be ridiculous together." },
            { e: "📖", t: "To make our story", d: "Right now we're on page one. I want to write every page that follows with intention — slowly, honestly, and with a lot of heart." },
            { e: "💕", t: "To love you well", d: "That's the whole thing, really. To love you in the way you actually deserve — fully, consistently, and in all the small ways that matter most." },
          ].map((item, i) => (
            <div key={i} className="card p-5 flex gap-4 items-start hover:scale-[1.02] transition-transform">
              <span className="text-3xl shrink-0">{item.e}</span>
              <div>
                <h4 className="font-dancing text-xl mb-1" style={{ color: "#c0546e" }}>{item.t}</h4>
                <p className="font-cormorant text-base leading-relaxed" style={{ color: "#7a3352" }}>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WISHES ───────────────────────────────── */}
      <Section>
        <SectionHead emoji="🎂" title="12 Birthday Wishes" sub="one for every month of your beautiful new year" />
        <WishBoxes />
      </Section>

      {/* ── GAMES ────────────────────────────────── */}
      <Section>
        <SectionHead emoji="🎮" title="Let's Play!" sub="because your birthday should be fun too" />
        {/* Game tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {([["balloon", "🎈 Balloon Pop"], ["memory", "🌸 Memory Match"], ["wheel", "🎡 Love Wheel"]] as const).map(([id, label]) => (
            <button key={id} onClick={() => setActiveGame(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-0 cursor-pointer ${activeGame === id ? "text-white shadow-lg" : "text-rose-600 hover:bg-pink-100"
                }`}
              style={activeGame === id ? { background: "linear-gradient(135deg,#c0546e,#e8829a)" } : { background: "rgba(255,255,255,.65)" }}>
              {label}
            </button>
          ))}
        </div>
        {activeGame === "balloon" && <BalloonGame />}
        {activeGame === "memory" && <MemoryGame />}
        {activeGame === "wheel" && <SpinWheel />}
      </Section>

      {/* ── QUIZ ─────────────────────────────────── */}
      <Section>
        <SectionHead emoji="💖" title="Our Love Quiz" sub="how well do you know our beginning?" />
        <LoveQuiz />
      </Section>

      {/* ── CLOSING ──────────────────────────────── */}
      <Section>
        <div className="card p-10 text-center" style={{ background: "rgba(255,209,220,.35)" }}>
          <div className="text-6xl hbeat inline-block mb-6">💖</div>
          <h2 className="font-dancing text-4xl md:text-5xl shimmer mb-4">
            Happy Birthday, Aatka
          </h2>
          <p className="font-cormorant italic text-xl leading-relaxed mb-6" style={{ color: "#7a3352", maxWidth: 500, margin: "0 auto 24px" }}>
            We just started — and that is the most exciting thing.
            There are so many mountains still to climb, so many pages left to write.
            I am so glad today exists. I am so glad you exist.
          </p>
          <div className="flex justify-center gap-3 text-4xl mb-8">
            {["🎂", "🌸", "💕", "🏔️", "✨", "💖"].map((e, i) => (
              <span key={i} style={{
                display: "inline-block",
                animation: `floaty ${2.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
              }}>{e}</span>
            ))}
          </div>
          <button className="btn text-lg" onClick={celebrate}>
            🎉 Celebrate Again!
          </button>
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="text-center py-8 px-4" style={{ color: "#c0546e", opacity: .7 }}>
        <p className="font-dancing text-lg">Made with 💕 just for you, Aatka</p>
        <p className="text-xs mt-1" style={{ fontFamily: "Inter" }}>Happy Birthday — Tuesday, June 16, 2026</p>
      </footer>

    </div>
  );
}
