import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import UserLogin from "./components/UserLogin"
import UserSignUp from "./components/UserSignUp"
import CaptainLogin from "./components/CaptainLogin"
import CaptainSignUp from "./components/CaptainSignUp"


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignUp/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
