import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import api from '../api';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        const selected = acceptedFiles[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
        maxFiles: 1,
    });

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('sticker', file);

        try {
            await api.post('/stickers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to upload sticker. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Upload Your Sticker</h1>

            <div
                {...getRootProps()}
                className={`border-4 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 bg-white'
                    }`}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <div className="relative">
                        <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded shadow-md" />
                        <p className="mt-4 text-sm text-gray-500">Click or Drag to replace</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <FaCloudUploadAlt className="text-6xl mb-4 text-green-500" />
                        {isDragActive ? (
                            <p className="text-lg font-medium">Drop the files here ...</p>
                        ) : (
                            <p className="text-lg font-medium">Drag 'n' drop a sticker here, or click to select</p>
                        )}
                        <p className="text-sm mt-2 text-gray-400">Supports PNG, JPG, WEBP</p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-center border border-red-200">
                    {error}
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`w-full mt-6 py-3 rounded-lg text-white font-bold text-lg shadow-lg flex justify-center items-center transition transform hover:scale-[1.02] ${!file || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                {uploading ? (
                    <>
                        <FaSpinner className="animate-spin mr-2" />
                        Uploading...
                    </>
                ) : (
                    'Upload Sticker'
                )}
            </button>
        </div>
    );
};

export default Upload;
