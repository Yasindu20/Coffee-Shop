import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Pause, Play, Grid, Maximize2 } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('carousel') // 'carousel' or 'grid'
  const galleryRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const autoPlayRef = useRef(null)

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee brewing process",
      category: "brewing",
      title: "Artisan Brewing Process",
      description: "Our expert baristas craft each cup with precision and passion, using traditional brewing methods."
    },
    {
      src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cafe interior atmosphere",
      category: "interior",
      title: "Premium Interior Design",
      description: "Modern elegance meets warm comfort in our thoughtfully designed spaces."
    },
    {
      src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Barista at work",
      category: "team",
      title: "Professional Barista Team",
      description: "Our certified baristas bring years of experience and dedication to every cup."
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Fresh pastries display",
      category: "food",
      title: "Artisanal Pastries",
      description: "Fresh-baked daily using premium ingredients from local suppliers."
    },
    {
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee beans selection",
      category: "beans",
      title: "Premium Bean Selection",
      description: "Sourced directly from the world's finest coffee farms, roasted to perfection."
    },
    {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cozy seating area",
      category: "interior",
      title: "Executive Meeting Spaces",
      description: "Private areas designed for business meetings and professional discussions."
    },
    {
      src: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Latte art creation",
      category: "brewing",
      title: "Signature Latte Art",
      description: "Every beverage is a masterpiece, crafted with artistic precision."
    },
    {
      src: "https://images.unsplash.com/photo-1545129076-8169e05da1e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee shop exterior",
      category: "exterior",
      title: "Premium Location",
      description: "Strategically located in the heart of the business district."
    }
  ]

  const filters = [
    { id: 'all', label: 'All Showcase' },
    { id: 'brewing', label: 'Coffee Craft' },
    { id: 'interior', label: 'Facilities' },
    { id: 'food', label: 'Culinary' },
    { id: 'team', label: 'Our Team' },
    { id: 'beans', label: 'Premium Products' }
  ]

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  // Auto-play functionality with cinematic timing
  useEffect(() => {
    if (isAutoPlay && viewMode === 'carousel') {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % filteredImages.length)
      }, 8000) // 8 seconds for cinematic pacing
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlay, filteredImages.length, viewMode])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (galleryRef.current) {
      observer.observe(galleryRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [activeFilter])

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % filteredImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? filteredImages.length - 1 : prev - 1)
  }

  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeModal()
        return
      }
      
      switch (e.key) {
        case 'ArrowLeft':
          prevSlide()
          break
        case 'ArrowRight':
          nextSlide()
          break
        case ' ':
          e.preventDefault()
          setIsAutoPlay(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage])

  return (
    <>
      <section 
        id="gallery" 
        ref={galleryRef}
        style={{ 
          padding: '5rem 0', 
          background: 'linear-gradient(135deg, #f8f7f4, #ffffff, #f0ede6)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #A0522D 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
          animation: 'patternFloat 30s linear infinite',
          zIndex: 0
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              Experience Excellence
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '3px',
                background: 'linear-gradient(90deg, #8B4513, #A0522D)',
                borderRadius: '2px'
              }} />
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Discover our commitment to excellence through every aspect of our enterprise coffee experience
            </p>

            {/* Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <button
                onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(139, 69, 19, 0.1)',
                  border: '2px solid #8B4513',
                  borderRadius: '25px',
                  color: '#8B4513',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#8B4513'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(139, 69, 19, 0.1)'
                  e.target.style.color = '#8B4513'
                }}
              >
                {viewMode === 'carousel' ? <Grid size={18} /> : <Maximize2 size={18} />}
                {viewMode === 'carousel' ? 'Grid View' : 'Carousel View'}
              </button>

              {viewMode === 'carousel' && (
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: isAutoPlay ? '#8B4513' : 'rgba(139, 69, 19, 0.1)',
                    border: '2px solid #8B4513',
                    borderRadius: '25px',
                    color: isAutoPlay ? 'white' : '#8B4513',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
                  {isAutoPlay ? 'Pause' : 'Play'}
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}>
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '0.6rem 1.2rem',
                  background: activeFilter === filter.id 
                    ? 'linear-gradient(135deg, #8B4513, #A0522D)' 
                    : 'white',
                  color: activeFilter === filter.id ? 'white' : '#8B4513',
                  border: `2px solid ${activeFilter === filter.id ? 'transparent' : '#e0e0e0'}`,
                  borderRadius: '25px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                  boxShadow: activeFilter === filter.id 
                    ? '0 4px 15px rgba(139, 69, 19, 0.3)' 
                    : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: `slideUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.id) {
                    e.target.style.borderColor = '#8B4513'
                    e.target.style.color = '#8B4513'
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.id) {
                    e.target.style.borderColor = '#e0e0e0'
                    e.target.style.color = '#8B4513'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Carousel View with Cinematic Effects */}
          {viewMode === 'carousel' && (
            <div 
              className="carousel-container"
              style={{
              position: 'relative',
              maxWidth: '1200px',
              margin: '0 auto',
              background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s'
            }}>
              {/* Cinematic Vignette Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.1) 100%)',
                pointerEvents: 'none',
                zIndex: 2
              }} />

              {/* Film Grain Texture */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                opacity: 0.4,
                pointerEvents: 'none',
                animation: 'filmGrain 2s infinite linear',
                zIndex: 1
              }} />

              {/* Main Carousel Container */}
              <div 
                className="carousel-height"
                style={{
                position: 'relative',
                height: '600px',
                overflow: 'hidden',
                background: '#000'
              }}>
                {filteredImages.map((image, index) => {
                  const isActive = index === currentSlide
                  const isPrev = index === (currentSlide - 1 + filteredImages.length) % filteredImages.length
                  const isNext = index === (currentSlide + 1) % filteredImages.length
                  
                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                        transform: `
                          translateX(${isActive ? '0%' : isPrev ? '-100%' : isNext ? '100%' : '50%'})
                          scale(${isActive ? 1 : 0.85})
                          rotateY(${isActive ? '0deg' : isPrev ? '25deg' : isNext ? '-25deg' : '0deg'})
                        `,
                        transition: 'all 2s cubic-bezier(0.23, 1, 0.32, 1)',
                        cursor: 'pointer',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                        zIndex: isActive ? 3 : isPrev || isNext ? 2 : 1
                      }}
                      onClick={() => openModal(image)}
                    >
                      {/* Ken Burns Effect Container */}
                      <div style={{
                        width: '110%',
                        height: '110%',
                        position: 'relative',
                        left: '-5%',
                        top: '-5%',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.8) contrast(1.1) saturate(1.1)',
                            transform: isActive ? 'scale(1.05)' : 'scale(1)',
                            animation: isActive ? 'kenBurns 8s ease-in-out infinite alternate' : 'none',
                            transition: 'all 2s ease-out'
                          }}
                        />

                        {/* Dramatic Light Leak */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(
                            135deg, 
                            rgba(255,255,255,0.1) 0%, 
                            transparent 20%, 
                            transparent 80%, 
                            rgba(139,69,19,0.1) 100%
                          )`,
                          pointerEvents: 'none',
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 2s ease'
                        }} />
                      </div>
                      
                      {/* Cinematic Content Overlay */}
                      <div 
                        className="carousel-overlay"
                        style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: `linear-gradient(
                          to top, 
                          rgba(0,0,0,0.9) 0%, 
                          rgba(0,0,0,0.7) 30%, 
                          rgba(0,0,0,0.3) 60%, 
                          transparent 100%
                        )`,
                        color: 'white',
                        padding: '4rem 3rem 3rem',
                        transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s'
                      }}>
                        {/* Animated Title */}
                        <h3 
                          className="carousel-title"
                          style={{
                          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                          fontWeight: '800',
                          marginBottom: '1rem',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                          transform: isActive ? 'translateX(0)' : 'translateX(-50px)',
                          opacity: isActive ? 1 : 0,
                          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s',
                          letterSpacing: '1px'
                        }}>
                          {image.title}
                        </h3>
                        
                        {/* Animated Description */}
                        <p 
                          className="carousel-description"
                          style={{
                          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                          lineHeight: '1.6',
                          margin: 0,
                          maxWidth: '600px',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          transform: isActive ? 'translateX(0)' : 'translateX(-30px)',
                          opacity: isActive ? 0.95 : 0,
                          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s'
                        }}>
                          {image.description}
                        </p>

                        {/* Elegant Divider */}
                        <div style={{
                          width: '100px',
                          height: '2px',
                          background: 'linear-gradient(90deg, #8B4513, transparent)',
                          marginTop: '1.5rem',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 1s ease 1.5s'
                        }} />
                      </div>
                    </div>
                  )
                })}

                {/* Enhanced Navigation Arrows */}
                <button
                  className="nav-button"
                  onClick={prevSlide}
                  style={{
                    position: 'absolute',
                    left: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    color: '#8B4513',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)'
                    e.target.style.color = 'white'
                    e.target.style.transform = 'translateY(-50%) scale(1.15) rotateZ(-5deg)'
                    e.target.style.boxShadow = '0 12px 35px rgba(139,69,19,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                    e.target.style.color = '#8B4513'
                    e.target.style.transform = 'translateY(-50%) scale(1) rotateZ(0deg)'
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
                  }}
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  className="nav-button"
                  onClick={nextSlide}
                  style={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    color: '#8B4513',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)'
                    e.target.style.color = 'white'
                    e.target.style.transform = 'translateY(-50%) scale(1.15) rotateZ(5deg)'
                    e.target.style.boxShadow = '0 12px 35px rgba(139,69,19,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                    e.target.style.color = '#8B4513'
                    e.target.style.transform = 'translateY(-50%) scale(1) rotateZ(0deg)'
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
                  }}
                >
                  <ChevronRight size={28} />
                </button>

                {/* Cinematic Progress Bar */}
                {isAutoPlay && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
                    backdropFilter: 'blur(5px)'
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #FFD700, #8B4513, #A0522D)',
                      animation: 'cinematicProgress 8s linear infinite',
                      transformOrigin: 'left',
                      boxShadow: '0 0 20px rgba(255,215,0,0.5)'
                    }} />
                  </div>
                )}

                {/* Slide Counter with Cinematic Style */}
                <div 
                  className="slide-counter"
                  style={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.2)',
                  letterSpacing: '1px',
                  zIndex: 10
                }}>
                  {String(currentSlide + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
                </div>
              </div>

              {/* Enhanced Thumbnail Navigation */}
              <div 
                className="thumbnail-nav"
                style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                padding: '2rem',
                background: 'linear-gradient(145deg, #f8f8f8, #ffffff)'
              }}>
                {filteredImages.map((image, index) => (
                  <button
                    className="thumbnail-button"
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: '70px',
                      height: '50px',
                      borderRadius: '10px',
                      border: `3px solid ${index === currentSlide ? '#8B4513' : 'rgba(255,255,255,0.5)'}`,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      opacity: index === currentSlide ? 1 : 0.6,
                      transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: index === currentSlide 
                        ? '0 8px 25px rgba(139,69,19,0.3)' 
                        : '0 4px 15px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '1'
                      e.target.style.transform = 'scale(1.15) rotateY(5deg)'
                      e.target.style.boxShadow = '0 12px 30px rgba(139,69,19,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = index === currentSlide ? '1' : '0.6'
                      e.target.style.transform = index === currentSlide ? 'scale(1.1)' : 'scale(1)'
                      e.target.style.boxShadow = index === currentSlide 
                        ? '0 8px 25px rgba(139,69,19,0.3)' 
                        : '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: index === currentSlide ? 'brightness(1) saturate(1.2)' : 'brightness(0.8) saturate(0.8)',
                        transition: 'filter 0.3s ease'
                      }}
                    />
                    {index === currentSlide && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent, rgba(255,215,0,0.2), transparent)',
                        pointerEvents: 'none'
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease 0.3s'
            }}>
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                  }}
                  onClick={() => openModal(image)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#2c1810',
                      marginBottom: '0.5rem'
                    }}>
                      {image.title}
                    </h3>
                    <p style={{
                      color: '#666',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '2rem',
              animation: 'modalFadeIn 0.3s ease'
            }}
            onClick={closeModal}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                animation: 'modalSlideIn 0.3s ease'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain'
                }}
              />
              <div style={{
                padding: '2rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2c1810',
                  marginBottom: '0.5rem'
                }}>
                  {selectedImage.title}
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {selectedImage.description}
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'scale(1)'
              }}
            >
              <X size={20} />
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        /* Cinematic Animations */
        @keyframes kenBurns {
          0% {
            transform: scale(1.05) rotate(0deg);
            filter: brightness(0.8) contrast(1.1) saturate(1.1);
          }
          25% {
            transform: scale(1.08) rotate(0.5deg);
            filter: brightness(0.85) contrast(1.15) saturate(1.2);
          }
          50% {
            transform: scale(1.12) rotate(0deg);
            filter: brightness(0.9) contrast(1.2) saturate(1.3);
          }
          75% {
            transform: scale(1.08) rotate(-0.5deg);
            filter: brightness(0.85) contrast(1.15) saturate(1.2);
          }
          100% {
            transform: scale(1.05) rotate(0deg);
            filter: brightness(0.8) contrast(1.1) saturate(1.1);
          }
        }

        @keyframes filmGrain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(-15%, 10%); }
          90% { transform: translate(10%, 5%); }
        }

        @keyframes cinematicProgress {
          0% { 
            transform: scaleX(0);
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(30deg) brightness(1.2);
          }
          100% { 
            transform: scaleX(1);
            filter: hue-rotate(0deg) brightness(1);
          }
        }

        @keyframes patternFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50px); }
        }

        @keyframes progressBar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Enhanced Responsive Design */
        @media (max-width: 1024px) {
          .carousel-container {
            margin: 0 1rem;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem !important;
          }
          
          .carousel-height {
            height: 400px !important;
          }
          
          .carousel-title {
            font-size: 1.5rem !important;
          }
          
          .carousel-description {
            font-size: 0.9rem !important;
          }
          
          .nav-button {
            width: 45px !important;
            height: 45px !important;
          }
          
          .thumbnail-nav {
            gap: 0.5rem !important;
            padding: 1rem !important;
          }
          
          .thumbnail-button {
            width: 50px !important;
            height: 35px !important;
          }
        }

        @media (max-width: 480px) {
          .carousel-container {
            border-radius: 15px !important;
            margin: 0 0.5rem;
          }
          
          .carousel-height {
            height: 350px !important;
          }
          
          .carousel-overlay {
            padding: 2rem 1.5rem 1.5rem !important;
          }
          
          .nav-button {
            left: 15px !important;
            right: 15px !important;
          }
          
          .slide-counter {
            top: 15px !important;
            right: 15px !important;
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
          }
        }

        /* Cinematic Performance Optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}

export default Gallery