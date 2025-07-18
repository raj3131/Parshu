import React, { useEffect, useState } from 'react';
import logo from '../Images/LOGO.PNG';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);

    // Resize listener for mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll listener for hiding/showing header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowHeader(false); // scrolling down
            } else {
                setShowHeader(true); // scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            style={{
                ...styles.appBar,
                padding: isMobile ? '8px 16px' : '16px 32px',
                transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.3s ease-in-out',
            }}
        >

            <div
                style={{
                    ...styles.logoContainer,
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    textAlign: isMobile ? 'center' : 'left',
                    justifyContent: isMobile ? 'center' : 'flex-start',
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        height: isMobile ? '50px' : '80px',
                        width: isMobile ? '50px' : '80px',
                        marginRight: isMobile ? 0 : '12px',
                        marginBottom: isMobile ? '8px' : 0,
                    }}

                />
                <h1
                    style={{
                        ...styles.title,
                        fontSize: isMobile ? '16px' : '24px',
                    }}
                >
                    Luminary Artistree
                </h1>

            </div>
        </header>
    );
}

const styles = {
    appBar: {
        backgroundColor: 'white',
        padding: '3px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logoContainer: {
        display: 'flex',
        height: '100%',
    },
    logo: {
        height: '80px',
        width: '80px',
    },
    title: {
        color: 'black',
        margin: 0,
        fontSize: '24px',
    },
};

export default Header;
