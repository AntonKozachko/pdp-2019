import React, { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const authInstance = axios.create({
    baseURL: 'http://localhost:9000/user/',
  });

  const login = async (username, password) => {
    try {
      const apiResponse = await authInstance.post('/authenticate', { username, password });
      const { data } = apiResponse;
      setUser(data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  const register = async (username, password) => {
    try {
      const apiResponse = await authInstance.post('/register', { username, password });
      const { data } = apiResponse;
      setUser(data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    if (user && user.authToken) {
      authInstance.defaults.headers.common['Authorization'] = `Bearer ${user.authToken}`;
    }
  });

  useEffect(() => {
    const unsubscribe = (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    };

    return () => unsubscribe();
  }, []);

  return {
    user,
    login,
    register,
  };
}