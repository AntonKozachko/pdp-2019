export const initialState = { payload: [], error: null, loading: false };

export const actions = {
  request: 'request',
  success: 'success',
  fail: 'fail',
};

export function responseReducer(state, action) {
  switch (action.type) {
    case actions.request:
      return { ...state, loading: true };
    case actions.success:
      return { payload: action.payload, error: null, loading: false };
    case actions.fail:
      return { ...state, error: action.payload, loading: false };
    default:
      return initialState;
  }
}
