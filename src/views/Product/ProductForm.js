import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";
import * as DefineValues from "../../common/DefineValues";
import Alert from "../../common/alert";
import FormFooterButton from "../../components/FormFooterButton";
import getMessage from "../../common/Messages";
import { CreateCategory } from "../ProductCategory/ProductCategoryForm";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import FormAddButton from "../../components/FormAddButton";
import PopupFrom from "../../components/PopupFrom";
import ProductService from "../../services/ProductService";
import Switch from "../../components/Switch";


const initialRecordState = {
  customerId: "1",
  productId: "",
  productName: "",
  categoryId: "",
  brand: "",
  unitPrice: "",
  status: DefineValues.status().find(x => x.text == "Active").value,
  createdUser: "",
  createdDateTime: "",
  createdUser: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedUser: "",
  modifiedMachine: "",
};

export function CreateProduct({ setOpenDialog, mode, selectedProduct, product }) {
  const [isReset, setIsReset] = useState(false);
  const [category, setCategory] = useState([]);
  const [isOpenCategoryPopup, setIsOpenCategoryPopup] = useState(false);
  const [switchedDate, setSwitchedDate] = useState(null);


  const validate = () => {
    let temp = {};
    temp.productName = 
      values.productName !== "" ? "" : "This field is required";
    temp.categoryId =
      values.categoryId !== "" ? "" : "This field is required";
    temp.brand =
      values.brand !== "" ? "" : "This field is required";
    temp.unitPrice =
      values.unitPrice !== "" ? "" : "This field is required";
    temp.status =
      values.status !== "" ? "" : "This field is required";


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
    getCategoryCode();
    if (selectedProduct != null)
      setValues({
        ...selectedProduct,
      });
  }, [selectedProduct, isReset]);

  useEffect(() => {
    getCategoryCode();
  }, [isOpenCategoryPopup]);

  const getCategoryCode = () => {
    ProductService.GetCategoryComboModel()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setModificationDetails = () => {
    values.customerId = Number(values.customerId);
    values.productId = Number(values.productId);
    values.categoryId = Number(values.categoryId);
    values.unitPrice = Number(values.unitPrice);
    values.status =Number(values.status);

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
        response = ProductService.update(values) :
        response = ProductService.create(values)

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
                fieldName="categoryId"
                label="Category Code"
                value={values.categoryId}
                options={category}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.categoryId}
                disabled={mode == 0 ? false : true}
              />

              <FormAddButton
                setCreateDialogOpen={setIsOpenCategoryPopup}
                display={mode != 0 ? false : true}
              />
            </Stack>
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
            <TextField
              margin="dense"
              label="Product Name"
              name="productName"
              type="text"
              fullWidth
              variant="outlined"
              value={values.productName}
              onChange={handleInputChange}
              {...(errors.productName && {
                error: true,
                helperText: errors.productName,
              })}
              disabled={mode != 2 ? false : true}
              required={true}
            />
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
            <TextField
              margin="dense"
              label="Brand"
              name="brand"
              type="text"
              fullWidth
              variant="outlined"
              value={values.brand}
              onChange={handleInputChange}
              {...(errors.brand && {
                error: true,
                helperText: errors.brand,
              })}
              disabled={mode != 2 ? false : true}
              required={true}
            />
          </Grid>
          <Grid item xs={mode == 0 ? 11 : 12}>
            <TextField
              margin="dense"
              label="Unit Price"
              name="unitPrice"
              type="number"
              fullWidth
              variant="outlined"
              value={values.unitPrice}
              onChange={handleInputChange}
              {...(errors.unitPrice && {
                error: true,
                helperText: errors.unitPrice,
              })}
              disabled={mode != 2 ? false : true}
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
        />
      </form>
      <PopupFrom
        openDialog={isOpenCategoryPopup}
        setOpenDialog={setIsOpenCategoryPopup}
        title={"New Category"}
        mode={0}
        setMode={null}
      >
        <CreateCategory
          setOpenDialog={setIsOpenCategoryPopup}
          mode={0}
          selectCategory={null}
          category={category}
        />
      </PopupFrom>
    </>
  );
}
