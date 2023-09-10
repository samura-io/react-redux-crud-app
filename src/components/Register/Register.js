import "./Register.css";
import React from "react";
import api from "../../utils/Api";
import { Link, useNavigate } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (values) => {
    api
      .register(values.email, values.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rigister">
      <h2 className="register__title">Регистрация</h2>
      <FormComponent
        buttonPlaceholder="Зарегистрироваться"
        onSubmit={handleRegister}
      />
      <span>
        Уже зарегистрированны?
        <Link className="register__span" to="/signin">
          Войти
        </Link>
      </span>
    </div>
  );
}

export default Register;
