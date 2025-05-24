import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { signOut, verifyAuthRole } from "../../dashboard/http-requests";
import { AuthContext } from "../context/auth.content";

const ProtectedRoute = ({ redirectPath = "/", children, role = [] }) => {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const asyncFunc = async () => {
      await verifyAuthRole(role)
        .then((res) => {
          if (role.includes(res.payload.role)) {
            setUser({
              name: res.payload.staffId.fullName,
              email: res.payload.email,
            });
            setSession(true);
            setIsLoading(false);
          } else {
            signOut();
            setSession(false);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    asyncFunc();
  }, []);

  if (isLoading) return;

  return session ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
