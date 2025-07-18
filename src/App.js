import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Carousel from './components/Carousel';
import GalleryPage from './components/GalleryPage';
import CarouselVideo from './components/CarouselVideo';
import VideoGallery from "./components/VideoGallery";
import ReelGallery from "./components/ReelGallery";
import CarouselReel from "./components/CarouselReel";
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <main style={{ padding: '5px' }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Home />
                                <Carousel />
                                <CarouselVideo />
                                <CarouselReel/>
                                <Testimonial />
                                <Contact />
                            </>
                        }
                    />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/videoGallery" element={<VideoGallery />} />
                    <Route path="/ReelGallery" element={<ReelGallery />} />
                    <Route path="/Testimonial" element={<Testimonial />} />
                    <Route path="/Contact" element={<Contact />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
