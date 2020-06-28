import {} from "../Components/Global/types";
import React, { useState, useEffect } from "react";
import { DEFAULT_USER_AUTH, Methods, TIME_OUT } from "./type";
import { TaskInterface } from "../Components/Pages";
import { message } from "antd/es";
import { FETCH_TASKS } from "../Components/Pages/Todo/types";
import { authContext } from "../Components/contexts/AuthContext";
import { fetch_API } from "./api";
import { TIMEOUT } from "dns";


const filter = (tasks: TaskInterface[]) => {
  let important: TaskInterface[] = [];
  let schedule: TaskInterface[] = [];
  tasks.map((ele) => {
    if (ele.important) {
      important.push(ele);
    }
    if (ele.schedule) {
      schedule.push(ele);
    }
  });
  return { tasks, important, schedule };
};

export interface tasksInterface{
  tasks: TaskInterface[];
  important: TaskInterface[];
  schedule: TaskInterface[];
}

export const CombineTasksHandler = (initialState: tasksInterface) => {
  const [combineTasks, setCombineTasks] = React.useState(initialState);
  const [isNetError, setNetError] = React.useState(false);
  const [isTokenError, setTokenError] = React.useState(false);

  const auth = React.useContext(authContext);

  const fetchTask = async () => {
    try {
      const taskData =  await Promise.race([fetch_API(
        FETCH_TASKS,
        Methods.get,
        undefined,
        auth.auth.token
      ),new Promise((resolve, reject) => {
        setTimeout(resolve, TIME_OUT, 'TimeOut');
      })]);
      console.log(taskData);
      if(taskData)
      setCombineTasks(filter(taskData));
    } catch (err) {
      if (err.status === 422) {
        setTokenError(true);
        message.error("Authentiacation Error");
      } else {
        console.log(err)
        setNetError(true);
        message.error("Network Error");
      }
    }
  };
  return { combineTasks, isNetError, isTokenError , fetchTask};
};
