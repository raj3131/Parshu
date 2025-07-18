import React, { useEffect, useState } from 'react';

const ReelGallery  = () => {
    const [images, setVideos] = useState([]);
    const [modalIndex, setModalIndex] = useState(null);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    useEffect(() => {
        fetch("http://localhost/Admin_LA/get_reels.php")
            .then(res => res.json())
            .then(data => setVideos(data))
            .catch(err => console.error("Failed to fetch videos:", err));
    }, []);

    const styles = {
        container: {
            maxWidth: '100vw',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            padding: '20px',
        },
        imageWrapper: {
            width: '100%',
            aspectRatio: '9 / 16',
            overflow: 'hidden',
            background: '#eee',
            cursor: 'zoom-in',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
        },
        title: {
            textAlign: 'center',
            fontSize: '36px',
            margin: '30px 0 10px',
        },
        modalOverlay: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        },
        modalContent: {
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
        },
        modalImage: {
            width: '100%',
            height: 'auto',
        },
        closeButton: {
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
        },
        arrow: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '48px',
            color: '#fff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10000,
        },
        leftArrow: {
            left: '-60px',
        },
        rightArrow: {
            right: '-60px',
        }
    };

    const openModal = (index) => setModalIndex(index);
    const closeModal = () => setModalIndex(null);
    const showPrev = () => setModalIndex((prev) => (prev > 0 ? prev - 1 : prev));
    const showNext = () => setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));

    // Swipe handling
    const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
    const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        if (distance > 50) showNext(); // swipe left
        if (distance < -50) showPrev(); // swipe right
        setTouchStartX(null);
        setTouchEndX(null);
    };

    return (
        <div>
            <h1 style={styles.title}>Gallery</h1>
            <div style={styles.container}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        style={styles.imageWrapper}
                        onClick={() => openModal(index)}
                    >
                        <video
                            src={img}
                            style={styles.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            onError={(e) => {
                                e.target.poster = "https://via.placeholder.com/600x400?text=Video+not+found";
                            }}
                        />

                    </div>
                ))}
            </div>

            {modalIndex !== null && (
                <div
                    style={styles.modalOverlay}
                    onClick={closeModal}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        style={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src={images[modalIndex]}
                            style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                            autoPlay
                            muted
                            loop
                            controls
                            playsInline
                            onError={(e) => {
                                e.target.poster = "https://via.placeholder.com/600x400?text=Video+not+found";
                            }}
                        />

                        <button onClick={closeModal} style={styles.closeButton}>
                            &times;
                        </button>
                        {modalIndex > 0 && (
                            <button
                                onClick={showPrev}
                                style={{ ...styles.arrow, ...styles.leftArrow }}
                            >
                                &#10094;
                            </button>
                        )}
                        {modalIndex < images.length - 1 && (
                            <button
                                onClick={showNext}
                                style={{ ...styles.arrow, ...styles.rightArrow }}
                            >
                                &#10095;
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReelGallery ;
