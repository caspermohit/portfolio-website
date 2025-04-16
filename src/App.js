// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ClientGuideHeader from './components/ClientGuideHeader';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import AnimatedBackground from './components/AnimatedBackground';
import ClientGuide from './components/ClientGuide';
import './App.css'; // Main CSS file
import './components/Styles/styles.scss';
import './components/styles.css';

const MainPage = () => (
    <>
        <Header />
        <Home />
        <About />
        <Skills />
        <Work />
        <Contact />
    </>
);

const ClientGuidePage = () => (
    <>
        <ClientGuideHeader />
        <ClientGuide />
    </>
);

const App = () => {
    return (
        <Router>
            <Cursor />
            
            <main className="l-main">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/client-guide" element={<ClientGuidePage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
