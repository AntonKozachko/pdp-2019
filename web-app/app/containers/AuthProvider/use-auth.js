import React, { useEffect, useContext, useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import get from 'lodash/get';

import { responseReducer, initialAuthState, actions } from './reducers';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, dispatch] = useReducer(responseReducer, initialAuthState);

  const authInstance = axios.create({
    baseURL: 'http://localhost:9000/user',
    timeout: 1000,
  });

  const login = async (username, password) => {
    dispatch({ type: actions.request });
    let apiResponse;

    try {
      apiResponse = await authInstance.post('/authenticate', {
        username,
        password,
      });
      const { data } = apiResponse;
      dispatch({ type: actions.success, payload: data });
    } catch (err) {
      const errMsg = get(err, 'response.data.message', err.message);
      dispatch({ type: actions.fail, payload: errMsg });
      return Promise.reject(errMsg);
    }

    return apiResponse;
  };

  const register = async (username, password, name) => {
    dispatch({ type: actions.request });
    let apiResponse;

    try {
      apiResponse = await authInstance.post('', { username, password, name });
      const { data } = apiResponse;
      dispatch({ type: actions.success, payload: data });
    } catch (err) {
      const errMsg = get(err, 'response.data.message', err.message);
      dispatch({ type: actions.fail, error: errMsg });
      return Promise.reject(errMsg);
    }

    return apiResponse;
  };

  const logout = () => {
    dispatch({ type: actions.success, payload: null });
  };

  useEffect(() => {
    if (user && user.authToken) {
      authInstance.defaults.headers.common.Authorization = `Bearer ${
        user.authToken
      }`;
    }
  });

  return {
    user,
    login,
    logout,
    register,
  };
}
