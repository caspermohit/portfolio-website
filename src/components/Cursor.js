import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Cursor.css';

const Cursor = () => {
    // Refs for cursor elements
    const cursorTagRef = useRef(null);
    const requestRef = useRef(null);
    const previousTimeRef = useRef(0);
    const trailsRef = useRef([]);
    
    // State for cursor behavior
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [info, setInfo] = useState('');
    const [cursorText, setCursorText] = useState('');
    
    // Mouse position with smooth interpolation
    const position = useRef({ x: 0, y: 0 });
    const cursorPosition = useRef({ x: 0, y: 0 });
    const targetElement = useRef(null);
    const magneticStrength = useRef(0);
    const positionHistory = useRef([]);

    // Animate cursor with requestAnimationFrame for smoother movement
    const animateCursor = useCallback((time) => {
        if (previousTimeRef.current === 0) {
            previousTimeRef.current = time;
        }
        
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;
        
        // Calculate smooth movement with lerp (linear interpolation)
        const easing = 0.15;
        cursorPosition.current.x += (position.current.x - cursorPosition.current.x) * Math.min(1, easing * (deltaTime / 16));
        cursorPosition.current.y += (position.current.y - cursorPosition.current.y) * Math.min(1, easing * (deltaTime / 16));

        // Store position history for trails
        positionHistory.current.push({x: cursorPosition.current.x, y: cursorPosition.current.y});
        if (positionHistory.current.length > 10) {
            positionHistory.current.shift();
        }

        // Handle magnetic effect for targeted elements
        if (targetElement.current && magneticStrength.current > 0) {
            const rect = targetElement.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance and apply magnetic pull
            const distanceX = centerX - position.current.x;
            const distanceY = centerY - position.current.y;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const maxDistance = 150; // Maximum distance for magnetic effect
            
            if (distance < maxDistance) {
                const pull = (1 - (distance / maxDistance)) * magneticStrength.current;
                cursorPosition.current.x += distanceX * pull * (deltaTime / 16);
                cursorPosition.current.y += distanceY * pull * (deltaTime / 16);
            }
        }

        // Apply transform with hardware acceleration
        if (cursorTagRef.current) {
            cursorTagRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
            
            // Update trail elements
            trailsRef.current.forEach((trail, index) => {
                const pos = positionHistory.current[Math.max(0, positionHistory.current.length - 1 - index * 2)];
                if (pos && trail) {
                    const scale = 1 - (index * 0.1);
                    const opacity = 1 - (index * 0.15);
                    trail.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`;
                    trail.style.opacity = opacity.toString();
                }
            });
        }
        
        requestRef.current = requestAnimationFrame(animateCursor);
    }, []);
    
    // Track mouse movement
    const handleMouseMove = useCallback((e) => {
        position.current.x = e.clientX;
        position.current.y = e.clientY;
    }, []);
    
    // Handle cursor visibility
    const handleMouseLeave = useCallback(() => {
        if (cursorTagRef.current) {
            cursorTagRef.current.classList.add('hidden');
            trailsRef.current.forEach(trail => {
                trail.classList.add('hidden');
            });
        }
    }, []);
    
    const handleMouseEnter = useCallback(() => {
        if (cursorTagRef.current) {
            cursorTagRef.current.classList.remove('hidden');
            trailsRef.current.forEach(trail => {
                trail.classList.remove('hidden');
            });
        }
    }, []);
    
    // Handle mouse button states
    const handleMouseDown = useCallback(() => {
        setClicked(true);
    }, []);
    
    const handleMouseUp = useCallback(() => {
        setClicked(false);
    }, []);

    // Handle interactive elements
    const handleElementHover = useCallback((e) => {
        setHovered(true);
        const element = e.currentTarget;
        targetElement.current = element;
        
        // Get element attributes for cursor customization
        const hoverText = element.getAttribute('data-cursor-text') || '';
        const hoverInfo = element.getAttribute('data-cursor-info') || '';
        const magnetic = element.getAttribute('data-cursor-magnetic');
        
        setCursorText(hoverText);
        setInfo(hoverInfo);
        magneticStrength.current = magnetic ? parseFloat(magnetic) || 0.3 : 0;
        
        // Add custom class if specified
        const customClass = element.getAttribute('data-cursor-class');
        if (cursorTagRef.current && customClass) {
            cursorTagRef.current.classList.add(...customClass.split(' '));
        }
    }, []);
    
    const handleElementLeave = useCallback(() => {
        setHovered(false);
        setCursorText('');
        setInfo('');
        targetElement.current = null;
        magneticStrength.current = 0;
        
        // Remove any custom classes
        if (cursorTagRef.current) {
            const customClasses = cursorTagRef.current.className.split(' ')
                .filter(cls => !['cursor-tag', 'clicked', 'hovered', 'hidden'].includes(cls));
            
            customClasses.forEach(cls => {
                cursorTagRef.current.classList.remove(cls);
            });
        }
    }, []);

    // Update cursor appearance based on state
    useEffect(() => {
        if (cursorTagRef.current) {
            if (clicked) {
                cursorTagRef.current.classList.add('clicked');
                trailsRef.current.forEach(trail => {
                    trail.classList.add('clicked');
                });
            } else {
                cursorTagRef.current.classList.remove('clicked');
                trailsRef.current.forEach(trail => {
                    trail.classList.remove('clicked');
                });
            }
            
            if (hovered) {
                cursorTagRef.current.classList.add('hovered');
            } else {
                cursorTagRef.current.classList.remove('hovered');
            }
        }
    }, [clicked, hovered]);

    // Create trail elements
    useEffect(() => {
        const container = document.createElement('div');
        container.className = 'cursor-trails-container';
        document.body.appendChild(container);
        
        // Create trail elements
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.innerHTML = '</>';
            container.appendChild(trail);
            trailsRef.current.push(trail);
        }
        
        return () => {
            document.body.removeChild(container);
            trailsRef.current = [];
        };
    }, []);

    // Set up event listeners and animation loop
    useEffect(() => {
        // Initialize cursor positions to prevent jump on page load
        const initialMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        position.current = initialMousePos;
        cursorPosition.current = { ...initialMousePos };
        
        // Start animation loop
        requestRef.current = requestAnimationFrame(animateCursor);
        
        // Use passive and capture for maximum performance
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Detect interactive elements with IntersectionObserver for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.addEventListener('mouseenter', handleElementHover);
                    entry.target.addEventListener('mouseleave', handleElementLeave);
                } else {
                    entry.target.removeEventListener('mouseenter', handleElementHover);
                    entry.target.removeEventListener('mouseleave', handleElementLeave);
                }
            });
        }, { threshold: 0.1 });

        // Only select items that need cursor effects
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
        interactiveElements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            cancelAnimationFrame(requestRef.current);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);

            // Clean up observer
            observer.disconnect();
            
            // Clean up any remaining event listeners
            interactiveElements.forEach(element => {
                element.removeEventListener('mouseenter', handleElementHover);
                element.removeEventListener('mouseleave', handleElementLeave);
            });
        };
    }, [animateCursor, handleMouseMove, handleMouseLeave, handleMouseEnter, 
        handleMouseDown, handleMouseUp, handleElementHover, handleElementLeave]);

    // Check if device supports hover to avoid showing cursor on touch devices
    const hasHoverSupport = () => {
        return window.matchMedia('(hover: hover)').matches;
    };

    // Only render cursor if device supports hover
    if (typeof window !== 'undefined' && !hasHoverSupport()) {
        return null;
    }

    return (
        <>
            <div ref={cursorTagRef} className="cursor-tag">
                <span className="cursor-tag-content">&lt;/&gt;</span>
                {cursorText && <span className="cursor-text">{cursorText}</span>}
                {info && <span className="cursor-info">{info}</span>}
            </div>
        </>
    );
};

export default Cursor; 