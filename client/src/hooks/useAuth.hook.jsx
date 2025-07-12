import { useContext } from "react";
import { AuthContext } from "../contexts/auth.content";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
};

export default useAuth;
