import React, { useEffect, useState } from 'react';

const FinalScreen = () => {
    const [fireworks, setFireworks] = useState([]);
    const [hearts, setHearts] = useState([]);

    // Fireworks effect
    useEffect(() => {
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
    }, []);

    // Floating hearts
    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now() + Math.random();
            const left = Math.random() * 100;
            const duration = 5 + Math.random() * 3;
            const size = 28 + Math.random() * 18;
            setHearts(prev => [...prev, { id, left, duration, size }]);
            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id));
            }, duration * 1000);
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="final-screen-container">
            {/* Fireworks */}
            {fireworks.map(firework => (
                <div
                    key={firework.id}
                    className="final-firework"
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
                            className="final-firework-particle"
                            style={{ '--angle': `${i * 30}deg` }}
                        />
                    ))}
                </div>
            ))}

            {/* Floating hearts */}
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="heart"
                    style={{
                        left: `${heart.left}%`,
                        animationDuration: `${heart.duration}s`,
                        fontSize: `${heart.size}px`
                    }}
                >
                    ❤️
                </div>
            ))}

            <div className="glass-card final-card">
                <h1 className="final-title">Thank You, Likitha 💖</h1>

                <div className="final-message-box">
                    <p className="final-message">
                        For 7 beautiful years of love, laughter, and memories.
                    </p>
                    <p className="final-message">
                        For being my constant through every moment.
                    </p>
                    <p className="final-message">
                        For saying yes to forever.
                    </p>
                </div>

                <div className="final-divider">
                    <span>✨</span>
                    <span>💖</span>
                    <span>✨</span>
                </div>

                <p className="final-quote">
                    "Here's to our forever, my love."
                </p>

                <p className="final-signature">
                    Always yours,<br />
                    <span className="signature-name">favzzz Manuuuuu(mamuuuu)</span>
                </p>
            </div>
        </div>
    );
};

export default FinalScreen;
