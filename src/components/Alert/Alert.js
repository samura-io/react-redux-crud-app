import React from "react";
import "./Alert.css";
import { Alert } from "antd";

function CustomAlert({ message, type }) {

    return (
        message &&
        <Alert
          className="alert"
          message={message}
          type={type}
          closable
        />
    )
}

export default CustomAlert;