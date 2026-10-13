import { Link } from "react-router-dom";
import { games } from "../data/games";

function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-art" aria-label="Join the GamerReview community">
        <img src={games[3].image} alt="" />
        <div className="auth-shade" />
        <Link className="brand" to="/" aria-label="GamerReview home">
          <span className="brand-mark">GR</span>
          <span>Gamer<span>Review</span></span>
        </Link>
        <blockquote>
          “Every great game deserves to be discovered.”
        </blockquote>
        <small>Meet players who love the same worlds you do.</small>
      </section>
      <section className="auth-form">
        <span className="eyebrow">Join the community</span>
        <h1>Create your player profile.</h1>
        <p>
          Save games for later, share your honest takes, and find your next
          favorite.
        </p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            Display name
            <input
              type="text"
              name="name"
              autoComplete="nickname"
              placeholder="What should we call you?"
              required
            />
          </label>
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
              autoComplete="new-password"
              minLength={8}
              placeholder="At least 8 characters"
              required
            />
          </label>
          <label className="auth-consent">
            <input type="checkbox" required />
            I agree to the community guidelines and terms.
          </label>
          <button className="btn" type="submit">Create account</button>
        </form>
        <div className="auth-switch">
          Already a member? <Link to="/login">Log in</Link>
        </div>
        <small className="auth-note">
          Your profile starts private. You can customize it any time.
        </small>
      </section>
    </main>
  );
}

export default RegisterPage;
