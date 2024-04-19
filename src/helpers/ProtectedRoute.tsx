// ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const ProtectedRoute: any = ({ children } : any) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
