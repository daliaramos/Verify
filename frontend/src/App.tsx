
import {LoginButton} from "@/Components/Login.tsx";
import {LogoutButton} from "@/Components/Logout.tsx";
import {Profile} from "@/Components/Profile.tsx";
import { Home } from "@/Components/Home.tsx";
import {Reviews} from "@/Components/Reviews.tsx";
import {SearchBar} from "@/Components/SearchBar.tsx";
import {useAuth0} from '@auth0/auth0-react';
import {useEffect, useState} from "react";
import {Link, Route, Routes, BrowserRouter} from 'react-router-dom';




function App() {
  const {isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState(null);
  
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
           <Link to={"/"}>Home</Link> ||
           {
             token != null
             ?<Link to={"logout"}>Logout</Link>
               : <Link to={"login"}>Login</Link>
           } ||
           <Link to={"login/profile"}>Profile</Link> ||
           <Link to={"review"}>Review</Link> ||
           <Link to={"search"}>Search</Link> ||
         </div>
       </nav>
        
        <Routes>
          {""}
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/login"} element={<LoginButton />}></Route>
          <Route path={"/logout"} element={<LogoutButton />}></Route>
          <Route path={"/login/profile"} element={<Profile />}></Route>
          <Route path={"/review"} element={<Reviews />}></Route>
          <Route path={"/search"} element={<SearchBar />}></Route>
        </Routes>
      </div>
   
    </BrowserRouter>

  );
}

export default App
