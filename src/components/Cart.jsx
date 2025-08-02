import React, { useEffect } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = ({ navigateTo }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (items.length === 0) {
    return (
      <div style={{
        paddingTop: '6rem',
        minHeight: '100vh',
        background: '#f8f7f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px',
          padding: '3rem'
        }}>
          <ShoppingBag size={80} color="#8B4513" style={{ marginBottom: '2rem' }} />
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#2c1810',
            marginBottom: '1rem'
          }}>
            Your cart is empty
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Looks like you haven't added any items to your cart yet. 
            Explore our premium menu and discover your perfect coffee experience.
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="btn"
            style={{ fontSize: '1.1rem' }}
          >
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '6rem', minHeight: '100vh', background: '#f8f7f4' }}>
      <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
        {/* Cart Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c1810'
          }}>
            Your Cart
          </h1>
          
          <button
            onClick={clearCart}
            style={{
              background: 'none',
              border: '2px solid #e0e0e0',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              color: '#666',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ff4444'
              e.target.style.color = '#ff4444'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e0e0e0'
              e.target.style.color = '#666'
            }}
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ marginBottom: '2rem' }}>
          {items.map((item) => (
            <div
              key={item.cartId}
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '1.5rem',
                alignItems: 'center'
              }} className="cart-item">
                
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem'
                  }}
                />

                {/* Item Details */}
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#2c1810',
                    marginBottom: '0.5rem'
                  }}>
                    {item.name}
                  </h3>
                  
                  {/* Customizations */}
                  {item.customizations && (
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginBottom: '0.75rem'
                    }}>
                      {item.customizations.size && (
                        <div>Size: {item.customizations.size}</div>
                      )}
                      {item.customizations.milk && (
                        <div>Milk: {item.customizations.milk}</div>
                      )}
                      {item.customizations.extras && item.customizations.extras.length > 0 && (
                        <div>Extras: {item.customizations.extras.join(', ')}</div>
                      )}
                      {item.customizations.specialInstructions && (
                        <div>Notes: {item.customizations.specialInstructions}</div>
                      )}
                    </div>
                  )}

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: '#f8f7f4',
                      padding: '0.5rem',
                      borderRadius: '25px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        style={{
                          background: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#8B4513'
                        }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        minWidth: '1.5rem',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        style={{
                          background: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#8B4513'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff4444',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 68, 68, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Item Price */}
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#8B4513'
                  }}>
                    ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {item.price} each
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #f0f0f0'
          }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#2c1810'
            }}>
              Subtotal ({items.reduce((count, item) => count + item.quantity, 0)} items)
            </span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#8B4513'
            }}>
              ${getCartTotal().toFixed(2)}
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem'
          }} className="cart-actions">
            <button
              onClick={() => navigateTo('home')}
              style={{
                flex: 1,
                background: 'none',
                border: '2px solid #8B4513',
                color: '#8B4513',
                padding: '1rem 2rem',
                borderRadius: '25px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#8B4513'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none'
                e.target.style.color = '#8B4513'
              }}
            >
              Continue Shopping
            </button>
            
            <button
              onClick={() => navigateTo('checkout')}
              className="btn"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1.1rem'
              }}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cart-item {
            grid-template-columns: 80px 1fr !important;
            gap: 1rem !important;
          }
          .cart-actions {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Cart