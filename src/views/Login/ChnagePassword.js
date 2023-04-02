import * as React from "react";
import { useFormNew } from "../../hooks/useFormNew";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Alert from "../../common/alert";
import getMessage from "../../common/Messages";
import LoginService from "../../services/LoginService";

const initialRecordState = {
  Password: "",
  ConfirmPassword: "",
};

function ChnagePassword({
  IsOpenPasswordChangeDialog,
  setIsOpenPasswordChangeDialog,
  userName,
  oldPassword,
}) {
  const validate = () => {
    let temp = {};
    temp.Password = values.Password !== "" ? "" : "*This field is required";
    temp.ConfirmPassword =
      values.ConfirmPassword !== "" ? "" : "*This field is required";

    // // temp.ConfirmPassword +=
    // //   values.Password === values.ConfirmPassword
    // //     ? ""
    // //     : " *Invalid Password Confirmation";
    // Alert(values.Password + " !== " + values.ConfirmPassword, 3);

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const onDialogClose = () => {
    setIsOpenPasswordChangeDialog(false);
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormNew(initialRecordState, true, validate);

  function ChangePassword() {
    let response;

    if (values.Password === values.ConfirmPassword) {
      response = LoginService.ChangePassword(
        userName,
        oldPassword,
        values.Password
      );

      response
        .then((res) => {
          Alert(res.data.msg, res.data.result ? 1 : 3);
          setIsOpenPasswordChangeDialog(false);
        })
        .catch((e) => {
          Alert(getMessage(503), 3);
        });
    } else {
      Alert("*Invalid Password Confirmation", 3);
    }
  }

  return (
    <div>
      <Dialog
        open={IsOpenPasswordChangeDialog}
        onClose={onDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {"We keep your password safe by encrypting it."}
          </DialogContentText>
        </DialogContent>

        <DialogActions id="alert-dialog">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="New Password"
                name="Password"
                type="password"
                fullWidth
                variant="standard"
                value={values.Password}
                onChange={handleInputChange}
                {...(errors.Password && {
                  error: true,
                  helperText: errors.Password,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="confirm Password"
                name="ConfirmPassword"
                type="password"
                fullWidth
                variant="standard"
                value={values.ConfirmPassword}
                onChange={handleInputChange}
                {...(errors.ConfirmPassword && {
                  error: true,
                  helperText: errors.ConfirmPassword,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => setIsOpenPasswordChangeDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  ChangePassword();
                }}
                autoFocus
              >
                Change
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChnagePassword;
