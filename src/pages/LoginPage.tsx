import { Link, useNavigate } from "react-router-dom";
import { games } from "../data/games";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function LoginPage() {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setFormError(null); setSubmitting(true);
    const values = new FormData(event.currentTarget);
    try { await login(String(values.get("identifier")), String(values.get("password"))); navigate("/profile"); }
    catch (e) { setFormError(e instanceof Error ? e.message : "Unable to sign in"); }
    finally { setSubmitting(false); }
  }
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
        <form onSubmit={handleSubmit}>
          <label>
            Email or username
            <input
              type="text"
              name="identifier"
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
          {(formError || error) && <p role="alert" className="form-error">{formError || error}</p>}
          <button className="btn" type="submit" disabled={submitting || loading}>{submitting ? "Signing in…" : "Log in"}</button>
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
