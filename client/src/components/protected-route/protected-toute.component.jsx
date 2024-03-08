import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { signOut, verifyAuthRole } from "../../dashboard/http-requests";

const ProtectedRoute = ({ redirectPath = "/", children, role }) => {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      await verifyAuthRole(role)
        .then((res) => {
          if (res.payload === role) {
            setIsLoading(false);
            setSession(true);
          } else {
            signOut();
            setIsLoading(false);
            setSession(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    };
    asyncFunc();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return session ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
