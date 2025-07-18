// components/Contact.js
import React from 'react';

const Contact = () => {
    return (
        <div style={{ background: '#000', color: '#fff', padding: '60px 20px' }}>
            {/* Word Art Title */}
            {/*<div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>*/}
            {/*    <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>*/}
            {/*        <span style={{*/}
            {/*            background: '#fff',*/}
            {/*            color: '#000',*/}
            {/*            padding: '5px 0px 5px 10px',*/}
            {/*            display: 'inline-block',*/}
            {/*            marginRight: '5px',*/}
            {/*        }}>*/}
            {/*            Cont*/}
            {/*        </span>*/}
            {/*        <span style={{*/}
            {/*            color: '#fff',*/}
            {/*            padding: '5px 0',*/}
            {/*            display: 'inline-block',*/}
            {/*        }}>*/}
            {/*            act*/}
            {/*        </span>*/}
            {/*    </h2>*/}
            {/*</div>*/}

            <h2 style={{
                fontSize: '50px',
                fontWeight: 'bold',
                // marginBottom: '40px',
                textAlign: 'left',
            }}>
                Contact
            </h2>

            {/* Main Content Row */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                marginBottom: '40px',
            }}>
                {/* Left: Photographer Image */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <img
                        src="https://via.placeholder.com/400x600"
                        alt="Photographer"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(255,255,255,0.1)',
                        }}
                    />
                </div>

                {/* Right: Info Grid */}
                <div style={{ flex: 2, minWidth: '300px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '20px',
                    }}>
                        <div style={{ background: '#111', padding: '20px' }}>
                            <h4 style={{ marginBottom: '10px', color: '#ccc' }}>Name</h4>
                            <p>Parshuram Madkaikar</p>
                        </div>
                        <div style={{ background: '#111', padding: '20px' }}>
                            <h4 style={{ marginBottom: '10px', color: '#ccc' }}>Location</h4>
                            <p>Panjim, Goa, India</p>
                        </div>
                        <div style={{ background: '#111', padding: '20px' }}>
                            <h4 style={{ marginBottom: '10px', color: '#ccc' }}>Expertise</h4>
                            <p> Photography, Videography, Ariel</p>
                        </div>
                    </div>

                    {/* Contact Row */}
                    <div style={{
                        marginTop: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '30px',
                        fontSize: '16px',
                        fontWeight: '500',
                        borderTop: '1px solid #444',
                        paddingTop: '20px'
                    }}>
                        <div>📷 Instagram: @rajvisuals</div>
                        <div>📧 Email: rajshetkar12@gmail.com</div>
                        <div>📞 Contact: +91 8208741603</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
