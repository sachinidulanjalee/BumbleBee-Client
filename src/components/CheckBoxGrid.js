import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


export default function CheckBoxGrid(props) {
    

    const StyledGridOverlay = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
     
      }));

    function CustomNoRowsOverlay() {
        return (
          <StyledGridOverlay>
            <img width="300"  src={process.env.PUBLIC_URL+"img/nodata.png"} />
            <Box sx={{ mt: 1 }}>No Records</Box>
          </StyledGridOverlay>
        );
      }
    
    const { rows, columns, pageSize, rowsPerPageOptions, setCanDelete, setSelectedRows, handleViewDialogOpen , isCheckBoxTable= true} = props;

    const [pageSizeGrid, setPageSizeGrid] = React.useState(pageSize);

    const enableDelete = (rowIds) => {
        if (rowIds.length != 0) {
            setCanDelete(true);
            setSelectedRows(rowIds);
        }
        else {
            setCanDelete(false);
            setSelectedRows([])
        }
    }

    return (
        <>
            <div style={{ height: 670 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection={isCheckBoxTable}
                    disableSelectionOnClick
                    isRowSelectable={(params) => !params.row.isPrimaryKeyExist}
                    onRowClick={(params, event) => {
                        if (!event.ignore) {
                            handleViewDialogOpen(params.row)
                        }
                    }}
                    onSelectionModelChange={(rowIds) => {
                        enableDelete(rowIds);
                    }}
                    components={{ Toolbar: GridToolbar ,
                        NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    sx={{
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f2f2f0",
                            
                        },
                        '& .MuiDataGrid-row:hover': {
                            color: 'primary.main',
                            cursor: "pointer"
                        },
                        '& .MuiDataGrid-main': {
                            marginTop: "10px",
                        },
                    }}
                    pageSize={pageSizeGrid}
                    onPageSizeChange={(newPageSize) => setPageSizeGrid(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20,50]}
                    pagination
                    {...rows}

                />
            </div>

        </>
    );
}

