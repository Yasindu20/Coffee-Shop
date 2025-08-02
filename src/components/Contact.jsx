import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

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

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "123 Coffee Street, Downtown District, City 12345"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+1 (555) 123-4567"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "hello@artisanbrew.com"
    },
    {
      icon: <Clock size={24} />,
      title: "Hours",
      content: "Mon-Fri: 6AM-9PM, Sat-Sun: 7AM-10PM"
    }
  ]

  return (
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

            <div style={{ marginBottom: '3rem' }}>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{
                    color: '#8B4513',
                    background: '#f8f7f4',
                    padding: '0.75rem',
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
                      marginBottom: '0.25rem'
                    }}>
                      {info.title}
                    </h4>
                    <p style={{ color: '#666', margin: 0 }}>
                      {info.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              background: '#f0f0f0',
              height: '200px',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}>
              Interactive Map Coming Soon
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
  )
}

export default Contact