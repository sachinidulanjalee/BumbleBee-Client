import axios from "axios";

const instance = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  //baseURL: "http://192.168.4.184:9000/api",
  //baseURL: "https://localhost:7258/api",
  baseURL : "https://localhost:44365/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  },
});

export default instance;
