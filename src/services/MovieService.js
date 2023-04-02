import http from "../common/http-common";

const create = (data) => {
  return http.post("Movies", data);
};

const update = (data) => {
  return http.put("Movies", data);
};

const getAll = () => {
  return http.get("Movies");
};

const get = (id) => {
  return http.get(`Movies/${id}`);
};

const remove = (id) => {
  return http.delete(`Movies/${id}`);
};

// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
};
