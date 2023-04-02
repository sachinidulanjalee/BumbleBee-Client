import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, Hidden, Stack, TextField } from "@mui/material";
import LendingDetailService from "../../services/LendingDetailService";
import Alert from "../../common/alert";
import moment from "moment";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import FormFooterButton from "../../components/FormFooterButton";
import * as DefineValues from "../../common/DefineValues";
import MemberService from "../../services/MemberService";
import BookService from "../../services/BookService";
import getMessage from "../../common/Messages";
import FormAddButton from "../../components/FormAddButton";
import PopupFrom from "../../components/PopupFrom";
import { CreateMemberFrom } from "../Member/MemberForm";
import { CreateBookForm } from "../Book/BookForm";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

const initialRecordState = {
  lendingID: "",
  membershipID: "",
  bookID: "",
  lendedDate: moment(new Date()).format("yyyy-MM-DD"),
  expiryPeriod: "",
  collectedDate: moment(new Date()).format("yyyy-MM-DD"),
  status: 0,
  bookStatus:"",
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: '',
};

export function CreateLendingDetails({ setOpenDialog, mode, selectedLendingDetails, }) {
  const [isReset, setIsReset] = useState(false);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const [isOpenMemberPopup, setIsOpenMemberPopup] = useState(false);
  const [isOpenBookPopup, setIsOpenBookPopup] = useState(false);


  const validate = () => {
    let temp = {};
    temp.membershipID = values.membershipID !== "" ? "" : "This field is required";
    temp.bookID = values.bookID !== "" ? "" : "This field is required";
    temp.lendedDate = values.lendedDate !== "" ? "" : "This field is required";
    temp.expiryPeriod = values.expiryPeriod !== "" ? "" : "This field is required";
    temp.collectedDate = values.collectedDate !== "" ? "" : "This field is required";
    temp.status = values.status !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };


  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm } = useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    resetForm();
    getMemberComboModel();
    getBookComboModel();
    if (selectedLendingDetails != null)
      setValues({
        ...selectedLendingDetails
      })
  }, [selectedLendingDetails, isReset])

  useEffect(() => {
    getMemberComboModel();
  }, [isOpenMemberPopup])

  // useEffect(() => {
  //   getBookComboModel();
  // }, [isOpenBookPopup])

  useEffect(() => {
   EditBookStatus();
  }, [values.status])

const EditBookStatus =()=>{
  let bookStatus
  if (values.status == DefineValues.lendingStatus().find(x=>x.text=="Issued").value)
    bookStatus = DefineValues.avalaibleStatus().find(x=>x.text=="Lended").value
  else if (values.status == DefineValues.lendingStatus().find(x=>x.text=="Collected").value)
    bookStatus = DefineValues.avalaibleStatus().find(x=>x.text=="Available").value
  else
    bookStatus = DefineValues.avalaibleStatus().find(x=>x.text=="Not-Available").value
  setValues({
      ...values,
      "bookStatus": bookStatus
    })
}

  const getMemberComboModel = () => {
    MemberService.getAllComboModel()
      .then((response) => {
        setMembers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getBookComboModel = () => {
    let status
    if (mode == 0)
    {
      status = DefineValues.avalaibleStatus().find(x => x.text=="Available").value
      BookService.getAllComboModel(status)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    }
     else
     {
      status = DefineValues.avalaibleStatus().find(x => x.text=="Available").value
      BookService.getAllstatusComboModel(status, (selectedLendingDetails != null) ? selectedLendingDetails.bookID : 0)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
     }
    
  };


  const setModificationDetails = () => {
    values.lendingID = Number(values.lendingID);
    values.membershipID = Number(values.membershipID);
    values.bookID = Number(values.bookID);
    values.expiryPeriod = Number(values.expiryPeriod);
    values.status = Number(values.status);
    values.bookStatus=Number(values.bookStatus);


    if (mode == 0) {
      values.createdBy =localStorage.getItem("LoginUserID");
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

      let response;
      (mode) ?
        response = LendingDetailService.update(values) :
        response = LendingDetailService.create(values)

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
                fieldName="membershipID"
                label="Member ID"
                value={values.membershipID}
                options={members}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.membershipID}
                disabled={(mode != 0)? true:false}
              />
              <FormAddButton
                setCreateDialogOpen={setIsOpenMemberPopup}
                display={(mode == 0) ? true : false}
              />
            </Stack>

          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CommonAutocomplete
                mode={mode}
                fieldName="bookID"
                label="Book ID"
                value={values.bookID}
                options={books}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.bookID}
                disabled={(mode != 0)? true:false}
              />
              <FormAddButton
                setCreateDialogOpen={setIsOpenBookPopup}
                display={(mode == 0) ? true : false}
              />
            </Stack>

          </Grid>
          <Grid item xs={(mode ==0)? 11.1 :12 } >
            <TextField
              required
              id="outlined-required"
              margin="dense"
              label="Lended Date"
              name="lendedDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true, }}
              value={moment(values.lendedDate).format("yyyy-MM-DD")}
              onChange={handleInputChange}
              {...(errors.lendedDate && {
                error: true,
                helperText: errors.lendedDate,
              })}
              disabled={(mode != 0)? true:false}
            />
            <br></br>
          </Grid>
          <Grid item xs={(mode ==0)? 11.1 :12 } >
            <TextField
              required
              id="outlined-required"
              margin="dense"
              label="Expected Return Period"
              name="expiryPeriod"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 999 } }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
              }}
              fullWidth
              value={values.expiryPeriod}
              onChange={handleInputChange}
              {...(errors.expiryPeriod && {
                error: true,
                helperText: errors.expiryPeriod,
              })}
              disabled={(mode != 0)? true:false}
            />
          </Grid>
          <Grid item xs={12} style={{ display : (mode == 3)? ' ':"none" }}>
            <TextField           
              id="outlined-required"
              margin="dense"
              label="Collected Date"
              name="collectedDate"
              type="date"
              placeholder=""
              InputLabelProps={{ shrink: true, }}
              fullWidth
              value={(mode==3)? moment(new Date()).format("yyyy-MM-DD") :moment(values.collectedDate).format("yyyy-MM-DD")}
              onChange={handleInputChange}
              {...(errors.collectedDate && {
                error: true,
                helperText: errors.collectedDate,
              })}
              disabled={(mode == 3) ? false :true} 
            />
          </Grid>
          
          
          <Grid item xs={12} style={{ display : (mode == 3)? ' ':"none" }} >
            <CommonAutocomplete
              mode={mode}
              fieldName="status"
              label="Status"
              value={(mode==3)? DefineValues.lendingStatus().find(x => x.text=="Collected").value :values.status}
        
              options={(mode==3)?DefineValues.lendingStatus().filter((item, itemIndex) => item.value != DefineValues.lendingStatus().find(x=> x.text=='Issued').value):DefineValues.lendingStatus()}
              handleSelectChange={handleSelectChange}
              required={true}
              errors={errors.status}
              disabled={(mode == 3) ? false:true} 
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
        openDialog={isOpenMemberPopup}
        setOpenDialog={setIsOpenMemberPopup}
        title={"New Member"}
        mode={0}
        setMode={null}
        maxWidth="lg">

        <CreateMemberFrom
          setOpenDialog={setIsOpenMemberPopup}
          mode={0}
          selectedSubClasification={null} />
      </PopupFrom>

      <PopupFrom
        openDialog={isOpenBookPopup}
        setOpenDialog={setIsOpenBookPopup}
        title={"New Book"}
        mode={0}
        setMode={null}
        maxWidth = "md"
        >

        <CreateBookForm
          setOpenDialog={setIsOpenBookPopup}
          mode={0}
          selectedSubClasification={null} />
      </PopupFrom>
    </>
  );
}
