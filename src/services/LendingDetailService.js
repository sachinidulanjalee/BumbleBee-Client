import http from "../common/http-common";

const create = (data) => {
  return http.post("LendingDetails/Add", data);
};

const update = (data) => {
  return http.post("LendingDetails/Edit", data);
};

const getAll = (status) => {
  return http.get(`LendingDetails/GetAll/${status}`);
};

const get = (id) => {
  return http.get(`LendingDetails/GetById/${id}`);
};

const remove = (id) => {
  return http.delete(`LendingDetails/DeleteByPram/${id}`);
};

const BulkRemove = (data) => {
  return http.post("LendingDetails/BulkRemove" ,data);
};

// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  BulkRemove,
};
