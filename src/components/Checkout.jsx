import React, { useState, useEffect } from 'react'
import { CreditCard, MapPin, Phone, Mail, Clock, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Checkout = ({ navigateTo }) => {
  const { items, getCartTotal, clearCart } = useCart()
  const [orderType, setOrderType] = useState('pickup')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    zip: '',
    instructions: ''
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const tax = getCartTotal() * 0.1
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0
  const total = getCartTotal() + tax + deliveryFee

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    setTimeout(() => {
      clearCart()
      navigateTo('confirmation')
    }, 2000)
  }

  const handleInputChange = (section, field, value) => {
    if (section === 'customer') {
      setCustomerInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'delivery') {
      setDeliveryInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div style={{ paddingTop: '6rem', minHeight: '100vh', background: '#f8f7f4' }}>
      <div className="container" style={{ maxWidth: '1200px', padding: '2rem' }}>
        
        {/* Checkout Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c1810',
            marginBottom: '1rem'
          }}>
            Secure Checkout
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: '#666'
          }}>
            <Shield size={20} color="#8B4513" />
            <span>SSL Encrypted & Secure Payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '3rem'
          }} className="checkout-grid">
            
            {/* Left Column - Forms */}
            <div>
              
              {/* Order Type Selection */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '1.5rem'
                }}>
                  Order Type
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    border: `2px solid ${orderType === 'pickup' ? '#8B4513' : '#e0e0e0'}`,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: orderType === 'pickup' ? '#f8f7f4' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="orderType"
                      value="pickup"
                      checked={orderType === 'pickup'}
                      onChange={(e) => setOrderType(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <Clock size={24} color="#8B4513" />
                    <div>
                      <div style={{ fontWeight: '600', color: '#2c1810' }}>
                        Pickup
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Ready in 10-15 min
                      </div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    border: `2px solid ${orderType === 'delivery' ? '#8B4513' : '#e0e0e0'}`,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: orderType === 'delivery' ? '#f8f7f4' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="orderType"
                      value="delivery"
                      checked={orderType === 'delivery'}
                      onChange={(e) => setOrderType(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <MapPin size={24} color="#8B4513" />
                    <div>
                      <div style={{ fontWeight: '600', color: '#2c1810' }}>
                        Delivery
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        30-45 min (+$3.99)
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customer Information */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '1.5rem'
                }}>
                  Contact Information
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#2c1810'
                  }}>
                    <Mail size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#2c1810'
                  }}>
                    <Phone size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  marginBottom: '2rem',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#2c1810',
                    marginBottom: '1.5rem'
                  }}>
                    Delivery Address
                  </h3>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.address}
                      onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#2c1810'
                      }}>
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.city}
                        onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#2c1810'
                      }}>
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.zip}
                        onChange={(e) => handleInputChange('delivery', 'zip', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#2c1810'
                    }}>
                      Delivery Instructions
                    </label>
                    <textarea
                      value={deliveryInfo.instructions}
                      onChange={(e) => handleInputChange('delivery', 'instructions', e.target.value)}
                      placeholder="Apartment number, building entrance, etc."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.75rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '1.5rem'
                }}>
                  Payment Method
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    border: `2px solid ${paymentMethod === 'card' ? '#8B4513' : '#e0e0e0'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    flex: 1,
                    background: paymentMethod === 'card' ? '#f8f7f4' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <CreditCard size={20} color="#8B4513" />
                    <span style={{ fontWeight: '500' }}>Credit Card</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    border: `2px solid ${paymentMethod === 'cash' ? '#8B4513' : '#e0e0e0'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    flex: 1,
                    background: paymentMethod === 'cash' ? '#f8f7f4' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <span style={{ fontSize: '1.25rem' }}>💵</span>
                    <span style={{ fontWeight: '500' }}>Cash on {orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#2c1810'
                      }}>
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardholderName}
                        onChange={(e) => handleInputChange('payment', 'cardholderName', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#2c1810'
                      }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontWeight: '500',
                          color: '#2c1810'
                        }}>
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '0.5rem',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontWeight: '500',
                          color: '#2c1810'
                        }}>
                          CVV *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '0.5rem',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '1.5rem'
                }}>
                  Order Summary
                </h3>

                {/* Order Items */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {items.map((item) => (
                    <div
                      key={item.cartId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <div>
                        <div style={{
                          fontWeight: '500',
                          color: '#2c1810',
                          marginBottom: '0.25rem'
                        }}>
                          {item.name} × {item.quantity}
                        </div>
                        {item.customizations && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#666'
                          }}>
                            {item.customizations.size && `${item.customizations.size}, `}
                            {item.customizations.milk && item.customizations.milk}
                            {item.customizations.extras && item.customizations.extras.length > 0 && 
                              `, +${item.customizations.extras.length} extras`}
                          </div>
                        )}
                      </div>
                      <div style={{
                        fontWeight: '600',
                        color: '#8B4513'
                      }}>
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div style={{
                  borderTop: '2px solid #f0f0f0',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  {orderType === 'delivery' && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem'
                    }}>
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#8B4513',
                    borderTop: '2px solid #f0f0f0',
                    paddingTop: '1rem'
                  }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="btn"
                  style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '1rem 2rem',
                    marginTop: '2rem'
                  }}
                >
                  Place Order - ${total.toFixed(2)}
                </button>

                {/* Security Notice */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  <Shield size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Your payment information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Checkout