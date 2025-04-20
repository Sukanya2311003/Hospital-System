import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axiosInstance from "../axiosinstance";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user, authenticated } = useSelector((state) => state.user);

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axiosInstance.post("/api/v1/user/getUserData");
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("User", user);
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (authenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
