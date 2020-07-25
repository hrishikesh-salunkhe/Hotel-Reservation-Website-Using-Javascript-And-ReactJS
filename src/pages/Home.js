import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import Button from '../components/StyledHero';

export default function Home() {
    return (
        // The issue of rendering 2 adjacent components can be fixed using React Fragment tag
        <>
            <Hero hero = "defaultHero">
                <Banner title = "luxurious rooms" subtitle = "deluxe rooms starting at $299">

                    {/* This is the children prop */}
                    <Link to = '/rooms' className = "btn-primary">
                        Our rooms
                    </Link>
                </Banner>
            </Hero>
            {/* 2 adjacent components */}
            <Services/>    
            <FeaturedRooms/>
        </>
    )
}
