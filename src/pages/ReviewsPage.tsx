import { Link, useParams } from "react-router-dom";
import { games } from "../data/games";

const reviews = [
  {
    name: "Maya Chen",
    handle: "@mayaplays",
    initials: "MC",
    score: "9.5",
    title: "A world worth getting lost in",
    text: "It doesn't just build a beautiful world—it makes every corner feel consequential. The combat rewards patience, the story trusts its audience, and the score is extraordinary.",
    tags: ["Gameplay", "Story", "Open World"],
    time: "18 min ago",
  },
  {
    name: "Theo Brooks",
    handle: "@theob",
    initials: "TB",
    score: "9.0",
    title: "An unforgettable adventure",
    text: "The world rewards curiosity at every turn. It took a little time to find my rhythm, but the journey was worth every minute.",
    tags: ["Gameplay", "Graphics", "Difficulty"],
    time: "2 hours ago",
  },
];

function ReviewsPage() {
  const { gameId } = useParams();
  const game = games.find((item) => item.id === gameId);
  const gameName =
    game?.title ??
    gameId
      ?.split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") ??
    "Game";

  return (
    <main>
      <section className="detail-hero">
        <img src={game?.image ?? games[0].image} alt="" />
        <div className="hero-overlay" />
        <div className="breadcrumb">
          <Link to="/games">Explore Games</Link>
          <span> / </span>
          {game?.genre[0] ?? "Reviews"}
          <span> / </span>
          {gameName}
        </div>
      </section>
      <section className="detail-intro page-section">
        <div className="cover">
          <img src={game?.image ?? games[0].image} alt={`${gameName} cover`} />
          <span>Community favorite</span>
        </div>
        <div className="detail-copy">
          <div className="detail-badges">
            <span className="badge">{game?.genre[0] ?? "Player reviews"}</span>
            {game?.genre[1] && <span className="badge">{game.genre[1]}</span>}
          </div>
          <h1>{gameName}</h1>
          <p className="lead">The community's take on {gameName}.</p>
          <p className="studio-meta">
            {game?.year ?? "2025"} · {game?.platforms.join(" · ") ?? "PC"}
          </p>
        </div>
        <aside className="score-card">
          <span>Community score</span>
          <strong>{game?.rating.toFixed(1) ?? "9.4"}</strong>
          <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p>Based on {(game?.reviewCount ?? 2847).toLocaleString()} reviews</p>
          <a href="#reviews">See player reviews</a>
        </aside>
      </section>
      <section className="rating-panel page-section">
        <div className="rating-summary">
          <span className="eyebrow">Player verdict</span>
          <h2>Community rating</h2>
          <strong>{game?.rating.toFixed(1) ?? "9.4"}</strong>
        </div>
        <div className="rating-bars" aria-label="Rating distribution">
          {[["10", 72], ["9", 16], ["8", 7], ["7", 3], ["6", 1], ["5", 1]].map(
            ([score, percentage]) => (
              <div key={score}>
                <span>{score}</span>
                <i><em style={{ width: `${percentage}%` }} /></i>
                <span>{percentage}%</span>
              </div>
            ),
          )}
        </div>
      </section>
      <section className="page-section reviews-section" id="reviews">
        <div className="section-head">
          <div>
            <span className="eyebrow">From the community</span>
            <h2>Player reviews</h2>
          </div>
          <Link to="/login">Write a review →</Link>
        </div>
        {reviews.map((review) => (
          <article className="review-card" key={review.handle}>
            <div className="review-top">
              <div className="reviewer">
                <span className="avatar">{review.initials}</span>
                <span>
                  <b>{review.name}</b>
                  <small>{review.handle}</small>
                </span>
              </div>
              <span className="review-time">{review.time}</span>
            </div>
            <div className="review-game">
              <img src={game?.image ?? games[0].image} alt="" />
              <Link to={`/games/${game?.id ?? gameId}/reviews`}>
                {gameName}
              </Link>
              <span className="rating">★ {review.score}</span>
            </div>
            <h2>{review.title}</h2>
            <p>{review.text}</p>
            <div className="review-tags" aria-label="Review tags">
              {review.tags.map((tag) => (
                <span className="badge" key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ReviewsPage;
