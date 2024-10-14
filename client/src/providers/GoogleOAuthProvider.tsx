import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface GoogleOAuthProviderProps {
  children: React.ReactNode;
}

const GoogleOAuthProviderWrapper: React.FC<GoogleOAuthProviderProps> = ({
  children,
}) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthProviderWrapper;
