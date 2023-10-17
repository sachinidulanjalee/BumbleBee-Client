import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography, IconButton } from '@mui/material';
import {EditTwoTone,ViewComfy,Cancel} from '@material-ui/icons';



export default function PopupFrom(props) {

    const { openDialog, setOpenDialog, title, children, mode,setMode,maxWidth="sm"} = props;

    const toggleMode = () =>{
        if(mode == 2)
            setMode(3);
        if(mode == 3)
            setMode(2);
    }
    return (
        <>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth={maxWidth}>
                <DialogTitle>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            {title}
                        </Typography>

                        <IconButton size="small"
                             onClick={toggleMode}
                             style={{ display: (mode != 0) ? "" : "none" }}  
                            aria-label="close">
                            <EditTwoTone style={{ display: (mode != 3) ? "" : "none" }}/>
                            <ViewComfy style={{ display: (mode != 2) ? "" : "none" }}/>
                        </IconButton>
                        

                        <IconButton aria-label="close" size="small" onClick={() => setOpenDialog(false)}>
                            <Cancel />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}

