import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}
export const Auth0ProviderWithNavigate: FC<Auth0ProviderWithNavigateProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = "http://localhost:3000/callback";

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
