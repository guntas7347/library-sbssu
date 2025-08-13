import { useContext } from "react";
import { AuthContext } from "../contexts/auth.content";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return { user, setUser, logout };
};

export default useAuth;
