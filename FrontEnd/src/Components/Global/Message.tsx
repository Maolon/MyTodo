import { Alert } from "antd/es";
import React from "react";
import { MessageType } from "./types";

export const Message: React.FC<{
  message: string | null;
  type: MessageType;
}> = ({ message, type }) => (
  <div>
    <Alert message={message} type={type} showIcon closable />
  </div>
);
