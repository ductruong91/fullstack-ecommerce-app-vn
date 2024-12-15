import * as React from "react";
import { message } from "antd";

export const success = () => {
  message.success("success");
};
export const error = () => {
  message.error("error");
};
export const warning = () => {
  message.warning("warning");
};
