import { Route, Routes, BrowserRouter as Router, BrowserRouter } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Hero from './Paths/Hero'
import Courses from './Paths/Courses'
import Feature from './Paths/Feature'
import Pricing from './Paths/Pricing'
import Contact from "./Paths/contact"
import Get_Started from "./Paths/Get_Started"
import Login from "./Paths/Login"

function App() {
 
  return (  

   <BrowserRouter>
      <Navbar> </Navbar>
       <Routes>
        <Route path='/' element={<Hero />}></Route>
        <Route path= '/courses' element={<Courses />}></Route>
        <Route path='/feature' element={<Feature />}></Route>
        <Route path='/pricing' element={<Pricing />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/get_Started' element={<Get_Started />}></Route>
        <Route path='/login' element={<Login />}></Route>
       </Routes>
  </BrowserRouter>  
  
  )
}
export default App
