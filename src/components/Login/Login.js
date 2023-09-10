import "./Login.css";
import React from "react";
import api from "../../utils/Api";
import { Link, useNavigate } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    api
      .login(values.email, values.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <FormComponent buttonPlaceholder="Войти" onSubmit={handleLogin} />
      <span>
        Еще не зарегистрированны?
        <Link className="login__span" to="/signup">
          Регистрация
        </Link>
      </span>
    </div>
  );
}

export default Login;
