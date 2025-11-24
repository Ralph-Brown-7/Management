import Navbar from "./components/navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./Paths/Hero"
import Feature from "./Paths/Feature"
import Courses from "./Paths/Courses"
import Pricing from "./Paths/Pricing"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<Hero/>}></Route>
            <Route path='/feature' element={<Feature />}></Route>
            <Route path='/courses' element={<Courses/>}></Route>
            <Route path='/pricing' element={<Pricing/>}></Route>
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
