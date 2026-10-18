import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { formatReviewCount, orderedGameTags, type Game } from "../data/games";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type GameCardProps = {
  game: Game;
};

function GameCard({ game }: GameCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
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
        disabled={authLoading}
        onClick={() => {
          if (!user) {
            navigate("/login");
            return;
          }
          void toggleWishlist(game.id);
        }}
      >
        <span aria-hidden="true">{wishlisted ? "♥" : "♡"}</span>
      </button>
      <div className="card-body">
        <Link className="card-title" to={`/games/${game.id}/reviews`}>
          {game.title}
        </Link>
        <p>{game.year || "Year unavailable"}</p>
        <div className="platforms">
          {orderedGameTags(game.genre, game.platforms).map((tag, index) => (
            <span className="badge" key={`${tag}-${index}`}>{tag}</span>
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
