import {} from "../Components/Global/types";
import React, { useState, useEffect } from "react";
import { DEFAULT_USER_AUTH, Methods, TIME_OUT } from "./type";
import { TaskInterface } from "../Components/Pages";
import { message } from "antd/es";
import { FETCH_TASKS, DELTE_TASK } from "../Components/Pages/Todo/types";
import { authContext } from "../Components/contexts/AuthContext";
import { fetch_API, taskParams } from "./api";


export const TaskDeleteHandler = () => {
  const [isDelNetError, setDelNetError] = React.useState(false);
  const [isDelTokenError, setDelTokenError] = React.useState(false);

  const auth = React.useContext(authContext);

  const delTask = async (taskId:string) => {
    try {
        await Promise.race([fetch_API(
            DELTE_TASK+`/${taskId}`,
            Methods.delete,
            undefined,
            auth.auth.token
          ),new Promise((resolve, reject) => {
            setTimeout(resolve, TIME_OUT, 'TimeOut');
          })]) ;
      
    } catch (err) {
      if (err.status === 422) {
        setDelTokenError(true);
        message.error("Authentiacation Error");
      } else {
        setDelNetError(true);
        message.error("Network Error");
      }
    }
  };
  return { isDelNetError, isDelTokenError , delTask };
};
