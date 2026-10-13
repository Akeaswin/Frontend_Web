import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { useWishlist } from "../context/WishlistContext";
import { games, formatReviewCount } from "../data/games";

const categories = [
  ["Action", "2.4k games"],
  ["RPG", "1.8k games"],
  ["Adventure", "1.6k games"],
  ["FPS", "980 games"],
  ["Strategy", "980 games"],
  ["Horror", "1.2k games"],
  ["Indie", "3.1k games"],
];

function HomePage() {
  const featuredGame = games[0];
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isFeaturedWishlisted = isWishlisted(featuredGame.id);

  return (
    <main>
      <section className="hero">
        <img src={featuredGame.image} alt="A vast fantasy landscape" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="feature-label">
            <span aria-hidden="true">✦</span> Featured this week
          </span>
          <h1>
            {featuredGame.title.split(" ")[0]}
            <br />
            <em>{featuredGame.title.split(" ").slice(1).join(" ")}</em>
          </h1>
          <p>
            Journey beyond the fractured veil in a vast action RPG where every
            choice reshapes a dying world.
          </p>
          <div className="hero-meta">
            <span className="rating">
              <span aria-hidden="true">★</span> {featuredGame.rating.toFixed(1)}
            </span>
            <span>{formatReviewCount(featuredGame.reviewCount)} reviews</span>
            <span className="hero-badge">Action RPG</span>
            <span className="hero-badge">Open World</span>
          </div>
          <div className="hero-actions">
            <Link className="btn" to={`/games/${featuredGame.id}/reviews`}>
              Explore game <span aria-hidden="true">→</span>
            </Link>
            <button
              aria-pressed={isFeaturedWishlisted}
              className="btn secondary"
              onClick={() => toggleWishlist(featuredGame.id)}
              type="button"
            >
              <span aria-hidden="true">{isFeaturedWishlisted ? "♥" : "♡"}</span>
              {isFeaturedWishlisted ? "In wishlist" : "Add to wishlist"}
            </button>
          </div>
        </div>
        <div className="carousel" aria-label="Featured game 1 of 3">
          <span>01</span>
          <span className="carousel-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <Link className="btn secondary" to="/games" aria-label="Browse games">
            →
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">What's hot</span>
            <h2>Trending games</h2>
          </div>
          <Link to="/games">View all games →</Link>
        </div>
        <div className="game-grid">
          {games.slice(0, 4).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="page-section categories-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Find your next obsession</span>
            <h2>Browse by category</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map(([category, count], index) => (
            <Link
              to={`/games?genre=${encodeURIComponent(category)}`}
              key={category}
            >
              <span>0{index + 1}</span>
              <div>
                <h3>{category}</h3>
                <p>{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section split-section">
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">Community pulse</span>
              <h2>Recently reviewed</h2>
            </div>
            <Link to="/reviews">All reviews →</Link>
          </div>
          <article className="review-card">
            <div className="review-top">
              <div className="reviewer">
                <span className="avatar">MC</span>
                <span>
                  <b>Maya Chen</b>
                  <small>@mayaplays</small>
                </span>
              </div>
              <span className="review-time">18 min ago</span>
            </div>
            <div className="review-game">
              <img src={featuredGame.image} alt="" />
              <Link to={`/games/${featuredGame.id}/reviews`}>
                {featuredGame.title}
              </Link>
              <span className="rating">★ 9.5</span>
            </div>
            <h2>A world worth getting lost in</h2>
            <p>
              Every corner feels consequential. The combat rewards patience,
              the story trusts its audience, and the score is extraordinary.
            </p>
          </article>
        </div>
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">Fresh arrivals</span>
              <h2>New releases</h2>
            </div>
          </div>
          <div className="mini-list">
            {games.slice(3, 6).map((game, index) => (
              <Link to={`/games/${game.id}/reviews`} key={game.id}>
                <img src={game.image} alt="" loading="lazy" />
                <span>
                  <b>{game.title}</b>
                  <small>{game.genre[0]} · {game.year}</small>
                </span>
                <em>0{index + 1}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <span className="eyebrow">Stay in the loop</span>
        <h2>Good games. Great takes.</h2>
        <p>Discover the next game worth staying up late for.</p>
        <Link className="btn" to="/games">Explore the catalog</Link>
      </section>
    </main>
  );
}

export default HomePage;
