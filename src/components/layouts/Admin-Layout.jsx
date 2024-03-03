import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";

import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {

  const {user,isLoding}=useAuth();

   if(isLoding){
    return <h1>Loding.....</h1>
   }
  if(!user.isAdmin){
   return <Navigate to="/"></Navigate>
  };



  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/user">
                  <FaUser />
                  users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contect">
                  <IoMdContact />
                  contects{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/service">
                  <MdMiscellaneousServices />
                  services
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <IoHomeSharp />
                  home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
