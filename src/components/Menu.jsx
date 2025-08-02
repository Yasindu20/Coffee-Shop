import React, { useState } from 'react'
import { menuData } from '../data/menuData'

const Menu = ({ navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState('coffee')

  const categories = [
    { id: 'coffee', label: 'Coffee & Beverages' },
    { id: 'pastries', label: 'Pastries & Sweets' },
    { id: 'lunch', label: 'Lunch Items' }
  ]

  const handleOrderNow = (item) => {
    const itemWithId = {
      ...item,
      id: `${activeCategory}_${menuData[activeCategory].indexOf(item)}`,
      category: activeCategory
    }
    navigateTo('order', itemWithId)
  }

  return (
    <section id="menu" style={{ padding: '5rem 0', background: 'white' }}>
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        
        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem',
          borderBottom: '1px solid #eee'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: '1rem 2rem',
                background: 'none',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: '500',
                color: activeCategory === category.id ? '#8B4513' : '#666',
                borderBottom: activeCategory === category.id ? '3px solid #8B4513' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="menu-tab"
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {menuData[activeCategory]?.map((item, index) => (
            <div
              key={index}
              style={{
                background: '#f8f7f4',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              className="menu-item"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#2c1810'
                  }}>
                    {item.name}
                  </h3>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#8B4513'
                  }}>
                    {item.price}
                  </span>
                </div>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {item.description}
                </p>
                <button
                  onClick={() => handleOrderNow(item)}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%'
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
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .menu-tab {
            padding: 0.75rem 1rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Menu