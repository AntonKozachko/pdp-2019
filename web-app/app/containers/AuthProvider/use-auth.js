import React, { useEffect, useContext, useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import get from 'lodash/get';

import { responseReducer, initialAuthState, actions } from './reducers';
import { useLocalStorage } from '../../utils/local-storage/useLocalStorage';

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
  const localStorageToken = useLocalStorage('authToken');

  const authHost = process.env.AUTH_API_HOST;
  const authPort = process.env.AUTH_PORT;

  const authInstance = axios.create({
    baseURL: `http://${authHost}:${authPort}/user`,
    timeout: 10000,
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

  // todo: add interceptor to handle expired token and logout
  const logout = () => {
    dispatch({ type: actions.success, payload: null });

    removeAuthToken();
  };

  const verify = async () => {
    try {
      const apiResponse = await authInstance.post('/verify');
      const { data } = apiResponse;

      dispatch({ type: actions.success, payload: data });
    } catch (err) {
      removeAuthToken();
    }
  };

  const removeAuthToken = () => {
    delete authInstance.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;

    localStorageToken.removeValue();
  };

  const setAuthHeader = token => {
    authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  useEffect(() => {
    const authToken = get(user, 'payload.authToken');

    if (authToken) {
      localStorageToken.setValue(authToken);
      setAuthHeader(authToken);
    }
  }, [user]);

  useEffect(() => {
    const { value: authToken } = localStorageToken;

    if (authToken) {
      setAuthHeader(authToken);
      verify();
    }
  }, []);

  return {
    user,
    login,
    logout,
    register,
  };
}
