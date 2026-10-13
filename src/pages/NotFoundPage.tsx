import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="subpage not-found-page">
      <span className="eyebrow">404 · Page not found</span>
      <h1>This page doesn't exist.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <Link to="/" className="btn">Back to home</Link>
    </section>
  );
}

export default NotFoundPage;
