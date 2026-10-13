import { Link } from "react-router-dom";
import { games } from "../data/games";

const profileReviews = [
  {
    game: games[0],
    score: "9.5",
    title: "A world worth getting lost in",
    text: "Every corner feels consequential. The combat rewards patience, the story trusts its audience, and the score is extraordinary.",
    time: "18 min ago",
  },
  {
    game: games[3],
    score: "9.0",
    title: "Brutal, beautiful, and deeply rewarding",
    text: "Precise combat and layered level design make the effort worthwhile. One of the year's most memorable adventures.",
    time: "2 days ago",
  },
];

function ProfilePage() {
  return (
    <main>
      <section className="profile-cover">
        <div className="profile-pattern" />
        <div className="profile-wrap">
          <span className="profile-avatar" aria-hidden="true">AR</span>
          <div>
            <span className="badge">Level 24 reviewer</span>
            <h1>Alex Rivera</h1>
            <p>@alexrivera · Joined March 2022</p>
          </div>
          <Link className="btn secondary profile-edit-button" to="/login">
            Edit profile
          </Link>
        </div>
      </section>

      <section className="page-section profile-content">
        <div className="profile-main">
          <p className="profile-bio">
            RPG explorer, patient completionist, and professional side-quest
            finder. Always looking for worlds with stories worth remembering.
          </p>
          <div className="platforms">
            {["RPG", "Open World", "Story-Driven", "Soulslike"].map((tag) => (
              <span className="badge" key={tag}>{tag}</span>
            ))}
          </div>
          <div className="library-tabs profile-tabs">
            <button className="active" type="button">
              Reviews <span>42</span>
            </button>
            <Link to="/library">Favorite games <span>18</span></Link>
            <button type="button">Activity</button>
          </div>
          {profileReviews.map((review) => (
            <article className="review-card" key={review.title}>
              <div className="review-top">
                <div className="reviewer">
                  <span className="avatar">AR</span>
                  <span>
                    <b>Alex Rivera</b>
                    <small>@alexrivera</small>
                  </span>
                </div>
                <span className="review-time">{review.time}</span>
              </div>
              <div className="review-game">
                <img src={review.game.image} alt="" />
                <Link to={`/games/${review.game.id}/reviews`}>
                  {review.game.title}
                </Link>
                <span className="rating">★ {review.score}</span>
              </div>
              <h2>{review.title}</h2>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
        <aside className="stats-card">
          <h2>Player stats</h2>
          {[
            ["42", "Reviews written"],
            ["8.7", "Avg. rating given"],
            ["1.8k", "Helpful votes"],
            ["18", "Favorite games"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </aside>
      </section>
    </main>
  );
}

export default ProfilePage;
