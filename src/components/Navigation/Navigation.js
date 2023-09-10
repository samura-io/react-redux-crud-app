import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../store/slices/authSlice";

function Navigation() {
  const loggedIn = useSelector((state) => state.auth.jwt);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("email");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(
      removeToken({
        jwt: null,
      })
    );
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
