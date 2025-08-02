import React from 'react'
import { Coffee, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Youtube size={20} />, href: "#", label: "YouTube" }
  ]

  const footerLinks = {
    "Quick Links": [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Menu", href: "#menu" },
      { name: "Gallery", href: "#gallery" },
      { name: "Contact", href: "#contact" }
    ],
    "Information": [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Catering", href: "#" }
    ],
    "Connect": [
      { name: "Newsletter", href: "#" },
      { name: "Gift Cards", href: "#" },
      { name: "Loyalty Program", href: "#" },
      { name: "Events", href: "#" },
      { name: "Wholesale", href: "#" }
    ]
  }

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2c1810, #1a0f08)',
      color: 'white',
      padding: '3rem 0 1rem'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }} className="footer-grid">
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              <Coffee size={28} color="#8B4513" />
              Artisan Brew
            </div>
            <p style={{
              color: '#ccc',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              maxWidth: '300px'
            }}>
              Crafting exceptional coffee experiences since 2010. 
              Every cup tells a story of passion, quality, and community.
            </p>
            
            {/* Social Links */}
            <div>
              <p style={{
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#fff'
              }}>
                Follow Us
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#8B4513'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 style={{
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#fff'
              }}>
                {title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {links.map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a
                      href={link.href}
                      style={{
                        color: '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#8B4513'}
                      onMouseLeave={(e) => e.target.style.color = '#ccc'}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#fff'
          }}>
            Stay Connected
          </h3>
          <p style={{
            color: '#ccc',
            marginBottom: '1.5rem'
          }}>
            Subscribe to our newsletter for updates on new blends, events, and exclusive offers
          </p>
          <div style={{
            display: 'flex',
            maxWidth: '400px',
            margin: '0 auto',
            gap: '1rem'
          }} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontWeight: '500',
                cursor: 'pointer',
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
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            color: '#ccc',
            margin: 0
          }}>
            © {currentYear} Artisan Brew. All rights reserved.
          </p>
          <p style={{
            color: '#ccc',
            margin: 0
          }}>
            Made with ❤️ for coffee lovers everywhere
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .newsletter-form {
            flex-direction: column !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer