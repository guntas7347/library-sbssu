import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuthRole, signOut } from "../../dashboard/http-requests";

const ProtectedRoute = ({ redirectPath = "/", children, role }) => {
  const [jwt, setJwt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      await getAuthRole()
        .then((resRole) => {
          if (resRole === role) {
            setIsLoading(false);
            setJwt(true);
          } else {
            signOut();
            setIsLoading(false);
            setJwt(false);
          }
        })
        .catch(() => setIsLoading(false));
    };
    asyncFunc();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return jwt ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
