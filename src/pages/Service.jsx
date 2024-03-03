import React from 'react'
import { useAuth } from '../store/auth'

export default function Service() {

  const {services}=useAuth();

  return (

    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
             

        {
          services.map((currEle,idx)=>{
            const {provider,price,service,description}=currEle;
            return <div className="card" key={idx}>
            <div className="card-img">
              <img src="/images/design.png" alt="serices delails" width="200" />
            </div>

            <div className="card-details">
               <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
               </div>
               <h2>{service}</h2>
               <p>{description}</p>
            </div>
         </div>
          })
        }
        
      </div>
    </section>
  )
}
