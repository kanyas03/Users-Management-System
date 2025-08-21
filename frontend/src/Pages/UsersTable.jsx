import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spin,
  message,
  Select,
  Modal,
  Form,
  Input,
  Pagination
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterGender, setFilterGender] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.append("deleted", "false");
      query.append("$limit", pageSize);
      query.append("$skip", (page - 1) * pageSize);

      if (filterGender) query.append("gender", filterGender);
      if (search) query.append("name", search);

      const { data } = await axios.get(
        `http://localhost:3030/users?${query.toString()}`
      );

      setUsers(data.data || data);
      setTotal(data.total || (data.data ? data.data.length : 0));
    } catch (err) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterGender, search, page, pageSize]);

  const handleDelete = async (id) => {
    try {
      await axios.patch(`http://localhost:3030/users/${id}`, {
        deleted: true
      });
      message.success("User deleted");
      fetchUsers();
    } catch {
      message.error("Delete failed");
    }
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalVisible(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await axios.patch(
          `http://localhost:3030/users/${editingUser.id}`,
          values
        );
        message.success("User updated");
      } else {
        await axios.post("http://localhost:3030/users", values);
        message.success("User added");
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch {
      message.error("Action failed");
    }
  };

  return (
    <Spin spinning={loading}>
      <h2 style={{ marginBottom: "16px" }}>User Management</h2>

      {/* Navbar Section */}
      <div
        style={{
          background: "#f5f5f5", 
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "16px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <Select
          placeholder="Filter by Gender"
          style={{ width: 200 }}
          allowClear
          onChange={(value) => setFilterGender(value)}
        >
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>

        <Input.Search
          placeholder="Search by name"
          style={{ width: 200 }}
          allowClear
          onSearch={(value) => setSearch(value)}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Add User
        </Button>
      </div>

      {/* Table Section */}
      <Table
        rowKey="id"
        dataSource={users}
        pagination={false}
        bordered 
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#fff"
        }}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "Gender", dataIndex: "gender" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Button
                  icon={<EditOutlined />}
                  style={{ marginRight: 8 }}
                  onClick={() => openModal(record)}
                />
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.id)}
                />
              </>
            )
          }
        ]}
      />

      {/* Pagination */}
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={(p, ps) => {
          setPage(p);
          setPageSize(ps);
        }}
        style={{ marginTop: 16, textAlign: "right" }}
      />

      {/* Modal for Add/Edit */}
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default UsersTable;
