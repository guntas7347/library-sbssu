import { createContext, useState } from "react";

export const AuthContext = createContext({
  userName: "",
  userRole: "",
  setUserName: () => {},
  setUserRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const value = { userName, userRole, setUserName, setUserRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
