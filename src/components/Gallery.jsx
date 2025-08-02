import React, { useState } from 'react'
import { X } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee brewing process"
    },
    {
      src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cafe interior atmosphere"
    },
    {
      src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Barista at work"
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Fresh pastries display"
    },
    {
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee beans selection"
    },
    {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cozy seating area"
    }
  ]

  return (
    <section id="gallery" style={{ padding: '5rem 0', background: '#f8f7f4' }}>
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Step into our world and experience the artistry, craftsmanship, and warm atmosphere 
          that makes Artisan Brew special
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              style={{
                cursor: 'pointer',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2001
            }}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '1rem'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default Gallery