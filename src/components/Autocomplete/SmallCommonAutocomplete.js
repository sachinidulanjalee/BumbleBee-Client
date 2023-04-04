import React, { memo } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { height } from "@mui/system";

export function SmallCommonAutocomplete(props) {
  const {
    mode,
    fieldName,
    required,
    label,
    value,
    options,
    handleSelectChange,
    errors,
    disabled = false,
    size,
    margin,
    inputHeight,
    inputFontSize,
    inputProps,
  } = props;
  return (
    <>
      <FormControl required fullWidth>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option.text}
          renderInput={(params) => (
            <TextField
              {...params}
              margin={margin}
              size={size}
              sx={{
                "& .MuiInputBase-root": {
                  height: 28,
                  fontSize: 14,
                  paddingTop: "0px !important",
                  paddingBottom: "0px !important",
                },
              }}
              label={label}
              name={fieldName}
              fullWidth
              variant="outlined"
              required={required}
              {...(errors && {
                error: true,
                helperText: errors,
              })}
            />
          )}
          value={options.find((x) => x.value == value) || null}
          onChange={(event, value) =>
            handleSelectChange(fieldName, value.value)
          }
          disabled={disabled}
        />
      </FormControl>
    </>
  );
}

export default React.memo(SmallCommonAutocomplete);
