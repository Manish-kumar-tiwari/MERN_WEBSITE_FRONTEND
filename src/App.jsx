import React from 'react'
import {BrowserRouter,Routes ,Route} from "react-router-dom";
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Contect from './pages/Contect';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Logout from './pages/Logout';
import AdminLayout from './components/layouts/Admin-Layout';
import AdminUser from './pages/Admin-user';
import AdminContect from './pages/Admin-Contect';
import AdminUserUpdate from './pages/Admin-user-update';

function App() {
  return (
    <>
      <BrowserRouter>
       <Navbar></Navbar>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/service" element={<Service/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contect" element={<Contect/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="*" element={<Error/>} />

        <Route path="/admin" element={<AdminLayout/>}>
          <Route  path="user" element={<AdminUser/>}></Route>
          <Route  path="contect" element={<AdminContect/>}></Route>
          <Route  path="user/:id/edit" element={<AdminUserUpdate/>}></Route>

        </Route>

        

       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App