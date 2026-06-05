import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/* ── Inline SVG icons (no extra dependency) ── */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="4"  y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ── Reusable search form ── */
const SearchForm = ({ onSubmit, keyword, setKeyword, isMobile = false }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Keyboard shortcut: '/' focuses the desktop search bar
  useEffect(() => {
    if (isMobile) return;
    const handler = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isMobile]);

  return (
    <form
      className={`search-form ${isMobile ? 'search-form-mobile' : ''} ${focused ? 'focused' : ''}`}
      onSubmit={onSubmit}
      role="search"
    >
      {/* Leading search icon */}
      <span className="search-icon-left">
        <SearchIcon />
      </span>

      <input
        ref={inputRef}
        className="search-input"
        type="search"
        placeholder={isMobile ? 'Search…' : 'Search products…'}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label="Search products"
        autoComplete="off"
      />

      {/* Clear button – only visible when there's text */}
      {keyword && (
        <button
          type="button"
          className="search-clear-btn"
          aria-label="Clear search"
          onMouseDown={(e) => {
            e.preventDefault(); // keep focus on input
            setKeyword('');
            inputRef.current?.focus();
          }}
        >
          <ClearIcon />
        </button>
      )}

      {/* Submit button */}
      <button type="submit" className="search-submit-btn" aria-label="Submit search">
        Search
      </button>

      {/* Keyboard hint pill (desktop only, hidden when input has text) */}
      {!isMobile && !keyword && !focused && (
        <span className="search-kbd" aria-hidden="true">/</span>
      )}
    </form>
  );
};

const Header = () => {
  const { cartItemsCount } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const adminRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setAdminOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const closeMenu = () => {
    setIsMenuOpen(false);
    setAdminOpen(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/?keyword=${encodeURIComponent(searchKeyword.trim())}`);
    } else {
      navigate('/');
    }
    closeMenu();
  };

  const logoutHandler = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          EthioGebeya
        </Link>

        {/* Spacer keeps logo away from search on desktop */}
        <div className="header-search-wrap">
          <SearchForm
            onSubmit={searchHandler}
            keyword={searchKeyword}
            setKeyword={setSearchKeyword}
          />
        </div>

        <div className="nav-container">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {/* Mobile search (inside the slide-out drawer) */}
            <SearchForm
              onSubmit={searchHandler}
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
              isMobile
            />

            <Link to="/cart" onClick={closeMenu}>
              Cart {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
            </Link>

            {userInfo ? (
              <>
                <Link to="/profile" onClick={closeMenu}>
                  {userInfo.name}
                </Link>
                {userInfo.isAdmin && (
                  <div className="admin-dropdown" ref={adminRef}>
                    <button
                      className="admin-dropdown-btn"
                      onClick={() => setAdminOpen((v) => !v)}
                      aria-expanded={adminOpen}
                    >
                      Admin ▾
                    </button>
                    {adminOpen && (
                      <div className="admin-dropdown-menu">
                        <Link to="/admin/products" onClick={closeMenu}>Products</Link>
                        <Link to="/admin/users" onClick={closeMenu}>Users</Link>
                        <Link to="/admin/orders" onClick={closeMenu}>Orders</Link>
                      </div>
                    )}
                  </div>
                )}
                <button onClick={logoutHandler} className="btn-logout">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu}>Sign In</Link>
            )}
          </nav>

          <button
            className="hamburger"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
