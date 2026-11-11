import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Original portfolio artwork stays visible until the optional renderer is ready.
export default function BendingArtwork({ src, className = '', width, height }) {
    const host = useRef(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const media = gsap.matchMedia();
        media.add('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            let disposed = false;
            let destroy = () => {};
            import('three').then(THREE => {
                if (disposed) return;
                const element = host.current;
                let renderer;
                try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
                catch { return; }
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                element.appendChild(renderer.domElement);
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 20);
                camera.position.z = 3.8;
                const geometry = new THREE.PlaneGeometry(1.8 * width / height, 1.8, 32, 40);
                const uniforms = { time: { value: 0 }, bend: { value: 0 }, pointer: { value: new THREE.Vector2() }, artwork: { value: null } };
                const material = new THREE.ShaderMaterial({
                    uniforms, transparent: true, side: THREE.DoubleSide,
                    vertexShader: `varying vec2 vUv; varying float shade; uniform float time; uniform float bend; uniform vec2 pointer;
                    void main(){vUv=uv; vec3 p=position; float wave=sin(uv.y*5.6+time*.65+bend*1.8); p.z+=wave*.16+sin(uv.x*3.14159)*.12; p.x+=sin(uv.y*4.0+time*.45)*.035; p.z+=pointer.x*(uv.x-.5)*.18+pointer.y*(uv.y-.5)*.12; shade=.93+wave*.07; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
                    fragmentShader: `uniform sampler2D artwork; varying vec2 vUv; varying float shade; void main(){vec4 c=texture2D(artwork,vUv); gl_FragColor=vec4(c.rgb*shade,c.a);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`,
                });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                let texture, visible = false, failed = false;
                const target = new THREE.Vector2();
                const resize = () => { const rect = element.getBoundingClientRect(); if (!rect.width || !rect.height) return; renderer.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); };
                const observer = new ResizeObserver(resize);
                observer.observe(element);
                const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '100px' });
                intersection.observe(element);
                const move = event => { const rect = element.getBoundingClientRect(); target.set(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)), Math.max(-1, Math.min(1, 1 - (event.clientY - rect.top) / rect.height * 2))); };
                const fallback = event => { event.preventDefault(); failed = true; setReady(false); };
                window.addEventListener('pointermove', move, { passive: true });
                renderer.domElement.addEventListener('webglcontextlost', fallback);
                const tick = time => {
                    if (!visible || !texture || failed) return;
                    const rect = element.getBoundingClientRect();
                    uniforms.time.value = time;
                    uniforms.bend.value = 1 - rect.top / window.innerHeight;
                    uniforms.pointer.value.lerp(target, .045);
                    renderer.render(scene, camera);
                };
                gsap.ticker.add(tick);
                new THREE.TextureLoader().load(src, loaded => {
                    if (disposed) { loaded.dispose(); return; }
                    texture = loaded; texture.colorSpace = THREE.SRGBColorSpace;
                    uniforms.artwork.value = texture; resize(); setReady(true);
                }, undefined, () => { failed = true; setReady(false); });
                destroy = () => { gsap.ticker.remove(tick); observer.disconnect(); intersection.disconnect(); window.removeEventListener('pointermove', move); renderer.domElement.removeEventListener('webglcontextlost', fallback); geometry.dispose(); material.dispose(); texture?.dispose(); renderer.dispose(); renderer.domElement.remove(); };
            }).catch(() => {});
            return () => { disposed = true; destroy(); setReady(false); };
        });
        return () => media.revert();
    }, [src, width, height]);
    return <div ref={host} className={`${className} bending-artwork${ready ? ' is-rendered' : ''}`} style={{ aspectRatio: `${width} / ${height}` }} aria-hidden="true"><img src={src} alt="" width={width} height={height} loading="lazy" /></div>;
}
