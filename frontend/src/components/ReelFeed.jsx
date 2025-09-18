import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll" role="list">
        {items.length === 0 && (
          <div className="flex items-center justify-center h-screen text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-lg">{emptyMessage}</p>
            </div>
          </div>
        )}

        {items.map((item) => (
          <section key={item._id} className="relative h-screen w-full snap-start flex items-center justify-center" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="w-full h-full object-cover"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" aria-hidden="true" />
              
              {/* Right side actions */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
                <div className="flex flex-col items-center">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95"
                    aria-label="Like"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <span className="text-xs text-white font-medium mt-1">{item.likeCount ?? item.likesCount ?? item.likes ?? 0}</span>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    className="w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95"
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Bookmark"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <span className="text-xs text-white font-medium mt-1">{item.savesCount ?? item.bookmarks ?? item.saves ?? 0}</span>
                </div>

                <div className="flex flex-col items-center">
                  <button className="w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95" aria-label="Comments">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <span className="text-xs text-white font-medium mt-1">{item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}</span>
                </div>

                <div className="flex flex-col items-center">
                  <button className="w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95" aria-label="Share">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16,6 12,2 8,6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-24 left-4 right-20 text-white">
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed" title={item.description}>
                    {item.description}
                  </p>
                  {item.foodPartner && (
                    <Link 
                      className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors" 
                      to={"/food-partner/" + item.foodPartner} 
                      aria-label="Visit store"
                    >
                      Visit Store
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed