import http from "../common/http-common";

const create = (data) => {
  
  return http.post("Member/Add", data);
};

const update = (data) => {
  return http.put("Member/Edit", data);
};

const getAll = () => {
  return http.get("Member/GetAll");
};

const getMemberCount = () => {
  return http.get("Member/GetMemberCount");
};

const get = (id) => {
  return http.get(`Member/GetById/${id}`);
};

const remove = (id) => {
  return http.delete(`Member/Delete/${id}`);
};

const BulkRemove = (data) => {
  return http.post("Member/BulkRemove" ,data);
};

const getComboModelByStatus = (status) => {
  return http.get(`Member/GetComboModelByStatus/${status}`);
};


const getAllComboModel = () => {
  return http.get("Member/GetAllComboModel");
};

const getRecordeByFieldValue = (field,value) => {
  return http.get(`Member/GetRecordeByFieldValue/${field}/${value}`);
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
