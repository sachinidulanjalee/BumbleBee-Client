import http from "../common/http-common";

const create = (data) => {
  return http.post("User/Add", data);
};

const update = (data) => {
  return http.put("User/Edit", data);
};

const getAll = () => {
  return http.get("User/GetAll");
};

const get = (id) => {
  return http.get(`User/GetByPrimaryKey/${id}`);
};

const remove = (id) => {
  return http.delete(`User/Delete/${id}`);
};

const BulkRemove = (data) => {
  return http.post("User/BulkRemove" ,data);
};

const getAllComboModel = () => {
  return http.get("User/GetAllComboModel");
};


// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  getAllComboModel,
  BulkRemove
};
