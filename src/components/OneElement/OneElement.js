import "./OneElement.css";
import React from "react";
import api from "../../utils/Api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { Button, Form, Input, Avatar, Alert } from "antd";

function OneElement() {
  const [isEdited, setIsEdited] = React.useState(false);
  const loggedIn = useSelector((state) => state.auth.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [visible, setVisible] = React.useState(false);
  const [alert, setAlert] = React.useState({});
  const [defaultValues, setDefaultValues] = React.useState([
    {
      name: ["email"],
      value: user.email,
    },
    {
      name: ["first_name"],
      value: user["first_name"],
    },
    {
      name: ["last_name"],
      value: user["last_name"],
    },
  ]);
  const [fields, setFields] = React.useState(defaultValues);

  const onChange = (newFields) => {
    setFields(newFields);
  };

  const handleDelete = () => {
    api
      .deleteUser(user.id)
      .then((res) => {
        setVisible(true);
        setAlert({
          message: "Пользователь успешно удален!",
          type: "info",
        });
        setTimeout(() => {
          setVisible(false);
          setAlert({});
          navigate("/", { replace: true });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    !fields[0].value && navigate("/");
  }, []);

  const onFinish = (values) => {
    api
      .updateUserInfo(
        values["first_name"],
        values["first_name"],
        values.email,
        user.id,
        user.avatar
      )
      .then((res) => {
        dispatch(
          setUser({
            user: res,
          })
        );
        setDefaultValues(fields);
        setVisible(true);
        setAlert({
          message: "Данные пользователя успешно изменены!",
          type: "success",
        });
        setTimeout(() => {
          setVisible(false);
          setAlert({});
        }, 2000);
        setIsEdited(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="element">
      {visible && (
        <Alert
          className="element__alert"
          message={alert.message}
          type={alert.type}
        />
      )}
      <Avatar
        shape="circle"
        size={150}
        src={user.avatar}
        style={{ marginBottom: 50, marginTop: 50 }}
      />
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
        fields={fields}
        onFieldsChange={(_, allFields) => {
          onChange(allFields);
        }}
        disabled={!isEdited}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "Необходимо указать E-mail в формате name@domain.zone",
            },
            {
              required: isEdited,
              message: "Пожалуйста, Email!",
            },
          ]}
        >
          <Input className="element__input" />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="first_name"
          rules={[
            {
              min: 2,
              message: "Минимальная длинна - 2 символов",
            },
            {
              required: isEdited,
              message: "Пожалуйста, имя!",
            },
          ]}
        >
          <Input minLength="2" className="element__input" />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="last_name"
          rules={[
            {
              min: 2,
              message: "Минимальная длинна - 2 символов",
            },
            {
              required: isEdited,
              message: "Пожалуйста, фамилию!",
            },
          ]}
        >
          <Input minLength="2" className="element__input" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Link className="element__list" to="/">
            ← вернуться к списку
          </Link>
          {isEdited && (
            <>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 300, marginTop: 20 }}
              >
                Сохранить
              </Button>
              <Button
                type="default"
                htmlType="submit"
                style={{ width: 300, marginTop: 10 }}
                onClick={() => {
                  setIsEdited(false);
                  setFields(defaultValues);
                }}
              >
                Отмена
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
      {!isEdited && (
        <>
          <Button
            type="primary"
            htmlType="button"
            style={{ width: 300 }}
            onClick={() => {
              setIsEdited(true);
            }}
            disabled={!loggedIn}
          >
            Изменить
          </Button>
          <Button
            type="default"
            htmlType="button"
            danger
            style={{ width: 300, marginTop: 10 }}
            onClick={handleDelete}
            disabled={!loggedIn}
          >
            Удалить
          </Button>
        </>
      )}
    </div>
  );
}

export default OneElement;
