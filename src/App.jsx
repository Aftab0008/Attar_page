import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import AttarCollection from "./pages/AttarCollection"
import "./index.css"; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attars" element={<AttarCollection />} />
    </Routes>
  )
}
