import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, но данной страницы не существует!"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Назад
        </Button>
      }
    />
  );
}

export default NotFound;
