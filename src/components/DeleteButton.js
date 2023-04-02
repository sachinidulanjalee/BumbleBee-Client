import React from "react";
import { IconButton } from "@mui/material";
import { DeleteTwoTone } from "@material-ui/icons";

export default function DeleteButton(props) {
    const { canDelete, setConfirmDialog, onDelete } = props;

    return (
        <>
            <IconButton style={{ display: (canDelete) ? "" : "none" }}
                onClick={() => {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record(s)?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { onDelete() }
                    })
                }}>
                <DeleteTwoTone />
            </IconButton >
        </>
    );
}

