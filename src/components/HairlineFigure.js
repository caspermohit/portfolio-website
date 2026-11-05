import React, { useEffect, useRef, useState } from 'react';

const loadHairline = () => import('@lucasmarkes/hairline');

export function useIllustrationMotion() {
    const [playing, setPlaying] = useState(false);
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            setReduced(preference.matches);
            setPlaying(!preference.matches && window.matchMedia('(pointer: fine)').matches);
        };
        update();
        preference.addEventListener('change', update);
        return () => preference.removeEventListener('change', update);
    }, []);
    return { playing: playing && !reduced, reduced, toggle: () => setPlaying(value => !value) };
}

/** Load once near the viewport; keep the SVG lifecycle outside React's tree. */
export default function HairlineFigure({ figure = 'terrain', label, playing = false, intensity = 0.65, className = '' }) {
    const host = useRef(null);
    const instance = useRef(null);
    const options = useRef({ label, play: playing, intensity, theme: 'light' });
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        options.current = { label, play: playing, intensity, theme: 'light' };
        instance.current?.update(options.current);
    }, [label, playing, intensity]);
    useEffect(() => {
        let disposed = false;
        let loading = false;
        setFailed(false);
        const mount = async () => {
            if (loading) return;
            loading = true;
            try {
                const library = await loadHairline();
                if (!disposed && host.current) instance.current = library[figure](host.current, options.current);
            } catch {
                if (!disposed) setFailed(true);
            }
        };
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                observer.disconnect();
                mount();
            }
        }, { rootMargin: '250px' });
        observer.observe(host.current);
        return () => {
            disposed = true;
            observer.disconnect();
            instance.current?.destroy();
            instance.current = null;
        };
    }, [figure]);
    return <div className={`hairline-figure ${className}`}>
        <div ref={host} className="hairline-host" />
        {failed && <div className="hairline-fallback"><span>Design, with another dimension.</span><p>The interactive illustration couldn’t load. You can still explore all my work below.</p></div>}
    </div>;
}
