import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated } from "../redux/features/userSlice";
import axios from "axios";
import axiosInstance, { setAuthToken } from "../axiosinstance";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axiosInstance.post("/api/v1/user/login", values);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        const token = res.data.token;
        setAuthToken(token);
        dispatch(setAuthenticated(true));
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login Form</h3>

        {/* <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item> */}
        <Form.Item
          label={<span style={{ color: "black" }}>Email</span>}
          name="email"
        >
          <Input type="email" required />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "black" }}>Password</span>}
          name="password"
        >
          <Input type="password" required />
        </Form.Item>

        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
