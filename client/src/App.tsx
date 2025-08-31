import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

function App() {

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>4
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/signup" element={<h1>Signup</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
