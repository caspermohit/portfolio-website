export function sectionTarget(hash) {
    if (!hash || hash === '#') return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
}

export function scrollToSection(hash, { immediate = false, focus = true } = {}) {
    let cancelled = false;
    let frame;
    // Filters can reveal the destination after the hashchange event.
    frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => {
        if (cancelled) return;
        const target = sectionTarget(hash);
        if (!target) return;
        const header = document.querySelector('.folio-nav');
        const offset = Math.max((header?.getBoundingClientRect().height || 0) + 16, parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
        const focusTarget = () => {
            if (!focus || !target.isConnected) return;
            const temporary = !target.hasAttribute('tabindex');
            if (temporary) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            if (temporary) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        };
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (window.__lenis && !window.__lenis.isStopped) {
            window.__lenis.scrollTo(target, { offset: -offset, immediate: immediate || reduced, onComplete: focusTarget });
        } else {
            window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: immediate || reduced ? 'auto' : 'smooth' });
            focusTarget();
        }
    }); });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
}

export function handleSectionLink(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href^="#"]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    event.preventDefault();
    const oldURL = window.location.href;
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    // Fire even for the current hash: a filter may have hidden that section.
    window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }));
}
