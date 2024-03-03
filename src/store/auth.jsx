import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const authorizationToken=`Bearer ${token}`;

  const [user, setUser] = useState("");

  const [services, setServices] = useState([]);

  const [isLoding,setIsloding]=useState(true);

  let isToken = !!token;

  const storeTokenLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");

    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      setIsloding(true);
      const response = await fetch(`${server}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      //  console.log(response);
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsloding(false);
      }
      else{
        setIsloding(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices(), userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeTokenLS, LogoutUser, isToken, user, services ,authorizationToken,isLoding}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
