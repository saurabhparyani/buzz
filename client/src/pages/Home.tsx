import React, { useEffect } from "react";
import { useCurrentUser } from "../hooks/user";
import { Button } from "../components/ui/button";
import { graphqlClient } from "../../clients/api";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

const Home: React.FC = () => {
  const { user, isLoading, error } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/signin", replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("__buzz_token");
    graphqlClient.setHeader("Authorization", "");
    queryClient.setQueryData(["current-user"], null);
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    navigate({ to: "/signin", replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl">Welcome to buzz, {user.firstName}!</h1>
      <p>This is the home page for logged-in users.</p>
      <Button onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </div>
  );
};

export default Home;
