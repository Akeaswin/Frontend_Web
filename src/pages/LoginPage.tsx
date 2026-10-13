import { Link } from "react-router-dom";
import { games } from "../data/games";

function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-art" aria-label="Welcome to GamerReview">
        <img src={games[0].image} alt="" />
        <div className="auth-shade" />
        <Link className="brand" to="/" aria-label="GamerReview home">
          <span className="brand-mark">GR</span>
          <span>Gamer<span>Review</span></span>
        </Link>
        <blockquote>
          “The best recommendations come from people who play.”
        </blockquote>
        <small>Find your next favorite game with GamerReview.</small>
      </section>
      <section className="auth-form">
        <span className="eyebrow">Welcome back</span>
        <h1>Good to see you again.</h1>
        <p>
          Sign in to find your library, share reviews, and keep up with the
          games you love.
        </p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            Email address
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </label>
          <div className="auth-options">
            <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <span>Password recovery coming soon</span>
          </div>
          <button className="btn" type="submit">Log in</button>
        </form>
        <div className="auth-switch">
          New to GamerReview? <Link to="/register">Create an account</Link>
        </div>
        <small className="auth-note">
          By continuing, you agree to our community guidelines.
        </small>
      </section>
    </main>
  );
}

export default LoginPage;
