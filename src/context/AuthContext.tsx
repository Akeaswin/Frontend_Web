import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi, type User } from "../lib/api";

type AuthContextValue = {
  user: User | null; loading: boolean; error: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  register: (payload: Parameters<typeof authApi.register>[0]) => Promise<void>;
  logout: () => Promise<void>; clearError: () => void;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { authApi.me().then((r) => setUser(r.data.user)).catch(() => { localStorage.removeItem("gamerReviewProfileDraft"); setUser(null); }).finally(() => setLoading(false)); }, []);
  const value = useMemo<AuthContextValue>(() => ({
    user, loading, error, clearError: () => setError(null),
    login: async (identifier, password) => { setError(null); try { const r = await authApi.login(identifier, password); localStorage.removeItem("gamerReviewProfileDraft"); setUser(r.data.user); } catch (e) { const message = e instanceof Error ? e.message : "Could not sign in"; setError(message); throw e; } },
    register: async (payload) => { setError(null); try { const r = await authApi.register(payload); setUser(r.data.user); } catch (e) { const message = e instanceof Error ? e.message : "Could not create account"; setError(message); throw e; } },
    logout: async () => { setError(null); try { await authApi.logout(); localStorage.removeItem("gamerReviewProfileDraft"); setUser(null); } catch (e) { const message = e instanceof Error ? e.message : "Could not sign out"; setError(message); throw e; } }
  }), [user, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside AuthProvider"); return value; }
