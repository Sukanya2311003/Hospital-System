import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

export const setAuthToken = (token) => {
  console.log("Token", token);
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default axiosInstance;
