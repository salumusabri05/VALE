import { useState, useRef, useEffect } from 'react';

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Create audio element with a royalty-free romantic melody using Web Audio API
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // We'll create a simple, gentle melody
        const createMelody = () => {
            const now = audioCtx.currentTime;
            const notes = [
                { freq: 523.25, start: 0, dur: 0.8 },    // C5
                { freq: 659.25, start: 0.8, dur: 0.8 },   // E5
                { freq: 783.99, start: 1.6, dur: 0.8 },   // G5
                { freq: 659.25, start: 2.4, dur: 0.8 },   // E5
                { freq: 587.33, start: 3.2, dur: 0.8 },   // D5
                { freq: 523.25, start: 4.0, dur: 0.8 },   // C5
                { freq: 493.88, start: 4.8, dur: 0.8 },   // B4
                { freq: 523.25, start: 5.6, dur: 1.2 },   // C5
                { freq: 392.00, start: 6.8, dur: 0.8 },   // G4
                { freq: 440.00, start: 7.6, dur: 0.8 },   // A4
                { freq: 523.25, start: 8.4, dur: 0.8 },   // C5
                { freq: 493.88, start: 9.2, dur: 0.8 },   // B4
                { freq: 440.00, start: 10.0, dur: 0.8 },  // A4
                { freq: 392.00, start: 10.8, dur: 0.8 },  // G4
                { freq: 349.23, start: 11.6, dur: 0.8 },  // F4
                { freq: 392.00, start: 12.4, dur: 1.2 },  // G4
            ];

            notes.forEach(({ freq, start, dur }) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0, now + start);
                gain.gain.linearRampToValueAtTime(0.06, now + start + 0.1);
                gain.gain.linearRampToValueAtTime(0.04, now + start + dur * 0.6);
                gain.gain.linearRampToValueAtTime(0, now + start + dur);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + start);
                osc.stop(now + start + dur);
            });
        };

        audioRef.current = { audioCtx, createMelody };

        return () => {
            audioCtx.close();
        };
    }, []);

    const [intervalId, setIntervalId] = useState(null);

    const toggleMusic = () => {
        if (isPlaying) {
            if (intervalId) clearInterval(intervalId);
            setIntervalId(null);
            setIsPlaying(false);
        } else {
            if (audioRef.current) {
                const { audioCtx, createMelody } = audioRef.current;
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                createMelody();
                const id = setInterval(() => {
                    createMelody();
                }, 14000);
                setIntervalId(id);
            }
            setIsPlaying(true);
        }
    };

    return (
        <button
            className="music-toggle"
            onClick={toggleMusic}
            title={isPlaying ? 'Mute Music' : 'Play Music'}
            aria-label="Toggle music"
        >
            {isPlaying ? '🔊' : '🔇'}
        </button>
    );
}

export default MusicPlayer;
