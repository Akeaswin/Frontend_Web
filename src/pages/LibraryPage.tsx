import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { formatReviewCount, games } from "../data/games";

type LibraryTab = "Wishlist" | "Favorites";

function LibraryPage() {
  const [tab, setTab] = useState<LibraryTab>("Wishlist");
  const { wishlist, toggleWishlist } = useWishlist();
  const [favorites] = useState(["ashen-crown", "neon-protocol"]);
  const visibleIds = tab === "Wishlist" ? wishlist : favorites;
  const visibleGames = visibleIds
    .map((id) => games.find((game) => game.id === id))
    .filter((game) => game !== undefined);

  return (
    <main className="subpage">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Your collection</span>
          <h1>My game library</h1>
          <p>
            Keep every world you love—and every adventure still ahead—in one
            place.
          </p>
        </div>
      </div>

      <div className="library-tabs" role="tablist" aria-label="Library sections">
        {(["Wishlist", "Favorites"] as const).map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            <span aria-hidden="true">{item === "Wishlist" ? "▣" : "♥"}</span>
            {item}
            <span>{item === "Wishlist" ? wishlist.length : favorites.length}</span>
          </button>
        ))}
      </div>

      {visibleGames.length ? (
        <div className="library-list">
          {visibleGames.map((game) => (
            <article className="library-item" key={game.id}>
              <img src={game.image} alt="" loading="lazy" />
              <div>
                <div className="platforms">
                  {game.platforms.map((platform) => (
                    <span className="badge" key={platform}>{platform}</span>
                  ))}
                </div>
                <h2>{game.title}</h2>
                <p>
                  {game.genre.join(" · ")} · Released {game.year} ·{" "}
                  {formatReviewCount(game.reviewCount)} reviews
                </p>
              </div>
              <span className="rating">★ {game.rating.toFixed(1)}</span>
              <div className="library-actions">
                <Link
                  className="btn secondary"
                  to={`/games/${game.id}/reviews`}
                >
                  View reviews
                </Link>
                {tab === "Wishlist" && (
                  <button
                    type="button"
                    aria-label={`Remove ${game.title} from wishlist`}
                    onClick={() => toggleWishlist(game.id)}
                  >
                    ×
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state library-empty">
          <h2>Your wishlist is ready for its first adventure</h2>
          <p>Save games you want to play and find them here anytime.</p>
          <Link className="btn" to="/games">Explore games</Link>
        </div>
      )}
    </main>
  );
}

export default LibraryPage;
