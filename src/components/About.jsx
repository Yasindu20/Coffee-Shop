import React from 'react'
import { Award, Users, Coffee, Heart } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Coffee size={40} />,
      title: "Premium Beans",
      description: "Sourced directly from the finest coffee farms around the world"
    },
    {
      icon: <Award size={40} />,
      title: "Award Winning",
      description: "Recognized for excellence in coffee brewing and customer service"
    },
    {
      icon: <Users size={40} />,
      title: "Expert Baristas",
      description: "Our skilled team crafts each cup with precision and passion"
    },
    {
      icon: <Heart size={40} />,
      title: "Community Focus",
      description: "Supporting local communities and sustainable farming practices"
    }
  ]

  return (
    <section id="about" style={{ background: '#f8f7f4', padding: '5rem 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }} className="about-grid">
          <div className="animate-fadeInLeft">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Our Story
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              marginBottom: '1.5rem',
              color: '#555'
            }}>
              Founded in 2010, Artisan Brew began as a small neighborhood café with a big dream: 
              to serve the perfect cup of coffee while building a warm, welcoming community space.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              marginBottom: '2rem',
              color: '#555'
            }}>
              Today, we're proud to be recognized as one of the city's premier coffee destinations, 
              known for our commitment to quality, sustainability, and exceptional customer experience.
            </p>
            <a href="#contact" className="btn">Visit Us Today</a>
          </div>
          
          <div className="animate-fadeInRight">
            <img 
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Coffee shop interior"
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              className="feature-card"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                color: '#8B4513',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#2c1810'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default About