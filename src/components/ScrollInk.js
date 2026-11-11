import React from 'react';

export default function ScrollInk({ children }) {
    return <span className="scroll-ink">{children}<span className="scroll-ink-fill" aria-hidden="true">{children}</span></span>;
}
