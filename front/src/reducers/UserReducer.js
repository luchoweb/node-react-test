const UserReducer = (state, action) => {
  switch (action.type) {
    case 'USER_SESSION':
      return {
        ...state,
        user: action.payload
      }

    case 'USER_LOADING':
      return {
        ...state,
        user: {
          ...state.user,
          loading: action.payload
        }
      }
  
    default:
      return state;
  }
}

export default UserReducer;
