import axios from "axios";

const GetKey = () => {
  let response;
  const instance = axios.create({
    baseURL: "https://www.universal-tutorial.com/api/",
    headers: {
      Access: "application/json",
      "api-token":
        "NH4zEll4ghVMpqN6qvIJcsjL3aeY71AaXX9DybpBhDDkPctedwTBr3RVCDw31GV7VPU",
      "user-email": "dmsuser@gmail.com",
    },
  });

  response = instance.get("getaccesstoken");
  response
    .then((res) => {
      localStorage.setItem("auth_token", res.data.auth_token)
    })
    .catch((e) => {});
};

const GetCountry = (setCountries) => {
  let response;
  GetKey();  const instance = axios.create({
    baseURL: "https://www.universal-tutorial.com/api/",
    headers: {
      Access: "application/json",
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  });
  response = instance.get("countries");
  response
    .then((res) => {
      let  countries_Combo = (res.data).map((country) => ({
          text : country.country_short_name +" - " + country.country_name,
          value : country.country_name
        }));
      setCountries(countries_Combo)
    })
    .catch((e) => {});
};

const GetProvince = (country,setProvince) => {
  let response;
  
  GetKey();
  const instance = axios.create({
    baseURL: "https://www.universal-tutorial.com/api/",
    headers: {
      Access: "application/json",
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  });
  response = instance.get("states/"+country);
  response
    .then((res) => {
      let province_combo = (res.data).map((province) => ({
        text : province.state_name,
        value : province.state_name
      }));
      setProvince(province_combo);
    })
    .catch((e) => {});
};

const GetCities = (province, setProvince) => {

  let response;
  GetKey();
  const instance = axios.create({
    baseURL: "https://www.universal-tutorial.com/api/",
    headers: {
      Access: "application/json",
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  });
  response = instance.get("cities/"+province);
  response
    .then((res) => {
      let city_combo = (res.data).map((province) => ({
        text : province.city_name,
        value : province.city_name
      }));
      setProvince(city_combo)
    })
    .catch((e) => {});
};

export default {
  GetKey,
  GetCountry,
  GetProvince,
  GetCities,
};
