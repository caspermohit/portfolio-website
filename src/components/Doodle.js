import React, { useEffect, useRef, useState } from 'react';


// Original ink drawings, in a fixed 160 × 120 stage; only the inner layers move.
const drawings = {
    browser: <><path d="M18 25 Q76 20 140 26 L138 95 Q80 99 19 94 Z M20 40 L139 40" /><circle cx="28" cy="32" r="1" /><circle cx="35" cy="32" r="1" /><path d="M47 56 L35 66 L47 76 M99 56 L111 66 L99 76 M80 51 L68 81" /><g className="doodle-cursor"><path d="M114 75 L116 98 L123 91 L132 96 L136 90 L126 85 L134 81 Z" fill="var(--color-secondary)" /></g><path d="M28 105 Q80 109 133 104" /></>,
    pencil: <><path d="M30 26 L113 22 L121 103 L27 99 Z M40 43 Q64 39 90 42 M40 53 L75 51 M40 82 Q56 65 68 79 T103 78" /><g className="doodle-pencil"><path d="M91 77 L127 19 Q131 13 139 18 Q144 22 139 28 L102 86 L89 91 Z" fill="var(--color-secondary)" /><path d="M91 77 L102 86 M126 21 L137 28 M97 80 L132 25 M89 91 L94 84" /></g></>,
    film: <><path d="M27 46 L134 46 L131 103 L29 101 Z" /><g className="doodle-clapper"><path d="M27 45 L25 29 L131 16 L134 32 Z" fill="var(--color-secondary)" /><path d="M39 28 L53 41 M62 25 L76 38 M85 22 L99 35 M108 19 L122 32" /></g><path d="M69 62 L69 88 L94 75 Z" /><circle cx="33" cy="45" r="3" /></>,
};

export default function Doodle({ name, className = '' }) {
    const root = useRef(null);
    const [visible, setVisible] = useState(false);
    const [reduced, setReduced] = useState(true);
    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(preference.matches);
        update();
        preference.addEventListener('change', update);
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
        observer.observe(root.current);
        const visibility = () => { if (document.hidden) setVisible(false); else setVisible(root.current.getBoundingClientRect().bottom > 0 && root.current.getBoundingClientRect().top < window.innerHeight); };
        document.addEventListener('visibilitychange', visibility);
        return () => { observer.disconnect(); preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
    }, []);
    return <span ref={root} className={`editorial-doodle ${className}${visible && !reduced ? " is-live" : ""}`}>
        {drawings[name] ? <svg viewBox="0 0 160 120" aria-hidden="true" className="ink-doodle">{drawings[name]}</svg> : <img src={`/motion/${name}.${visible && !reduced ? 'gif' : 'svg'}`} alt="" width="960" height="720" loading="lazy" />}
    </span>;
}
