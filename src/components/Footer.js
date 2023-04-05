import * as React from 'react';
import { Grid } from "@mui/material";
import { BottomNavigation } from '@mui/material';
import { SosOutlined } from '@mui/icons-material';


export default function Footer(){
    var style = {
        display: 'flex', 
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:"0px 15px 0px 15px",
        position: "fixed",
        bottom: "0",
        left:"0",
        height: "40px",
        width: "100%",
        backgroundColor: "#f2f2f0",
        color : "#B9BBBE"
    };
    return(
        
        <BottomNavigation style={style}>
            <div style={style}>
                <h4>Copyright © 2023 BumbleBee (Pvt) Ltd. All rights reserved.</h4>
                <h3>v 1.0.0</h3>
            </div>
        </BottomNavigation>
    )
}