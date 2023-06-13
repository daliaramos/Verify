import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { Auth0Provider } from '@auth0/auth0-react';
const rootContainer: HTMLElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootContainer).render(
 
  <React.StrictMode>
    <Auth0Provider
      domain="dev-icy4q2uffvluyg31.us.auth0.com"
      clientId="LzfECgN4UmSzwBBvA1wmSVAFwf2XbZ1r"
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      authorizationParams={{
        redirect_uri: "http://localhost:5173/login/profile",
        audience: `https://dev-icy4q2uffvluyg31.us.auth0.com/api/v2/`,
        scope: "openid profile email offline_access read:current_user",
      }}
    
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  
)
