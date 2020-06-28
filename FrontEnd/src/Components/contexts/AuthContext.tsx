import { UserAuth } from "../Global";
import React from "react";
import { DEFAULT_USER_AUTH, UserAuthHandler } from "../../util";
import { getStoredUserAuth } from "../../util/Helper";

interface IAuthContextInterface {
  auth: UserAuth;
  setAuthStatus: (userAuth: UserAuth) => void;
  setUnauthStatus: () => void;
}

export const authContext = React.createContext<IAuthContextInterface>({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
});

const { Provider } = authContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const { auth, setAuthStatus, setUnauthStatus } = UserAuthHandler(
    getStoredUserAuth()
  );

 return (<Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
    { children}
  </Provider>);
};
