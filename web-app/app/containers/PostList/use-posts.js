import { useReducer } from 'react';
import axios from 'axios';
import get from 'lodash/get';

import { actions, responseReducer, initialState } from './reducers';

export function usePosts() {
  const [list, dispatch] = useReducer(responseReducer, initialState);

  const postsHost = process.env.POSTS_HOST;
  const postsPort = process.env.POSTS_PORT;

  const baseURL = `http://${postsHost}:${postsPort}/posts`;

  const getPosts = async () => {
    dispatch({ type: actions.request });

    let apiResponse;
    try {
      apiResponse = await axios.get(baseURL);
      const { data } = apiResponse;
      dispatch({ type: actions.success, payload: data });
    } catch (err) {
      const errMsg = get(err, 'response.data.message', err.message);
      dispatch({ type: actions.fail, payload: errMsg });

      return Promise.reject(errMsg);
    }

    return apiResponse;
  };

  const createPost = async post => {
    try {
      const apiResponse = await axios.post(baseURL, post);
      
      return apiResponse;
    } catch (err) {
      const errMsg = get(err, 'response.data.message', err.message);

      return Promise.reject(errMsg);
    }
  }

  return {
    list,
    getPosts,
    createPost,
  };
}
