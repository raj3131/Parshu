import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const containerRef = useRef(null);
    const [modalImage, setModalImage] = useState(null);
    const navigate = useNavigate();
    const visibleImages = images.slice(0, 6);

    // Swipe state
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    useEffect(() => {
        fetch("http://localhost/Admin_LA/get_carousel_images.php")
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error("Failed to fetch carousel images:", err));
    }, []);

    const getSlidesToShow = () => {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    };

    useEffect(() => {
        const updateSlides = () => {
            setSlidesToShow(getSlidesToShow());
        };
        updateSlides();
        window.addEventListener('resize', updateSlides);
        return () => window.removeEventListener('resize', updateSlides);
    }, []);

    const totalSlides = Math.max(1, Math.ceil(visibleImages.length / slidesToShow));

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, totalSlides - 1));
    };

    // Touch Handlers
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX === null || touchEndX === null) return;
        const distance = touchStartX - touchEndX;
        if (distance > 50) handleNext(); // swipe left
        if (distance < -50) handlePrev(); // swipe right
        setTouchStartX(null);
        setTouchEndX(null);
    };

    const styles = {
        container: {
            maxWidth: '100vw',
            margin: '0 auto',
            padding: '16px',
        },
        title: {
            fontSize: '32px',
            marginBottom: '20px',
        },
        carouselWrapper: {
            position: 'relative',
            overflow: 'hidden',
        },
        slider: {
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${currentIndex * 100}%)`,
        },
        slide: {
            flex: `0 0 ${100 / slidesToShow}%`,
            padding: '10px',
            boxSizing: 'border-box',
        },
        imageWrapper: {
            width: '100%',
            aspectRatio: '3 / 2',
            overflow: 'hidden',
            background: '#eee',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
        },
        arrow: {
            padding: '20px',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: '50px',
            color: '#000',
            cursor: 'pointer',
            zIndex: 1,
        },
        leftArrow: {
            left: '0',
        },
        rightArrow: {
            right: '0',
        },
        errorText: {
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'gray',
        },
    };

    const closeModal = () => setModalImage(null);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Images</h2>
            {images.length > 0 ? (
                <div
                    style={styles.carouselWrapper}
                    ref={containerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button onClick={handlePrev} style={{ ...styles.arrow, ...styles.leftArrow }}>
                        &#10094;
                    </button>
                    <div style={styles.slider}>
                        {visibleImages.map((img, index) => {
                            const isLast = index === visibleImages.length - 1;
                            return (
                                <div key={index} style={styles.slide}>
                                    <div style={{ ...styles.imageWrapper, position: 'relative' }}>
                                        <img
                                            src={img}
                                            alt={`carousel-${index}`}
                                            style={{
                                                ...styles.image,
                                                filter: isLast ? 'blur(4px)' : 'none',
                                                cursor: isLast ? 'pointer' : 'zoom-in',
                                            }}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/600x400?text=Image+not+found";
                                            }}
                                            onClick={() => !isLast && setModalImage(img)}
                                        />
                                        {isLast && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'rgba(0, 0, 0, 0.4)', // semi-dark overlay
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => navigate('/gallery')}
                                            >
                                                <button
                                                    style={{
                                                        padding: '12px 24px',
                                                        fontSize: '18px',
                                                        color: '#000',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '4px',
                                                    }}
                                                >
                                                    See more...
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={handleNext} style={{ ...styles.arrow, ...styles.rightArrow }}>
                        &#10095;
                    </button>
                </div>
            ) : (
                <p style={styles.errorText}>No images to show.</p>
            )}
            {modalImage && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        position: 'relative',
                        maxWidth: '90%',
                        maxHeight: '90%',
                    }}>
                        <img
                            src={modalImage}
                            alt="Full Preview"
                            style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                        />
                        <button onClick={closeModal} style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            backgroundColor: '#fff',
                            border: 'none',
                            fontSize: '28px',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}>
                            &times;
                        </button>
                    </div>
                </div>
            )}

        </div>

    );
};

export default Carousel;
