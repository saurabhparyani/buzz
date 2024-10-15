import React, { useCallback, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { graphqlClient } from "../../clients/api";
import {
  getCurrentUserQuery,
  verifyUserGoogleTokenQuery,
} from "../../graphql/query/user";
import { useCurrentUser } from "../hooks/user";
import { useQueryClient } from "@tanstack/react-query";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user) {
      navigate({ to: "/home" });
    }
  }, [user, navigate]);

  const handleLoginWithGoogle = useCallback(
    async (credentialResponse: CredentialResponse) => {
      const googleToken = credentialResponse.credential;
      if (!googleToken) {
        return toast.error(`Google token not found`);
      }

      try {
        const { verifyGoogleToken } = await graphqlClient.request(
          verifyUserGoogleTokenQuery,
          { token: googleToken }
        );

        if (!verifyGoogleToken.token) {
          // User already exists
          toast.error("User already exists, redirecting to signin");
          navigate({ to: "/signin" });
        } else {
          // New user created successfully
          window.localStorage.setItem("__buzz_token", verifyGoogleToken.token);
          await queryClient.invalidateQueries({ queryKey: ["current-user"] });
          toast.success(`Signup successful! 🎊`);
          await graphqlClient.request(getCurrentUserQuery);
          navigate({ to: "/home" });
        }
      } catch (error) {
        console.error("Error during Google signup:", error);
        toast.error("An error occurred during signup");
      }
    },
    [navigate, queryClient]
  );

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img
                src={logo}
                alt="Buzz Logo"
                className="h-16 w-auto transition-transform duration-300 hover:scale-110"
              />
            </Link>
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to buzz.</h1>
            <p className="text-balance text-muted-foreground">
              Create an account to join the hive
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" placeholder="John" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" placeholder="Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full font-semibold">
              Create Account
            </Button>

            <div className="flex justify-center items-center mt-4">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Signup background"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Signup;
