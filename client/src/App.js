import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard"
import Error from "./components/error";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const token = localStorage.getItem("userdatatoken")
  return <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {token ?<Route path="/dash" element={<Dashboard />} />:null}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
  </>
}
export default App;
