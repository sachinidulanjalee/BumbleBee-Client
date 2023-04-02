import React from "react";
import { FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText, FormControl,Box } from "@mui/material";

export default function CheckBoxList(props) {
  const {label, name, CheckBoxlist, error ,CheckedList, handleCheckBoxChange, disabled} = props;

  const handleChange = (event) => {
    handleCheckBoxChange(name,event.target.checked, CheckedList, event.target.name )
  };

  return (
    <>

      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>

          {CheckBoxlist.map(
            (item, key) => (
              <FormControlLabel
                key ={key}
                control={
                  <Checkbox checked={ CheckedList.filter((val) => val.includes(item.functionID)).length > 0 ? true : false } 
                  key ={item.functionID}
                  onChange={handleChange} 
                  name={item.functionID.toString()}
                  disabled ={disabled} />
                }
                label={item.functionName}
                sx={{ p: 1 }}
              />
            )
          )
          }
        </FormGroup>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </>
  );
}

