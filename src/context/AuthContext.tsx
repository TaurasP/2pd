import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userId: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuthState = localStorage.getItem("isAuthenticated");
    return savedAuthState ? JSON.parse(savedAuthState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (userId: number) => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userId));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
