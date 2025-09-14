import React, { useEffect, useState } from 'react';
import stockHeroImg from '../stock images/1-7.jpg';

function Home() {
    const [heroImage, setHeroImage] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        fetch("https://parshulaadmin.xo.je/Admin_LA/get_hero_image.php")
            .then(res => res.json())
            .then(data => {
                if (data.image) {
                    setHeroImage(data.image); // use server image
                } else {
                    setHeroImage(stockHeroImg); // fallback if no image in response
                }
            })
            .catch(err => {
                console.error("Error fetching hero image:", err);
                setHeroImage(stockHeroImg); // fallback if server is down
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
                    <img
                        src={heroImage}
                        alt="Hero"
                        style={styles.heroImage}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = stockHeroImg; // fallback if image fails to load
                        }}
                    />
                ) : (
                    <img src={stockHeroImg} alt="Fallback Hero" style={styles.heroImage} />
                )}
            </div>

            <h2 style={{
                ...styles.heading,
                fontSize: isMobile ? '28px' : styles.heading.fontSize
            }}>
                Welcome to Luminary Artistree
            </h2>

            <p style={{
                ...styles.p,
                fontSize: isMobile ? '18px' : '30px'
            }}>
                Interior | Real Estate | Architectural | Drone Photography & Videography
            </p>

            <p style={{
                ...styles.p,
                fontSize: isMobile ? '18px' : styles.p.fontSize
            }}>
                We are a visual content studio dedicated to capturing architecture, interiors, and spaces with precision, depth, and clarity.
            </p>

            <p style={{
                ...styles.p,
                fontSize: isMobile ? '18px' : styles.p.fontSize
            }}>
                Our team specializes in:
                Real Estate Photography & Videography for property listings and developers.
                Architectural and Interior Photography for designers and publications.
                Drone Photography & Aerial Videography for resorts, villas, and commercial spaces.
                Hospitality Content Creation for boutique hotels, stays, and restaurants.
            </p>

            <p style={{
                ...styles.p,
                fontSize: isMobile ? '18px' : styles.p.fontSize
            }}>
                At Luminary Artistree, we combine technical expertise with an eye for light and delivering high-quality imagery that enhances brand value and drives results.
                Based in Goa, India. Available worldwide.
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
        fontSize: '20px',
    },
};

export default Home;
