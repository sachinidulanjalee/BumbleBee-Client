import React, { useState } from "react";
import Table from '@mui/material/Table';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   table: {
//     // marginTop: theme.spacing(3),
//     padding: 0,
//     "& thead th": {
//       color: "#3c4b64",
//       textTransform: "uppercase",
//       fontSize: "14px",
//       fontWeight: "600",
//       borderBottom: "1px",
//       borderBottomColor: "#d0cfd1",
//       borderBottomStyle: "solid",
//       // borderLeft: "1px",
//       // borderLeftColor: "#e9e8ea",
//       // borderLeftStyle: "solid",
//     },
//     "& tbody td": {
//       color: "#3c4b64",
//       fontSize: "14px",
//       fontWeight: "normal",
//       borderBottom: "1px",
//       borderBottomColor: "#e9e8ea",
//       borderBottomStyle: "solid",
//       // borderLeft: "1px",
//       // borderLeftColor: "#e9e8ea",
//       // borderLeftStyle: "solid",
//     },
//     "& tbody tr:hover": {
//       backgroundColor: "#f2f2f2",
//       cursor: "pointer",
//     },
//     "& .MuiTableCell-sizeSmall": {
//       padding: "6px 6px", // <-- arbitrary value
//     },
//   },
// }));

export default function EnhancedTable(headers, records, pagination) {
  //const classes = useStyles();

  const pages = [10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const EnhancedTableContainer = (props) => (
    <Table size="small">
      {props.children}
    </Table>
  );

  const EnhancedTableHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell
              key={header.id}
              width={header.width}
              hidden={header.hidden}
              sortDirection={orderBy === header.id ? order : false}
              align={header.align}
            >
              {header.disableSorting ? (
                header.label
              ) : (
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={orderBy === header.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(header.id);
                  }}
                >
                  {header.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const EnhancedTablePagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
       />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((e1, index) => [e1, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((e1) => e1[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    // return pagination
    //   ? stableSort(records, getComparator(order, orderBy))
    //   : stableSort(records, getComparator(order, orderBy)).slice(
    //       page * rowsPerPage,
    //       (page + 1) * rowsPerPage
    //     );
    return stableSort(pagination.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  };

  return {
    EnhancedTableContainer,
    EnhancedTableHead,
    EnhancedTablePagination,
    recordsAfterPagingAndSorting,
  };
}
