
import {LoginButton} from "@/Components/Login.tsx";
import {LogoutButton} from "@/Components/Logout.tsx";
import {Profile} from "@/Components/Profile.tsx";
import { Home } from "@/Components/Home.tsx";
import {Reviews} from "@/Components/Reviews.tsx";
import {SearchBar} from "@/Components/SearchBar.tsx";
import {useAuth0} from '@auth0/auth0-react';
import React, {useEffect, useState} from "react";
import {Link, Route, Routes, BrowserRouter} from 'react-router-dom';
import "@css/Verify.css"

function App() {
  const {isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState(null);
    const { loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    const setAccessToken = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken)
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    void setAccessToken()
  }, [getAccessTokenSilently, isAuthenticated]);
  
return (
    
    <BrowserRouter>
      <div className="App">
       <nav>
         <div className={"menu"}>
             <div className="navbar bg-base-100 text-white">
             {/*    <div className="flex-1 text-xl">

                 </div>
                 <div className="flex-1 text-xl">
                     <Link to={"review"}>Review</Link>
                 </div>
                 <div className="flex-1 text-xl">
                     <Link to={"search"}>Search</Link>
                 </div>
                 <div className="flex-1 btn btn-ghost text-xl">

                 </div>*/}
                 <div className="flex-1">
                     <ul className="menu menu-horizontal px-1">{
                         token == null ?
                         <li className={""}> <button className="bg-slate-950 text-white" onClick={() => loginWithRedirect()}>Login/Sign Up</button></li>
                             :
                         <li>
                             <details className="bg-slate-950">
                                 <summary className={"my-3 font-mono"}>
                                     Welcome Back!
                                 </summary>
                                 <ul className="bg-base-100 text-black rounded-t-none">
                                     <li><Link to={"login/profile"}>Account</Link></li>
                                     <li> <Link to={"/"}>Home</Link></li>
                                     <li><button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                         Log Out
                                     </button></li>

                                 </ul>
                             </details>
                         </li>
          }
                     </ul>
                 </div>
             </div>
          {/* {

             ?
               :
           }*/}
             </div>
       </nav>
        
        <Routes>
          {""}
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/login/profile"} element={<Profile />}></Route>
          <Route path={"/review"} element={<Reviews />}></Route>
          <Route path={"/search"} element={<SearchBar />}></Route>
        </Routes>
      </div>
   
    </BrowserRouter>

  );
}

export default App
