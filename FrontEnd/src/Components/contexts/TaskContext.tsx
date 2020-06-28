import React from "react";
import { tasksInterface, CombineTasksHandler } from "../../util/TaskFetchHandler";
import { DEFAULT_COMBINE_TASKS } from "../../util";

interface ITaskContextInterface {
  combineTasks: tasksInterface;
  isNetError: boolean;
  isTokenError: boolean;
  fetchTask: () => void;
}

export const taskContext = React.createContext<ITaskContextInterface>({
  combineTasks: DEFAULT_COMBINE_TASKS,
  isNetError: false,
  isTokenError: false,
  fetchTask: () => {},
});

const { Provider } = taskContext;

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    combineTasks,
    isNetError,
    isTokenError,
    fetchTask,
  } = CombineTasksHandler(DEFAULT_COMBINE_TASKS);

  return (
    <Provider value={{ combineTasks, isNetError, isTokenError, fetchTask }}>
      {children}
    </Provider>
  );
};
