import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import askingPenguin from './assets/asking_penguin_1791219285706.png'
import cryingPenguin from './assets/crying_penguin_1791219296989.png'
import threePenguins from './assets/three_penguins_1791219311296.png'
import bestiePhoto from './assets/dikshuu.jpg'
import card1 from './assets/card1.jpg'
import card2 from './assets/card2.jpg'
import card3 from './assets/card3.jpg'
import card4 from './assets/card4.jpg'
import card5 from './assets/card5.jpg'

const shayariCards = [
  { img: card1, text: "Kuch log kismat se nahi,\nduaaon se milte hain…\nAur tum unhi khoobsurat duaaon mein se ho,\njinke bina zindagi thodi adhuri si lagti hai 🧿" },
  { img: card2, text: "Teri muskaan ki wajah ban paun,\nisse khoobsurat khwahish aur kya hogi…\nTu hamesha khush rahe,\nmeri har dua ki shuruaat bas yahin se hogi ✨" },
  { img: card3, text: "Tujhe dekhkar aksar ek baat samajh aati hai,\nkhoobsurti sirf chehre mein nahi hoti…\nKuch log apne hone se hi,\npuri duniya ko khoobsurat bana dete hain 🫶🏻" },
  { img: card4, text: "Na jaane kya baat hai tujhme,\nki tera zikr aate hi chehre par smile aa jaati hai…\nAur teri khushi ki baat ho,\ntoh dil khud-ba-khud dua karne lagta hai 🌙" },
  { img: card5, text: "Bas itni si dua hai meri,\nteri aankhon mein kabhi nami na aaye…\nTere chehre ki ye smile yunhi bani rahe,\naur zindagi tujhe har woh khushi de,\njiski tune kabhi khwahish ki ho 💗🧿" }
];
import { Heart, Star, Camera, PartyPopper, Sparkles } from 'lucide-react'

// --- Hyper Realistic SVG Components ---

const RealisticHeart = ({ width = "100%", height = "100%", pulse = false, style }) => (
  <motion.svg
    viewBox="0 0 100 100"
    style={{ width, height, filter: 'drop-shadow(0 15px 25px rgba(255, 77, 133, 0.6))', ...style }}
    animate={pulse ? { scale: [1, 1.15, 1] } : {}}
    transition={pulse ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : {}}
  >
    <defs>
      <radialGradient id="heartGlow" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffb3d9" />
        <stop offset="20%" stopColor="#ff4d85" />
        <stop offset="100%" stopColor="#a3003b" />
      </radialGradient>
    </defs>
    <path d="M 50 90 C 50 90 10 60 10 30 A 20 20 0 0 1 50 20 A 20 20 0 0 1 90 30 C 90 60 50 90 50 90 Z" fill="url(#heartGlow)" />
    <ellipse cx="25" cy="28" rx="8" ry="16" fill="rgba(255,255,255,0.7)" transform="rotate(-40 25 28)" />
    <ellipse cx="75" cy="28" rx="3" ry="8" fill="rgba(255,255,255,0.4)" transform="rotate(40 75 28)" />
  </motion.svg>
)

const RealisticBow = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(45deg)', filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.3))' }}>
    <defs>
      <linearGradient id="woodGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5c3a21" />
        <stop offset="50%" stopColor="#8b5a2b" />
        <stop offset="100%" stopColor="#3d2110" />
      </linearGradient>
    </defs>
    <path d="M 15 85 Q 85 85 85 15" fill="none" stroke="url(#woodGlow)" strokeWidth="6" strokeLinecap="round" />
    <line x1="15" y1="85" x2="85" y2="15" stroke="#f0f0f0" strokeWidth="1.5" />
  </svg>
)

const RealisticArrow = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(45deg)', filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.2))' }}>
    <line x1="20" y1="80" x2="85" y2="15" stroke="#d2b48c" strokeWidth="3" />
    <g transform="translate(80, 5) rotate(45) scale(0.3)">
      <path d="M 50 90 C 50 90 10 60 10 30 A 20 20 0 0 1 50 20 A 20 20 0 0 1 90 30 C 90 60 50 90 50 90 Z" fill="#ff4d85" />
      <ellipse cx="25" cy="28" rx="8" ry="16" fill="rgba(255,255,255,0.6)" transform="rotate(-40 25 28)" />
    </g>
    <g transform="translate(20, 80)">
      <circle cx="-5" cy="-5" r="3" fill="white" />
      <circle cx="5" cy="-5" r="3" fill="white" />
      <circle cx="-5" cy="5" r="3" fill="white" />
      <circle cx="5" cy="5" r="3" fill="white" />
      <circle cx="0" cy="-6" r="3" fill="white" />
      <circle cx="0" cy="6" r="3" fill="white" />
      <circle cx="-6" cy="0" r="3" fill="white" />
      <circle cx="6" cy="0" r="3" fill="white" />
      <circle cx="0" cy="0" r="4" fill="#ffcc00" />
    </g>
  </svg>
)

// --- Shared Particle System ---

const BackgroundHearts = ({ count = 80, delayOffset = 0, color = "#ff4d85", op = 0.6 }) => {
  const [bgHearts] = useState(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 15,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5 + delayOffset
  })))

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {bgHearts.map(p => (
        <motion.div key={`bg-${p.id}`}
          style={{ position: 'absolute', left: `${p.x}vw`, top: `${p.y}vh` }}
          animate={{ y: [0, -60, 0], rotate: [0, 180, 360], opacity: [0.3, op + 0.2, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          <Heart size={p.size} fill={color} color="none" opacity={op} />
        </motion.div>
      ))}
    </div>
  )
}

const pageVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 1.1, y: -20 }
}
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.8 }
const floatAnimation = { y: [0, -10, 0], rotate: [-2, 2, -2], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
const shakeAnimation = { x: [-2, 2, -2, 2, 0], transition: { duration: 0.4, repeat: Infinity, ease: "linear" } }

// --- Intro Stage ---

const BowAndArrowIntro = ({ onComplete }) => {
  const arrowControls = useAnimation()
  const heartControls = useAnimation()
  const [particles, setParticles] = useState([])
  const [stage, setStage] = useState(0)
  const [heartPos, setHeartPos] = useState({ x: 0, y: 0 })
  const [showParticles, setShowParticles] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [hasShot, setHasShot] = useState(false)

  const handleDragEnd = async (e, info) => {
    if (hasShot) return;
    if (info.offset.x < -20 && info.offset.y > 20) {
      setHasShot(true)

      await arrowControls.start({
        x: window.innerWidth,
        y: -window.innerHeight,
        transition: { duration: 0.4, ease: "easeIn" }
      })

      const newParticles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      }))
      setParticles(newParticles)

      heartControls.start({
        y: window.innerHeight,
        rotate: 45,
        opacity: 0,
        transition: { duration: 1.2, ease: "easeIn", delay: 0.1 }
      })
      arrowControls.start({
        y: window.innerHeight,
        opacity: 0,
        transition: { duration: 1.2, ease: "easeIn", delay: 0.1 }
      })

      setTimeout(() => onComplete(), 1500)
    } else {
      arrowControls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } })
    }
  }

  return (
    <motion.div
      key="intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      style={{ width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden', background: '#ffe6f0' }}
    >
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,77,133,0.5) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <BackgroundHearts color="#ff4d85" op={0.5} />

      <div style={{ position: 'absolute', top: '15%', right: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', color: '#8b4b62', margin: '0 0 20px 0', fontSize: 'clamp(1rem, 4vw, 1.5rem)', opacity: 0.8 }}>a little something, for you</h3>
        <motion.div animate={heartControls} style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'clamp(100px, 20vw, 180px)', height: 'clamp(100px, 20vw, 180px)' }}>
          <RealisticHeart pulse={!hasShot} />
          {particles.map(p => (
            <motion.div key={p.id} initial={{ opacity: 1, x: 0, y: 0, scale: 0 }} animate={{ opacity: 0, x: p.x, y: p.y, scale: 2 }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ position: 'absolute' }}>
              <Heart size={20} fill="#ff4d85" color="none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: 'clamp(100px, 25vw, 150px)', height: 'clamp(100px, 25vw, 150px)', zIndex: 15 }}>
        <RealisticBow />
        <motion.div
          drag={!hasShot}
          dragConstraints={{ left: -150, right: 0, top: 0, bottom: 150 }}
          onDragEnd={handleDragEnd}
          animate={arrowControls}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: hasShot ? 'default' : 'grab', zIndex: 10 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <RealisticArrow />
        </motion.div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '-50%', width: '200%', textAlign: 'center', fontFamily: 'Quicksand', letterSpacing: '2px', fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', color: '#888', pointerEvents: 'none' }}>
          PULL & RELEASE
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  const [stage, setStage] = useState(-2) // -2: Intro, -1: Banner, 0-4: Journey
  const [cardIndex, setCardIndex] = useState(0)
  const [prankQIndex, setPrankQIndex] = useState(0)
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 })

  const prankQuestions = [
    "Do you agree that I am the best bestie in the entire world? 😎",
    "Will you go on random adventures with me and meet me wherever I ask you to? 😎🫶�",
    "Do you promise to stay this cute and annoying forever? 🤪"
  ];

  return (
    <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden', background: 'var(--bg-gradient)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      {/* Global Affection Particles for Journey Stages */}
      {stage >= 0 && <BackgroundHearts color="#ff85b3" op={0.3} count={50} delayOffset={2} />}

      <AnimatePresence mode="wait">

        {stage === -2 && <BowAndArrowIntro key="intro" onComplete={() => setStage(-1)} />}

        {stage === -1 && (
          <motion.div
            key="banner"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1 }}
            style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #cc0033 0%, #ff4d85 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            {/* Particle Hearts Background for Banner */}
            <BackgroundHearts color="#ffffff" op={0.3} count={60} />

            {/* Top Ribbons */}
            <motion.div style={{ position: 'absolute', top: '-10px', left: '10%', display: 'flex', gap: '30vw' }}>
              <motion.div animate={{ rotate: [0, 5, -5, 0], y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <svg width="60" height="150" viewBox="0 0 40 100"><path d="M0 0 L40 0 L40 90 L20 100 L0 90 Z" fill="#ffb3d9" opacity="0.8" /></svg>
              </motion.div>
              <motion.div animate={{ rotate: [0, -7, 7, 0], y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <svg width="50" height="180" viewBox="0 0 40 100"><path d="M0 0 L40 0 L40 90 L20 100 L0 90 Z" fill="#ffcc00" opacity="0.7" /></svg>
              </motion.div>
            </motion.div>

            {/* Bottom Transparent Gifts using Emoji for seamless integration without ugly borders */}
            <div style={{ position: 'absolute', bottom: '15px', left: '0', display: 'flex', width: '100%', justifyContent: 'space-around', zIndex: 5, pointerEvents: 'none' }}>
              <motion.div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }} animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                🎁
              </motion.div>
              <motion.div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }} animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, delay: 1, ease: 'easeInOut' }}>
                🎀
              </motion.div>
              <motion.div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }} animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}>
                🎁
              </motion.div>
            </div>

            {/* Spinning Stars & Text */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '25%', left: '20%', color: '#ffcc00' }}><Star size={45} fill="currentColor" /></motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: '35%', right: '20%', color: '#64d2ff' }}><Sparkles size={55} /></motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, marginTop: '5vh' }}>
              <h4 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', letterSpacing: '3px', color: '#ffd6e8', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>make a wish...</h4>

              <motion.h1 className="banner-title" animate={{ textShadow: ["0px 0px 20px rgba(255,255,255,0.4)", "0px 0px 50px rgba(255,255,255,0.8)", "0px 0px 20px rgba(255,255,255,0.4)"] }} transition={{ duration: 2, repeat: Infinity }} style={{ textAlign: 'center' }}>
                Happy Birthday <br />  Bestuuu <br />
              </motion.h1>

              <div style={{ width: 'clamp(150px, 40vw, 250px)', height: '3px', background: '#ffcc00', margin: '20px 0', borderRadius: '5px', boxShadow: '0 0 15px rgba(255,204,0,0.8)' }}></div>

              <h4 style={{ fontFamily: 'Playfair Display', letterSpacing: 'clamp(2px, 1vw, 4px)', color: '#ffd6e8', fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', textTransform: 'uppercase', marginBottom: '20px' }}>to someone worth celebrating</h4>

              {/* Click Me Realistic Heart - natively flows below the text now without absolute overlapping */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 20, marginTop: '10px' }}
                onClick={() => setStage(0)}
                whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
              >
                <RealisticHeart width="clamp(80px, 22vw, 110px)" height="clamp(80px, 22vw, 110px)" />
                <span style={{ position: 'absolute', fontFamily: 'Fredoka One', color: 'white', fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', letterSpacing: '1px', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>CLICK ME</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 0 && (
          <motion.div key="stage0" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px', zIndex: 10 }}>
            <motion.h4 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', color: '#ff4d85', margin: '0 0 10px 0', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>
              for my favorite person in the entire world...
            </motion.h4>
            <h1 className="title-text" style={{ textShadow: '0 4px 15px rgba(255, 77, 133, 0.3)' }}>PLS ACCEPT THE GIFT</h1>

            <motion.div animate={floatAnimation} style={{ margin: '30px 0', position: 'relative' }}>
              {/* Love Aura Hearts Floating up from image */}
              {[...Array(6)].map((_, i) => (
                <motion.div key={i}
                  animate={{ y: [0, -100], x: [0, (Math.random() - 0.5) * 80], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 2.5 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 0 }}
                >
                  <Heart fill="#ff4d85" color="none" size={24} />
                </motion.div>
              ))}

              {/* Beautiful Polaroid Frame */}
              <div style={{ padding: '12px 12px 25px 12px', background: 'white', borderRadius: '15px', boxShadow: '0 15px 35px rgba(255, 77, 133, 0.25), inset 0 0 0 1px #ffe6f0', position: 'relative', zIndex: 2, transform: 'rotate(-3deg)' }}>
                <img src={askingPenguin} alt="Cute character" style={{ width: 'clamp(200px, 60vw, 250px)', height: 'auto', borderRadius: '10px' }} />
              </div>
            </motion.div>

            <div style={{ display: 'flex', gap: '25px', alignItems: 'center', zIndex: 10 }}>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <button className="button-base btn-yes" onClick={() => setStage(2)} style={{ boxShadow: '0 8px 15px rgba(55, 214, 122, 0.4)', padding: '12px 40px' }}>YES</button>
              </motion.div>
              <button className="button-base btn-no" onClick={() => setStage(1)}>NO</button>
            </div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div key="stage1" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px', zIndex: 10 }}>
            <motion.h4 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', color: '#ff4d85', margin: '0 0 10px 0', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>
              but I made this just for you...
            </motion.h4>
            <h1 className="title-text">WHY DID YOU CLICK NO! 😭</h1>
            <motion.div animate={shakeAnimation} style={{ margin: '30px 0' }}>
              <div style={{ padding: '12px 12px 25px 12px', background: 'white', borderRadius: '15px', boxShadow: '0 15px 35px rgba(255, 77, 133, 0.25), inset 0 0 0 1px #ffe6f0', position: 'relative', zIndex: 2, transform: 'rotate(2deg)' }}>
                <img src={cryingPenguin} alt="Crying character" style={{ width: 'clamp(200px, 60vw, 250px)', height: 'auto', borderRadius: '10px' }} />
              </div>
            </motion.div>
            <button className="button-base btn-no" onClick={() => setStage(0)} style={{ padding: '12px 40px' }}>TRY AGAIN</button>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div key="stage2" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', padding: '0 20px', zIndex: 10 }}>
            <h1 className="title-text">Choose a penguin <br /> <span style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>Each one has something special to say ✨</span></h1>

            <motion.div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '40px 0', gap: '30px', width: '100%' }}>
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  style={{ position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  onClick={() => {
                    if (item === 2) setStage(5) // Direct Gift 2 to the Shayari Page
                    else if (item === 3) setStage(7) // Go to prank game
                    else setStage(3)
                  }}
                  whileHover={{ scale: 1.15, rotate: (item - 2) * 5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={floatAnimation}
                >
                  {/* Background pulse on hover/idle */}
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: item * 0.5 }} style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', width: '110px', height: '110px', background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,204,0,0) 70%)', zIndex: -1, borderRadius: '50%' }} />

                  <span style={{ fontFamily: 'Fredoka One', color: '#ff4d85', fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', marginBottom: '5px', textShadow: '0 4px 10px rgba(255,255,255,1)' }}>
                    Gift {item}
                  </span>

                  <span style={{ fontSize: '110px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.3))' }}>🐧</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div key="stage3" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', padding: '0 20px', zIndex: 10 }}>
            {/* Background Effects */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', top: 0, left: 0 }}>
              <motion.div animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '15%', left: '10%', color: '#ffcc00', filter: 'drop-shadow(0 0 10px #ffcc00)' }}><Star size={80} fill="currentColor" /></motion.div>
              <motion.div animate={{ rotate: -360, opacity: [0.5, 1, 0.5] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '25%', right: '15%', color: '#64d2ff', filter: 'drop-shadow(0 0 10px #64d2ff)' }}><PartyPopper size={60} /></motion.div>
              {/* Glowing Aura for Cake */}
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,214,240,0) 70%)', borderRadius: '50%' }} />
            </div>

            <motion.h1
              animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 600, color: '#8b2b4d', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', margin: '0 0 15px 0', textShadow: '0 2px 10px rgba(255, 255, 255, 0.9)', lineHeight: '1.2' }}
            >
              "Some moments are just <br /> meant to be felt..."
            </motion.h1>

            <h2 style={{ fontFamily: 'Fredoka One', color: '#e62e6b', letterSpacing: '3px', margin: 0, fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', textTransform: 'uppercase', textShadow: '0 2px 5px rgba(255, 255, 255, 0.8)' }}>
              make a wish
            </h2>

            <motion.div animate={floatAnimation} style={{ position: 'relative', margin: '40px 0', zIndex: 5, fontSize: 'clamp(6rem, 25vw, 9rem)', filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.25))' }}>
              🎂
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 20, marginTop: '20px' }}
              onClick={() => setStage(4)}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
            >
              <RealisticHeart pulse={true} width="clamp(90px, 25vw, 130px)" height="clamp(90px, 25vw, 130px)" />
              <span style={{ position: 'absolute', fontFamily: 'Fredoka One', color: 'white', fontSize: 'clamp(0.9rem, 3vw, 1.4rem)', letterSpacing: '1px', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>CLICK ME</span>
            </motion.div>
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div key="stage4" initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.4, duration: 1.5 }} className="scrapbook-container" style={{ zIndex: 10, maxWidth: '750px', width: '95vw', maxHeight: '90vh', overflowY: 'auto', padding: '20px', borderRadius: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative', alignItems: 'center' }}>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '10px', width: '100%' }}>
                <motion.div initial={{ rotate: -5 }} animate={{ rotate: [-5, -2, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative' }}>
                  <div style={{ width: 'clamp(130px, 35vw, 200px)', height: 'clamp(130px, 35vw, 200px)', borderRadius: '20px', overflow: 'hidden', border: '8px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', transform: 'rotate(-3deg)' }}>
                    <img src={bestiePhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Dikshuu" />
                  </div>
                  <motion.div style={{ position: 'absolute', top: -15, right: -15, color: '#f9b4cf', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} animate={floatAnimation}>
                    <Camera size={35} fill="currentColor" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  style={{ fontFamily: 'Fredoka One', color: '#e62e6b', fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', margin: 0, textShadow: '0 5px 15px rgba(230, 46, 107, 0.3)', transform: 'rotate(5deg)' }}
                  animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                >
                  SPECIAL ❤️
                </motion.h2>
              </div>

              <div style={{ padding: '15px 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)', lineHeight: '1.4', color: '#5a3d46', textAlign: 'center', background: 'rgba(255, 245, 250, 0.7)', borderRadius: '15px', boxShadow: 'inset 0 0 20px rgba(255,182,193,0.3)', border: '1px solid #ffe6f0' }}>
                <p style={{ fontStyle: 'italic', fontWeight: '600', color: '#e62e6b', marginBottom: '10px' }}>For the girl who makes ordinary moments feel special…</p>
                <p>There are some people who come into our lives and slowly become a beautiful part of it. You are one of those people for me. ❤️</p>
                <p>Your smile has a way of making everything feel a little better. Your presence brings a different kind of peace, and even the smallest conversations with you somehow become memories worth keeping.</p>
                <p>You may not always realize it, but you are genuinely special. The way you care, the way you smile, the little things you do, and simply the person you are — all of it makes you uniquely you. ✨</p>
                <p>I hope you always keep that beautiful smile on your face. I hope every dream you have finds its way to you, every moment brings you happiness, and life gives you all the love and success you deserve.</p>
                <p>And if there is one thing I wish for today, it is this — may you always have a reason to smile. Because honestly, your smile looks beautiful on you. 🫶🏻</p>
                <p>Thank you for being a beautiful part of my life.<br />You are more special than words can ever explain. 🤍</p>
                <h2 style={{ fontFamily: 'Fredoka One', color: '#e62e6b', marginTop: '15px', fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', letterSpacing: '1px' }}>Happy Birthday, Dikshuu ❤️🎂✨</h2>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: '#ffe6f0', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 5px 15px rgba(230, 46, 107, 0.2)', border: '2px solid #ffceea' }}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setStage(2)}
                  >
                    <span style={{ fontFamily: 'Fredoka One', color: '#e62e6b', fontSize: '1rem', letterSpacing: '1px' }}>CLICK ME</span>
                    <Heart size={18} fill="#e62e6b" color="#e62e6b" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 5 && (
          <motion.div key="stage5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(ellipse at center, #2e081f 0%, #0d000a 100%)', padding: '20px', zIndex: 100 }}>
            {/* Magical Sparkles / Stars Background */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
              {[...Array(30)].map((_, i) => (
                <motion.div key={`sparkle-${i}`} animate={{ y: [0, -30, 0], opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 4 + 1}px`, height: `${Math.random() * 4 + 1}px`, background: '#ffb3d9', borderRadius: '50%', boxShadow: '0 0 10px #ffb3d9' }} />
              ))}
            </div>

            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 2, delay: 0.5 }} style={{ position: 'relative', zIndex: 10, background: 'rgba(255, 255, 255, 0.03)', padding: '50px 30px', margin: '20px', borderRadius: '30px', border: '1px solid rgba(255, 77, 133, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', maxWidth: '700px', width: '90vw' }}>
              <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#ffcce6', fontStyle: 'italic', fontWeight: '400', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', lineHeight: '1.8', textShadow: '0 4px 20px rgba(255, 179, 217, 0.4)' }}>
                "Tum khubsurat ho ek khwaab ki tarah,<br />
                Meri har dua jise maange, uss jawaab ki tarah... ✨"
              </h1>

              <h2 style={{ fontFamily: 'Fredoka One', color: '#e62e6b', fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', marginTop: '40px', letterSpacing: '1px' }}>More shayaris to come... ❤️</h2>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(230, 46, 107, 0.15)', padding: '12px 30px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid #e62e6b', margin: '35px auto 0' }}
                whileHover={{ scale: 1.1, background: 'rgba(230, 46, 107, 0.3)' }} whileTap={{ scale: 0.95 }}
                onClick={() => setStage(6)}
              >
                <span style={{ fontFamily: 'Fredoka One', color: '#ffb3d9', fontSize: '1rem', letterSpacing: '2px' }}>CLICK ME</span>
                <Heart size={16} fill="#ffb3d9" color="#ffb3d9" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {stage === 6 && (
          <motion.div key="stage6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(ellipse at center, #2e081f 0%, #0d000a 100%)', padding: '20px', zIndex: 100 }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
              {[...Array(30)].map((_, i) => (
                <motion.div key={`sparkle-s6-${i}`} animate={{ y: [0, -30, 0], opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 4 + 1}px`, height: `${Math.random() * 4 + 1}px`, background: '#ffb3d9', borderRadius: '50%', boxShadow: '0 0 10px #ffb3d9' }} />
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={cardIndex}
                  initial={{ x: 300, opacity: 0, rotate: 10 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  exit={{ x: -300, opacity: 0, rotate: -10 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '25px', border: '1px solid rgba(255, 77, 133, 0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div style={{ width: '100%', aspectRatio: '1/1.2', borderRadius: '15px', overflow: 'hidden', border: '5px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                    <img src={shayariCards[cardIndex].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Memories" />
                  </div>
                  <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                    <p style={{ fontFamily: 'Playfair Display, serif', color: '#ffcce6', fontStyle: 'italic', fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)', lineHeight: '1.5', textShadow: '0 2px 5px rgba(255, 179, 217, 0.2)', margin: 0, whiteSpace: 'pre-line' }}>
                      {shayariCards[cardIndex].text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(230, 46, 107, 0.2)', padding: '12px 35px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid #e62e6b', marginTop: '30px' }}
                whileHover={{ scale: 1.1, background: 'rgba(230, 46, 107, 0.4)' }} whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (cardIndex < 4) setCardIndex(prev => prev + 1);
                  else {
                    setCardIndex(0);
                    setStage(2);
                  }
                }}
              >
                <span style={{ fontFamily: 'Fredoka One', color: '#ffb3d9', fontSize: '1.1rem', letterSpacing: '2px' }}>
                  {cardIndex < 4 ? 'NEXT' : 'GIFTS MENU'}
                </span>
                <Heart size={18} fill="#ffb3d9" color="#ffb3d9" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 7 && (
          <motion.div key="stage7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(circle at center, #ffd6e8 0%, #ffb6c1 100%)', padding: '20px', zIndex: 100, overflow: 'hidden' }}>

            <motion.div style={{ background: 'rgba(255, 255, 255, 0.7)', padding: '40px 20px', borderRadius: '25px', boxShadow: '0 15px 35px rgba(255, 105, 180, 0.3)', backdropFilter: 'blur(10px)', width: '90%', maxWidth: '500px', border: '2px solid white' }}>
              <div style={{ minHeight: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={prankQIndex}
                    initial={{ opacity: 0, scale: 0.9, filter: 'drop-shadow(0 0 15px rgba(255, 77, 133, 0.8))' }}
                    animate={{ opacity: 1, scale: 1, filter: 'drop-shadow(0 0 0px rgba(255, 77, 133, 0))' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'drop-shadow(0 0 20px rgba(255, 77, 133, 1))' }}
                    transition={{ duration: 0.4 }}
                    style={{ fontFamily: 'Fredoka One', color: '#ff4d85', fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', lineHeight: '1.4', margin: 0 }}
                  >
                    {prankQuestions[prankQIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', position: 'relative', height: '60px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setNoBtnPos({ x: 0, y: 0 }); // Reset NO button position!
                    if (prankQIndex < 2) setPrankQIndex(prev => prev + 1);
                    else setStage(8);
                  }}
                  style={{ padding: '12px 30px', background: '#ff4d85', color: 'white', border: 'none', borderRadius: '25px', fontSize: '1.2rem', fontFamily: 'Fredoka One', cursor: 'pointer', boxShadow: '0 5px 15px rgba(255, 77, 133, 0.4)' }}
                >
                  YES! 💖
                </motion.button>

                <motion.button
                  animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onHoverStart={() => setNoBtnPos({ x: (Math.random() - 0.5) * 250, y: (Math.random() - 0.5) * 200 })}
                  onTouchStart={(e) => { e.preventDefault(); setNoBtnPos({ x: (Math.random() - 0.5) * 250, y: (Math.random() - 0.5) * 200 }); }}
                  onClick={(e) => { e.preventDefault(); setNoBtnPos({ x: (Math.random() - 0.5) * 250, y: (Math.random() - 0.5) * 200 }); }}
                  style={{ padding: '12px 30px', background: '#ccc', color: '#666', border: 'none', borderRadius: '25px', fontSize: '1.2rem', fontFamily: 'Fredoka One', cursor: 'not-allowed', position: 'absolute', right: 0 }}
                >
                  NO 🙄
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {stage === 8 && (
          <motion.div key="stage8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, type: 'spring' }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #ffe6f0 0%, #ffb3d9 100%)', padding: '20px', zIndex: 100 }}>
            <motion.div
              animate={{ scale: [1, 1.15, 1], filter: ['drop-shadow(0 0 10px rgba(255,77,133,0.4))', 'drop-shadow(0 0 35px rgba(230,46,107,0.8))', 'drop-shadow(0 0 10px rgba(255,77,133,0.4))'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ marginBottom: '15px' }}
            >
              <Heart fill="#e62e6b" color="#e62e6b" size={60} strokeWidth={1} />
            </motion.div>

            <div style={{ background: 'rgba(255, 255, 255, 0.7)', padding: '30px 25px', borderRadius: '30px', boxShadow: 'inset 0 0 20px rgba(255,182,193,0.5), 0 15px 35px rgba(255, 105, 180, 0.2)', border: '2px solid #fff', maxWidth: '650px', width: '95vw', overflowY: 'auto', maxHeight: '65vh' }}>
              <h1 style={{ fontFamily: 'Fredoka One', color: '#e62e6b', fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '5px', marginTop: 0 }}>
                💗 You Passed!
              </h1>

              <h2 style={{ fontFamily: 'Fredoka One', color: '#ff4d85', fontSize: 'clamp(1rem, 4vw, 1.2rem)', marginBottom: '20px', marginTop: 0 }}>
                Yayy!! 🎉 You passed the test! 😎❤️
              </h2>

              <div style={{ fontFamily: 'Playfair Display, serif', color: '#5a3d46', fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '15px', fontWeight: '500' }}>
                <p style={{ margin: 0 }}>But honestly, ha test fakt answers cha navhta…<br />It was just a little excuse to remind you how special you are to me. 🥹🫶🏻</p>

                <p style={{ margin: 0 }}>No matter what happens, I want our friendship to always stay just the way it is — full of craziness, laughter, fights, random plans, endless talks and lots of beautiful memories. ✨</p>

                <p style={{ margin: 0 }}>Tu majhyasathi fakt ek friend nahiye…<br />you are someone I genuinely care about, someone I want to see happy, and someone I never want to lose. ❤️🧿</p>

                <p style={{ margin: 0 }}>So promise me, no matter how much life changes, our bond will never change.<br />Always stay the same cute, crazy and annoying you. 🤪💕</p>

                <p style={{ margin: 0, fontStyle: 'italic', fontWeight: '800', color: '#e62e6b', marginTop: '10px' }}>Lots of love, always and forever. �🏻❤️✨</p>
              </div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: '#ff4d85', padding: '12px 35px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '3px solid white', marginTop: '40px', boxShadow: '0 10px 20px rgba(255, 77, 133, 0.4)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setPrankQIndex(0); setNoBtnPos({ x: 0, y: 0 }); setStage(2); }}
            >
              <span style={{ fontFamily: 'Fredoka One', color: 'white', fontSize: '1.2rem', letterSpacing: '1px' }}>
                GIFTS MENU 🎁
              </span>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

export default App
