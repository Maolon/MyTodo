import React, { useState, useContext, ReactNode } from "react";
import { List, DatePicker, message, Input, Menu, Dropdown } from "antd/es";

import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Todo.css";
import { TaskInterface } from "./Todo";
import moment from "moment";
import { TaskUpdateHandler } from "../../../util/TaskUpdateHandler";
import { taskContext } from "../../contexts/TaskContext";
import { TaskDeleteHandler } from "../../../util/TaskDeleteHandler";
import Item from "antd/es/list/Item";

const dateFormat = "YYYY-MM-DD";

export const TasksItem: React.FC<{
  tasks: TaskInterface[];
}> = ({ tasks }) => {
  const { isNetError, isTokenError, updateTask } = TaskUpdateHandler();
  const { isDelNetError, isDelTokenError, delTask } = TaskDeleteHandler();
  const DEFULT_RIGHTCLICKSTATE = {
    tid: "",
    visible: false,
    xpos: 0,
    ypos: 0,
  };
  const [RClickEvent, setRightClickEvent] = useState(DEFULT_RIGHTCLICKSTATE);
  const task = useContext(taskContext);
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          onDelTaks();
        }}
      >
        <DeleteOutlined style={{ color: "red" }} />
        Delete
      </Menu.Item>
    </Menu>
  );

  const onDelTaks = async () => {
    await delTask(RClickEvent.tid);
    await task.fetchTask();
    if (isDelNetError || task.isNetError) message.warn("Network Error");
  };

  const onChangeVal = async (id: string, val: {}) => {
    await updateTask(id, val);
    await task.fetchTask();
    if (isNetError || task.isNetError) message.warn("Network Error");
  };

  const handleClick = () => {
    if (RClickEvent.visible) setRightClickEvent(DEFULT_RIGHTCLICKSTATE);
  };

  return (
    
    <div
      onClick={() => {
        handleClick();
      }}
    >
      {Popup(menu, RClickEvent.visible, RClickEvent.xpos, RClickEvent.ypos)}
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(item) => (
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              setRightClickEvent({
                tid: item.taskID,
                visible: true,
                xpos: e.pageX,
                ypos: e.pageY,
              });
            }}
          >
            <List.Item>
              {item.status === "ongoing" ? (
                <ClockCircleOutlined
                  style={{ fontSize: "3vh" }}
                  onClick={() => {
                    onChangeVal(item.taskID, { status: "completed" });
                  }}
                  className="hover"
                />
              ) : (
                <CheckCircleOutlined
                  style={{ fontSize: "3vh" }}
                  onClick={() => {
                    onChangeVal(item.taskID, { status: "ongoing" });
                  }}
                  className="hover"
                />
              )}
              <Content item={item} onChangeVal={onChangeVal} />
              {item.important ? (
                <StarFilled
                  style={{ fontSize: "3vh" }}
                  onClick={() => {
                    onChangeVal(item.taskID, { important: false });
                  }}
                  className="hover"
                />
              ) : (
                <StarOutlined
                  style={{ fontSize: "3vh" }}
                  onClick={() => {
                    onChangeVal(item.taskID, { important: true });
                  }}
                  className="hover"
                />
              )}
            </List.Item>
            <List.Item>
              <DatePicker
                bordered={false}
                direction={"rtl"}
                defaultValue={
                  item.end_date === undefined || item.end_date === null
                    ? undefined
                    : moment(item.end_date, dateFormat)
                }
                onChange={(e) => {
                  if (e) {
                    console.log(e)
                    onChangeVal(item.taskID, {
                      end_date: e.toISOString(),
                      schedule: true,
                    });
                  } else {
                    console.log(e)
                    onChangeVal(item.taskID, {
                      end_date: null,
                      schedule: false,
                    });
                  }
                }}
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};

const Content: React.FC<{
  item: TaskInterface;
  onChangeVal: Function;
}> = (props: { item: TaskInterface; onChangeVal: Function }) => {
  const [ContentChange, setContentChange] = useState(false);
  const onChangeVal = props.onChangeVal;
  const item = props.item;
  DateChecker(item);
  return (
    <div>
      {ContentChange ? (
        <Input
          placeholder={item.taskContent}
          onBlur={(e) => {
            console.log(e.target);
            setContentChange(false);
            onChangeVal(item.taskID, {
              taskContent:
                e.target.value === "" ? item.taskContent : e.target.value,
            });
          }}
          onChange={(e) => {
            item.taskContent = e.target.value;
          }}
          autoFocus={true}
        />
      ) : (
        <div
          onClick={() => {
            setContentChange(true);
          }}
          style={{
            display: "flex",
            justifyContent: "left",
            fontSize: "2vh",
          }}
        >
          {item.status === "ongoing" ? (
         
            //item.taskContent
            DateChecker(item)
          ) : (
          <del>{DateChecker(item)}</del>
          )}
        </div>
      )}
    </div>
  );
};

const DateChecker = (item: TaskInterface) =>{
  if(item.end_date){
    if(Date.parse(item.end_date) < Date.now()){
      return <div style = {{color:"red"}}>{item.taskContent}</div>
    }else{
      return item.taskContent;
    }

  }else{
    return item.taskContent;
  }
}

const Popup = (
  children: React.ReactNode,
  visible: boolean,
  x: number,
  y: number
) => {
  return (
    <div>
      {visible && (
        <div
          className="popup"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            position: "absolute",
            zIndex:50,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

