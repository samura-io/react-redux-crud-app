import "./Login.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import FormComponent from "../FormComponent/FormComponent";
import { login } from "../../features/auth/auth-slice";
import CustomAlert from "components/Alert/Alert";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleLogin = (values) => {
    dispatch(login(values))
  };

  React.useEffect(()=>{
    auth.isLoggedIn && navigate('/');
  }, [auth])

  return (
    <div className="login">
      <CustomAlert 
        type={auth.type}
        message={auth.message}
      />
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
