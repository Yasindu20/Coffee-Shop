import React, { useState, useEffect } from 'react'
import { Menu, X, Coffee } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 0'
      }}
    >
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isScrolled ? '#2c1810' : '#fff'
          }}>
            <Coffee size={28} color="#8B4513" />
            Artisan Brew
          </div>

          {/* Desktop Navigation */}
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0
          }} className="desktop-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  style={{
                    textDecoration: 'none',
                    color: isScrolled ? '#2c1810' : '#fff',
                    fontWeight: '500',
                    transition: 'color 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#8B4513'}
                  onMouseLeave={(e) => e.target.style.color = isScrolled ? '#2c1810' : '#fff'}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: isScrolled ? '#2c1810' : '#fff',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            borderRadius: '0 0 1rem 1rem'
          }} className="mobile-nav">
            <ul style={{
              listStyle: 'none',
              padding: '1rem',
              margin: 0
            }}>
              {navItems.map((item) => (
                <li key={item.href} style={{ margin: '0.5rem 0' }}>
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: '#2c1810',
                      fontWeight: '500',
                      display: 'block',
                      padding: '0.5rem'
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}

export default Header