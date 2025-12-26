import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center text-xl font-bold text-green-600">
                    <FaWhatsapp className="mr-2 text-2xl" />
                    StickerMania
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-green-600 font-medium transition">Home</Link>
                    <Link to="/upload" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition shadow-sm">Upload Sticker</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
