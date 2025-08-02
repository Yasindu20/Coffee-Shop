import React, { useState, useEffect } from 'react'
import { Menu, X, Coffee, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Header = ({ navigateTo, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getCartItemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home', page: 'home' },
    { href: '#about', label: 'About', page: 'home' },
    { href: '#menu', label: 'Menu', page: 'home' },
    { href: '#gallery', label: 'Gallery', page: 'home' },
    { href: '#contact', label: 'Contact', page: 'home' }
  ]

  const handleNavClick = (item) => {
    if (item.page === 'home' && currentPage !== 'home') {
      navigateTo('home')
      setTimeout(() => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else if (currentPage === 'home') {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const cartItemCount = getCartItemCount()
  const isOrderingPages = ['order', 'cart', 'checkout', 'confirmation'].includes(currentPage)

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled || isOrderingPages ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled || isOrderingPages ? 'blur(10px)' : 'none',
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
          <div 
            onClick={() => navigateTo('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: isScrolled || isOrderingPages ? '#2c1810' : '#fff',
              cursor: 'pointer'
            }}
          >
            <Coffee size={28} color="#8B4513" />
            Artisan Brew
          </div>

          {/* Navigation Content */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Back Button for Ordering Pages */}
            {isOrderingPages && currentPage !== 'confirmation' && (
              <button
                onClick={() => {
                  if (currentPage === 'order') navigateTo('home')
                  else if (currentPage === 'cart') navigateTo('home')
                  else if (currentPage === 'checkout') navigateTo('cart')
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#8B4513',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}

            {/* Desktop Navigation */}
            {currentPage === 'home' && (
              <ul style={{
                display: 'flex',
                listStyle: 'none',
                gap: '2rem',
                margin: 0,
                padding: 0
              }} className="desktop-nav">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        textDecoration: 'none',
                        color: isScrolled ? '#2c1810' : '#fff',
                        fontWeight: '500',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#8B4513'}
                      onMouseLeave={(e) => e.target.style.color = isScrolled ? '#2c1810' : '#fff'}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Cart Button */}
            <button
              onClick={() => navigateTo('cart')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '500',
                position: 'relative',
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
              <ShoppingCart size={20} />
              <span className="desktop-only">Cart</span>
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#FFD700',
                  color: '#2c1810',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: isScrolled || isOrderingPages ? '#2c1810' : '#fff',
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && currentPage === 'home' && (
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
                  <button
                    onClick={() => handleNavClick(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textDecoration: 'none',
                      color: '#2c1810',
                      fontWeight: '500',
                      display: 'block',
                      padding: '0.5rem',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
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
          .desktop-only {
            display: none !important;
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