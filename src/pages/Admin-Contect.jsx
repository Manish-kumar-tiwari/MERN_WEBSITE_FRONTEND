import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { server } from "../main";

const AdminContect = () => {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`${server}/admin/contect`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      // console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${server}/admin/contect/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <center>
      <h1>Contect Data</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>delete</th>
          </tr>
        </thead>

        {users.map((curr, idx) => {
          return (
            <tbody key={idx}>
              <tr>
                <td>{curr.username}</td>
                <td>{curr.email}</td>
                <td>{curr.message}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => {
                      deleteData(curr._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </center>
  );
};

export default AdminContect;
