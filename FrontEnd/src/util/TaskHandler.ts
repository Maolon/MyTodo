import {} from "../Components/Global/types";
import React, { useState, useEffect } from "react";
import { DEFAULT_USER_AUTH } from "./type";
import { TaskInterface } from "../Components/Pages";

export const CombineTasksHandler = (initialState: {
  tasks: TaskInterface[];
  important: TaskInterface[];
  schedule: TaskInterface[];
}) => {
  const [combineTasks, setCombineTasks] = React.useState(initialState);

};
