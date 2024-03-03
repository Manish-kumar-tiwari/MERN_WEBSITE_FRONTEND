import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";
import { server } from "../main";


const AdminUser = () => {
  const { authorizationToken } = useAuth();

  const [users, setUsers] = useState([]);

  const deleteData=async(id)=>{
      try {
        const response=await fetch(`${server}/admin/user/delete/${id}`,{
          method:"DELETE",
          headers: {
            Authorization: authorizationToken,
          },

        });

        if(response.ok){
          getUsersData();
        }
      } catch (error) {
        console.log(error);
      }
  }

  const getUsersData = async () => {
    try {
      const response = await fetch(`${server}/admin/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <center>  
        <h1>Admin User Data</h1>  
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Exit</th>
          <th>delete</th>
        </tr>
      </thead>

      {users.map((curr, idx) => {
        return (
          <tbody key={idx}>
           
            <tr>
              <td>{curr.username}</td>
              <td>{curr.email}</td>
              <td>{curr.phone}</td>
              <td><Link to={`/admin/user/${curr._id}/edit`}>edit</Link></td>
              <td><button className="button" onClick={()=>{deleteData(curr._id)}}>Delete</button></td>
            </tr>
          </tbody>
        );
      })}
    </table>
    </center>
  );
};

export default AdminUser;
