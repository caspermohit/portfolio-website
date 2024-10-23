// src/App.js
import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css'; // Main CSS file
import './components/Styles/styles.scss';  // Correct import path

const App = () => {
    return (
        <div>
            <Header />
            <main className="l-main">
                <Home />
                <About />
                <Skills />
                <Work />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
