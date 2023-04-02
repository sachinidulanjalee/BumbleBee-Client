import React from "react";
import { IconButton } from "@mui/material";
import { Add } from '@material-ui/icons';


export default function FormAddButton(props) {

    const { setCreateDialogOpen, display } = props;

    return (
        <>
            <IconButton aria-label="close" size="small" onClick={() => setCreateDialogOpen(true)} style={{ display: (display) ? "" : "none" , backgroundColor : "#e7feff"}}>
                <Add />
            </IconButton>
        </>
    );
}

