import { Suspense, lazy, useState } from "react";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const AllReviewsPage = lazy(() => import("./pages/AllReviewsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const navigation = [
  { label: "Home", to: "/", end: true },
  { label: "Explore Games", to: "/games" },
  { label: "Reviews", to: "/reviews" },
  { label: "My Library", to: "/library" },
];

function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <NavLink to="/" className="brand" aria-label="GamerReview home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 5h11a4 4 0 0 1 3.7 5.5l-2.1 5.3a2.4 2.4 0 0 1-3.9.8L13.6 15h-3.2l-1.6 1.6a2.4 2.4 0 0 1-3.9-.8l-2.1-5.3A4 4 0 0 1 6.5 5Z" />
                <path d="M6 11h4m-2-2v4" />
                <circle cx="16" cy="10" r=".7" fill="currentColor" />
                <circle cx="18" cy="13" r=".7" fill="currentColor" />
              </svg>
            </span>
            <span>Gamer<span>Review</span></span>
          </NavLink>
          <nav
            aria-label="Main navigation"
            className={`nav-links${mobileMenuOpen ? " open" : ""}`}
          >
            {navigation.map(({ label, to, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <NavLink className="nav-search" to="/games" aria-label="Search games">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
              <span>Search games...</span>
              <kbd>⌘ K</kbd>
            </NavLink>
            <NavLink to="/login" className="auth-nav-link">Log in</NavLink>
            <NavLink to="/register" className="btn nav-signup">Sign up</NavLink>
            <NavLink to="/profile" className="avatar" aria-label="Your profile">AR</NavLink>
            <button
              type="button"
              className="menu-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d={mobileMenuOpen ? "m6 6 12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className="site-content">
        <Suspense
          fallback={
            <div className="page-loading" role="status">Loading page...</div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">GR</span>
          <span>Gamer<span>Review</span></span>
        </div>
        <p>Find your next favorite game through players who know it best.</p>
        <div className="footer-bottom">
          <span>© 2026 GamerReview</span>
          <span>Made for players, by players.</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="reviews" element={<AllReviewsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="games" element={<ExplorePage />} />
        <Route path="games/:gameId/reviews" element={<ReviewsPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
