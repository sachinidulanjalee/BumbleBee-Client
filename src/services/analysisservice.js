import React from "react";
import http from "../common/http-common";

const PTSD = (data) => {
  return http.post("/submit_ptsd", data);
};

const Mdepression = (data) => {
  return http.post("/submit_depression", data);
};

const BipolarDisorder = (data) => {
  return http.post("/submit_bipolarDisorder", data);
};

const GAD = (data) => {
  return http.post("/submit_generalizedAnxiety", data);
};


export default {
    PTSD,
    Mdepression,
    BipolarDisorder,
    GAD
};
