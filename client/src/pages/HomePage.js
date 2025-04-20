import React, { useEffect, useState } from "react";
import axiosinstance from "../axiosinstance";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axiosinstance.get("/api/v1/user/getAllDoctors");
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      {/* here */}
      <h1
        style={{
          textAlign: "center",
          color: "	#FFFFFF",
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "20px",
          textTransform: "uppercase",
          animation: "fadeInDown 1s ease-in-out",
        }}
      >
        Welcome to the Home Page !
      </h1>
      <Row
        style={{
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
