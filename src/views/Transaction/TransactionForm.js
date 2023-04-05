import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";
import * as DefineValues from "../../common/DefineValues";
import Alert from "../../common/alert";
import FormFooterButton from "../../components/FormFooterButton";
import getMessage from "../../common/Messages";
import { CreateProduct } from "../Product/ProductForm";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import FormAddButton from "../../components/FormAddButton";
import PopupFrom from "../../components/PopupFrom";
import TransactionService from "../../services/TransactionService";

const initialRecordState = {
  transactionId:"",
  productId: "",
  userId: "",
  installmentPlan: "",
  interestRate: "",
  loanAmount: "",
  usedAmount: "",
  createdUser: "",
  createdDateTime: "",
  createdUser: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedUser: "",
  modifiedMachine: "",
};

export function CreateTransaction({ setOpenDialog, mode, selectedTransaction, transaction }) {
  const [isReset, setIsReset] = useState(false);
  const [product, setproduct] = useState([]);
  const [user, setUser] = useState([]);
  const [isOpenproductPopup, setIsOpenproductPopup] = useState(false);
  const [isOpenUserPopup, setIsOpenUserPopup] = useState(false);


  const validate = () => {
    let temp = {};
    temp.productId = 
      values.productId !== "" ? "" : "This field is required";
    temp.userId =
      values.userId !== "" ? "" : "This field is required";
    temp.installmentPlan =
      values.installmentPlan !== "" ? "" : "This field is required";
    temp.interestRate =
      values.interestRate !== "" ? "" : "This field is required";
    temp.loanAmount =
      values.loanAmount !== "" ? "" : "This field is required";


    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    handleSelectChange,
  } = useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    resetForm();
    getProductCode();
    getUser();
    if (selectedTransaction != null)
      setValues({
        ...selectedTransaction,
      });
  }, [selectedTransaction, isReset]);

  useEffect(() => {
    getProductCode();
  }, [isOpenproductPopup]);

  const getProductCode = () => {
    TransactionService.GetProductComboModel()
      .then((response) => {
        setproduct(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
  }, [isOpenUserPopup]);

  const getUser = () => {
    TransactionService.getAllCustomerComboModel()
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setModificationDetails = () => {
    values.transactionId = Number(values.transactionId);
    values.productId = Number(values.productId);
    values.userId = Number(values.userId);
    values.installmentPlan = Number(values.installmentPlan);
    values.interestRate=Number(values.interestRate);
    values.loanAmount = Number(values.loanAmount);
    values.usedAmount =Number(values.usedAmount);

    if (mode == 0) {
      values.createdUser = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    } else {
      values.modifiedUser = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  };

  const saveRecord = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setModificationDetails();
console.log("create",values);
      let response;
      (mode) ?
        response = TransactionService.update(values) :
        response = TransactionService.create(values)

      response.then((res) => {
        setOpenDialog(false);
        Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
        setValues(initialRecordState);
      })
        .catch((e) => {
          console.log(e);
          Alert((mode == 0) ? getMessage(301) : getMessage(302), 3);
        });
    }
  };

  return (
    <>
      <form noValidate autoComplete="on" onSubmit={saveRecord}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CommonAutocomplete
                mode={mode}
                fieldName="productId"
                label="Product Id"
                value={values.productId}
                options={product}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.productId}
                disabled={(mode != 2) ? false : true}
              />

              <FormAddButton
                setCreateDialogOpen={setIsOpenproductPopup}
                display={mode != 0 ? false : true}
              />
            </Stack>
          </Grid>
          <Grid item xs={(mode ==0)?11:12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CommonAutocomplete
                mode={mode}
                fieldName="userId"
                label="User Name"
                value={values.userId}
                options={user}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.userId}
                disabled={(mode != 2) ? false : true}
              />
            </Stack>
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
          <CommonAutocomplete
              mode={mode}
              fieldName="installmentPlan"
              label="InstallmentPlan"
              value={values.installmentPlan}
              options={DefineValues.InstallmentType()}
              handleSelectChange={handleSelectChange}
              errors={errors.installmentPlan}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
            <TextField
              margin="dense"
              label="Interest Rate"
              name="interestRate"
              type="text"
              fullWidth
              variant="outlined"
              value={values.interestRate}
              onChange={handleInputChange}
              {...(errors.interestRate && {
                error: true,
                helperText: errors.interestRate,
              })}
              disabled={mode != 2 ? false : true}
            />
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
            <TextField
              margin="dense"
              label="LoanAmount"
              name="loanAmount"
              type="text"
              fullWidth
              variant="outlined"
              value={values.loanAmount}
              onChange={handleInputChange}
              {...(errors.loanAmount && {
                error: true,
                helperText: errors.loanAmount,
              })}
              disabled={mode != 2 ? false : true}
            />
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
            <TextField
              margin="dense"
              label="UsedAmount"
              name="usedAmount"
              type="text"
              fullWidth
              variant="outlined"
              value={values.usedAmount}
              onChange={handleInputChange}
              {...(errors.usedAmount && {
                error: true,
                helperText: errors.usedAmount,
              })}
              disabled={mode != 2 ? false : true}
            />
          </Grid>
        </Grid>
{/* 
        <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset}
        /> */}
      </form>
      <PopupFrom
        openDialog={isOpenproductPopup}
        setOpenDialog={setIsOpenproductPopup}
        title={"New Product"}
        mode={0}
        setMode={null}
      >
        <CreateProduct
          setOpenDialog={setIsOpenproductPopup}
          mode={0}
          selectCategory={null}
          product={product}
        />
      </PopupFrom>
    
    </>
  );
}
