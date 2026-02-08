import React, { useState, useRef } from 'react';

const MarriageProposal = ({ onAccept }) => {
    const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
    const [isMoved, setIsMoved] = useState(false);

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
        setTimeout(() => onAccept(), 300);
    };

    return (
        <div className="glass-card proposal-card">
            {/* Proposal Image - Add your image to public folder as 'proposal.jpg' */}
            <div className="proposal-image-container">
                <img
                    src="/WhatsApp Image 2026-02-08 at 3.00.36 PM.jpeg"
                    alt="Will you marry me?"
                    className="proposal-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="proposal-placeholder">💍<br/>Add proposal.jpg to public folder</div>';
                    }}
                />
            </div>

            <h1 className="proposal-title">Will You Marry Me, Likitha? 💍</h1>
            <p className="proposal-subtitle">My love, my Bunuuuu, my everything...</p>

            <div className="btn-container">
                <button className="btn-primary btn-yes-marriage" onClick={handleYesClick}>
                    Yes! I'll Marry You! 💕
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
        </div>
    );
};

export default MarriageProposal;
