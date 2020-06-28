import { AuthProvider } from "./AuthContext";
import React from "react";
import { TaskProvider } from "./TaskContext";

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <AuthProvider><TaskProvider>{children}</TaskProvider></AuthProvider>;
};
