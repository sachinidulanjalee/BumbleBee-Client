import http from "../common/http-common";

const create = (data) => {
  return http.post("Locations/Add", data);
};

const update = (data) => {
  return http.post("Locations/Edit", data);
};

const getAll = () => {
  return http.get("Locations/GetAll");
};

const get = (id1) => {
  return http.get(`Locations/GetById/${id1}`);
};

const BulkRemove = (data) => {
  return http.post("Locations/BulkRemove" ,data);
};

const remove = (id) => {
  return http.delete(`Locations/DeleteL/${id}`);
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
