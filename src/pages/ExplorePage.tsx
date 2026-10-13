import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "../components/GameCard";
import { games } from "../data/games";

const genres = ["All games", "Action", "RPG", "Adventure", "FPS", "Strategy", "Horror", "Indie"];
const platforms = ["PC", "PlayStation 5", "Xbox Series X/S", "Nintendo Switch"];
const genreCounts: Record<string, number> = {
  "All games": 128,
  Action: 46,
  RPG: 38,
  Adventure: 31,
  FPS: 24,
  Strategy: 19,
  Horror: 17,
  Indie: 52,
};
const uploadGenres = ["Action", "RPG", "Adventure", "FPS", "Strategy", "Horror", "Indie"];

type AddGameModalProps = {
  onClose: () => void;
};

function AddGameModal({ onClose }: AddGameModalProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [coverName, setCoverName] = useState("");
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function toggleGenre(genre: string) {
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="add-game-title"
        aria-modal="true"
        className="add-game-modal"
        role="dialog"
      >
        <header className="add-game-modal-header">
          <div>
            <span className="eyebrow">Community contribution</span>
            <h2 id="add-game-title">Add a new game</h2>
            <p>Can’t find a game? Help the community discover it.</p>
          </div>
          <button
            aria-label="Close add game dialog"
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        <form className="add-game-form" onSubmit={handleSubmit}>
          <label>
            Game title <span>*</span>
            <input
              autoFocus
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter the official game title"
              required
              value={title}
            />
          </label>

          <label>
            Cover image <span>*</span>
            <span className="upload-area">
              <input
                accept="image/png,image/jpeg,image/webp"
                className="file-input"
                onChange={(event) =>
                  setCoverName(event.target.files?.[0]?.name ?? "")
                }
                required
                type="file"
              />
              <span className="upload-icon" aria-hidden="true">⇧</span>
              <strong>{coverName || "Upload cover artwork"}</strong>
              <small>JPG, PNG or WebP · Max 8MB</small>
            </span>
          </label>

          <label>
            Description <span>*</span>
            <textarea
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell players what this game is about..."
              required
              rows={4}
              value={description}
            />
          </label>

          <div className="add-game-fields">
            <label>
              Release date
              <input type="date" />
            </label>
            <label>
              Developer
              <input placeholder="Studio name" />
            </label>
          </div>

          <fieldset className="genre-picker">
            <legend>Genres</legend>
            <div>
              {uploadGenres.map((genre) => (
                <button
                  aria-pressed={selectedGenres.includes(genre)}
                  className={selectedGenres.includes(genre) ? "selected" : ""}
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  type="button"
                >
                  {genre}
                </button>
              ))}
            </div>
          </fieldset>

          <p className="backend-notice" role="note">
            Game submissions will be enabled once the backend is ready. Your
            details stay in this form for now and aren’t sent anywhere.
          </p>

          {preview && (
            <aside className="submission-preview" aria-live="polite">
              <span className="eyebrow">Preview</span>
              <h3>{title || "Your game title"}</h3>
              <p>{description || "Your game description will appear here."}</p>
              {selectedGenres.length > 0 && (
                <div className="platforms">
                  {selectedGenres.map((genre) => (
                    <span className="badge" key={genre}>{genre}</span>
                  ))}
                </div>
              )}
            </aside>
          )}

          <footer className="add-game-actions">
            <button className="modal-cancel" onClick={onClose} type="button">
              Cancel
            </button>
            <button
              className="btn secondary"
              onClick={() => setPreview((current) => !current)}
              type="button"
            >
              {preview ? "Hide preview" : "Preview"}
            </button>
            <button
              className="btn"
              disabled
              title="Available after the backend is connected"
              type="submit"
            >
              Submit game
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function ExplorePage() {
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get("genre");
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState(
    initialGenre && genres.includes(initialGenre) ? initialGenre : "All games",
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minimumRating, setMinimumRating] = useState<number | null>(null);
  const [addGameOpen, setAddGameOpen] = useState(false);

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return games.filter((game) => {
      const matchesGenre =
        activeGenre === "All games" ||
        game.genre.some((genre) =>
          genre.toLowerCase().includes(activeGenre.toLowerCase()),
        );
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) =>
          game.platforms.some((gamePlatform) => {
            if (platform === "PlayStation 5") return gamePlatform === "PS5";
            if (platform === "Xbox Series X/S") return gamePlatform === "Xbox";
            if (platform === "Nintendo Switch") return gamePlatform === "Switch";
            return gamePlatform === platform;
          }),
        );
      const matchesRating =
        minimumRating === null || game.rating >= minimumRating;
      const searchableText = [game.title, ...game.genre, ...game.platforms]
        .join(" ")
        .toLowerCase();
      return (
        matchesGenre &&
        matchesPlatform &&
        matchesRating &&
        searchableText.includes(normalizedQuery)
      );
    });
  }, [activeGenre, minimumRating, query, selectedPlatforms]);

  function togglePlatform(platform: string) {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  }

  function clearFilters() {
    setQuery("");
    setActiveGenre("All games");
    setSelectedPlatforms([]);
    setMinimumRating(null);
  }

  return (
    <main className="subpage">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">The complete catalog</span>
          <h1>Explore games</h1>
          <p>
            Discover worlds worth playing, reviewed by people who actually play
            them.
          </p>
        </div>
        <button
          className="btn add-game-trigger"
          onClick={() => setAddGameOpen(true)}
          type="button"
        >
          <span aria-hidden="true">＋</span> Add game
        </button>
      </div>

      <label className="catalog-search">
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search games, genres, platforms..."
          aria-label="Search games, genres, or platforms"
        />
      </label>

      <div className="catalog-layout">
        <aside className="filters" aria-label="Game filters">
          <div className="filter-heading">
            <h2><span aria-hidden="true">☷</span> Filters</h2>
            <button onClick={clearFilters} type="button">Clear all</button>
          </div>
          <div className="filter-group">
            <label>Genre</label>
            {genres.map((genre) => (
              <button
                className={activeGenre === genre ? "selected" : ""}
                onClick={() => setActiveGenre(genre)}
                key={genre}
                type="button"
              >
                <span className="radio" />
                {genre}
                <span className="filter-count">{genreCounts[genre]}</span>
              </button>
            ))}
          </div>
          <fieldset className="filter-group platform-filters">
            <legend>Platform</legend>
            {platforms.map((platform) => (
              <label key={platform}>
                <input
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => togglePlatform(platform)}
                  type="checkbox"
                />
                {platform}
              </label>
            ))}
          </fieldset>
          <fieldset className="filter-group rating-filters">
            <legend>Community rating</legend>
            <div>
              {[9, 8, 7, null].map((rating) => (
                <button
                  aria-pressed={minimumRating === rating}
                  className={minimumRating === rating ? "selected" : ""}
                  key={rating ?? "all"}
                  onClick={() => setMinimumRating(rating)}
                  type="button"
                >
                  {rating === null ? "All" : `${rating}+`}
                </button>
              ))}
            </div>
          </fieldset>
        </aside>

        <section className="catalog-results" aria-label="Game results">
          <div className="results-toolbar">
            <span>
              <strong>{filteredGames.length}</strong>{" "}
              {filteredGames.length === 1 ? "game" : "games"} found
            </span>
            {(activeGenre !== "All games" ||
              selectedPlatforms.length > 0 ||
              minimumRating !== null) && (
              <button className="clear-result-filters" onClick={clearFilters} type="button">
                Clear filters
              </button>
            )}
          </div>
          {filteredGames.length ? (
            <div className="game-grid catalog-grid">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No games found</h2>
              <p>Try another search or clear your selected filters.</p>
              <button
                type="button"
                className="btn secondary"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
      {addGameOpen && <AddGameModal onClose={() => setAddGameOpen(false)} />}
    </main>
  );
}

export default ExplorePage;
