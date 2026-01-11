import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Hero from './Paths/Hero'
import Courses from './Paths/Courses'
import Feature from './Paths/Feature'
import Pricing from './Paths/Pricing'
import Contact from "./Paths/Contact"
import Get_Started from "./Paths/Get_Started"
import Login from "./Paths/Login"
import Order from "./Paths/Order"
import CourseDetail from "./Paths/CourseDetail"

 const AppContent = () =>{
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/course/');
  return (
    <>
      {!hideNavbar && <Navbar />}
       <Routes>
        <Route path='/' element={<Hero />}></Route>
        <Route path= '/courses' element={<Courses />}></Route>
        <Route path='/order/:id' element={<Order />}></Route>
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path='/feature' element={<Feature />}></Route>
        <Route path='/pricing' element={<Pricing />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/get_Started' element={<Get_Started />}></Route>
        <Route path='/login' element={<Login />}></Route>
       </Routes>
    </>
  
  )
 };

 function App(){
    return(
      <Router>
        <AppContent />
      </Router>
    )
 }




 export default App;