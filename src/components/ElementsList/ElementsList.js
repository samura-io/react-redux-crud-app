import React from "react";
import "./ElementsList.css";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { setUser } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Table, Avatar, Button, Input, Space } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

function ElementsList() {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.list);
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const searchInput = React.useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
    clearFilters();
    handleSearch(selectedKeys, confirm, dataIndex);
    setSearchText("");
    setSearchedColumn("");
  };

  const hanleEdit = (record) => {
    dispatch(
      setUser({
        user: record,
      })
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters, selectedKeys, confirm, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Настройки колонок
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      filterSearch: true,
      filters: [
        {
          text: "reqres.in",
          value: "reqres.in",
        },
      ],
      onFilter: (value, item) => item.email.includes(value),
      ellipsis: {
        showTitle: false,
      },
      ...getColumnSearchProps("email"),
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a.email.length - b.email.length,
      filterSearch: true,
      filters: [
        {
          text: "Michael",
          value: "Michael",
        },
        {
          text: "Janet",
          value: "Janet",
        },
      ],
      onFilter: (value, item) => item.first_name.includes(value),
      ellipsis: {
        showTitle: false,
      },
      ...getColumnSearchProps("first_name"),
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a, b) => a.email.length - b.email.length,
      filterSearch: true,
      filters: [
        {
          text: "Lawson",
          value: "Lawson",
        },
        {
          text: "Weaver",
          value: "Weaver",
        },
      ],
      onFilter: (value, item) => item.last_name.includes(value),
      ellipsis: {
        showTitle: false,
      },
      ...getColumnSearchProps("last_name"),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (image) => <Avatar shape="square" size={64} src={image} />,
      responsive: ["md"],
    },
    {
      title: "",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Link
          to="/element"
          onClick={() => {
            hanleEdit(record);
          }}
        >
          <EditOutlined />
        </Link>
      ),
      width: 50,
    },
  ];

  return (
    <>
      <Table
        className="custom-style"
        dataSource={usersList}
        columns={columns}
        pagination={false}
      />
    </>
  );
}

export default ElementsList;
