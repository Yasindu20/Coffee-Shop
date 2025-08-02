import React from 'react'

const Hero = () => {
  return (
    <section 
      id="home"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative'
      }}
    >
      <div className="container animate-fadeInUp">
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: '800',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Artisan Brew
        </h1>
        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          Where every cup tells a story of passion, quality, and the perfect blend of tradition and innovation
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="#menu" className="btn">
            Explore Menu
          </a>
          <a 
            href="#about" 
            className="btn"
            style={{
              background: 'transparent',
              border: '2px solid white',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white'
              e.target.style.color = '#2c1810'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = 'white'
            }}
          >
            Our Story
          </a>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite'
      }}>
        <div style={{
          width: '2px',
          height: '30px',
          background: 'white',
          margin: '0 auto',
          opacity: '0.7'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero