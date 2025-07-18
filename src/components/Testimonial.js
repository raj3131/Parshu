import React from 'react';

const Testimonial = () => {
    const testimonials = [
        {
            name: "Raj Shetkar",
            feedback: "Amazing work! Truly professional and creative.",
            video: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
            name: "Priya Nair",
            feedback: "Loved the visuals! Highly recommended.",
            video: "https://www.w3schools.com/html/movie.mp4",
        },
        {
            name: "Arjun Verma",
            feedback: "Very talented and delivers on time. Great experience!",
            video: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
    ];

    return (
        <div style={{ padding: '40px 20px', background: '#fff' }}>
            {/* Word Art Title */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{
                    fontSize: '50px',
                    fontWeight: 'bold',
                    color: 'black',
                    display: 'inline-block',
                }}>
                    Testimonial's
                </h2>

            </div>

            {/* Top Divider */}
            <hr style={{ border: '2px solid black', marginBottom: '40px' }} />

            {/* Testimonial Row */}
            {testimonials.map((t, i) => (
                <div key={i} style={{ marginBottom: '40px' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '40px',
                        flexWrap: 'wrap',
                    }}>
                        {/* Video on the left */}
                        <div style={{
                            flex: 1,
                            minWidth: '300px',
                            maxWidth: '500px',
                            aspectRatio: '16/9',
                            background: '#000',
                            overflow: 'hidden',
                        }}>
                            <video
                                src={t.video}
                                controls
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </div>

                        {/* Text on the right */}
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h3 style={{ fontWeight: 'bold', color: '#222' }}>{t.name}</h3>
                            <p style={{
                                fontStyle: 'italic',
                                fontSize: '18px',
                                color: '#555',
                                marginTop: '10px',
                            }}>
                                “{t.feedback}”
                            </p>
                            <p style={{
                                marginTop: '10px',
                                fontWeight: 'bold',
                                color: '#000',
                                fontSize: '14px',
                                letterSpacing: '1px',
                            }}>
                                — Client’s Words
                            </p>
                        </div>
                    </div>

                    {/* Divider after each testimonial except last */}
                    {i !== testimonials.length - 1 && (
                        <hr style={{ border: '2px solid black', margin: '40px 0' }} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Testimonial;
