import "./Register.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import FormComponent from "../FormComponent/FormComponent";
import { registration } from "../../features/auth/auth-slice";
import CustomAlert from "components/Alert/Alert";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleRegister = (values) => {
    dispatch(registration(values))
  };

  React.useEffect(()=>{
    auth.isLoggedIn && navigate('/');
  }, [auth])

  return (
    <div className="rigister">
      <CustomAlert 
        type={auth.type}
        message={auth.message}
      />
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
