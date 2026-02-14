import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFTS = [
    { emoji: '💍', name: 'Ring', message: "A ring of forever love, coming your way! 💍✨" },
    { emoji: '🌹', name: 'Flowers', message: "A bouquet of roses, just for you! 🌹💕" },
    { emoji: '🍫', name: 'Snacks', message: "Sweet treats for the sweetest person! 🍫😋" },
    { emoji: '👗', name: 'Romantic Outfit', message: "Something special to make you shine! 👗✨" },
    { emoji: '🎁', name: 'Surprise Box', message: "A mystery surprise, wrapped with love! 🎁💝" },
];

function GiftSection() {
    const [selectedGift, setSelectedGift] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleGiftClick = useCallback((gift) => {
        setSelectedGift(gift);
        setShowPopup(true);
    }, []);

    const closePopup = useCallback(() => {
        setShowPopup(false);
        setTimeout(() => setSelectedGift(null), 300);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', damping: 20 }}
            style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #FFD700, #FFB6C1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Choose Your Valentine Gift Tonight 💝
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '28px' }}
            >
                Pick a special gift for tonight ✨
            </motion.p>

            {/* Gift Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                marginBottom: '20px',
            }}>
                {GIFTS.map((gift, index) => (
                    <motion.div
                        key={gift.name}
                        className="gift-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, type: 'spring', damping: 15 }}
                        whileHover={{ scale: 1.08, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGiftClick(gift)}
                    >
                        <motion.span
                            className="emoji"
                            whileHover={{
                                rotate: [0, -10, 10, -10, 0],
                                transition: { duration: 0.5 },
                            }}
                        >
                            {gift.emoji}
                        </motion.span>
                        <span className="gift-name">{gift.name}</span>

                        {/* Sparkle dots on hover - decorative */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                            }}
                            initial={false}
                        >
                            {[...Array(3)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        top: `${20 + i * 25}%`,
                                        left: `${15 + i * 30}%`,
                                        fontSize: '0.6rem',
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.7,
                                    }}
                                >
                                    ✨
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Gift Popup */}
            <AnimatePresence>
                {showPopup && selectedGift && (
                    <motion.div
                        className="popup-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                    >
                        <motion.div
                            className="popup-card"
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 15 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Animated gift emoji */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                                style={{ fontSize: '4rem', marginBottom: '16px' }}
                            >
                                {selectedGift.emoji}
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {selectedGift.name} Selected!
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{ marginBottom: '8px' }}
                            >
                                {selectedGift.message}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                style={{ fontSize: '1.2rem', fontWeight: 600, color: '#E63946' }}
                            >
                                Get ready, it&apos;s coming tonight 😘
                            </motion.p>

                            {/* Sparkle border animation */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    inset: -2,
                                    borderRadius: '26px',
                                    border: '2px solid transparent',
                                    pointerEvents: 'none',
                                }}
                                animate={{
                                    borderColor: ['rgba(255,215,0,0)', 'rgba(255,215,0,0.5)', 'rgba(255,215,0,0)'],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <motion.button
                                className="btn-valentine btn-primary"
                                onClick={closePopup}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ marginTop: '20px' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Close 💕
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default GiftSection;
