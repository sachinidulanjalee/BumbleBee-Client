import React from "react";
import {Button} from "@mui/material";
import {Add} from '@material-ui/icons';
import { alpha, styled } from '@mui/material/styles';


export default function GridAddButton(props) {

    const { fromName, handleCreateDialogOpen} = props;

    return (
        <>
          <Button
            variant="contained"
            startIcon={<Add />}
            disableElevation
            onClick={handleCreateDialogOpen}
            style={{backgroundColor:alpha('#0B0B61', 0.7)}}
          >
            New {fromName}
          </Button>
        </>
    );
}

