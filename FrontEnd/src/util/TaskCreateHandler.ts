import {} from "../Components/Global/types";
import React, { useState, useEffect } from "react";
import { DEFAULT_USER_AUTH, Methods, TIME_OUT } from "./type";
import { TaskInterface } from "../Components/Pages";
import { message } from "antd/es";
import { FETCH_TASKS } from "../Components/Pages/Todo/types";
import { authContext } from "../Components/contexts/AuthContext";
import { fetch_API, taskParams } from "./api";


export const TaskCreateHandler = () => {
  const [isNetError, setNetError] = React.useState(false);
  const [isTokenError, setTokenError] = React.useState(false);

  const auth = React.useContext(authContext);

  const createTask = async (body:taskParams) => {
    try {
      await Promise.race([fetch_API(
        FETCH_TASKS,
        Methods.post,
        {task:body},
        auth.auth.token
      ),new Promise((resolve, reject) => {
        setTimeout(resolve, TIME_OUT, 'TimeOut');
      })])
      
    } catch (err) {
      if (err.status === 422) {
        setTokenError(true);
        message.error("Authentiacation Error");
      } else {
        setNetError(true);
        message.error("Network Error");
      }
    }
  };
  return { isNetError, isTokenError , createTask };
};
