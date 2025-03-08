import React, { useEffect, useState } from 'react';
import './Cursor.css';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        const mMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const mLeave = () => setHidden(true);
        const mEnter = () => setHidden(false);
        const mDown = () => setClicked(true);
        const mUp = () => setClicked(false);

        const handleLinkHover = (e) => {
            setLinkHovered(true);
            setText(e.target.getAttribute('data-cursor-text') || '');
        };
        
        const handleLinkLeave = () => {
            setLinkHovered(false);
            setText('');
        };

        document.addEventListener('mousemove', mMove);
        document.addEventListener('mouseleave', mLeave);
        document.addEventListener('mouseenter', mEnter);
        document.addEventListener('mousedown', mDown);
        document.addEventListener('mouseup', mUp);

        const links = document.querySelectorAll('a, button, [data-cursor]');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        return () => {
            document.removeEventListener('mousemove', mMove);
            document.removeEventListener('mouseleave', mLeave);
            document.removeEventListener('mouseenter', mEnter);
            document.removeEventListener('mousedown', mDown);
            document.removeEventListener('mouseup', mUp);

            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <div
                className={`cursor-ring ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            >
                {text && <span className="cursor-text">{text}</span>}
            </div>
        </>
    );
};

export default Cursor; 