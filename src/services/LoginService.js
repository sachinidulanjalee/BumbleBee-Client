import React from "react";
import http from "../common/http-common";

const Login = (UserName, Password) => {
  return http.get(`User/Login/${UserName}/${Password}`);
};

const ChangePassword = (UserName, oldPassword, newPassword) => {
  return http.get(
    `User/ChangePassword/${UserName}/${oldPassword}/${newPassword}`
  );
};

export default {
  Login,
  ChangePassword,
};
