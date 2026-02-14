import { useMemo } from 'react';

const HEARTS = ['💕', '❤️', '💖', '💗', '💓', '💘', '💝', '♥️'];
const ROSES = ['🌹', '🌸', '🌺', '🏵️', '💐'];
const LETTERS = ['💌', '✉️', '📩'];

function BackgroundEffects() {
    const particles = useMemo(() => {
        const items = [];

        // Hearts floating up
        for (let i = 0; i < 15; i++) {
            items.push({
                type: 'heart',
                emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 20}s`,
                duration: `${12 + Math.random() * 18}s`,
                size: `${0.8 + Math.random() * 1.2}rem`,
            });
        }

        // Roses falling down
        for (let i = 0; i < 8; i++) {
            items.push({
                type: 'rose',
                emoji: ROSES[Math.floor(Math.random() * ROSES.length)],
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 25}s`,
                duration: `${18 + Math.random() * 15}s`,
                size: `${1 + Math.random() * 1}rem`,
            });
        }

        // Love letters floating
        for (let i = 0; i < 6; i++) {
            items.push({
                type: 'letter',
                emoji: LETTERS[Math.floor(Math.random() * LETTERS.length)],
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 30}s`,
                duration: `${20 + Math.random() * 15}s`,
                size: `${1 + Math.random() * 0.8}rem`,
            });
        }

        return items;
    }, []);

    return (
        <div className="bg-particles" aria-hidden="true">
            {particles.map((p, i) => (
                <span
                    key={i}
                    className={
                        p.type === 'heart'
                            ? 'heart-particle'
                            : p.type === 'rose'
                                ? 'rose-particle'
                                : 'letter-particle'
                    }
                    style={{
                        left: p.left,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                        fontSize: p.size,
                    }}
                >
                    {p.emoji}
                </span>
            ))}
        </div>
    );
}

export default BackgroundEffects;
