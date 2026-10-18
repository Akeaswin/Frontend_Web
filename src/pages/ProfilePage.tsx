import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileApi, type Profile, type Review } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, loading: authLoading } = useAuth(); const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null); const [reviews, setReviews] = useState<Review[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (authLoading) return;
    let active = true;
    setProfile(null); setReviews([]); setError(null); setLoading(true);
    let draft: (Partial<Profile> & { username?: string }) | null = null;
    try { draft = JSON.parse(localStorage.getItem("gamerReviewProfileDraft") || "null") as (Partial<Profile> & { username?: string }) | null; } catch { localStorage.removeItem("gamerReviewProfileDraft"); }
    const username = user?.username;
    if (!username) {
      setReviews([]); setProfile(null); setLoading(false); navigate("/login");
      setLoading(false);
      return;
    }
    const currentDraft = draft?.username?.toLowerCase() === username.toLowerCase() ? draft : null;
    Promise.all([profileApi.get(username), profileApi.getReviews(username)]).then(([p, r]) => { if (active) { const localProfile = currentDraft ? { ...p.data, ...currentDraft, username: p.data.username, id: p.data.id } : p.data; setProfile(localProfile as Profile); setReviews(r.data); } }).catch((e) => active && setError(e instanceof Error ? e.message : "Unable to load profile")).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [authLoading, navigate, user]);
  if (authLoading || loading) return <main className="page-section"><p role="status">Loading profile…</p></main>;
  if (!profile || error) return <main className="page-section"><p role="alert" className="form-error">{error || "Profile unavailable"}</p></main>;
  const stats = profile.stats; const initial = (profile.displayName || profile.username || "G").trim().charAt(0).toUpperCase();
  return <main><section className="profile-cover"><div className="profile-pattern" /><div className="profile-wrap"><span className="profile-avatar">{profile.avatarUrl ? <img src={profile.avatarUrl} alt="" /> : initial}</span><div><h1>{profile.displayName}</h1><p>Joined {new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(new Date(profile.createdAt || Date.now()))}</p></div><Link className="btn secondary profile-edit-button" to="/login">Edit profile</Link></div></section><section className="page-section profile-content"><div className="profile-main"><p className="profile-bio">{profile.bio?.trim() || "No bio yet."}</p><div className="platforms">{(profile.favoriteTags || []).map((tag) => <span className="badge" key={tag}>{tag}</span>)}</div><div className="library-tabs profile-tabs"><button className="active" type="button">Reviews <span>{stats.totalReviews}</span></button><Link to="/library">Favorite games <span>{stats.favoriteGamesCount}</span></Link><button type="button">Activity</button></div>{reviews.length === 0 ? <div className="empty-state"><h2>No reviews yet</h2><p>This player has not published any reviews.</p></div> : reviews.map((review) => <article className="review-card" key={review.id}><div className="review-top"><div className="reviewer"><span className="avatar">{review.userId?.avatarUrl ? <img src={review.userId.avatarUrl} alt="" /> : (review.userId?.displayName || profile.displayName).trim().charAt(0).toUpperCase()}</span><span><b>{review.userId?.displayName || profile.displayName}</b><small>@{review.userId?.username || profile.username}</small></span></div><span className="review-time">{new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(review.createdAt))}</span></div><div className="review-game">{review.gameId.coverImageUrl ? <img src={review.gameId.coverImageUrl} alt="" /> : <span className="review-cover-fallback" aria-hidden="true" />}<Link to={`/games/${review.gameId.id}/reviews`}>{review.gameId.title}</Link><span className="rating">★ {review.rating.toFixed(1)}</span></div><h2>{review.title}</h2><p>{review.content}</p></article>)}</div><aside className="stats-card"><h2>Player stats</h2>{[[String(stats.totalReviews), "Reviews written"], [stats.averageRatingGiven.toFixed(1), "Avg. rating given"], [String(stats.helpfulVotesReceived), "Helpful votes"], [String(stats.favoriteGamesCount), "Favorite games"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</aside></section></main>;
}
export default ProfilePage;
