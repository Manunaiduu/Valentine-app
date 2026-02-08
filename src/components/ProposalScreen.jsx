import React, { useState, useEffect, useRef } from 'react';

// Personal journey messages with pet names
const messages = [
  "Hey Bunuuuu... Remember when we first met in 2019? 🏫",
  "7 years have passed since that day in school, Likimaa...",
  "From awkward teenagers to who we are today, Babyyy... 💫",
  "Through all the ups and downs, late-night talks, and silly fights, Bodiii...",
  "You've been my constant for 7 beautiful years, Bangaruuu. ❤️",
  "And I can't imagine my life without you, my love...",
  "So here's my question for year 8 and beyond, Likitha...",
  "Will you be my Valentine? Forever, Babyyy? 💕"
];

const ProposalScreen = ({ onAccept, audioRef }) => {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [celebrating, setCelebrating] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [floatingRoses, setFloatingRoses] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
  }, [step]);

  useEffect(() => {
    if (isTyping && displayedText.length < messages[step].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(messages[step].slice(0, displayedText.length + 1));
      }, 60);
      return () => clearTimeout(timeout);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping, step]);

  // Beautiful background animations
  useEffect(() => {
    if (!celebrating) {
      // Blinking outline hearts at random positions
      const heartInterval = setInterval(() => {
        const id = Date.now() + Math.random();
        const left = 5 + Math.random() * 90; // Full horizontal spread
        const top = 5 + Math.random() * 90; // Full vertical spread
        const size = 20 + Math.random() * 50; // More size variety
        const hue = Math.random() * 360; // Random color
        const duration = 2 + Math.random() * 2; // Blink duration
        const delay = Math.random() * 1;
        setFloatingRoses(prev => [...prev, { id, left, top, size, duration, delay, hue }]);
        setTimeout(() => {
          setFloatingRoses(prev => prev.filter(r => r.id !== id));
        }, (duration + delay) * 1000);
      }, 500); // More frequent

      // Sparkles
      const sparkleInterval = setInterval(() => {
        const id = Date.now() + Math.random();
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;
        setSparkles(prev => [...prev, { id, left, top, delay }]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== id));
        }, 3000);
      }, 800);

      return () => {
        clearInterval(heartInterval);
        clearInterval(sparkleInterval);
      };
    }
  }, [celebrating]);

  // Celebration fireworks effect
  useEffect(() => {
    if (celebrating) {
      const interval = setInterval(() => {
        const id = Date.now() + Math.random();
        const newFirework = {
          id,
          left: 20 + Math.random() * 60,
          bottom: 20 + Math.random() * 30,
          delay: Math.random() * 0.3,
          hue: Math.random() * 360
        };

        setFireworks(prev => [...prev, newFirework]);

        setTimeout(() => {
          setFireworks(prev => prev.filter(f => f.id !== id));
        }, 2000);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [celebrating]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  const handleNext = (e) => {
    createRipple(e);

    // Start music on first click
    if (step === 0 && audioRef?.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Music started!"))
          .catch(err => console.log("Audio play failed:", err));
      }
    }

    if (step < messages.length - 1) {
      setStep(s => s + 1);
    }
  };

  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
  const [isMoved, setIsMoved] = useState(false);

  const moveButton = () => {
    const padding = 60;
    const maxWidth = window.innerWidth - 180;
    const maxHeight = window.innerHeight - 120;
    const newTop = Math.max(padding, Math.random() * maxHeight);
    const newLeft = Math.max(padding, Math.random() * maxWidth);
    setNoButtonPos({ top: `${newTop}px`, left: `${newLeft}px` });
    setIsMoved(true);
  };

  const handleYesClick = (e) => {
    createRipple(e);
    setCelebrating(true);

    // Show celebration for 3 seconds then move to next screen
    setTimeout(() => {
      onAccept();
    }, 3000);
  };

  const isLastStep = step === messages.length - 1;

  return (
    <>
      {/* Beautiful Background Animations */}
      {!celebrating && (
        <div className="intro-background">
          {/* Blinking Outline Hearts */}
          {floatingRoses.map(heart => (
            <div
              key={heart.id}
              className="blinking-heart"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
                fontSize: `${heart.size}px`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
                '--heart-hue': heart.hue
              }}
            >
              ♡
            </div>
          ))}

          {/* Sparkles */}
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Celebration Fireworks Overlay */}
      {celebrating && (
        <div className="celebration-overlay">
          {fireworks.map(firework => (
            <div
              key={firework.id}
              className="firework"
              style={{
                left: `${firework.left}%`,
                bottom: `${firework.bottom}%`,
                animationDelay: `${firework.delay}s`,
                '--firework-hue': firework.hue
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="firework-particle"
                  style={{ '--angle': `${i * 30}deg` }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="glass-card" ref={cardRef}>
        {isLastStep ? (
          <>
            <h1>{messages[step]}</h1>
            <div className="btn-container">
              <button className="btn-primary" onClick={handleYesClick} disabled={celebrating}>
                {celebrating ? "💖 Getting ready... 💖" : "Yes! Forever 💕"}
              </button>
              <button
                className="btn-no"
                style={isMoved ? {
                  position: 'fixed',
                  top: noButtonPos.top,
                  left: noButtonPos.left,
                  margin: 0,
                  zIndex: 1000
                } : { position: 'relative' }}
                onMouseEnter={moveButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveButton();
                }}
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="intro-text">
              <span className="typing">{displayedText}</span>
            </p>
            {!isTyping && (
              <button className="btn-primary" onClick={handleNext}>
                {step === 0 ? "Take me back... 💭" : "Continue... →"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProposalScreen;
