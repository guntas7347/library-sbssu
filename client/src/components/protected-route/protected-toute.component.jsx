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
          console.log(res.payload);

          if (res.payload === role) {
            setSession(true);
            setIsLoading(false);
          } else {
            signOut();
            setSession(false);
            setIsLoading(false);
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
