import { UserAuth } from "../Components/Global";
import { DEFAULT_USER_AUTH } from "./type";

/** Return user auth from local storage value */
export const getStoredUserAuth = (): UserAuth => {
    const auth = window.localStorage.getItem("UserAuth");
    if (auth) {
      return JSON.parse(auth);
    }
    return DEFAULT_USER_AUTH;
};

