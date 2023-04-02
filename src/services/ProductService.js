import http from "../common/http-common";

const create = (data) => {
  return http.post("Product/Add", data);
};

const update = (data) => {
  return http.post("Product/Edit", data);
};

const getAll = (customerId) => {
    return http.get(`Product/GetAll/${customerId}`);
  };

const get = (subClassificationID,classificationID) => {
  return http.get(`Product/GetById/${subClassificationID}/${classificationID}`);
};

var isExists=new Boolean(false);
isExists = (subClassificationID) => {
  return http.get(`Product/IsExists/${subClassificationID}`);
};

const remove = (subClassificationID,classificationID) => {
  return http.delete(`Product/DeleteByPram/${subClassificationID}/${classificationID}`);
};

const BulkRemove = (data) => {
  return http.post("Product/BulkRemove" ,data);
};

const GetCategoryComboModel = () => {
  return http.get(`Category/GetComboModel`);
};

// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  BulkRemove,
  isExists,
  GetCategoryComboModel
};
