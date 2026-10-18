const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

type ApiResponse<T> = { success: boolean; message: string; data: T };

let csrfToken: string | undefined;

async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  const response = await fetch(`${API_BASE_URL}/auth/csrf`, { credentials: "include" });
  const body = await response.json();
  csrfToken = body.data?.csrfToken;
  return csrfToken;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const token = await getCsrfToken();
    if (token) headers.set("X-CSRF-Token", token);
  }
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers, credentials: "include" });
  const body = (await response.json().catch(() => ({}))) as Partial<ApiResponse<T>> & { message?: string };
  if (!response.ok) throw new Error(body.message || "Request failed");
  return body as ApiResponse<T>;
}

export type User = {
  id: string; displayName: string; username: string; email: string;
  avatarUrl?: string; bio?: string; favoriteTags?: string[]; createdAt?: string; emailVerified?: boolean;
};

export type Profile = User & { stats: { totalReviews: number; averageRatingGiven: number; helpfulVotesReceived: number; favoriteGamesCount: number } };
export type Review = { id: string; title: string; content: string; rating: number; createdAt: string; userId: { username: string; displayName: string; avatarUrl?: string }; gameId: { id: string; title: string; coverImageUrl?: string } };

export const authApi = {
  login: (identifier: string, password: string) => apiRequest<{ user: User }>("/auth/login", {
    method: "POST", body: JSON.stringify({ identifier, password })
  }),
  register: (payload: { displayName: string; username: string; email: string; password: string; confirmPassword: string }) =>
    apiRequest<{ user: User }>("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  me: () => apiRequest<{ user: User }>("/auth/me"),
  logout: () => apiRequest<null>("/auth/logout", { method: "POST" })
};

export const profileApi = {
  get: (username: string) => apiRequest<Profile>(`/users/${encodeURIComponent(username)}`),
  getReviews: (username: string) => apiRequest<Review[]>(`/users/${encodeURIComponent(username)}/reviews?sort=mostRecent&limit=50`),
  update: (payload: { displayName: string; bio: string; favoriteTags: string[] }) => apiRequest<{ user: User }>("/users/me", { method: "PATCH", body: JSON.stringify(payload) }),
  uploadAvatar: (file: File) => { const body = new FormData(); body.append("image", file); return apiRequest<{ avatarUrl: string }>("/uploads/avatar/profile", { method: "POST", body }); }
};
