import React, { useEffect, useState } from 'react'
import { CheckCircle, Clock, MapPin, Phone, Star, ArrowLeft } from 'lucide-react'

const OrderConfirmation = ({ navigateTo }) => {
  const [orderNumber] = useState(() => Math.floor(Math.random() * 10000) + 1000)
  const [estimatedTime] = useState(() => Math.floor(Math.random() * 10) + 10)
  const [showConfetti, setShowConfetti] = useState(true)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ 
      paddingTop: '6rem', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f7f4, #ffffff)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 100
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '-10px',
                left: `${Math.random() * 100}%`,
                width: '10px',
                height: '10px',
                background: ['#8B4513', '#A0522D', '#FFD700', '#f8f7f4'][Math.floor(Math.random() * 4)],
                animation: `confettiFall ${2 + Math.random() * 3}s ease-out forwards`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="container" style={{ maxWidth: '800px', padding: '2rem', textAlign: 'center' }}>
        
        {/* Success Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            borderRadius: '50%',
            padding: '2rem',
            animation: 'successPulse 2s ease-in-out infinite'
          }}>
            <CheckCircle size={60} color="white" />
          </div>
        </div>

        {/* Main Message */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: '#2c1810',
          marginBottom: '1rem'
        }}>
          Order Confirmed!
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Thank you for choosing Artisan Brew! Your premium coffee experience is being prepared with care.
        </p>

        {/* Order Details Card */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
          border: '1px solid rgba(139, 69, 19, 0.1)'
        }}>
          
          {/* Order Number */}
          <div style={{
            background: 'linear-gradient(135deg, #8B4513, #A0522D)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '25px',
            display: 'inline-block',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            Order #{orderNumber}
          </div>

          {/* Status and Time */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                background: '#f8f7f4',
                borderRadius: '50%',
                padding: '1rem',
                border: '3px solid #8B4513'
              }}>
                <Clock size={24} color="#8B4513" />
              </div>
              <div>
                <div style={{
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '0.5rem'
                }}>
                  Estimated Ready Time
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#8B4513'
                }}>
                  {estimatedTime} minutes
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                background: '#f8f7f4',
                borderRadius: '50%',
                padding: '1rem',
                border: '3px solid #8B4513'
              }}>
                <MapPin size={24} color="#8B4513" />
              </div>
              <div>
                <div style={{
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '0.5rem'
                }}>
                  Pickup Location
                </div>
                <div style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  lineHeight: '1.4'
                }}>
                  123 Coffee Street<br />
                  Downtown District
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                background: '#f8f7f4',
                borderRadius: '50%',
                padding: '1rem',
                border: '3px solid #8B4513'
              }}>
                <Phone size={24} color="#8B4513" />
              </div>
              <div>
                <div style={{
                  fontWeight: '600',
                  color: '#2c1810',
                  marginBottom: '0.5rem'
                }}>
                  We'll Text You
                </div>
                <div style={{
                  color: '#666',
                  fontSize: '0.95rem'
                }}>
                  When your order is ready
                </div>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div style={{
            background: '#f8f7f4',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#2c1810',
              marginBottom: '1rem'
            }}>
              Order Progress
            </h4>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              {/* Progress Line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                height: '4px',
                background: '#e0e0e0',
                borderRadius: '2px'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #8B4513, #A0522D)',
                  borderRadius: '2px',
                  width: '33%',
                  animation: 'progressFill 3s ease-out'
                }} />
              </div>

              {/* Progress Steps */}
              {[
                { label: 'Order Received', active: true },
                { label: 'Preparing', active: true },
                { label: 'Ready for Pickup', active: false }
              ].map((step, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: step.active ? '#8B4513' : '#e0e0e0',
                    marginBottom: '0.5rem',
                    transition: 'all 0.3s ease'
                  }} />
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: step.active ? '#2c1810' : '#999',
                    textAlign: 'center'
                  }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Message */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1))',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '2px solid rgba(139, 69, 19, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <span style={{
                fontWeight: '600',
                color: '#2c1810'
              }}>
                Premium Quality Guarantee
              </span>
              <Star size={20} color="#FFD700" fill="#FFD700" />
            </div>
            <p style={{
              color: '#666',
              margin: 0,
              fontSize: '0.95rem',
              lineHeight: '1.5'
            }}>
              Our expert baristas are hand-crafting your order using only the finest ingredients. 
              If you're not completely satisfied, we'll make it right.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigateTo('home')}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.1rem'
            }}
          >
            <ArrowLeft size={20} />
            Order More
          </button>

          <button
            onClick={() => window.open('tel:+15551234567')}
            style={{
              background: 'none',
              border: '2px solid #8B4513',
              color: '#8B4513',
              padding: '1rem 2rem',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
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
            <Phone size={20} />
            Call Café
          </button>
        </div>

        {/* Footer Message */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '1rem',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#2c1810',
            marginBottom: '1rem'
          }}>
            Thank You for Choosing Artisan Brew!
          </h3>
          <p style={{
            color: '#666',
            margin: 0,
            lineHeight: '1.6'
          }}>
            We're grateful for your business and excited to serve you the finest coffee experience. 
            Follow us on social media for exclusive offers and coffee brewing tips!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes successPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(76, 175, 80, 0);
          }
        }

        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 33%; }
        }
      `}</style>
    </div>
  )
}

export default OrderConfirmation