import { useNavigate } from "react-router-dom";
import { signOut } from "../../http-requests";

const useSignOut = (path = "/") => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate(path);
  };

  return { handleSignOut };
};

export default useSignOut;
