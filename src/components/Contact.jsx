import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  // Cafe location (using downtown Seattle as example - you can change these coordinates)
  const cafeLocation = {
    lat: 6.9270786,
    lng: 79.861243,
    address: "123 Coffee Street, Downtown District, Seattle, WA 98101"
  }

  useEffect(() => {
    // Initialize map when component mounts
    if (mapRef.current && window.L && !mapInstanceRef.current) {
      // Create the map with custom styling
      mapInstanceRef.current = window.L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
      }).setView([cafeLocation.lat, cafeLocation.lng], 16)

      // Add the OpenStreetMap tiles with custom styling
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current)

      // Create enhanced custom icon for the cafe
      const cafeIcon = window.L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(139, 69, 19, 0.4);
            font-size: 20px;
            color: white;
            position: relative;
            animation: pulse 2s infinite;
          ">☕
            <div style="
              position: absolute;
              top: -8px;
              right: -8px;
              background: #FFD700;
              border: 2px solid white;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 10px;
              animation: bounce 1s infinite;
            ">📍</div>
          </div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
          </style>
        `,
        className: 'custom-cafe-icon',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      })

      // Add marker for the cafe with enhanced popup
      window.L.marker([cafeLocation.lat, cafeLocation.lng], { icon: cafeIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="text-align: center; padding: 1rem; min-width: 250px;">
            <div style="
              font-size: 18px; 
              font-weight: bold; 
              color: #8B4513; 
              margin-bottom: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
            ">
              ☕ Artisan Brew
            </div>
            <div style="color: #666; margin-bottom: 0.5rem; line-height: 1.4;">
              ${cafeLocation.address}
            </div>
            <div style="
              background: linear-gradient(135deg, #8B4513, #A0522D);
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 20px;
              margin-top: 0.5rem;
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
              display: inline-block;
            " onclick="window.open('https://www.google.com/maps/search/?api=1&query=${cafeLocation.lat},${cafeLocation.lng}', '_blank')">
              Get Directions 🗺️
            </div>
          </div>
        `, {
          maxWidth: 300,
          className: 'custom-popup'
        })
        .openPopup()

      // Add a circle to show the area around the cafe
      window.L.circle([cafeLocation.lat, cafeLocation.lng], {
        color: '#8B4513',
        fillColor: '#8B4513',
        fillOpacity: 0.1,
        radius: 200,
        weight: 2,
        opacity: 0.6
      }).addTo(mapInstanceRef.current)
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${cafeLocation.lat},${cafeLocation.lng}`
    window.open(url, '_blank')
  }

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: cafeLocation.address,
      clickable: true,
      onClick: openInMaps
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      clickable: true,
      onClick: () => window.open('tel:+15551234567')
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "hello@artisanbrew.com",
      clickable: true,
      onClick: () => window.open('mailto:hello@artisanbrew.com')
    },
    {
      icon: <Clock size={24} />,
      title: "Hours",
      content: "Mon-Fri: 6AM-9PM, Sat-Sun: 7AM-10PM"
    }
  ]

  return (
    <>
      {/* Premium Map Section */}
      <section style={{ 
        padding: '0', 
        position: 'relative',
        background: 'linear-gradient(135deg, #f8f7f4, #e8e5e0)'
      }}>
        {/* Map Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2c1810, #1a0f08)',
          color: 'white',
          padding: '3rem 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Find Us
            </h2>
            <p style={{
              fontSize: '1.2rem',
              opacity: '0.9',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Located in the heart of downtown, we're easy to find and worth the visit
            </p>
          </div>
        </div>

        {/* Large Interactive Map */}
        <div style={{ position: 'relative' }}>
          <div
            ref={mapRef}
            style={{
              height: '500px',
              width: '100%',
              background: '#f0f0f0',
              border: 'none'
            }}
          />
          
          {/* Floating Action Buttons */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <button
              onClick={openInMaps}
              style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)'
                e.target.style.boxShadow = '0 6px 25px rgba(139, 69, 19, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.3)'
              }}
              title="Open in Google Maps"
            >
              <Navigation size={24} />
            </button>
          </div>

          {/* Map Overlay Info */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            maxWidth: '350px',
            zIndex: 1000
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ☕
              </div>
              <div>
                <h4 style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#2c1810'
                }}>
                  Artisan Brew
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  Premium Coffee Experience
                </p>
              </div>
            </div>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#666',
              lineHeight: '1.4'
            }}>
              📍 {cafeLocation.address}
            </p>
            <button
              onClick={openInMaps}
              style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '1rem',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #A0522D, #8B4513)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Get Directions 🗺️
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start'
          }} className="contact-grid">
            {/* Contact Information */}
            <div className="animate-fadeInLeft">
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '600',
                marginBottom: '2rem',
                color: '#2c1810'
              }}>
                Get in Touch
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                marginBottom: '2rem',
                color: '#666'
              }}>
                We'd love to hear from you! Whether you have questions about our menu, 
                want to book an event, or just want to say hello, don't hesitate to reach out.
              </p>

              <div style={{ marginBottom: '2rem' }}>
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      cursor: info.clickable ? 'pointer' : 'default',
                      padding: '1rem',
                      borderRadius: '1rem',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent'
                    }}
                    onClick={info.onClick}
                    onMouseEnter={(e) => {
                      if (info.clickable) {
                        e.currentTarget.style.backgroundColor = '#f8f7f4'
                        e.currentTarget.style.borderColor = '#8B4513'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (info.clickable) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.borderColor = 'transparent'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }
                    }}
                  >
                    <div style={{
                      color: '#8B4513',
                      background: '#f8f7f4',
                      padding: '1rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#2c1810',
                        marginBottom: '0.25rem',
                        fontSize: '1.1rem'
                      }}>
                        {info.title}
                      </h4>
                      <p style={{ 
                        color: info.clickable ? '#8B4513' : '#666', 
                        margin: 0,
                        textDecoration: info.clickable ? 'underline' : 'none',
                        fontSize: '1rem'
                      }}>
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fadeInRight">
              <div style={{
                background: '#f8f7f4',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  color: '#2c1810'
                }}>
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #ddd',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #ddd',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #ddd',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        resize: 'vertical',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>

                  <button type="submit" className="btn" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </section>
    </>
  )
}

export default Contact