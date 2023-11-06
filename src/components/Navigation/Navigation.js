import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../features/auth/auth-slice'

function Navigation() {
  const [current, setCurrent] = useState("email");
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const items = [
    {
      label: loggedIn ? (
        "Зарегистрироваться"
      ) : (
        <Link to="/signup" style={{ color: "#4096ff" }}>
          Зарегистрироваться
        </Link>
      ),
      key: "Register",
      disabled: loggedIn,
    },
    {
      label: loggedIn ? (
        "Войти"
      ) : (
        <Link to="/signin" style={{ color: "#4096ff" }}>
          Войти
        </Link>
      ),
      key: "login",
      disabled: loggedIn,
    },
    {
      label: !loggedIn ? (
        "Выйти"
      ) : (
        <Link to="/signin" style={{ color: "red" }} onClick={handleLogout}>
          Выйти
        </Link>
      ),
      key: "logout",
      disabled: !loggedIn,
    },
  ];

  return (
    <nav className="nav">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </nav>
  );
}

export default Navigation;
