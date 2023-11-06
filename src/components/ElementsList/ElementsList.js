import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUsersList } from '../../features/users/users-slice'
import TableLayout from "../TableLayout/TableLayout";
import CustomAlert from "../Alert/Alert";


function ElementsList() {
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  
  React.useEffect(()=>{
    dispatch(loadUsersList(localStorage.getItem('page')?localStorage.getItem('page'):1));
  }, [dispatch])

  return (
    <>
        <CustomAlert
          message={users.message}
          type={users.type}
          willDisappear={false}
        />
    <TableLayout
    usersList={users.list}
    isLoading={users.isLoading}/>
    </>
  )
}

export default ElementsList;
