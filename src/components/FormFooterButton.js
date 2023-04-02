import React from "react";
import {DialogActions,Button} from "@mui/material";
import {Check,Close} from '@material-ui/icons';


export default function FormFooterButton(props) {

    const { mode, isReset = false , setIsReset, isVisibalReset = true } = props;

    return (
        <>
           <DialogActions style={{ display: (mode != 2) ? "" : "none" }} >
          <Button variant="outlined" type="submit" startIcon={<Check />} >
            {(mode) ? "Update" : "Save"}
          </Button>
          <Button variant="outlined" color="error" type="Reset" startIcon={<Close />} onClick={() =>setIsReset(!isReset)}
            style={{display : (isVisibalReset) ? "" : "none"}}>
            Reset
          </Button>
        </DialogActions>
        </>
    );
}

