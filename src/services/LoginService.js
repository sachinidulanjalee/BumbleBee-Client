import React from "react";
import http from "../common/http-common";

const Login = (data) => {
  return http.post("/login", data);
};


const SingUp = (data) => {
  return http.post("/register", data);
};

const checkusername = (data) => {
  return http.post("/checkusername", data);
};

const ProfessionalRegister = (data) => {
  return http.post("/ProfessionalRegister", data);
};

export default {
  Login,
  SingUp,
  checkusername,
  ProfessionalRegister
};