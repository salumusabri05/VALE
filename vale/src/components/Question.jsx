import { useState, useEffect, useRef } from 'react';

function Question() {
    const [partnerName, setPartnerName] = useState('');
    const [answered, setAnswered] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState(null);
    const noButtonRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Get partner name from URL
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const name = params.get('name');
        setPartnerName(name || 'Beautiful');
    }, []);

    const handleYes = () => {
        setAnswered(true);
        createEmojiRain();
    };

    const createEmojiRain = () => {
        const emojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'emoji-rain';
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.left = `${Math.random() * 100}%`;
                emoji.style.animationDelay = '0s';
                emoji.style.animationDuration = `${2 + Math.random() * 2}s`;
                document.body.appendChild(emoji);

                setTimeout(() => emoji.remove(), 3000);
            }, i * 50);
        }
    };

    const moveNoButton = (e) => {
        if (!noButtonRef.current) return;

        const button = noButtonRef.current;
        const buttonRect = button.getBoundingClientRect();

        // Get cursor/touch position
        let cursorX, cursorY;
        if (e.type.includes('touch')) {
            // Prevent default touch behavior (scrolling, etc.)
            e.preventDefault();
            // Get the first touch point
            const touch = e.touches?.[0] || e.changedTouches?.[0];
            if (!touch) return;
            cursorX = touch.clientX;
            cursorY = touch.clientY;
        } else {
            cursorX = e.clientX;
            cursorY = e.clientY;
        }

        // Calculate distance from cursor to button center
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        const distance = Math.sqrt(
            Math.pow(cursorX - buttonCenterX, 2) + Math.pow(cursorY - buttonCenterY, 2)
        );

        // Use larger detection radius for touch (touch is less precise)
        const detectionRadius = e.type.includes('touch') ? 180 : 150;

        // If cursor is too close, teleport button to random safe position
        if (distance < detectionRadius) {
            // Define safe boundaries with generous margins
            const margin = 80;
            const safeArea = {
                minX: margin,
                minY: margin,
                maxX: window.innerWidth - buttonRect.width - margin,
                maxY: window.innerHeight - buttonRect.height - margin
            };

            // Generate random position within safe area
            // Keep trying until we find a position far from cursor
            let newLeft, newTop, attempts = 0;
            do {
                newLeft = safeArea.minX + Math.random() * (safeArea.maxX - safeArea.minX);
                newTop = safeArea.minY + Math.random() * (safeArea.maxY - safeArea.minY);

                // Check if new position is far enough from cursor
                const newCenterX = newLeft + buttonRect.width / 2;
                const newCenterY = newTop + buttonRect.height / 2;
                const newDistance = Math.sqrt(
                    Math.pow(cursorX - newCenterX, 2) + Math.pow(cursorY - newCenterY, 2)
                );

                // If far enough or we've tried too many times, use this position
                if (newDistance > detectionRadius + 50 || attempts > 10) {
                    break;
                }
                attempts++;
            } while (attempts < 20);

            setNoButtonPosition({ top: newTop, left: newLeft });
        }
    };

    const handleNoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton(e);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
        moveNoButton(e);
    };

    if (answered) {
        return (
            <>
                <div className="hearts-bg">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="heart"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${6 + Math.random() * 4}s`,
                                fontSize: `${20 + Math.random() * 40}px`,
                            }}
                        >
                            💖
                        </div>
                    ))}
                </div>

                <div className="glass-card success-message">
                    <h1>I Love You, {partnerName}! ❤️</h1>
                    <span className="love-emoji">💕</span>
                    <p style={{ fontSize: '1.3rem' }}>
                        Thank you for saying yes! You've made me the happiest person alive! 💝
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="hearts-bg">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${8 + Math.random() * 4}s`,
                        }}
                    >
                        {['💕', '💖', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)]}
                    </div>
                ))}
            </div>

            <div className="glass-card" ref={containerRef}>
                <h2>💝 {partnerName} 💝</h2>
                <h1>Will You Be My Valentine?</h1>

                <div
                    className="button-container"
                    onMouseMove={moveNoButton}
                    onTouchMove={moveNoButton}
                >
                    <button className="btn-yes" onClick={handleYes}>
                        Yes! 💖
                    </button>

                    <button
                        ref={noButtonRef}
                        className="btn-no"
                        onClick={handleNoClick}
                        onMouseEnter={moveNoButton}
                        onTouchStart={handleTouchStart}
                        style={
                            noButtonPosition !== null
                                ? {
                                    position: 'fixed',
                                    top: `${noButtonPosition.top}px`,
                                    left: `${noButtonPosition.left}px`,
                                }
                                : {}
                        }
                    >
                        No
                    </button>
                </div>
            </div>
        </>
    );
}

export default Question;
