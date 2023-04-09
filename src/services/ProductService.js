import http from "../common/http-common";

const create = (data) => {
  return http.post("Product/Add", data);
};

const update = (data) => {
  return http.put("Product/Edit", data);
};

const getAll = (customerId) => {
    return http.get(`Product/GetAll/${customerId}`);
  };

const get = (customerId,productId) => {
  return http.get(`Product/GetByPrimaryKey/${customerId}/${productId}`);
};

const remove = (productId,customerId) => {
  return http.delete(`Product/Delete/${productId}/${customerId}`);
};

const BulkRemove = (data) => {
  return http.post("Product/BulkRemove" ,data);
};

const GetCategoryComboModel = () => {
  return http.get(`Category/GetComboModel`);
};

const getAllCustomerProductGetAll = () => {
  return http.get(`Product/AllCustomerProductGetAll`);
};


// eslint-disable-next-line
export default {
  create,
  update,
  getAll,
  get,
  remove,
  BulkRemove,
  GetCategoryComboModel,
  getAllCustomerProductGetAll
};
