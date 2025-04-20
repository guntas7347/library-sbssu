import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { signOut, verifyAuthRole } from "../../dashboard/http-requests";
import { AuthContext } from "../context/auth.content";

const ProtectedRoute = ({ redirectPath = "/", children, role = [] }) => {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { setUserName } = useContext(AuthContext);

  useEffect(() => {
    const asyncFunc = async () => {
      await verifyAuthRole(role)
        .then((res) => {
          if (role.includes(res.payload.role)) {
            setUserName(res.payload.userName);
            setSession(true);
            setIsLoading(false);
          } else {
            signOut();
            setSession(false);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    asyncFunc();
  }, []);

  if (isLoading) return;

  return session ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
