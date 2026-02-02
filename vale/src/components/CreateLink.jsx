import { useState } from 'react';

function CreateLink() {
    const [partnerName, setPartnerName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');

    const generateLink = () => {
        if (partnerName.trim()) {
            const link = `${window.location.origin}${window.location.pathname}#question?name=${encodeURIComponent(partnerName.trim())}`;
            setGeneratedLink(link);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink).then(() => {
            alert('Link copied! 💕 Share it with your Valentine!');
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            generateLink();
        }
    };

    return (
        <>
            {/* Floating Hearts Background */}
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

            <div className="glass-card">
                <h1>💝 Valentine's Day 💝</h1>
                <p>Create a special link to ask that special someone!</p>

                <div className="input-group">
                    <label htmlFor="partnerName">Enter Your Partner's Name:</label>
                    <input
                        type="text"
                        id="partnerName"
                        placeholder="e.g., Sarah"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />
                </div>

                <button className="btn-primary" onClick={generateLink} style={{ width: '100%' }}>
                    Generate Link ✨
                </button>

                {generatedLink && (
                    <div className="link-display">
                        <span className="link-text">{generatedLink}</span>
                        <button className="btn-copy" onClick={copyToClipboard}>
                            📋 Copy Link
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CreateLink;
