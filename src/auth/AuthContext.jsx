import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  endAdminSession,
  getAdminToken,
  startAdminSession,
} from "./session";

const AuthContext = createContext(null);

function getInitialAdminState() {
  return Boolean(getAdminToken());
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(getInitialAdminState);

  useEffect(() => {
    function handleStorage(event) {
      if (!event.key || event.key.startsWith("coffeeCatalogAdmin")) {
        setIsAdmin(getInitialAdminState());
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(
    () => ({
      isAdmin,
      loginAdmin(session) {
        startAdminSession(session);
        setIsAdmin(true);
      },
      logoutAdmin() {
        endAdminSession();
        setIsAdmin(false);
      },
    }),
    [isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
