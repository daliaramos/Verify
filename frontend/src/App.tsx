import { useState } from 'react'
import reactLogo from '@images/react.svg'
import viteLogo from '/vite.svg'
import '@css/App.css'
import {Button, Header} from "@/Header.tsx"
function App() {
  return (
      <div className="App">
        <Header/>
        <Button/>
      </div>
  );
};

export default App
