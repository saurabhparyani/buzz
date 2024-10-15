import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { useNavigate } from "@tanstack/react-router";

export function useAuthRedirect(currentPath: string) {
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user && (currentPath === "/" || currentPath === "/signup")) {
        navigate({ to: "/home", replace: true });
      } else if (!user && currentPath === "/home") {
        navigate({ to: "/", replace: true });
      }
    }
  }, [user, isLoading, navigate, currentPath]);

  return { user, isLoading };
}