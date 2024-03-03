import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { server } from '../main';




export default function Login() {
  const navigate=useNavigate();
  const {storeTokenLS}=useAuth();

    const [user,setUser]= useState({
      email:"",
      password:""
  });

  const changeHandle=(e)=>{

     let name=e.target.name;
     let val=e.target.value;
     setUser({...user,[name]:val});

  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
       const response=await fetch(`${server}/auth/login`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success(responseData.msg,{
          className:"toast-message"
        });
        storeTokenLS(responseData.token);
        setUser({ email: "", password: "" });
        console.log(responseData);
        navigate("/");
      } else {
        toast.error("login unsuccessful");
      }
    } catch (error) {
      toast.error("login unsuccessful");
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="login the webshite"
                  width="500"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading">Login form</h1>
                <br />
                <form onSubmit={submitHandler}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={changeHandle}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={changeHandle}
                    />
                  </div>

                  <br />

                  <button type="submit" className="btn btn-submit">Login Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}
