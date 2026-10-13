import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { games } from "../data/games";

const reviews = [
  {
    id: "maya-elden-ring",
    user: "Maya Chen",
    handle: "@mayaplays",
    initials: "MC",
    gameId: "elden-ring",
    rating: 9.5,
    title: "A world worth getting lost in",
    text: "Elden Ring doesn't just build a beautiful world—it makes every corner feel consequential. The combat rewards patience, the story trusts its audience, and the score is extraordinary.",
    tags: ["Gameplay", "Story", "Open World"],
    likes: 328,
    helpful: 241,
    time: "18 min ago",
  },
  {
    id: "theo-ashen-crown",
    user: "Theo Brooks",
    handle: "@theob",
    initials: "TB",
    gameId: "ashen-crown",
    rating: 9.0,
    title: "Brutal, beautiful, and deeply rewarding",
    text: "The opening hours demand a lot, but Ashen Crown's precise combat and layered level design make the effort worthwhile. One of the year's most memorable adventures.",
    tags: ["Difficulty", "Gameplay", "Soundtrack"],
    likes: 186,
    helpful: 152,
    time: "2 hours ago",
  },
  {
    id: "jules-neon-protocol",
    user: "Jules Okafor",
    handle: "@juleso",
    initials: "JO",
    gameId: "neon-protocol",
    rating: 8.5,
    title: "A sharp multiplayer surprise",
    text: "Smart maps, confident gunplay, and refreshingly fair progression. Matchmaking still needs work, but the foundation is excellent.",
    tags: ["Multiplayer", "Performance", "Gameplay"],
    likes: 94,
    helpful: 78,
    time: "Yesterday",
  },
  {
    id: "rina-verdant-divide",
    user: "Rina Patel",
    handle: "@rinaplays",
    initials: "RP",
    gameId: "verdant-divide",
    rating: 8.9,
    title: "A quiet adventure that stays with you",
    text: "A thoughtful, beautifully paced journey. The small character moments and lush environments are the reason I kept coming back.",
    tags: ["Story", "Graphics", "Adventure"],
    likes: 72,
    helpful: 51,
    time: "Yesterday",
  },
];

const popularTags = [
  "Gameplay",
  "Story",
  "Graphics",
  "Performance",
  "Multiplayer",
];

function AllReviewsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Newest first");
  const [activeTag, setActiveTag] = useState("");
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const filteredReviews = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = reviews.filter((review) => {
      const game = games.find((item) => item.id === review.gameId);
      const searchable = [
        review.title,
        review.text,
        review.user,
        game?.title ?? "",
        ...review.tags,
      ]
        .join(" ")
        .toLowerCase();
      return (
        searchable.includes(search) &&
        (!activeTag || review.tags.includes(activeTag))
      );
    });

    if (sort === "Highest rating") {
      return filtered.sort((a, b) => b.rating - a.rating);
    }
    if (sort === "Lowest rating") {
      return filtered.sort((a, b) => a.rating - b.rating);
    }
    if (sort === "Most helpful") {
      return filtered.sort((a, b) => b.helpful - a.helpful);
    }
    return filtered;
  }, [activeTag, query, sort]);

  function toggleLike(reviewId: string) {
    setLikedReviews((current) =>
      current.includes(reviewId)
        ? current.filter((id) => id !== reviewId)
        : [...current, reviewId],
    );
  }

  return (
    <main className="subpage all-reviews-page">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Real players, honest takes</span>
          <h1>Community reviews</h1>
          <p>
            Find your next favorite game through the people who know it best.
          </p>
        </div>
        <Link className="btn" to="/login">
          <span aria-hidden="true">↗</span> Write a review
        </Link>
      </div>

      <div className="reviews-tools">
        <label className="catalog-search">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            aria-label="Search reviews, games, users, or tags"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reviews, games, users, or tags..."
            value={query}
          />
        </label>
        <label className="visually-hidden" htmlFor="review-sort">Sort reviews</label>
        <select
          id="review-sort"
          onChange={(event) => setSort(event.target.value)}
          value={sort}
        >
          <option>Newest first</option>
          <option>Most helpful</option>
          <option>Highest rating</option>
          <option>Lowest rating</option>
        </select>
        <button
          className={`reviews-filter-button${activeTag ? " active" : ""}`}
          onClick={() => setActiveTag(activeTag ? "" : "Gameplay")}
          type="button"
        >
          <span aria-hidden="true">☷</span> {activeTag ? `#${activeTag}` : "Filters"}
        </button>
      </div>

      <div className="review-layout">
        <aside className="review-aside">
          <h2>Discover reviews</h2>
          <button
            className={!activeTag ? "active" : ""}
            onClick={() => setActiveTag("")}
            type="button"
          >
            All reviews <span>8.4k</span>
          </button>
          <button type="button" onClick={() => setSort("Most helpful")}>
            Most helpful
          </button>
          <button type="button" onClick={() => setSort("Highest rating")}>
            Highest rated
          </button>
          <hr />
          <label>Popular tags</label>
          {popularTags.map((tag) => (
            <button
              className={activeTag === tag ? "active" : ""}
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
              type="button"
            >
              #{tag}
            </button>
          ))}
        </aside>

        <section className="review-feed" aria-label="Community review feed">
          <div className="feed-head">
            <span>
              <b>{filteredReviews.length}</b> reviews · Sorted by{" "}
              <b>{sort}</b>
              {activeTag && <> · Tagged <b>#{activeTag}</b></>}
            </span>
          </div>
          {filteredReviews.map((review) => {
            const game = games.find((item) => item.id === review.gameId);
            if (!game) return null;
            const liked = likedReviews.includes(review.id);

            return (
              <article className="review-card" key={review.id}>
                <div className="review-top">
                  <Link className="reviewer" to="/profile">
                    <span className="avatar">{review.initials}</span>
                    <span>
                      <b>{review.user}</b>
                      <small>{review.handle}</small>
                    </span>
                  </Link>
                  <span className="review-time">{review.time}</span>
                </div>
                <div className="review-game">
                  <img src={game.image} alt="" />
                  <Link to={`/games/${game.id}/reviews`}>{game.title}</Link>
                  <Link
                    className="rating"
                    to={`/games/${game.id}/reviews`}
                    aria-label={`${game.title} community score ${game.rating.toFixed(1)}`}
                  >
                    ★ {game.rating.toFixed(1)}
                  </Link>
                </div>
                <h2>{review.title}</h2>
                <p>{review.text}</p>
                <div className="review-tags" aria-label="Review tags">
                  {review.tags.map((tag) => (
                    <button
                      className={activeTag === tag ? "active" : ""}
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="review-actions">
                  <button
                    aria-pressed={liked}
                    className={liked ? "active" : ""}
                    onClick={() => toggleLike(review.id)}
                    type="button"
                  >
                    {liked ? "♥" : "♡"} {review.likes + (liked ? 1 : 0)}
                  </button>
                  <span>♧ Helpful · {review.helpful}</span>
                  <Link to={`/games/${game.id}/reviews`}>
                    Read full review <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
          {filteredReviews.length === 0 && (
            <div className="empty-state">
              <h2>No reviews match your filters</h2>
              <p>Try another search term or select a different tag.</p>
              <button
                className="btn secondary"
                onClick={() => {
                  setQuery("");
                  setActiveTag("");
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AllReviewsPage;
