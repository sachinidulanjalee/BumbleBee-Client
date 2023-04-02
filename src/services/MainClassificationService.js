import http from "../common/http-common";

const create = (data) => {
  return http.post("MainClassifications/Add", data);
};

const update = (data) => {
  return http.put("MainClassifications/Edit", data);
};

const getAll = () => {

  return http.get("MainClassifications/GetAll");
};

const get = (id) => {
  return http.get(`MainClassifications/GetById/${id}`);
};

var isExists=new Boolean(false);
isExists = (classificationID) => {
  return http.get(`MainClassifications/IsExists/${classificationID}`);
};

const remove = (id) => {
  return http.delete(`MainClassifications/Delete/${id}`);
};

const BulkRemove = (data) => {
  return http.post("MainClassifications/BulkRemove" ,data);
};

const getAllComboModel = () => {
  return http.get("MainClassifications/GetAllComboModel");
};

// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  getAllComboModel,
  BulkRemove,
  isExists
};
