import http from "../common/http-common";

const getAllBookCount = (setFuncation) => {
  http.get("Dashboard/GetAllBookCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};

const getAllLendedBookCount = (setFuncation) => {
  http.get("Dashboard/GetAllLendedBookCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};

const getCountByStatusComboModel = () => {
  return http.get("Dashboard/GetCountByStatusComboModel")

};

const getMemberCount = (setFuncation) => {
  http.get("Member/GetMemberCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};

const getToRecieveBookCount = (setFuncation) => {
  http.get("LendingDetails/getToRecieveBookCount")
    .then((response) => {
      setFuncation(response.data);
    })
    .catch((e) => { });
};

const getToBeReceivedList = (setFuncation) =>
{
  http.get("LendingDetails/getToBeReceivedList")
  .then((response) => {
    setFuncation(response.data);
    
  })
  .catch((e) => {});
};

const getCountByBookComboModel = () => {
  return http.get("Dashboard/GetCountByBookComboModel");
};


// eslint-disable-next-line
export default {
  getAllBookCount,
  getAllLendedBookCount,
  getMemberCount,
  getToRecieveBookCount,
  getToBeReceivedList,
  getCountByStatusComboModel,
  getCountByBookComboModel,
};
