import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.hook";
import server from "../services/server.api";

const ProtectedRoute = ({ redirectPath = "/", children, userType = "" }) => {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await server.auth.ping({ userType });
        if (userType === res.data.role) {
          setUser(res.data);
          setSession(true);
          setIsLoading(false);
        } else {
          setSession(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return;

  return session ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
