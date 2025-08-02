import React, { useState, useEffect } from 'react'
import { Plus, Minus, Star, Clock, Award } from 'lucide-react'
import { useCart } from '../context/CartContext'

const OrderPage = ({ item, navigateTo }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('Regular')
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk')
  const [selectedExtras, setSelectedExtras] = useState([])
  const [specialInstructions, setSpecialInstructions] = useState('')
  const { addToCart } = useCart()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!item) {
    return (
      <div style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h2>Item not found</h2>
        <button onClick={() => navigateTo('home')} className="btn">
          Return to Menu
        </button>
      </div>
    )
  }

  const sizes = [
    { name: 'Small', price: 0, description: '8 oz' },
    { name: 'Regular', price: 0, description: '12 oz' },
    { name: 'Large', price: 1.50, description: '16 oz' },
    { name: 'Extra Large', price: 2.50, description: '20 oz' }
  ]

  const milkOptions = [
    'Whole Milk', 'Skim Milk', 'Oat Milk (+$0.75)', 
    'Almond Milk (+$0.75)', 'Soy Milk (+$0.75)', 'Coconut Milk (+$0.75)'
  ]

  const extras = [
    { name: 'Extra Shot', price: 0.75 },
    { name: 'Decaf Shot', price: 0 },
    { name: 'Extra Hot', price: 0 },
    { name: 'Extra Foam', price: 0 },
    { name: 'Light Foam', price: 0 },
    { name: 'Vanilla Syrup', price: 0.65 },
    { name: 'Caramel Syrup', price: 0.65 },
    { name: 'Hazelnut Syrup', price: 0.65 },
    { name: 'Sugar-Free Vanilla', price: 0.65 },
    { name: 'Whipped Cream', price: 0.50 }
  ]

  const basePrice = parseFloat(item.price.replace('$', ''))
  const sizeUpcharge = sizes.find(s => s.name === selectedSize)?.price || 0
  const milkUpcharge = selectedMilk.includes('+$') ? 0.75 : 0
  const extrasTotal = selectedExtras.reduce((total, extra) => 
    total + (extras.find(e => e.name === extra)?.price || 0), 0
  )
  const totalPrice = (basePrice + sizeUpcharge + milkUpcharge + extrasTotal) * quantity

  const handleExtraToggle = (extraName) => {
    setSelectedExtras(prev => 
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    )
  }

  const handleAddToCart = () => {
    const orderItem = {
      ...item,
      quantity,
      customizations: {
        size: selectedSize,
        milk: selectedMilk,
        extras: selectedExtras,
        specialInstructions
      },
      price: `$${(basePrice + sizeUpcharge + milkUpcharge + extrasTotal).toFixed(2)}`
    }
    
    addToCart(orderItem)
    navigateTo('cart')
  }

  return (
    <div style={{ paddingTop: '6rem', minHeight: '100vh', background: '#f8f7f4' }}>
      <div className="container" style={{ maxWidth: '1000px', padding: '2rem' }}>
        {/* Item Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem',
          background: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }} className="order-header">
          
          {/* Image Section */}
          <div>
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '1rem'
              }}
            />
            
            {/* Product Features */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f8f7f4',
                padding: '0.75rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                Premium Quality
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f8f7f4',
                padding: '0.75rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                <Clock size={16} color="#8B4513" />
                Fresh Made
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f8f7f4',
                padding: '0.75rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                <Award size={16} color="#8B4513" />
                Artisan Crafted
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '1rem'
            }}>
              {item.name}
            </h1>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              {item.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#8B4513'
              }}>
                ${totalPrice.toFixed(2)}
              </div>
              
              {/* Quantity Selector */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#f8f7f4',
                padding: '0.75rem',
                borderRadius: '25px'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#8B4513'
                  }}
                >
                  <Minus size={20} />
                </button>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  minWidth: '2rem',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#8B4513'
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn"
              style={{
                width: '100%',
                fontSize: '1.1rem',
                padding: '1rem 2rem'
              }}
            >
              Add to Cart - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>

        {/* Customization Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          
          {/* Size Selection */}
          {item.category === 'coffee' && (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#2c1810',
                marginBottom: '1.5rem'
              }}>
                Choose Size
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sizes.map((size) => (
                  <label
                    key={size.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      border: `2px solid ${selectedSize === size.name ? '#8B4513' : '#e0e0e0'}`,
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedSize === size.name ? '#f8f7f4' : 'white'
                    }}
                  >
                    <div>
                      <input
                        type="radio"
                        name="size"
                        value={size.name}
                        checked={selectedSize === size.name}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        style={{ display: 'none' }}
                      />
                      <div style={{
                        fontWeight: '600',
                        color: '#2c1810',
                        marginBottom: '0.25rem'
                      }}>
                        {size.name}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {size.description}
                      </div>
                    </div>
                    {size.price > 0 && (
                      <div style={{
                        color: '#8B4513',
                        fontWeight: '600'
                      }}>
                        +${size.price.toFixed(2)}
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Milk Selection */}
          {item.category === 'coffee' && (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#2c1810',
                marginBottom: '1.5rem'
              }}>
                Milk Choice
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {milkOptions.map((milk) => (
                  <label
                    key={milk}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      border: `2px solid ${selectedMilk === milk ? '#8B4513' : '#e0e0e0'}`,
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedMilk === milk ? '#f8f7f4' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="milk"
                      value={milk}
                      checked={selectedMilk === milk}
                      onChange={(e) => setSelectedMilk(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      fontWeight: selectedMilk === milk ? '600' : '500',
                      color: '#2c1810'
                    }}>
                      {milk}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2c1810',
              marginBottom: '1.5rem'
            }}>
              Extras & Add-ons
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {extras.map((extra) => (
                <label
                  key={extra.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    border: `2px solid ${selectedExtras.includes(extra.name) ? '#8B4513' : '#e0e0e0'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedExtras.includes(extra.name) ? '#f8f7f4' : 'white'
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.name)}
                      onChange={() => handleExtraToggle(extra.name)}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      fontWeight: selectedExtras.includes(extra.name) ? '600' : '500',
                      color: '#2c1810'
                    }}>
                      {extra.name}
                    </span>
                  </div>
                  {extra.price > 0 && (
                    <span style={{
                      color: '#8B4513',
                      fontWeight: '600'
                    }}>
                      +${extra.price.toFixed(2)}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2c1810',
              marginBottom: '1.5rem'
            }}>
              Special Instructions
            </h3>
            
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests or modifications?"
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .order-header {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default OrderPage