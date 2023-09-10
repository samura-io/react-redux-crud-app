import React from "react";
import './FormComponent.css'
import { Button, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";

function FormComponent({ buttonPlaceholder, onSubmit }) {
  const navigate = useNavigate();
  const [ showAlert, setShowAlert ] = React.useState(false); 

  const onFinish = (values) => {
    onSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    {showAlert && (
      <Alert className="form__alert"
      message={(
        <>
          REST-API хост reqres.in, предоставляет только одного пользователя для регистрации и входа. Пожалуйста, воспользуйтесь ими:<br />
          <b>E-mail: eve.holt@reqres.in <br />
          Пароль: pistol</b>
        </>
      )}
      type="warning"
      closable
    />
    )}
    <Form
      name="basic"
      layout="vertical"
      style={{
        width: 300,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите E-mail!",
          },
          {
            type: "email",
            message: "Необходимо указать E-mail в формате name@domain.zone",
          },
        ]}
        onClick={()=>{setShowAlert(true)}}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
          {
            min: 6,
            message: "Минимальная длинна - 6 символов",
          },
        ]}
      >
        <Input.Password maxLength="8" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 300, marginTop: 30 }}
        >
          {buttonPlaceholder}
        </Button>
        <Button
          type="default"
          htmlType="button"
          style={{ width: 300, marginTop: 10 }}
          onClick={() => {
            navigate("/");
          }}
        >
          Продолжить как гость
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}

export default FormComponent;
