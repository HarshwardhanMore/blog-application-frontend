import React, { createContext, useContext, useEffect, useState } from "react";
import { checkSessionExpired, getSession, getToken } from "./Auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  session: any;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  session: {},
});

export const Authorize: any = ({ children }: any) => {
  const router = useRouter();
  const token = getToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [session, setSession] = useState<any>(null);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  useEffect(() => {
    setIsSessionExpired(checkSessionExpired()!);
    if (isSessionExpired) {
      setIsAuthenticated(false);
      // redirect("/login");
    }
  }, [isSessionExpired]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setSession(getSession());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, session }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
