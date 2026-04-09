import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user session from local storage
    const storedUser = localStorage.getItem("taskmate_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (loginData) => {
    try {
      const response = await api.post("/auth/login", loginData);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("taskmate_user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);
      const newUser = response.data;

      // Optionally auto-login after register
      setUser(newUser);
      localStorage.setItem("taskmate_user", JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("taskmate_user");
  };

  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("taskmate_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, updateProfile }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

