import http from "../common/http-common";

const create = (data) => {
  
  return http.post("Customer/Add", data);
};

const update = (data) => {
  return http.put("Customer/Edit", data);
};

const getAll = () => {
  return http.get("Customer/GetAll");
};

const getMemberCount = () => {
  return http.get("Customer/GetMemberCount");
};

const get = (id) => {
  return http.get(`Customer/GetById/${id}`);
};

const remove = (id) => {
  return http.delete(`Customer/Delete/${id}`);
};

const BulkRemove = (data) => {
  return http.post("Customer/BulkRemove" ,data);
};

const getComboModelByStatus = (status) => {
  return http.get(`Customer/GetComboModelByStatus/${status}`);
};


const getAllComboModel = () => {
  return http.get("Customer/GetAllComboModel");
};

const getRecordeByFieldValue = (field,value) => {
  return http.get(`Customer/GetRecordeByFieldValue/${field}/${value}`);
};



// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  getComboModelByStatus,
  getAllComboModel,
  BulkRemove,
  getRecordeByFieldValue,
  getMemberCount,
};
