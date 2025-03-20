import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Cursor.css';

const Cursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const textRef = useRef('');
    
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [info, setInfo] = useState('');

    // Direct DOM manipulation for speed
    const handleMouseMove = useCallback((e) => {
        if (cursorDotRef.current && cursorRingRef.current) {
            // Direct style manipulation is faster than React state updates
            cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorRingRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
    }, []);
    
    const handleMouseLeave = useCallback(() => {
        if (cursorDotRef.current && cursorRingRef.current) {
            cursorDotRef.current.classList.add('hidden');
            cursorRingRef.current.classList.add('hidden');
        }
    }, []);
    
    const handleMouseEnter = useCallback(() => {
        if (cursorDotRef.current && cursorRingRef.current) {
            cursorDotRef.current.classList.remove('hidden');
            cursorRingRef.current.classList.remove('hidden');
        }
    }, []);
    
    const handleMouseDown = useCallback(() => {
        setClicked(true);
    }, []);
    
    const handleMouseUp = useCallback(() => {
        setClicked(false);
    }, []);

    const handleLinkHover = useCallback((e) => {
        setHovered(true);
        const element = e.target;
        
        // Get hover information
        const hoverText = element.getAttribute('data-cursor-text') || '';
        const hoverInfo = element.getAttribute('data-cursor-info') || '';
        
        textRef.current = hoverText;
        setInfo(hoverInfo);
        
        // Add custom class if specified
        const customClass = element.getAttribute('data-cursor-class');
        if (cursorRingRef.current && customClass) {
            cursorRingRef.current.classList.add(customClass);
        }
    }, []);
    
    const handleLinkLeave = useCallback(() => {
        setHovered(false);
        textRef.current = '';
        setInfo('');
        
        // Remove any custom classes
        if (cursorRingRef.current) {
            const customClasses = cursorRingRef.current.getAttribute('data-cursor-class');
            if (customClasses) {
                customClasses.split(' ').forEach(cls => {
                    cursorRingRef.current.classList.remove(cls);
                });
            }
        }
    }, []);

    useEffect(() => {
        // Update classes based on state
        if (cursorDotRef.current && cursorRingRef.current) {
            if (clicked) {
                cursorDotRef.current.classList.add('clicked');
                cursorRingRef.current.classList.add('clicked');
            } else {
                cursorDotRef.current.classList.remove('clicked');
                cursorRingRef.current.classList.remove('clicked');
            }
            
            if (hovered) {
                cursorRingRef.current.classList.add('hovered');
            } else {
                cursorRingRef.current.classList.remove('hovered');
            }
        }
    }, [clicked, hovered]);

    useEffect(() => {
        // Use passive and capture for maximum performance
        document.addEventListener('mousemove', handleMouseMove, { passive: true, capture: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Only select items that need cursor effects
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleLinkHover);
            element.addEventListener('mouseleave', handleLinkLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);

            interactiveElements.forEach(element => {
                element.removeEventListener('mouseenter', handleLinkHover);
                element.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseDown, 
        handleMouseUp, handleLinkHover, handleLinkLeave]);

    return (
        <>
            <div
                ref={cursorDotRef}
                className="cursor-dot"
            />
            <div
                ref={cursorRingRef}
                className="cursor-ring"
            >
                <span className="cursor-text">{textRef.current}</span>
                {info && <span className="cursor-info">{info}</span>}
            </div>
        </>
    );
};

export default Cursor; 