import React from "react";
import http from "../common/http-common";

const getProfessional = () => {
  return http.get("/get_data");
};

export default {
    getProfessional,

};