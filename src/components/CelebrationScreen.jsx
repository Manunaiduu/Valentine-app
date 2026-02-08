import React, { useEffect, useState, useRef } from 'react';

const CelebrationScreen = ({ onComplete }) => {
    const [hearts, setHearts] = useState([]);
    const [backgroundHearts, setBackgroundHearts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const videoRef = useRef(null);

    // ALL YOUR MEMORIES - 9 photos + 2 videos!
    const memories = [
        { type: 'image', src: '/1img.jpg', caption: "Where it all began, Bunuuuu... ❤️" },
        { type: 'image', src: '/IMG_0062.jpg', caption: "This moment with you, Likimaa 💕" },
        { type: 'image', src: '/IMG_0845.jpg', caption: "Creating memories, Babyyy ✨" },
        { type: 'image', src: '/IMG_0856.jpg', caption: "Every adventure with you, Bodiii 🌟" },
        { type: 'video', src: '/FD6CFB81-AE7C-41B6-A243-FE4E7E2AADEB.mov', caption: "Our special moment, Likitha! 🎥💖" },
        { type: 'image', src: '/IMG_3421.jpg', caption: "Beautiful times, Bangaruuu 🌸" },
        { type: 'image', src: '/IMG_3434.jpg', caption: "Together always, Bunuuuu 💑" },
        { type: 'image', src: '/IMG_3460.jpg', caption: "Smiling with you, Likimaa 😊" },
        { type: 'image', src: '/IMG_4793.jpg', caption: "Perfect moments, Babyyy 🥰" },
        { type: 'image', src: '/IMG_9955.jpg', caption: "Forever together, Bodiii 💕" },
        { type: 'video', src: '/IMG_4851.MOV', caption: "This makes me smile, Bangaruuu! 🎥😍" },
    ];

    // Blinking outline hearts background
    useEffect(() => {
        const heartInterval = setInterval(() => {
            const id = Date.now() + Math.random();
            const left = 5 + Math.random() * 90;
            const top = 5 + Math.random() * 90;
            const size = 40 + Math.random() * 70; // Bigger hearts: 40-110px
            const hue = Math.random() * 360;
            const duration = 2.5 + Math.random() * 2;
            const delay = Math.random() * 1;
            setBackgroundHearts(prev => [...prev, { id, left, top, size, duration, delay, hue }]);
            setTimeout(() => {
                setBackgroundHearts(prev => prev.filter(r => r.id !== id));
            }, (duration + delay) * 1000);
        }, 400); // More frequent

        return () => clearInterval(heartInterval);
    }, []);

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

    useEffect(() => {
        const slideInterval = setInterval(() => {
            const nextIndex = (currentSlide + 1) % memories.length;
            changeSlide(nextIndex);

            // After last slide, wait a bit then move to proposal
            if (nextIndex === 0 && currentSlide === memories.length - 1) {
                setTimeout(() => onComplete(), 3000);
            }
        }, 5500);

        return () => clearInterval(slideInterval);
    }, [currentSlide, memories.length, onComplete]);

    useEffect(() => {
        if (videoRef.current && memories[currentSlide].type === 'video') {
            videoRef.current.play().catch(err => console.log("Video autoplay failed:", err));
        }
    }, [currentSlide]);

    const changeSlide = (newIndex) => {
        setTransitioning(true);

        if (videoRef.current && memories[currentSlide].type === 'video') {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

        // Smooth transition
        setTimeout(() => {
            setCurrentSlide(newIndex);
            setTimeout(() => {
                setTransitioning(false);
            }, 50);
        }, 400);
    };

    const handleImageClick = () => {
        const nextIndex = (currentSlide + 1) % memories.length;
        changeSlide(nextIndex);

        // If clicking on last image, go to proposal
        if (nextIndex === 0) {
            setTimeout(() => onComplete(), 1000);
        }
    };

    const currentMemory = memories[currentSlide];

    return (
        <div className="slideshow-container">
            {/* Blinking Outline Hearts Background */}
            <div className="intro-background">
                {backgroundHearts.map(heart => (
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
            </div>

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

            <div className="glass-card celebration-card">
                <h1>I Love You, Likitha! 💖</h1>

                <div className="journey-timeline">
                    <span className="timeline-label">Seven Years of Love</span>
                    <div className="timeline-years">2019 - 2026</div>
                </div>

                <div className="slideshow-wrapper" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                    <div
                        className={`slide ${transitioning ? 'transitioning' : ''}`}
                        key={currentSlide}
                    >
                        <div className="slide-inner">
                            <div className="slide-placeholder">
                                {currentMemory.type === 'image' ? (
                                    <img
                                        src={currentMemory.src}
                                        alt={`Memory ${currentSlide + 1}`}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `<span>📷<br/>Cannot find: <strong>${currentMemory.src}</strong></span>`;
                                        }}
                                    />
                                ) : (
                                    <video
                                        ref={videoRef}
                                        src={currentMemory.src}
                                        loop
                                        muted
                                        playsInline
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `<span>🎥<br/>Cannot find: <strong>${currentMemory.src}</strong></span>`;
                                        }}
                                    />
                                )}
                            </div>
                            <div className="caption-overlay">
                                <span className="caption-text">{currentMemory.caption}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slide-navigation">
                    {memories.map((_, idx) => (
                        <button
                            key={idx}
                            className={`nav-dot ${idx === currentSlide ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                changeSlide(idx);
                            }}
                            aria-label={`Go to memory ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${((currentSlide + 1) / memories.length) * 100}%` }}
                    />
                </div>

                <p className="slide-counter">
                    <span className="memory-label">Memory</span>
                    <span className="current-num">{currentSlide + 1}</span>
                    <span className="separator">/</span>
                    <span className="total-num">{memories.length}</span>
                </p>
            </div>
        </div>
    );
};

export default CelebrationScreen;
