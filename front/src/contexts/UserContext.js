import { createContext, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";

const UserContext = createContext();

const initialState = {
  user: {
    info: {},
    loading: true
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}

export {
  UserProvider,
  UserContext
}
