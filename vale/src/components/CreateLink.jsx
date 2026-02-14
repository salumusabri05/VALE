import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

function CreateLink() {
    const [senderName, setSenderName] = useState('');
    const [valentineName, setValentineName] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    const generateLink = useCallback(() => {
        if (!senderName.trim() || !valentineName.trim()) return;

        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams({
            from: senderName.trim(),
            to: valentineName.trim(),
        });
        if (customMessage.trim()) {
            params.set('msg', customMessage.trim());
        }
        const link = `${baseUrl}?${params.toString()}`;
        setGeneratedLink(link);
        setCopied(false);

        // Trigger heart burst
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 3000);
    }, [senderName, valentineName, customMessage]);

    const copyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = generatedLink;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    }, [generatedLink]);

    const isValid = senderName.trim() && valentineName.trim();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/* Heart Burst Animation */}
            <AnimatePresence>
                {showHearts && (
                    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 60 }}>
                        {Array.from({ length: 25 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    opacity: 1,
                                    scale: 0,
                                    x: '50vw',
                                    y: '50vh',
                                }}
                                animate={{
                                    opacity: 0,
                                    scale: 1 + Math.random() * 2,
                                    x: `${Math.random() * 100}vw`,
                                    y: `${Math.random() * 100}vh`,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 + Math.random() * 1.5, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    fontSize: `${1.5 + Math.random() * 2}rem`,
                                }}
                            >
                                {['💕', '❤️', '💖', '💗', '💓', '💘', '💝', '🌹'][i % 8]}
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                className="glass-card"
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                style={{
                    maxWidth: '520px',
                    width: '100%',
                    padding: '48px 36px',
                    textAlign: 'center',
                }}
            >
                {/* Decorative Top */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                    style={{ fontSize: '3.5rem', marginBottom: '8px' }}
                >
                    💌
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                        fontWeight: 700,
                        marginBottom: '8px',
                        lineHeight: 1.3,
                        background: 'linear-gradient(135deg, #fff, #FFD700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Create Your Valentine Surprise
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        opacity: 0.8,
                        fontSize: '0.95rem',
                        marginBottom: '32px',
                        lineHeight: 1.5,
                    }}
                >
                    Generate a magical link for your special someone ✨
                </motion.p>

                {/* Form */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}
                >
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '6px', display: 'block' }}>
                            Your Name 💑
                        </label>
                        <input
                            className="input-valentine"
                            type="text"
                            placeholder="Enter your name..."
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            maxLength={30}
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '6px', display: 'block' }}>
                            Your Valentine&apos;s Name 💝
                        </label>
                        <input
                            className="input-valentine"
                            type="text"
                            placeholder="Enter their name..."
                            value={valentineName}
                            onChange={(e) => setValentineName(e.target.value)}
                            maxLength={30}
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '6px', display: 'block' }}>
                            Custom Message (optional) 💬
                        </label>
                        <input
                            className="input-valentine"
                            type="text"
                            placeholder="Write a sweet message..."
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            maxLength={100}
                        />
                    </div>
                </motion.div>

                {/* Generate Button */}
                <motion.button
                    className={`btn-valentine btn-primary ${!isValid ? '' : ''}`}
                    onClick={generateLink}
                    disabled={!isValid}
                    whileHover={isValid ? { scale: 1.05 } : {}}
                    whileTap={isValid ? { scale: 0.95 } : {}}
                    style={{
                        width: '100%',
                        fontSize: '1.1rem',
                        padding: '16px',
                        opacity: isValid ? 1 : 0.5,
                        cursor: isValid ? 'pointer' : 'not-allowed',
                    }}
                >
                    Generate My Valentine Link ❤️
                </motion.button>

                {/* Generated Link Card */}
                <AnimatePresence>
                    {generatedLink && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            transition={{ type: 'spring', damping: 15 }}
                            style={{
                                marginTop: '24px',
                                padding: '20px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 215, 0, 0.3)',
                            }}
                        >
                            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '10px' }}>
                                🔗 Your shareable Valentine link:
                            </p>
                            <p style={{
                                fontSize: '0.85rem',
                                wordBreak: 'break-all',
                                background: 'rgba(0,0,0,0.2)',
                                padding: '12px',
                                borderRadius: '10px',
                                marginBottom: '14px',
                                lineHeight: 1.5,
                                fontFamily: 'monospace',
                            }}>
                                {generatedLink}
                            </p>
                            <motion.button
                                className={`btn-valentine ${copied ? 'btn-yes' : 'btn-copy'}`}
                                onClick={copyLink}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ width: '100%' }}
                            >
                                {copied ? (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring' }}
                                    >
                                        ✅ Copied! Send it with love 💕
                                    </motion.span>
                                ) : (
                                    '📋 Copy Link'
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Countdown Timer */}
                <div style={{ marginTop: '32px' }}>
                    <CountdownTimer />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default CreateLink;
