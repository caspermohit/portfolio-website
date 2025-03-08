import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lastTime = 0;

        // Set initial canvas size
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr); // Scale for retina displays
        };

        const createParticles = () => {
            particles.current = [];
            // Increase number of particles
            const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000);
            
            for (let i = 0; i < numParticles; i++) {
                particles.current.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 3 + 1, // Slightly larger particles
                    speedX: (Math.random() - 0.5) * 3, // Faster movement
                    speedY: (Math.random() - 0.5) * 3,
                    life: Math.random() * 0.5 + 0.5
                });
            }
        };

        const updateParticles = (deltaTime) => {
            particles.current.forEach(particle => {
                // Move particles
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Mouse interaction with stronger effect
                const dx = mouse.current.x - particle.x;
                const dy = mouse.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200; // Increased interaction range

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.speedX -= dx * force * 0.03;
                    particle.speedY -= dy * force * 0.03;
                }

                // Wrap around edges instead of bouncing
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                // Apply friction
                particle.speedX *= 0.98;
                particle.speedY *= 0.98;

                // Fade effect
                particle.life -= 0.0005 * deltaTime;
                if (particle.life <= 0) {
                    particle.life = 1;
                    particle.x = Math.random() * window.innerWidth;
                    particle.y = Math.random() * window.innerHeight;
                }
            });
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw particles
            particles.current.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(var(--accent-rgb), ${particle.life * 0.5})`; // Increased opacity
                ctx.fill();
            });

            // Draw connections with increased range
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(var(--accent-rgb), 0.15)'; // Increased opacity
            ctx.lineWidth = 0.5;

            particles.current.forEach((p1, i) => {
                particles.current.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) { // Increased connection range
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                });
            });
            ctx.stroke();
        };

        const animate = (timestamp) => {
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            updateParticles(deltaTime);
            drawParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        // Initialize
        resizeCanvas();
        createParticles();

        // Event listeners
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        window.addEventListener('mousemove', handleMouseMove);
        
        // Start animation
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground; 