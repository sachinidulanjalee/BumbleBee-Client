import React from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";


export default function MainClassification(props) {
    const { mode, fieldName, required, label, value, options, handleSelectChange, errors, setClasificationsID, disabled = false } = props;

    function handleChange(value) {
        handleSelectChange(fieldName, value);
        setClasificationsID(value);
    }

    return (
        <>
            <FormControl required fullWidth >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    getOptionLabel={option => option.text}
                    renderInput={(params) => <TextField {...params}
                        margin="dense"
                        label={label}
                        name={fieldName}
                        fullWidth
                        variant="outlined"
                        required={required}
                        {...(errors && {
                            error: true,
                            helperText: errors,
                        })} />}
                    value={options.find(x => x.value == value) || null}
                    onChange={(event, value) => handleChange(value.value)}
                    disabled={disabled}
                />
            </FormControl>
        </>
    );
}

