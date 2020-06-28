import { UserAuth } from "../Components/Global/types";
import React, { useState, useEffect } from 'react';
import { DEFAULT_USER_AUTH } from "./type";

export const UserAuthHandler = (initialState: UserAuth) => {
  const [auth, setAuth] = React.useState(initialState);
  const setAuthStatus = (userAuth: UserAuth) => {
    window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };
  const setUnauthStatus = () => {
    window.localStorage.clear();
    setAuth(DEFAULT_USER_AUTH);
  };

  return {
    auth,
    setAuthStatus,
    setUnauthStatus,
  };
};
