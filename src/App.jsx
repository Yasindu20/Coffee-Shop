import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import OrderPage from './components/OrderPage'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedItem, setSelectedItem] = useState(null)

  const navigateTo = (page, item = null) => {
    setCurrentPage(page)
    if (item) setSelectedItem(item)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'order':
        return <OrderPage item={selectedItem} navigateTo={navigateTo} />
      case 'cart':
        return <Cart navigateTo={navigateTo} />
      case 'checkout':
        return <Checkout navigateTo={navigateTo} />
      case 'confirmation':
        return <OrderConfirmation navigateTo={navigateTo} />
      default:
        return (
          <>
            <Hero />
            <About />
            <Menu navigateTo={navigateTo} />
            <Gallery />
            <Contact />
          </>
        )
    }
  }

  return (
    <CartProvider>
      <div className="App">
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        {renderPage()}
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App