import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type WishlistContextValue = {
  wishlist: string[];
  toggleWishlist: (gameId: string) => void;
  isWishlisted: (gameId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const wishlistStorageKey = "gamer-review-wishlist";

function loadWishlist() {
  const storedWishlist = window.localStorage.getItem(wishlistStorageKey);
  if (!storedWishlist) return ["elden-ring"];

  try {
    const parsed: unknown = JSON.parse(storedWishlist);
    if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
      return parsed;
    }
    console.error("Saved wishlist has an invalid format; using the sample wishlist.");
    return ["elden-ring"];
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Saved wishlist could not be parsed; using the sample wishlist.", error);
      return ["elden-ring"];
    }
    throw error;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(loadWishlist);

  useEffect(() => {
    window.localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(gameId: string) {
    setWishlist((current) =>
      current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId],
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted: (gameId) => wishlist.includes(gameId),
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
