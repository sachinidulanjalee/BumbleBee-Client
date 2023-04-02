import http from "../common/http-common";

const create = (data) => {
  return http.post("Category/Add", data);
};

const update = (data) => {
  return http.put("Category/Edit", data);
};

const getAll = () => {

  return http.get("Category/GetAll");
};

const get = (categoryId) => {
  return http.get(`Category/GetByPrimaryKey/${categoryId}`);
};


const remove = (categoryId) => {
  return http.delete(`Category/Delete/${categoryId}`);
};

const BulkRemove = (data) => {
  return http.post("Category/BulkRemove" ,data);
};

const getAllComboModel = () => {
  return http.get("Category/GetAllComboModel");
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
