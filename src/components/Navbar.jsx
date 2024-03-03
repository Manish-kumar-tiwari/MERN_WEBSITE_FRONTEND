import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../store/auth';

export default function Navbar() {

  let {isToken}=useAuth();
  return (
    <>
        <header>
                <div className="container">
                  <div className="logo-brand">
                       <NavLink to="/">Thapa Technical</NavLink>
                  </div>

                  <nav>
                        <ul>
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/service">Services</NavLink></li>
                                <li><NavLink to="/contect">Contect</NavLink></li>

                                 {
                                  isToken? <li><NavLink to="/logout">Logout</NavLink></li>:<> <li><NavLink to="/register">Register</NavLink></li>
                                  <li><NavLink to="/login">Login</NavLink></li></>
                                 }

                               
                               
                        </ul>
                  </nav>


                   

                </div>
        </header>
    </>
  )
}
