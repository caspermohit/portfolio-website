import React, { useEffect, useRef } from 'react';
import './BinaryField.css';

/**
 * Generative 0/1 atmosphere field — remapped to brand blue accents.
 */
const BinaryField = ({ density = 18, className = '' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;
        let cells = [];
        let cols = 0;
        let rows = 0;
        let cellW = 0;
        let cellH = 0;

        const resize = () => {
            const { width, height } = canvas.parentElement.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cols = Math.ceil(width / density);
            rows = Math.ceil(height / density);
            cellW = width / cols;
            cellH = height / rows;
            cells = Array.from({ length: cols * rows }, () => (Math.random() > 0.55 ? 1 : 0));
        };

        const draw = (t) => {
            const { width, height } = canvas.parentElement.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);
            ctx.font = `500 ${Math.max(9, density * 0.55)}px "IBM Plex Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < cells.length; i += 1) {
                const c = i % cols;
                const r = Math.floor(i / cols);
                // Slow shimmer — flip sparse bits
                if (!reduced && Math.random() < 0.002) {
                    cells[i] = cells[i] ^ 1;
                }
                const pulse = reduced ? 0.35 : 0.22 + 0.2 * Math.sin(t * 0.001 + c * 0.15 + r * 0.1);
                const on = cells[i] === 1;
                ctx.fillStyle = on
                    ? `rgba(52, 152, 219, ${0.18 + pulse})`
                    : `rgba(97, 218, 251, ${0.04 + pulse * 0.15})`;
                ctx.fillText(String(cells[i]), c * cellW + cellW / 2, r * cellH + cellH / 2);
            }

            if (!reduced) {
                raf = requestAnimationFrame(draw);
            }
        };

        resize();
        draw(0);
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, [density]);

    return (
        <div className={`binary-field ${className}`} aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default BinaryField;
