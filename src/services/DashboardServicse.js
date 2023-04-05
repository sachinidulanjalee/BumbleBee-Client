import http from "../common/http-common";

const getInactiveProductCount = (setFuncation) => {
  http.get("Dashboard/GetInactiveProductCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};

const getAllProductCount = (setFuncation) => {
  http.get("Dashboard/GetAllProductCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};

const getAllCategoryCount = (setFuncation) => {
  http.get("Dashboard/GetAllCategoryCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};
const getCountByStatusComboModel = () => {
  return http.get("Dashboard/GetCountByStatusComboModel")

};

const getMemberCount = (setFuncation) => {
  http.get("Customer/GetMemberCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};


const getProductList = (setFuncation) =>
{
  http.get("Product/AllCustomerProductGetAll")
  .then((response) => {
    setFuncation(response.data);
    
  })
  .catch((e) => {});
};

const getCountByProductComboModel = () => {
  return http.get("Dashboard/GetCountByProductComboModel");
};


// eslint-disable-next-line
export default {
  getInactiveProductCount,
  getAllProductCount,
  getMemberCount,
  getProductList,
  getCountByStatusComboModel,
  getCountByProductComboModel,
  getAllCategoryCount
};
