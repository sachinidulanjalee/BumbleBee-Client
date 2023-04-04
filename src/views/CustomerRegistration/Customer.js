import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, TextField,Typography,Button } from "@mui/material";
import moment from "moment";
import Alert from "../../common/alert";
import * as DefineValues from "../../common/DefineValues";
import FormFooterButton from "../../components/FormFooterButton";
import getMessage from "../../common/Messages";
import getValidationRule from "../../common/ValidationRules";
import Switch from "../../components/Switch";
import RadioButton from "../../components/RadioButton";
import OutsideAPI from "../../services/OutsideAPI";
import AutocompleteSetNextCombo from "../../components/Autocomplete/AutocompleteSetNextCombo";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import CustomerService from "../../services/CustomerService";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import UserService from "../../services/UserService";


var userID = localStorage.getItem("LoginUserID")
const initialRecordState = {
  customerID: "",
  userID:Number(userID),
  nicPassport: "",
  title: "",
  sex: "",
  surname: "",
  firstName: "",
  shortName: "",
  nationality: 190,
  address01: "",
  address02: "",
  address03: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Sri Lanka",
  telephone: "",
  mobile: "",
  email: "",
  status: DefineValues.status().find(x => x.text == "Active").value,
  inactiveDate : null,
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: "",
};

export default function Customer({ setOpenDialog, mode, selectedRecorde }) {
    const [isReset, setIsReset] = useState(false);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Sri Lanka");
    const [lstProvince, setLstProvince] = useState([]);
    const [province, setProvince] = useState(0);
    const [lstCity, setLstCity] = useState([]);
    const [switchedDate, setSwitchedDate] = useState(null);
    const [userType, setUserType] = useState(3);


    const validate = () => {
        let temp = {};
    
        temp.nicPassport = values.nicPassport !== "" ? "" : "This field is required";
        temp.title = values.title !== "" ? "" : "This field is required";
        temp.sex = values.sex !== "" ? "" : "This field is required";
        temp.surname = values.surname !== "" ? "" : "This field is required";
        temp.firstName = values.firstName !== "" ? "" : "This field is required";
        temp.nationality = values.nationality !== "" ? "" : "This field is required";
        temp.status = values.status !== "" ? "" : "This field is required";
        temp.email = (values.email === "" || getValidationRule("email").test(values.email)) ? "" : "Please Enter Valide Email";
        temp.mobile = values.mobile !== "" ? "" : "This field is required";
        setErrors(temp);
    
        return Object.values(temp).every((x) => x === "");
      };
  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm, handleCheckBoxChange } = useFormNew(initialRecordState, true, validate);


  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter((item) => item.FunctionURL === "/Customer").length ===
      0
    ) {
      window.location.replace("/UnAuthorized");
    }
  }, );
  useEffect(() => {
    OutsideAPI.GetCountry(setCountries)

    console.log("user", userID)
    let response;
    response = UserService.get(Number(userID))
    response.then((res) => {
        console.log('resdata',res.data)   
        setUserType(res.data.userType);
      })
      setProfileData()
  }, [])

  useEffect(() => {
    OutsideAPI.GetProvince(country,setLstProvince)

  }, [country])

  useEffect(() => {
    OutsideAPI.GetCities(province,setLstCity)
  }, [province])



  useEffect(() => {
    resetForm();
    if (selectedRecorde != null) {
      setValues({
        ...selectedRecorde
      })
      setCountry(selectedRecorde.country)
      setProvince(selectedRecorde.province)
    }
  }, [selectedRecorde, isReset])

  useEffect(() => {
      if(values.status == 2)
        setValues({
          ...values,inactiveDate:switchedDate
        })
      else
        setValues({
          ...values,inactiveDate : null
        })
  }, [switchedDate])

  const setProfileData = () => {
    let response;
    response = CustomerService.get(Number(userID))
    response.then((res) => {
        console.log('resdata',res.data)   
        let initialRecord = initialRecordState;
        for (const prop in res.data) {
          if (initialRecord.hasOwnProperty(prop)) {
            initialRecord[prop] = res.data[prop];
          }
        }

        setValues(initialRecord);
        
        // if(res.data.nicPassport!==""){setValues({...values, nicPassport: res.data.nicPassport})}
         // if(res.data.title!==""){setValues({...values, title: res.data.title})}
        //  if(res.data.sex!==""){setValues({...values, sex: res.data.sex})}
          // if(res.data.surname!==""){setValues({...values, surname: res.data.surname})}
         // if(res.data.firstName!==""){setValues({...values, firstName: res.data.firstName})}
        // if(res.data.shortName!==""){setValues({...values, shortName: res.data.shortName})}
        //  if(res.data.nationality!==""){setValues({...values, nationality: res.data.nationality})}
          // if(res.data.address01!==""){setValues({...values, address01: res.data.address01})}
          // if(res.data.address02!==""){setValues({...values, address02: res.data.address02})}
        //  if(res.data.city!==""){setValues({...values, city: res.data.city})}
        //  if(res.data.province!==""){setValues({...values, province: res.data.province})}
          // if(res.data.postalCode!==""){setValues({...values, postalCode: res.data.postalCode})}
          // if(res.data.country!==""){setValues({...values, country: res.data.country})}
          // if(res.data.telephone!==""){setValues({...values, telephone: res.data.telephone})}
          // if(res.data.mobile!==""){setValues({...values, mobile: res.data.mobile})}
          // if(res.data.email!==""){setValues({...values, email: res.data.email})}
        //  if(res.data.country!==""){setValues({...values, country: res.data.country})}
        //  if(res.data.status!==""){setValues({...values, status: res.data.status})}
        //  if(res.data.inactiveDate!==""){setValues({...values, inactiveDate: res.data.inactiveDate})}
      })
  }

  
  const setModificationDetails = () => {
    values.customerID = Number(values.customerID);
    values.userID = Number(values.userID);
    values.title = Number(values.title);
    values.sex = Number(values.sex);
    values.nationality = Number(values.nationality);
    values.status = Number(values.status);

    if (true) {
      values.createdBy = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedBy = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  }



  const saveRecord = (e) => {
    console.log(values);
    e.preventDefault();
    if (validate()) {
      setModificationDetails();
      
      CustomerService.getRecordeByFieldValue("NicPassport", values.nicPassport)
        .then((Customer) => {
          let response;
          let recorde = Customer.data;
          let isExist = (recorde != "") ? ((mode) ? recorde.customerID != values.customerID : true) : false;
          
          if (isExist) {
            
            Alert("NIC / Passport Number Already Exists" + getMessage(500), 3);
            return;
          }
          else {
            
            (mode) ?
              response = CustomerService.update(values) :
              response = CustomerService.create(values)

              
            response.then((res) => {
              
              setOpenDialog(false);
             // Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
              Alert("User Registraion Success!");
              setValues(initialRecordState);
            })
          }
        })
        .catch((e) => {
          Alert(getMessage(400), 3);
          return true
        });

    }
  };

  return (
    <>{userType === 3 &&     <>
        <CardHeader
              title="Profile"
              sx={{ paddingBottom: 1, paddingTop: 1 }}
            ></CardHeader>
          <form noValidate autoComplete="on" onSubmit={saveRecord}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="NIC / Passport"
                  name="nicPassport"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInputChange}
                  {...(errors.nicPassport && { error: true, helperText: errors.nicPassport })}
                  disabled={(mode != 2) ? false : true}
                  value={values.nicPassport}
                  required={true}
                  inputProps={{ maxLength: 13, }}
                />
              </Grid>
              <Grid item xs={4}>
                <CommonAutocomplete
                  mode={mode}
                  fieldName="title"
                  label="Title"
                  value={values.title}
                  options={DefineValues.titles()}
                  handleSelectChange={handleSelectChange}
                  required={true}
                  errors={errors.title}
                  disabled={(mode != 2) ? false : true}
                />
              </Grid>
    
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="First Name"
                  name="firstName"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleInputChange}
                  {...(errors.firstName && {
                    error: true,
                    helperText: errors.firstName,
                  })}
                  disabled={(mode != 2) ? false : true}
                  required={true}
                  inputProps={{ maxLength: 250, }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Last Name"
                  name="surname"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.surname}
                  onChange={handleInputChange}
                  {...(errors.surname && {
                    error: true,
                    helperText: errors.surname,
                  })}
                  disabled={(mode != 2) ? false : true}
                  required={true}
                  inputProps={{ maxLength: 250, }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Short Name"
                  name="shortName"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.shortName}
                  onChange={handleInputChange}
                  {...(errors.shortName && {
                    error: true,
                    helperText: errors.shortName,
                  })}
                  disabled={(mode != 2) ? false : true}
                />
              </Grid>
              <Grid item xs={4}>
                <CommonAutocomplete
                  mode={mode}
                  fieldName="nationality"
                  label="Nationality"
                  value={values.nationality}
                  options={DefineValues.nationalities()}
                  handleSelectChange={handleSelectChange}
                  required={true}
                  errors={errors.nationality}
                  disabled={(mode != 2) ? false : true}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioButton
                  mode={mode}
                  fieldName="sex"
                  label="Gender"
                  value={values.sex}
                  options={DefineValues.sex()}
                  handleSelectChange={handleSelectChange}
                  required={true}
                  errors={errors.sex}
                />
    
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Address Line 01"
                  name="address01"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.address01}
                  onChange={handleInputChange}
                  {...(errors.address01 && {
                    error: true,
                    helperText: errors.address01,
                  })}
                  disabled={(mode != 2) ? false : true}
                  inputProps={{ maxLength: 150, }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Address Line 02"
                  name="address02"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.address02}
                  onChange={handleInputChange}
                  {...(errors.address02 && {
                    error: true,
                    helperText: errors.address02,
                  })}
                  disabled={(mode != 2) ? false : true}
                  inputProps={{ maxLength: 150, }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Address Line 03"
                  name="address03"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.address03}
                  onChange={handleInputChange}
                  {...(errors.address03 && {
                    error: true,
                    helperText: errors.address03,
                  })}
                  disabled={(mode != 2) ? false : true}
                  inputProps={{ maxLength: 150, }}
                />
              </Grid>
              <Grid item xs={4}>
                <AutocompleteSetNextCombo
                  mode={mode}
                  fieldName="country"
                  required={false}
                  label="Country"
                  value={values.country}
                  options={countries}
                  handleSelectChange={handleSelectChange}
                  errors={errors.country}
                  setFuncation = {setCountry}
                  disabled={(mode != 2) ? false : true}
                />
              </Grid>
              <Grid item xs={4}>
                <AutocompleteSetNextCombo
                  mode={mode}
                  fieldName="province"
                  required={false}
                  label="Province"
                  value={values.province}
                  options={lstProvince}
                  handleSelectChange={handleSelectChange}
                  errors={errors.province}
                  setFuncation = {setProvince}
                  disabled={(mode != 2) ? false : true}
                />
              </Grid>
              <Grid item xs={4}>
                <CommonAutocomplete
                  mode={mode}
                  fieldName="city"
                  label="City"
                  value={values.city}
                  options={lstCity}
                  handleSelectChange={handleSelectChange}
                  required={false}
                  errors={errors.city}
                  disabled={(mode != 2) ? false : true}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Postal Code"
                  name="postalCode"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.postalCode}
                  onChange={handleInputChange}
                  {...(errors.postalCode && {
                    error: true,
                    helperText: errors.postalCode,
                  })}
                  disabled={(mode != 2) ? false : true}
                  inputProps={{ maxLength: 150, }}
                />
              </Grid>
    
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Telephone"
                  name="telephone"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={values.telephone}
                  onChange={handleInputChange}
                  {...(errors.telephone && {
                    error: true,
                    helperText: errors.telephone,
                  })}
                  disabled={(mode != 2) ? false : true}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 10)
                  }}
    
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                required
                  margin="dense"
                  label="Mobile"
                  name="mobile"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={values.mobile}
                  onChange={handleInputChange}
                  {...(errors.mobile && {
                    error: true,
                    helperText: errors.mobile,
                  })}
                  disabled={(mode != 2) ? false : true}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 10)
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  label="Email"
                  name="email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={values.email}
                  onChange={handleInputChange}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                  disabled={(mode != 2) ? false : true}
                  inputProps={{ maxLength: 150, }}
                />
              </Grid>    
            </Grid>
            <FormFooterButton
              mode={mode}
              isReset={isReset}
              isVisibalReset={false}
              setIsReset={setIsReset}
            />

          </form>
          </>}

    </>
  );
}

