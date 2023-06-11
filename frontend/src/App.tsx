import '@css/App.css'
import {LoginButton} from "@/Components/Login.tsx";
import {LogoutButton} from "@/Components/Logout.tsx";
import {Profile} from "@/Components/Profile.tsx";
import { Home } from "@/Components/Home.tsx";
import { Auth0Provider } from '@auth0/auth0-react';
import {createContext} from "react";
import {Link, Route, Routes, BrowserRouter} from 'react-router-dom';

export const AuthContext = createContext(null);


function App() {
  return (
    
    <BrowserRouter>
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
      <div className="App">
       <nav>
         <div className={"menu"}>
           <Link to={"/"}>Home</Link>
           <Link to={"login"}>Login</Link>
           <Link to={"logout"}>Logout</Link>
           <Link to={"login/profile"}>Profile</Link>
         </div>
       </nav>
        
        <Routes>
          {""}
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/login"} element={<LoginButton />}></Route>
          <Route path={"/logout"} element={<LogoutButton />}></Route>
          <Route path={"/login/profile"} element={<Profile />}></Route>
        </Routes>
      </div>
      </Auth0Provider>
    </BrowserRouter>

  );
}

export default App
