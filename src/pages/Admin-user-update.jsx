import { useEffect, useState } from "react";

import {  useParams } from "react-router-dom";

import { useAuth } from "../store/auth";

import { toast } from 'react-toastify';
import { server } from "../main";

const AdminUserUpdate =  () => {

        const {authorizationToken}=useAuth();
        const params=useParams();

        const [data,setData]=useState({
                username:"",
                email:"",
                phone:"",
        });

        const getUsersData = async () => {
                try {
                  const response = await fetch(`${server}/admin/user/${params.id}`, {
                    method: "GET",
                    headers: {
                      Authorization: authorizationToken,
                    },
                  });
            
                  const user = await response.json();

                  console.log(user.data);
            
                  setData(user.data);
                  console.log(data.username)
                } catch (error) {
                  console.log(error);
                }
              };

              useEffect(()=>{getUsersData();},[]);

        const handleInput=(e)=>{

          const name=e.target.name;
          const value=e.target.value;

          setData({...data,[name]:value});
             
        }

        const submitHandler=async (e)=>{
          e.preventDefault();

          try {

            const response = await fetch(`${server}/admin/user/update/${params.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: authorizationToken,
                    },

                    body: JSON.stringify(data),
                  });

                   if(response.ok){
                    toast.success("Updated SuccessFully",{
                      className:"toast-message"
                    })
                   }
                   else{
                    toast.error("No Update",{
                      className:"toast-message"
                    });
                   }


                 
          } catch (error) {
             console.log(error);
          }
        }

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update user data</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">phone</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>

        
      </section>
    </>
  );
};

export default AdminUserUpdate;
