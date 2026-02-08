import React, { useState, useRef } from 'react';
import ProposalScreen from './components/ProposalScreen';
import CelebrationScreen from './components/CelebrationScreen';
import MarriageProposal from './components/MarriageProposal';
import FinalScreen from './components/FinalScreen';

// Particle effects for background
const Particles = () => {
  return (
    <div className="particles">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            '--x-offset': `${(Math.random() - 0.5) * 200}px`
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [screen, setScreen] = useState('proposal'); // 'proposal', 'celebration', 'marriage', 'final'
  const audioRef = useRef(null);

  const handleBack = () => {
    if (screen === 'final') setScreen('marriage');
    else if (screen === 'marriage') setScreen('celebration');
    else if (screen === 'celebration') setScreen('proposal');
  };

  const handleFirstAccept = () => {
    // Start music when first "Yes" is clicked
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Music started playing!");
          })
          .catch(err => {
            console.log("Audio play failed:", err);
          });
      }
    }
    setScreen('celebration');
  };

  const showBackButton = screen !== 'proposal';

  return (
    <div className="app-container">
      <Particles />

      {/* Background music - plays through entire experience */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/Preetiya%20Hesare%20Neenu%20(Unplugged)%20-%20Happy%20New%20Year%20(Official%20Video)%20Raghu%20Dixit%20Pannaga%20Bharana.mp3"
        onError={(e) => console.log("Audio error:", e)}
        onCanPlay={() => console.log("Audio can play")}
      />

      {/* Back Button */}
      {showBackButton && (
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
      )}

      {screen === 'proposal' && (
        <ProposalScreen onAccept={handleFirstAccept} audioRef={audioRef} />
      )}
      {screen === 'celebration' && (
        <CelebrationScreen onComplete={() => setScreen('marriage')} />
      )}
      {screen === 'marriage' && (
        <MarriageProposal onAccept={() => setScreen('final')} />
      )}
      {screen === 'final' && <FinalScreen />}
    </div>
  );
}

export default App;
