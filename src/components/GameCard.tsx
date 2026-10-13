import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { formatReviewCount, type Game } from "../data/games";

type GameCardProps = {
  game: Game;
};

function GameCard({ game }: GameCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(game.id);

  return (
    <article className="game-card">
      <Link
        className="card-media"
        to={`/games/${game.id}/reviews`}
        aria-label={`Open reviews for ${game.title}`}
      >
        <img src={game.image} alt="" loading="lazy" />
        <span className="media-fade" />
        <span className="rating">
          <span aria-hidden="true">★</span> {game.rating.toFixed(1)}
        </span>
      </Link>
      <button
        className={`wishlist-button${wishlisted ? " saved" : ""}`}
        type="button"
        aria-label={
          wishlisted
            ? `Remove ${game.title} from wishlist`
            : `Add ${game.title} to wishlist`
        }
        aria-pressed={wishlisted}
        onClick={() => toggleWishlist(game.id)}
      >
        <span aria-hidden="true">{wishlisted ? "♥" : "♡"}</span>
      </button>
      <div className="card-body">
        <Link className="card-title" to={`/games/${game.id}/reviews`}>
          {game.title}
        </Link>
        <p>{game.year} · {game.genre.join(" · ")}</p>
        <div className="platforms">
          {game.platforms.map((platform) => (
            <span className="badge" key={platform}>{platform}</span>
          ))}
        </div>
        <div className="card-foot">
          <span>{formatReviewCount(game.reviewCount)} reviews</span>
          <Link to={`/games/${game.id}/reviews`}>Read reviews <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
