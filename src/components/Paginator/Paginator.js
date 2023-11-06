import React from "react";
import { Pagination, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { loadUsersList } from "features/users/users-slice";

function Paginator() {


  const usersInfo = useSelector(state => state.users);
  const isLoading = useSelector(state => state.users.isLoading);
  
  const dispatch = useDispatch();

  const handleChange = (page) => {
    localStorage.setItem('page', page);
    dispatch(loadUsersList(localStorage.getItem('page')));
  };

  return (
    <>
    {usersInfo.page && (
      <Space align="center" direction="vertical" style={{ width: "100%" }}>
        { !isLoading && 
          <Pagination
          total={usersInfo.list.length * usersInfo.totalPages}
          defaultCurrent={usersInfo.page}
          onChange={handleChange}
          defaultPageSize = {usersInfo.list.length}
        />
        }

      </Space>
    )}
    </>
  );
}

export default Paginator;
