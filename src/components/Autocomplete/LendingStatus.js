import React from "react";
import { FormControl, Autocomplete,TextField } from "@mui/material";


export default function LendingStatus(props) {
    const { mode,value, options, handleSelectChange } = props;
    return (
        <>
            <FormControl required fullWidth >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    getOptionLabel={option => option.Text}
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                    value={ options.find(x => x.id == value) || null}
                    onChange={(event, value) => handleSelectChange("status",value.id)}
                    disabled={(mode != 2) ? false : true}
                />
            </FormControl>
        </>
    );
}

