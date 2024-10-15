import React, { useCallback } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { graphqlClient } from "../../clients/api";
import {
  getCurrentUserQuery,
  verifyUserGoogleTokenQuery,
} from "../../graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

        if (verifyGoogleToken.token) {
          window.localStorage.setItem("__buzz_token", verifyGoogleToken.token);
          await queryClient.invalidateQueries({ queryKey: ["current-user"] });
          await graphqlClient.request(getCurrentUserQuery);
          navigate({ to: "/home" });
        } else {
          toast.error("Failed to verify Google token");
        }
      } catch (error) {
        console.error("Error during Google signup:", error);
        toast.error("An error occurred during signup");
      }
    },
    [navigate, queryClient]
  );

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img
                src={logo}
                alt="Buzz Logo"
                className="h-16 w-auto transition-transform duration-300 hover:scale-110"
              />
            </Link>
          </div>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Welcome to buzz.</h1>
            <p className="text-muted-foreground">
              Create an account to join the hive
            </p>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              theme="filled_black"
              shape="circle"
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block flex-1">
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
