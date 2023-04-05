import React, { useState, useEffect,useRef } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, TextField } from "@mui/material";
import Alert from "../../common/alert";
import * as DefineValues from "../../common/DefineValues";
import FormFooterButton from "../../components/FormFooterButton";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import AutocompleteSetNextCombo from "../../components/Autocomplete/AutocompleteSetNextCombo";
import Switch from "../../components/Switch";
import RadioButton from "../../components/RadioButton";
import CustomerService from "../../services/CustomerService";
import getMessage from "../../common/Messages";
import getValidationRule from "../../common/ValidationRules";

import OutsideAPI from "../../services/OutsideAPI";


const initialRecordState = {
  customerID: "",
  userID: "",
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
  modifiedMachine: '',
};

export function CreateMemberFrom({ setOpenDialog, mode, selectedRecorde }) {
  const [isReset, setIsReset] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Sri Lanka");
  const [lstProvince, setLstProvince] = useState([]);
  const [province, setProvince] = useState(0);
  const [lstCity, setLstCity] = useState([]);
  const [switchedDate, setSwitchedDate] = useState(null);

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

  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm } = useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    OutsideAPI.GetCountry(setCountries)
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

  
  const setModificationDetails = () => {
    values.membershipID = Number(values.membershipID);
    values.title = Number(values.title);
    values.sex = Number(values.sex);
    values.nationality = Number(values.nationality);
    values.status = Number(values.status);

    if (mode == 0) {
      values.createdBy = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    }
    else {
      values.modifiedBy = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  }



  const saveRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      setModificationDetails();
      
      CustomerService.getRecordeByFieldValue("NicPassport", values.nicPassport)
        .then((member) => {
          let response;
          let recorde = member.data;
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
              Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
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
    <>
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
              disabled={(mode == 0) ? false : true}
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
          <Grid item xs={6}>
            <Switch
              mode={mode}
              fieldName="status"
              label="Status"
              value={(Number(values.status) == Number(DefineValues.status().find(x => x.text == "Active").value)) ? true : false}
              handleSelectChange={handleSelectChange}
              required={true}
              errors={errors.status}
              text={DefineValues.status().map(x => x.text)}
              setSwitchedDate = {setSwitchedDate}
            />
          </Grid>
        </Grid>

        <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset}
          isVisibalReset={false}
        />
      </form>
    </>
  );
}

