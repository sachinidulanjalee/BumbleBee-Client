import http from "../common/http-common";

const getAll = () => {
  return http.get("Function/GetAll");
};

const get = (id) => {
  return http.get(`Function/GetByPrimaryKey/${id}`);
};

const GetByUserID = (id) => {
  return http.get(`Function/GetByUserID/${id}`);
};

const getAllComboModel = () => {
  return http.get("Function/GetAllComboModel");
};

// eslint-disable-next-line
export default {
  getAll,
  get,
  getAllComboModel,
  GetByUserID,
};
