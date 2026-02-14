import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import GiftSection from './GiftSection';

function Valentine({ from, to, customMsg }) {
    const [answer, setAnswer] = useState(null); // null | 'yes' | 'maybe' | 'no'
    const [showGifts, setShowGifts] = useState(false);
    const [maybeMsg, setMaybeMsg] = useState('');
    const [celebrating, setCelebrating] = useState(false);
    const noButtonRef = useRef(null);
    const containerRef = useRef(null);

    const displayTo = to || 'My Love';
    const displayFrom = from || 'Someone Special';

    // ── Evading No Button ──────────────────────────────────
    const moveNoButton = useCallback(() => {
        const btn = noButtonRef.current;
        const container = containerRef.current;
        if (!btn || !container) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;

        const newX = Math.max(10, Math.random() * maxX);
        const newY = Math.max(10, Math.random() * maxY);

        btn.style.position = 'absolute';
        btn.style.left = `${newX}px`;
        btn.style.top = `${newY}px`;
        btn.style.transition = 'all 0.2s ease';
    }, []);

    const handleNo = useCallback(() => {
        moveNoButton();
    }, [moveNoButton]);

    // ── Maybe Handler ──────────────────────────────────
    const handleMaybe = useCallback(() => {
        setAnswer('maybe');
        setMaybeMsg("Think again... my heart chose you already ❤️");
        setTimeout(() => {
            setAnswer(null);
            setMaybeMsg('');
        }, 3500);
    }, []);

    // ── YES Handler — Full Celebration ──────────────────────────────────
    const launchCelebration = useCallback(() => {
        setAnswer('yes');
        setCelebrating(true);

        // Confetti Burst
        const duration = 5000;
        const end = Date.now() + duration;

        const fireConfetti = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.7 },
                colors: ['#E63946', '#FFB6C1', '#FFD700', '#C084FC', '#FF6B81'],
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.7 },
                colors: ['#E63946', '#FFB6C1', '#FFD700', '#C084FC', '#FF6B81'],
            });
            if (Date.now() < end) requestAnimationFrame(fireConfetti);
        };
        fireConfetti();

        // Heart Cannon
        setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.6 },
                shapes: ['circle'],
                colors: ['#E63946', '#FF6B81', '#FFB6C1', '#C084FC'],
                scalar: 1.5,
            });
        }, 500);

        // Star burst
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 120,
                startVelocity: 45,
                origin: { y: 0.5 },
                shapes: ['star'],
                colors: ['#FFD700', '#FFA500', '#FFB6C1'],
                scalar: 2,
            });
        }, 1500);

        // Show gifts after celebration
        setTimeout(() => {
            setShowGifts(true);
        }, 3000);
    }, []);

    // ── Flower Falling on YES ──────────────────────────────────
    const [fallingFlowers, setFallingFlowers] = useState([]);

    useEffect(() => {
        if (answer === 'yes') {
            const flowers = [];
            for (let i = 0; i < 30; i++) {
                flowers.push({
                    id: i,
                    emoji: ['🌹', '🌸', '🌺', '💐', '🏵️', '🌷'][i % 6],
                    left: Math.random() * 100,
                    delay: Math.random() * 3,
                    duration: 3 + Math.random() * 4,
                    size: 1 + Math.random() * 1.5,
                });
            }
            setFallingFlowers(flowers);
        }
    }, [answer]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: answer === 'yes' ? 'flex-start' : 'center',
                padding: '40px 20px',
                position: 'relative',
                zIndex: 1,
                paddingTop: answer === 'yes' ? '80px' : '40px',
                gap: '40px',
            }}
        >
            {/* Celebration Glow */}
            {celebrating && <div className="celebration-glow" />}

            {/* Falling Flowers on YES */}
            <AnimatePresence>
                {fallingFlowers.map((flower) => (
                    <motion.div
                        key={flower.id}
                        initial={{
                            opacity: 0,
                            y: -50,
                            x: `${flower.left}vw`,
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: ['0vh', '110vh'],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: flower.duration,
                            delay: flower.delay,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        style={{
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            fontSize: `${flower.size}rem`,
                            pointerEvents: 'none',
                            zIndex: 55,
                        }}
                    >
                        {flower.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* ── Main Proposal Card ── */}
            <motion.div
                className="glass-card"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', damping: 18 }}
                style={{
                    maxWidth: '560px',
                    width: '100%',
                    padding: '48px 36px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: answer === 'yes' ? 'visible' : 'hidden',
                }}
            >
                {/* Opening Envelope Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                    style={{ fontSize: '4rem', marginBottom: '20px' }}
                >
                    💌
                </motion.div>

                {/* Custom Message if provided */}
                {customMsg && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            fontStyle: 'italic',
                            opacity: 0.85,
                            fontSize: '1rem',
                            marginBottom: '16px',
                            lineHeight: 1.5,
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            borderLeft: '3px solid rgba(255,215,0,0.5)',
                        }}
                    >
                        &ldquo;{customMsg}&rdquo;
                    </motion.p>
                )}

                {/* Main Romantic Message */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom: '12px',
                        background: 'linear-gradient(135deg, #fff, #FFD700, #FFB6C1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {displayTo}, will you be my Valentine tonight?
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    style={{
                        fontSize: '3rem',
                        marginBottom: '8px',
                        animation: 'heartbeat 1.5s ease-in-out infinite',
                    }}
                >
                    ❤️
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        opacity: 0.75,
                        fontSize: '0.9rem',
                        marginBottom: '32px',
                    }}
                >
                    — With love, {displayFrom} 💕
                </motion.p>

                {/* ── Answer Buttons ── */}
                {answer !== 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '14px',
                            position: 'relative',
                            minHeight: '200px',
                        }}
                    >
                        {/* YES Button */}
                        <motion.button
                            className="btn-valentine btn-yes"
                            onClick={launchCelebration}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ width: '100%', maxWidth: '280px' }}
                        >
                            💖 YES
                        </motion.button>

                        {/* Maybe Button */}
                        <motion.button
                            className="btn-valentine btn-maybe"
                            onClick={handleMaybe}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ width: '100%', maxWidth: '280px' }}
                        >
                            🙈 Maybe
                        </motion.button>

                        {/* No Button — Evades! */}
                        <motion.button
                            ref={noButtonRef}
                            className="btn-valentine btn-no"
                            onClick={handleNo}
                            onMouseEnter={moveNoButton}
                            onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
                            whileTap={{ scale: 0.9 }}
                            style={{ width: '100%', maxWidth: '280px' }}
                        >
                            😅 No
                        </motion.button>
                    </motion.div>
                )}

                {/* ── Maybe Message ── */}
                <AnimatePresence>
                    {maybeMsg && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ type: 'spring', damping: 12 }}
                            style={{
                                marginTop: '20px',
                                padding: '20px',
                                background: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(230,57,70,0.2))',
                                borderRadius: '16px',
                                border: '1px solid rgba(192,132,252,0.3)',
                            }}
                        >
                            <p style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                            }}>
                                {maybeMsg}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── YES Celebration Message ── */}
                {answer === 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', damping: 12 }}
                        style={{ marginTop: '24px' }}
                    >
                        <motion.div
                            animate={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: '3rem', marginBottom: '12px' }}
                        >
                            🎉💕🎉
                        </motion.div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                            background: 'linear-gradient(135deg, #FFD700, #E63946, #C084FC)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '8px',
                        }}>
                            She said YES! 💝
                        </h2>
                        <p style={{ opacity: 0.85, fontSize: '1rem', lineHeight: 1.5 }}>
                            Tonight is going to be magical, {displayTo}! ✨
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* ── Gift Section (after YES) ── */}
            <AnimatePresence>
                {showGifts && (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{ type: 'spring', damping: 18 }}
                        style={{ width: '100%', paddingBottom: '60px' }}
                    >
                        <GiftSection />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Valentine;
