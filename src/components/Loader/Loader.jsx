"use client";
import React from 'react';
import animationData from '../../../public/animations/loader.json';
import Lottie from 'lottie-react';
const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="loader">
                <Lottie animationData={animationData} loop={true} />
            </div>
        </div>
    );
};

export default Loader;