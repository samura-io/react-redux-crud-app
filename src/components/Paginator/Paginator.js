import React from "react";
import api from "../../utils/Api";
import { Pagination, Space } from "antd";
import { useDispatch } from "react-redux";
import { setUsersList } from "../../store/slices/usersSlice";

function Paginator() {
  const dispatch = useDispatch();
  const [defaultCurrentPage, setDefaultCurrentPage] = React.useState(1);

  React.useEffect(() => {
    getListAndSet(1);
  }, []);

  const getListAndSet = (page) => {
    api
      .getUsersList(page)
      .then((res) => {
        const list = res.data.map((elem) => ({ ...elem, key: elem.id }));
        dispatch(
          setUsersList({
            list: list,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (page) => {
    getListAndSet(page);
  };

  return (
    <>
      <Space align="center" direction="vertical" style={{ width: "100%" }}>
        <Pagination
          defaultCurrent={defaultCurrentPage}
          total={20}
          onChange={handleChange}
        />
      </Space>
    </>
  );
}

export default Paginator;
