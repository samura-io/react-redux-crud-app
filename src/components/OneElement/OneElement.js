import "./OneElement.css";
import React from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Avatar} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo, getUserInfo, deleteUser, editUsersInfo, editUser } from "../../features/user/user-slice";
import CustomAlert from "../Alert/Alert";

function OneElement() {
  const [isEdited, setIsEdited] = React.useState(false);
  const [renderedUserInfo, setRenderedUserInfo] = React.useState([]);
  const [values, setValues] = React.useState([])
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(state=>state.auth.isLoggedIn);
  
  const userInfo = useSelector(state => state.user);

  const handleReturn = () => {
    dispatch(clearUserInfo());
  }

  const onChange = (newFields) => {
    setValues(newFields);
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
    setTimeout(()=>{
      navigate(-1);
    }, 2000)
  };

  React.useEffect(() => {
    dispatch(getUserInfo(id));
  }, [dispatch]);

  React.useEffect(() => {
    setRenderedUserInfo([
      {
        name: "email",
        value: userInfo.email,
      },
      {
        name: "first_name",
        value: userInfo.firstName,
      },
      {
        name: "last_name",
        value: userInfo.lastName,
      },
  ])
  }, [userInfo]);

  const onFinish = () => {
        let newInfo = {};
        values.forEach((i)=>{
          newInfo[i.name] = i.value;
        });
        dispatch(editUsersInfo(newInfo));
        dispatch(editUser({id, newInfo}))
        setIsEdited(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="element">
      <Avatar
        shape="circle"
        size={150}
        src={userInfo.avatar}
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
        fields={renderedUserInfo}
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
          <Link className="element__list" to="/" onClick={handleReturn}>
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
      
      <CustomAlert
      message={userInfo.message}
      type={userInfo.type}
      willDisappear={true} />
    </div>
  );
}

export default OneElement;