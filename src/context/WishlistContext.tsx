import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { toGame, wishlistApi } from "../lib/api";

type WishlistContextValue = {
  wishlist: string[];
  toggleWishlist: (gameId: string) => Promise<boolean>;
  isWishlisted: (gameId: string) => boolean;
  pendingIds: string[];
  error: string | null;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (authLoading || !user) {
      setWishlist([]);
      return () => { active = false; };
    }
    wishlistApi.list()
      .then((response) => {
        if (active) setWishlist(response.data.map((game) => toGame(game).id));
      })
      .catch(() => {
        if (active) setWishlist([]);
      });
    return () => { active = false; };
  }, [authLoading, user]);

  async function toggleWishlist(gameId: string) {
    if (!user || pendingIds.includes(gameId)) return false;
    const saved = wishlist.includes(gameId);
    setError(null);
    setPendingIds((current) => [...current, gameId]);
    try {
      const response = saved ? await wishlistApi.remove(gameId) : await wishlistApi.add(gameId);
      setWishlist((current) => response.data.saved
        ? (current.includes(gameId) ? current : [...current, gameId])
        : current.filter((id) => id !== gameId));
      return true;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not update wishlist");
      return false;
    } finally {
      setPendingIds((current) => current.filter((id) => id !== gameId));
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted: (gameId) => wishlist.includes(gameId),
        pendingIds,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return value;
}
