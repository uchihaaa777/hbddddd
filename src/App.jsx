import { useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Image as ImageIcon,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import "./App.css";

const photos = [
  {
    src: "https://customer-assets-agu9un31.emergentagent.net/job_781c6ade-acaa-40fb-8f79-6fcb4ac777ae/artifacts/a184b259dbd04ef1_WhatsApp%20Image%202026-10-09%20at%2011.43.28%20PM.jpeg",
    title: "The birthday girl",
    tag: "Soft pink polaroid",
    className: "pink-edit",
  },
  {
    src: "https://customer-assets-agu9un31.emergentagent.net/job_781c6ade-acaa-40fb-8f79-6fcb4ac777ae/artifacts/9f533cb3a6abb912_WhatsApp%20Image%202026-10-09%20at%2011.43.29%20PM.jpeg",
    title: "A little sunshine",
    tag: "Cute party edit",
    className: "party-edit",
  },
  {
    src: "https://customer-assets-agu9un31.emergentagent.net/job_781c6ade-acaa-40fb-8f79-6fcb4ac777ae/artifacts/d4869e68c14253b3_WhatsApp%20Image%202026-10-09%20at%2011.43.29%20PM%20%281%29.jpeg",
    title: "Golden hour memories",
    tag: "Cinematic monochrome",
    className: "gold-edit",
  },
];

const message = `Happiest birthday, Dhritii! Honestly, you’re such a wonderful friend and one of the purest souls I’ve come across. It’s crazy how a whole year has passed since we started talking. Time really flies when you have someone you genuinely enjoy talking to. I love how I can share almost everything with you without overthinking, and our random gossip sessions are honestly the best part. You always have the craziest stories and gossip to share, and there’s never a dull moment when we talk. I never realised when we became so comfortable with each other that sharing random things became a part of our everyday conversations. Thank you for becoming my friend and for being someone I can share so much with. I’m genuinely glad we crossed paths and got to know each other. I hope you always stay the same sweet, genuine, and pure-hearted person you are. May this new year of your life bring you lots of happiness, success, and beautiful memories. You deserve all the good things life has to offer. Once again, happiest birthday, Dhritii. I hope you have an amazing day and an even more amazing year ahead.`;


const BALLOON_COLORS = ["#f9a8bd", "#f47f9b", "#f6d28b", "#c9b6f2", "#a8e0d2", "#ffc7a8"];
const CONFETTI_COLORS = ["#f47f9b", "#f6c667", "#b7a1ef", "#7fd4c1", "#ff9f80", "#ffffff"];
const FLAG_COLORS = ["#f9a8bd", "#f6d28b", "#c9b6f2", "#a8e0d2", "#ffc7a8"];

// deterministic pseudo-random so the layout never jumps between renders
function seeded(seed) {
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}

function PartyBackground() {
  const items = useMemo(() => {
    const r = seeded(7);
    return {
      balloons: Array.from({ length: 9 }, (_, i) => ({
        left: 4 + i * 11 + r() * 5,
        size: 34 + r() * 26,
        dur: 20 + r() * 14,
        delay: -r() * 30,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      })),
      confetti: Array.from({ length: 34 }, (_, i) => ({
        left: r() * 100,
        w: 6 + r() * 6,
        h: 9 + r() * 8,
        dur: 9 + r() * 9,
        delay: -r() * 18,
        round: i % 3 === 0,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
      sparkles: Array.from({ length: 16 }, () => ({
        left: r() * 100,
        top: r() * 100,
        size: 10 + r() * 16,
        dur: 2.5 + r() * 3,
        delay: -r() * 5,
      })),
      hearts: Array.from({ length: 10 }, () => ({
        left: r() * 100,
        size: 12 + r() * 16,
        dur: 14 + r() * 12,
        delay: -r() * 24,
      })),
    };
  }, []);

  return (
    <div className="party-bg" aria-hidden="true">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="aurora aurora-d" />

      <svg
        className="bunting"
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
      >
        <path
          d="M-10 8 Q 300 70 600 30 T 1210 8"
          fill="none"
          stroke="#d99aab"
          strokeWidth="2"
        />
        {Array.from({ length: 22 }, (_, i) => {
          const x = 20 + i * 55;
          const t = x / 1200;
          // follow the curve approximately
          const y = 8 + Math.sin(t * Math.PI * 2 - 0.4) * -10 + 28 * Math.sin(t * Math.PI);
          return (
            <polygon
              key={i}
              points={`${x - 17},${y} ${x + 17},${y} ${x},${y + 42}`}
              fill={FLAG_COLORS[i % FLAG_COLORS.length]}
              opacity="0.85"
            />
          );
        })}
      </svg>

      {items.sparkles.map((s, i) => (
        <span
          key={`s${i}`}
          className="bg-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          ✦
        </span>
      ))}

      {items.hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="bg-heart"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}

      {items.balloons.map((b, i) => (
        <span
          key={`b${i}`}
          className="bg-balloon"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.22,
            background: `radial-gradient(circle at 32% 28%, #ffffffcc 0 9%, transparent 22%), ${b.color}`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {items.confetti.map((c, i) => (
        <span
          key={`c${i}`}
          className="bg-confetti"
          style={{
            left: `${c.left}%`,
            width: c.w,
            height: c.round ? c.w : c.h,
            borderRadius: c.round ? "50%" : 2,
            background: c.color,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      <svg className="bg-waves" viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path
          d="M0 90 C240 30 480 150 720 90 S1200 30 1440 90 V160 H0Z"
          fill="#f9b8c9"
          opacity="0.35"
        />
        <path
          d="M0 120 C260 70 520 160 780 115 S1220 70 1440 118 V160 H0Z"
          fill="#e9c9f2"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

function MusicButton({ muted, onToggle }) {
  return (
    <button
      className="music-button"
      onClick={onToggle}
      data-testid="music-toggle-button"
      aria-label={muted ? "Turn music on" : "Mute music"}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      <span>{muted ? "Sound off" : "Birthday sounds"}</span>
    </button>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState(null);
  const [muted, setMuted] = useState(true);
  const [visibleText, setVisibleText] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    if (view !== "letter") return undefined;

    let index = 0;

    const timer = window.setInterval(() => {
      index += 2;
      setVisibleText(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(timer);
      }
    }, 12);

    return () => window.clearInterval(timer);
  }, [view]);

  const celebrate = () => {
    setEntered(true);
    setMuted(false);

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const galleryIntro = useMemo(
    () => "Three little frames, a million little reasons to smile.",
    [],
  );

  return (
    <main className="birthday-app" data-testid="birthday-app">
      <PartyBackground />
      <div className="grain" />

      <MusicButton
        muted={muted}
        onToggle={() => {
          setMuted(!muted);

          if (muted) {
            audioRef.current?.play().catch(() => {});
          } else {
            audioRef.current?.pause();
          }
        }}
      />

      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/10/30/audio_946c8eec3e.mp3"
      />

      {!entered ? (
        <section className="opening-screen" data-testid="opening-screen">
          <div className="opening-copy">
            <p className="eyebrow">
              <Sparkles size={15} />
              a tiny surprise for you
            </p>

            <h1>
              Happy bdayyy,
              <br />
              <em>Dhritii</em>
            </h1>

            <p className="opening-subtitle">
              Some people make ordinary days feel like celebrations. This
              little corner is for one of them.
            </p>

            <button
              className="enter-button"
              onClick={celebrate}
              data-testid="open-birthday-button"
            >
              <span>Open your surprise</span>
              <Heart size={18} fill="currentColor" />
            </button>
          </div>

          <button
            className="hero-photo-wrap"
            onClick={celebrate}
            data-testid="hero-photo-button"
            aria-label="Open birthday surprise"
          >
            <div className="photo-tape" />

            <img
              className="hero-photo"
              src={photos[0].src}
              alt="Dhritii smiling at night"
            />

            <div className="photo-caption">
              <span>for the sweetest soul</span>
              <Heart size={17} fill="currentColor" />
            </div>
          </button>

          <p className="scroll-note">
            tap the photo to begin <span>↓</span>
          </p>
        </section>
      ) : view === null ? (
        <section className="choice-screen" data-testid="choice-screen">
          <div className="choice-heading">
            <p className="eyebrow">
              <Sparkles size={15} />
              the surprise is open
            </p>

            <h2>Where should we begin?</h2>

            <p>Pick a little piece of this birthday made just for you.</p>
          </div>

          <div className="choice-grid">
            <button
              className="choice-card letter-choice"
              onClick={() => setView("letter")}
              data-testid="birthday-letter-option"
            >
              <span className="balloon balloon-pink">♡</span>
              <span className="card-number">01</span>

              <h3>
                Happy Birthday
                <br />
                <em>Dhritii</em>
              </h3>

              <p>A note from the heart, just for you</p>
              <span className="card-arrow">↗</span>
            </button>

            <button
              className="choice-card gallery-choice"
              onClick={() => setView("gallery")}
              data-testid="photo-gallery-option"
            >
              <span className="balloon balloon-gold">
                <ImageIcon size={27} />
              </span>

              <span className="card-number">02</span>

              <h3>
                Little
                <br />
                <em>Memories</em>
              </h3>

              <p>Three frames of your lovely magic</p>
              <span className="card-arrow">↗</span>
            </button>
          </div>

          <button
            className="restart-link"
            onClick={() => setEntered(false)}
            data-testid="restart-surprise-button"
          >
            open from the beginning
          </button>
        </section>
      ) : view === "letter" ? (
        <section
          className="content-screen letter-screen"
          data-testid="birthday-letter-screen"
        >
          <button
            className="back-button"
            onClick={() => setView(null)}
            data-testid="back-to-options-button"
          >
            ← back to options
          </button>

          <div className="letter-layout">
            <div className="letter-intro">
              <p className="eyebrow">
                <Heart size={15} fill="currentColor" />
                a little letter
              </p>

              <h2>
                For you,
                <br />
                <em>Dhritii</em>
              </h2>

              <p className="side-note">
                Read this slowly. It was written with a very full heart.
              </p>
            </div>

            <article
              className="letter-card"
              data-testid="birthday-letter-content"
            >
              <div className="letter-top">
                <span>HAPPY BIRTHDAY</span>
                <span>♡ 2026</span>
              </div>

              <h3>To my favourite gossip partner,</h3>

              <p className="typewriter-text">
                {visibleText}
                <span className="cursor">|</span>
              </p>

              <div className="letter-footer">
                <span>with lots of love,</span>
                <strong>your friend, Reyansh ♡</strong>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section
          className="content-screen gallery-screen"
          data-testid="photo-gallery-screen"
        >
          <button
            className="back-button"
            onClick={() => setView(null)}
            data-testid="back-to-options-gallery-button"
          >
            ← back to options
          </button>

          <div className="gallery-heading">
            <div>
              <p className="eyebrow">
                <ImageIcon size={15} />
                the memory wall
              </p>

              <h2>
                Little moments,
                <br />
                <em>big smiles.</em>
              </h2>
            </div>

            <p>{galleryIntro}</p>
          </div>

          <div className="photo-grid">
            {photos.map((photo, index) => (
              <figure
                className={`memory-card ${photo.className}`}
                key={photo.src}
                data-testid={`memory-card-${index + 1}`}
              >
                <div className="memory-image-wrap">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="eager"
                    decoding="async"
                  />
                </div>

                <figcaption>
                  <span>{photo.tag}</span>
                  <h3>{photo.title}</h3>
                  <small>frame no. 0{index + 1}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {entered && view && (
        <button
          className="close-view"
          onClick={() => setView(null)}
          data-testid="close-view-button"
        >
          <X size={17} />
        </button>
      )}
    </main>
  );
}

export default App;
