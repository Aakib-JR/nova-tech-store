import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, X, Trash2 } from 'lucide-react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#products', label: 'Products' },
  { href: '#categories', label: 'Categories' },
  { href: '#about', label: 'About' },
]

export default function Navbar({ cartCount, query, onSearch, onClearCart }) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`nova-header sticky-top ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg container py-3" aria-label="Main navigation">
        <a className="navbar-brand nova-logo" href="#home" onClick={closeMenu}>
          NOVA<span aria-hidden="true">.</span>
        </a>

        <div className="d-flex align-items-center gap-1 order-lg-3">
          <button className="icon-btn" aria-label={searchOpen ? 'Close search' : 'Open search'} aria-expanded={searchOpen} onClick={() => setSearchOpen((v) => !v)}>
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <div className="position-relative">
            <button className="icon-btn" aria-label={`Shopping bag, ${cartCount} items`} aria-expanded={cartOpen} onClick={() => setCartOpen((v) => !v)}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span key={cartCount} className="cart-badge" initial={{ scale: 0.4 }} animate={{ scale: 1 }}>
                  {cartCount}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {cartOpen && (
                <motion.div className="cart-pop" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <p className="mb-2 fw-semibold">{cartCount === 0 ? 'Your bag is empty' : `${cartCount} item${cartCount > 1 ? 's' : ''} in your bag`}</p>
                  {cartCount === 0 ? (
                    <a href="#products" className="small" onClick={() => setCartOpen(false)}>Browse products</a>
                  ) : (
                    <button className="btn btn-sm btn-nova-ghost" onClick={() => { onClearCart(); setCartOpen(false) }}>
                      <Trash2 size={14} className="me-1" /> Clear bag
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="navbar-toggler ms-1" type="button" aria-controls="nav" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        <div id="nav" className={`collapse navbar-collapse justify-content-center ${open ? 'show' : ''}`}>
          <ul className="navbar-nav gap-lg-3 pt-3 pt-lg-0">
            {links.map((l) => (
              <li className="nav-item" key={l.href}>
                <a className="nav-link" href={l.href} onClick={closeMenu}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div className="container pb-3" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <label htmlFor="search" className="visually-hidden">Search products</label>
            <input id="search" type="search" autoFocus className="form-control nova-input" placeholder="Search headphones, phones, laptops…" value={query} onChange={(e) => onSearch(e.target.value)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
