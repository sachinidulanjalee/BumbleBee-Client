import React from "react";
import { FormControl, FormLabel, FormGroup, FormHelperText, Switch as MuiSwitch, Stack, Typography } from "@mui/material";

export default function Switch(props) {
    const { mode, fieldName, required, label, value, handleSelectChange, errors, text, setSwitchedDate } = props;

    const handleChange = (value) => {
        handleSelectChange(fieldName, Number((value == true) ? 1 : 2 ));
        setSwitchedDate(new Date())
    };
    
    return (
        <>
            <FormControl required={required}>
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>{text[1]}</Typography>
                        <MuiSwitch
                            checked={value}
                            onChange={(event, value) => handleChange(value)}
                            name={fieldName}
                            disabled={(mode != 2) ? false : true} />
                        <Typography>{text[0]}</Typography>
                    </Stack>

                </FormGroup>
                <FormHelperText className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root">
                    {errors}
                </FormHelperText>
            </FormControl>
        </>
    );
}

