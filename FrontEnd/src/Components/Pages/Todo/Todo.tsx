import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Avatar,
  Popconfirm,
  message,
} from "antd/es";
import {
  MenuOutlined,
  CalendarOutlined,
  HomeOutlined,
  StarOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./Todo.css";
import { taskType, LOGOUT_URL, FETCH_TASKS } from "./types";
import sampletasks from "./sample.json";
import { TasksContainer } from "./Task";
import { authContext } from "../../contexts/AuthContext";
import { fetch_API, Methods } from "../../../util";
import {
  Redirect,
} from "react-router-dom";
import { taskContext } from "../../contexts/TaskContext";

const { Footer, Sider } = Layout;


export interface TaskInterface {
  taskType: string;
  created_date: string;
  end_date: string;
  taskContent: string;
  taskID: string;
  taskTitle: string;
  status: string;
  important: boolean;
  schedule: boolean;
}

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

export function Todo() {
  const [collapsed, setCollapsed] = useState(true);
  const [type, setType] = useState("Tasks");
  const [logout, setLogout] = useState(false);
  const auth = React.useContext(authContext);
  const task = React.useContext(taskContext);

  const confirm = async () => {
    try {
      await fetch_API(LOGOUT_URL, Methods.delete, {}, auth.auth.token);
      message.success("Success Logout");
      auth.setUnauthStatus();
      setLogout(true);
    } catch (err) {
      message.error("Network Error");
    }
  };

  const renderCheckLists = () => {
    return (
      <Menu.Item key="4" icon={<MenuOutlined />}>
        CheckList
      </Menu.Item>
    );
  };

  const switchTaskContainer = () => {
    if (type === "Important") {
      return <TasksContainer tasks={task.combineTasks.important} title={type} />;
    } else if (type === "Schedule") {
      return <TasksContainer tasks={task.combineTasks.schedule} title={type} />;
    } else {
      return <TasksContainer tasks={task.combineTasks.tasks} title={type} />;
    }
  };
  //component did
  useEffect(() => {
    console.log(task.isTokenError)
    task.fetchTask()
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {(logout || task.isTokenError) && <Redirect to="/" />}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(onCollapse) => {
          setCollapsed(onCollapse);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item title="">
            <Popconfirm
              placement="right"
              title={"Logout"}
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Avatar style={{ verticalAlign: "middle" }} size="small">
                {auth.auth.user}
              </Avatar>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item
            key="Important"
            icon={<StarOutlined />}
            onClick={(e) => {
              setType(e.key);
            }}
          >
            Important
          </Menu.Item>
          <Menu.Item
            key="Schedule"
            icon={<CalendarOutlined />}
            onClick={(e) => {
              setType(e.key);
            }}
          >
            Schedule
          </Menu.Item>
          <Menu.Item
            key="Tasks"
            icon={<HomeOutlined />}
            onClick={(e) => {
              setType(e.key);
            }}
          >
            Tasks
          </Menu.Item>
          <hr style={{ backgroundColor: `rgb(120, 120, 120)` }} />
          {renderCheckLists}
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh" }} className="site-layout">
        {switchTaskContainer()}
        <Footer style={{ textAlign: "center" }}>
          My Todo ©2020 Powered by Maolon
        </Footer>
      </Layout>
    </Layout>
  );
}
