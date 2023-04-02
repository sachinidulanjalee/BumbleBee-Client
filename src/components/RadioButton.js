import React from "react";
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";

export default function RadioButton(props) {
    const { mode, fieldName, required, label, value, options, handleSelectChange, errors } = props;

    return (
        <>
            <FormControl>
                <FormLabel required={required}>{label}</FormLabel>
                <MuiRadioGroup row
                    name={fieldName}
                    value={value}
                    onChange={(event, value) => handleSelectChange(fieldName, value)}
                    required={required}
                >

                    {options.map(
                        option => (
                            <FormControlLabel key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.text}
                                size="small"
                                disabled={(mode != 2) ? false : true}
                            />
                        )
                    )
                    }
                </MuiRadioGroup>

                <FormHelperText className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root">
                    {errors}
                </FormHelperText>
            </FormControl>
        </>
    );
}

