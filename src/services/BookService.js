import http from "../common/http-common";

const create = (data) => {
  return http.post("Books/Add", data);
};

const update = (data) => {
  return http.put("Books/Edit", data);
};

const getAll = () => {
  return http.get("Books/GetAll");
};

const get = (id) => {
  return http.get(`Books/GetById/${id}`);
};

const remove = (id) => {
  return http.delete(`Books/Delete/${id}`);
};

const BulkRemove = (data) => {
  return http.post("Books/BulkRemove" ,data);
};

const getAllComboModel = (status) => {
  return http.get(`Books/GetAllComboModel/${status}`);
};

const getAllstatusComboModel = (status,bookId) => {
  return http.get(`Books/GetAllComboModel/${status}/${bookId}`)
};

const getAllBookCount=(data)=>
{
  return http.post("Books/GetAllBookCount" ,data);
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
  getAllstatusComboModel,
  getAllBookCount
};
