import React,{memo} from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";


export function CommonAutocomplete_first  (props) {
    const { mode, fieldName, required, label, value, options, handleSelectChange, errors, disabled = false } = props;

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
                    onChange={(event, value) => handleSelectChange(fieldName, value.value)}
                    disabled={disabled}
                />
            </FormControl>
        </>
    );
}

export default React.memo(CommonAutocomplete_first)