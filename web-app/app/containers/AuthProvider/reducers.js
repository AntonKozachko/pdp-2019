export const initialAuthState = { payload: null, error: null, loading: false };

export const actions = {
  request: 'request',
  success: 'success',
  fail: 'fail',
};

export function responseReducer(state, action) {
  switch (action.type) {
    case actions.init:
      return { payload: null, error: null, loading: true };
    case actions.success:
      return { payload: action.payload, error: null, loading: false };
    case actions.fail:
      return { payload: null, error: action.payload, loading: false };
    default:
      return initialAuthState;
  }
}
