import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Input, Button, Tooltip } from "antd/es";

import { PlusCircleOutlined } from "@ant-design/icons";
import "./Todo.css";
import { TaskInterface } from "./Todo";
import { TasksItem } from "./TaskItem";
import { TaskCreateHandler } from "../../../util/TaskCreateHandler";
import { taskContext } from "../../contexts/TaskContext";

const { Header, Content, Footer, Sider } = Layout;

const filter = (tasks: TaskInterface[]) => {
  let ongoing: TaskInterface[] = [];
  let complete: TaskInterface[] = [];
  tasks.map((ele) => {
    if (ele.status === "ongoing") {
      ongoing.push(ele);
    } else {
      complete.push(ele);
    }
  });
  return { ongoing, complete };
};

export const TasksContainer: React.FC<{
  tasks: TaskInterface[];
  title: string;
}> = ({ tasks, title }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [visible, setVisible] = useState(true);
  const { isNetError, isTokenError, createTask } = TaskCreateHandler();
  const task = React.useContext(taskContext);

  const onCreateTask = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    let val = taskTitle;
    if (val !== "") {
      await createTask({
        taskTitle: "Task",
        end_date: undefined,
        taskContent: val,
        taskType: "Task",
        important: false,
        schedule: false,
        status: "ongoing",
      });
    }
    setTaskTitle("");

    task.fetchTask();
  };
  return (
    <div>
      <div>
        <PageHeader className="site-page-header" title={title} />
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <TasksItem tasks={filter(tasks).ongoing} />
            <br />
            <Tooltip title="Hide" placement="right">
              <Button
                type="dashed"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                Complete Tasks
              </Button>
            </Tooltip>
            {visible && <TasksItem tasks={filter(tasks).complete} />}
          </div>
          <Input
            size="large"
            placeholder="Your Task"
            prefix={<PlusCircleOutlined />}
            onBlur={onCreateTask}
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            onPressEnter={onCreateTask}
          ></Input>
        </Content>
      </div>
    </div>
  );
};
