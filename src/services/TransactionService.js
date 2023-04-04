import http from "../common/http-common";

const create = (data) => {
  return http.post("Transaction/Add", data);
};

const update = (data) => {
  return http.put("Transaction/Edit", data);
};

const getAll = () => {

  return http.get("Transaction/GetAll");
};

const get = (transactionId,productId,userId) => {
  return http.get(`Transaction/GetByPrimaryKey/${transactionId}/${productId}/${userId}`);
};


const remove = (transactionId,productId,userId) => {
  return http.delete(`Transaction/Delete/${transactionId}/${productId}/${userId}`);
};

const BulkRemove = (data) => {
  return http.post("Transaction/BulkRemove" ,data);
};

const GetProductComboModel = () => {
    return http.get(`Category/GetComboModel`);
  };
  
  const getAllCustomerComboModel = () => {
    return http.get("Customer/GetAllComboModel");
  };
  

export default {
    create,
    update,
    getAll,
    get,
    remove,
    BulkRemove,
    GetProductComboModel,
    getAllCustomerComboModel
  };
  