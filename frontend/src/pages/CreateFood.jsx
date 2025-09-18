import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [videoFile, setVideoFile] = useState(null)
    const [videoURL, setVideoURL] = useState('')
    const [fileError, setFileError] = useState('')
    const fileInputRef = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('')
            return
        }
        const url = URL.createObjectURL(videoFile)
        setVideoURL(url)
        return () => URL.revokeObjectURL(url)
    }, [videoFile])

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[0]
        if (!file) { setVideoFile(null); setFileError(''); return }
        if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return }
        setFileError('')
        setVideoFile(file)
    }

    const onDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer?.files?.[0]
        if (!file) { return }
        if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return }
        setFileError('')
        setVideoFile(file)
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const openFileDialog = () => fileInputRef.current?.click()

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('video', videoFile)

        const response = await axios.post("http://localhost:3000/api/food", formData, {
            withCredentials: true,
        })

        console.log(response.data)
        navigate("/")
    }

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile])

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Create Food</h1>
                    <p className="text-sm text-gray-600 mt-2">Upload a short video, give it a name, and add a description.</p>
                </header>

                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="foodVideo" className="block text-sm font-medium text-gray-700 mb-2">Food Video</label>
                        <input
                            id="foodVideo"
                            ref={fileInputRef}
                            className="hidden"
                            type="file"
                            accept="video/*"
                            onChange={onFileChange}
                        />

                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                            role="button"
                            tabIndex={0}
                            onClick={openFileDialog}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog() } }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                        >
                            <div className="flex flex-col items-center">
                                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v8.586l-2.293-2.293a1 1 0 00-1.414 0L12 12.586l-2.293-2.293a1 1 0 00-1.414 0L6 12.586V4a1 1 0 011-1h8z" />
                                </svg>
                                <div className="text-sm text-gray-600">
                                    <strong>Tap to upload</strong> or drag and drop
                                </div>
                                <div className="text-xs text-gray-500 mt-1">MP4, WebM, MOV • Up to ~100MB</div>
                            </div>
                        </div>

                        {fileError && <p className="text-red-600 text-sm mt-2" role="alert">{fileError}</p>}

                        {videoFile && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg" aria-live="polite">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-900">{videoFile.name}</span>
                                        <span className="text-xs text-gray-500">({(videoFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button type="button" className="text-xs text-blue-600 hover:text-blue-800" onClick={openFileDialog}>Change</button>
                                        <button type="button" className="text-xs text-red-600 hover:text-red-800" onClick={() => { setVideoFile(null); setFileError('') }}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {videoURL && (
                        <div className="mt-4">
                            <video className="w-full rounded-lg" src={videoURL} controls playsInline preload="metadata" />
                        </div>
                    )}

                    <div>
                        <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            id="foodName"
                            type="text"
                            placeholder="e.g., Spicy Paneer Wrap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="foodDesc" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            id="foodDesc"
                            rows={4}
                            placeholder="Write a short description: ingredients, taste, spice level, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={isDisabled}>
                            Save Food
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFood