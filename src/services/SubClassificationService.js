import http from "../common/http-common";

const create = (data) => {
  return http.post("SubClassifications/Add", data);
};

const update = (data) => {
  return http.post("SubClassifications/Edit", data);
};

const getAll = () => {
  return http.get("SubClassifications/GetAll");
};

const get = (subClassificationID,classificationID) => {
  return http.get(`SubClassifications/GetById/${subClassificationID}/${classificationID}`);
};

var isExists=new Boolean(false);
isExists = (subClassificationID) => {
  return http.get(`SubClassifications/IsExists/${subClassificationID}`);
};

const remove = (subClassificationID,classificationID) => {
  return http.delete(`SubClassifications/DeleteByPram/${subClassificationID}/${classificationID}`);
};

const BulkRemove = (data) => {
  return http.post("SubClassifications/BulkRemove" ,data);
};

const getAllComboModelByClassificationID = (classificationID) => {
  return http.get(`SubClassifications/GetAllComboModelByClassificationID/${classificationID}`);
};

// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  getAllComboModelByClassificationID,
  BulkRemove,
  isExists
};
