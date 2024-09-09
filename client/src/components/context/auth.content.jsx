import { createContext, useState } from "react";

export const AuthContext = createContext({
  userName: "",
  setUserName: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  const value = { userName, setUserName };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
