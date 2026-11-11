import React, { useEffect } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import SEO from './components/SEO';
import ClientGuide from './components/ClientGuide';
import Footer from './components/Footer';
import Portfolio, { Navigation } from './components/Portfolio';
import { useLenis } from './hooks/useMotion';
import { handleSectionLink, scrollToSection } from './utils/sectionNavigation';
import './components/Styles/styles.scss';
import './components/styles.css';
import './components/PortfolioPalette.css';
import './components/ReferenceTheme.css';

function ClientGuidePage() {
    return <div className="portfolio portfolio-guide"><Navigation guide /><main><ClientGuide /></main><Footer /></div>;
}

function ScrollReset() {
    const { pathname } = useLocation();
    useEffect(() => {
        let cancelScroll;
        const followHash = () => { cancelScroll?.(); cancelScroll = scrollToSection(window.location.hash); };
        document.addEventListener('click', handleSectionLink);
        window.addEventListener('hashchange', followHash);
        if (window.location.hash) cancelScroll = scrollToSection(window.location.hash, { immediate: true, focus: false });
        else if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        return () => { cancelScroll?.(); document.removeEventListener('click', handleSectionLink); window.removeEventListener('hashchange', followHash); };
    }, [pathname]);
    return null;
}

export default function App({ initialPath }) {
    const Router = initialPath ? MemoryRouter : BrowserRouter;
    useLenis();
    return <Router {...(initialPath ? { initialEntries: [initialPath] } : {})}><SEO /><ScrollReset /><Routes><Route path="/" element={<Portfolio />} /><Route path="/client-guide" element={<ClientGuidePage />} /><Route path="*" element={<Portfolio />} /></Routes></Router>;
}
