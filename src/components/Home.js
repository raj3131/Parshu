import React, { useEffect, useState } from 'react';

function Home() {
    const [heroImage, setHeroImage] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        fetch("http://localhost/Admin_LA/get_hero_image.php")
            .then(res => res.json())
            .then(data => {
                if (data.image) {
                    setHeroImage("http://localhost/Admin_LA/" + data.image);
                }
            });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                ...styles.container,
                padding: isMobile ? '0' : '16px',
            }}
        >
            <div
                style={{
                    ...styles.heroWrapper,
                    margin: isMobile ? '0' : '0 auto 24px',
                }}
            >
                {heroImage ? (
                    <img src={heroImage} alt="Hero" style={styles.heroImage} />
                ) : (
                    <p>No hero image found.</p>
                )}
            </div>
            <h2 style={{
                ...styles.heading,
                fontSize: isMobile ? '28px' : styles.heading.fontSize
            }}>
                Welcome to Luminary Artistry
            </h2>

            <p style={{
                ...styles.p,
                fontSize: isMobile ? '18px' : styles.p.fontSize
            }}>
                This is your home page. Start building your creative journey here.
            </p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        backgroundColor: '#fff',
        minHeight: '40vh',
    },
    heroWrapper: {
        width: '100%',
        aspectRatio: '3 / 2',
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    heading: {
        fontSize: '50px',
        color: '#111',
        marginBottom: '8px',
    },
    p: {
        fontSize: '30px',
    },
};

export default Home;
