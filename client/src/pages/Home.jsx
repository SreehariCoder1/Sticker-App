import React, { useEffect, useState } from 'react';
import { FaDownload, FaWhatsapp } from 'react-icons/fa';
import api from '../api';

const Home = () => {
    const [stickers, setStickers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStickers = async () => {
            try {
                const res = await api.get('/stickers');
                setStickers(res.data);
            } catch (err) {
                console.error('Error fetching stickers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStickers();
    }, []);

    const handleDownload = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename || 'sticker.webp';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Sticker Gallery</h1>
                <p className="text-lg text-gray-600">Discover and download amazing WhatsApp stickers!</p>
            </div>

            {stickers.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
                    <FaWhatsapp className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-xl text-gray-500">No stickers yet. Be the first to upload one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {stickers.map((sticker) => (
                        <div key={sticker._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                            <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                                <img
                                    src={sticker.url}
                                    alt="Sticker"
                                    className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    {/* Overlay for actions if needed */}
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleDownload(sticker.url, `sticker-${sticker._id}.webp`)}
                                    className="w-full bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors text-sm"
                                >
                                    <FaDownload className="mr-2" /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
