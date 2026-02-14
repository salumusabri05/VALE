import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date();
        // Target: Valentine's night, Feb 14, 11:59:59 PM of current year
        let target = new Date(now.getFullYear(), 1, 14, 23, 59, 59);

        // If Valentine's has passed this year, count to next year
        if (now > target) {
            target = new Date(now.getFullYear() + 1, 1, 14, 23, 59, 59);
        }

        const diff = target - now;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isTonight: true };

        // Check if it's Valentine's Day
        const isToday = now.getMonth() === 1 && now.getDate() === 14;

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
            isTonight: isToday,
        };
    }

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    const units = [
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ textAlign: 'center' }}
        >
            <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                marginBottom: '12px',
                opacity: 0.85,
                letterSpacing: '0.5px',
            }}>
                {timeLeft.isTonight ? '💕 Tonight is the night! 💕' : '⏰ Countdown to Valentine\'s Night'}
            </p>
            <div className="countdown-container">
                {units.map((unit, i) => (
                    <motion.div
                        key={unit.label}
                        className="countdown-unit"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                    >
                        <div className="number">{String(unit.value).padStart(2, '0')}</div>
                        <div className="label">{unit.label}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default CountdownTimer;
