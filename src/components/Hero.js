import React from 'react';

export default function Hero({children, hero}) {
    return (
        <header className = {hero}>
            {children}
        </header>
    )
}

// Doing this so that every page will have the home page hero by default
Hero.defaultProps = {
    hero: "defaultHero"
};