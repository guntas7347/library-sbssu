import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: "",
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const value = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
