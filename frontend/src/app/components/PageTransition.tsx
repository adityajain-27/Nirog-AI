import React from 'react';

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
    return (
        <div key={Math.random()} className={`page-enter ${className}`}>
            {children}
        </div>
    );
}
