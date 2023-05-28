import '@css/App.css'
import {Login} from "@/Login.tsx"
import { Home } from "@/Home.tsx"

import {Link, Route, Routes, BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <nav>
         <div className={"menu"}>
           <Link to={"/"}>Home</Link>
           <Link to={"login"}>Login</Link>
         </div>
       </nav>
        
        <Routes>
          {""}
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
