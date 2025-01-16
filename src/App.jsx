import { Route, Routes } from "react-router-dom"
import Start from "./components/Start"
import UserLogin from "./components/UserLogin"
import UserSignUp from "./components/UserSignUp"
import CaptainLogin from "./components/CaptainLogin"
import CaptainSignUp from "./components/CaptainSignUp"
import Home from "./components/Home"
import UserProtectedWrapper from "./components/UserProtectedWrapper"
import UserLogout from "./components/UserLogout"


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignUp/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignUp/>}/>
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        }/>
      <Route path="/user/logout" element={
        <UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>
      }/>
      </Routes>
    </div>
  )
}

export default App
