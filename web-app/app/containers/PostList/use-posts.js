import { useReducer } from 'react';
import axios from 'axios';
import get from 'lodash/get';

import { actions, responseReducer, initialState } from './reducers';

export function usePosts() {
  const [list, dispatch] = useReducer(responseReducer, initialState);

  const postsHost = process.env.POSTS_HOST;
  const postsPort = process.env.POSTS_PORT;

  const authInstance = axios.create({
    baseURL: `http://${postsHost}:${postsPort}/posts`,
    timeout: 2000,
  });

  const getPosts = async () => {
    dispatch({ type: actions.request });

    let apiResponse;
    try {
      apiResponse = await authInstance.get('');
      const { data } = apiResponse;
      dispatch({ type: actions.success, payload: data });
    } catch (err) {
      const errMsg = get(err, 'response.data.message', err.message);
      dispatch({ type: actions.fail, payload: errMsg });

      return Promise.reject(errMsg);
    }

    return apiResponse;
  };

  return {
    list,
    getPosts,
  };
}
