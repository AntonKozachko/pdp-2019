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

  const authHost = process.env.AUTH_HOST;
  const authPort = process.env.AUTH_PORT;

  const authInstance = axios.create({
    baseURL: `http://${authHost}:${authPort}/user`,
    timeout: 2000,
  });

  const login = async credentials => {
    dispatch({ type: actions.request });
    let apiResponse;

    try {
      apiResponse = await authInstance.post('/authenticate', credentials);
      const { data } = apiResponse;
      dispatch({ type: actions.success, payload: data });
    } catch (err) {
      const errMsg = get(err, 'response.data.message', err.message);
      dispatch({ type: actions.fail, payload: errMsg });
      return Promise.reject(errMsg);
    }

    return apiResponse;
  };

  const register = async userData => {
    dispatch({ type: actions.request });
    let apiResponse;

    try {
      apiResponse = await authInstance.post('', userData);
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
