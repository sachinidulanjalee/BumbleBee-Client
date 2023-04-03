import React, { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { CreateProduct } from "./ProductForm";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";
import * as DefineValues from "../../common/DefineValues";

const customerId = 1;
const fromName = "Product";

const columns = [

  {
    field: "productId",
    headerName: "Product Id",
    width: 200,
    align: "left",
  },
  {
    field: "productName",
    headerName: "Description",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "categoryName",
    headerName: "Category",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "brand",
    headerName: "Brand",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
];

export default function Product() {
  const [errorList, setErrorList] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setselectedProduct] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [mode, setMode] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [status, setstatus] = useState(DefineValues.status());

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter((item) => item.FunctionURL === "/Product").length ===
      0
    ) {
      window.location.replace("/UnAuthorized");
    }
    getProduct();
  }, [openCreateDialog, confirmDialog]);

  const getProduct = () => {
    ProductService.getAll(customerId)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const rows = () => {
    return product.map((product, key) => ({
      id: key,
      customerId: product.companyId,
      productId: product.productId,
      productName: product.productName,
      categoryId: product.categoryId,
      brand:product.brand,
      categoryName:product.categoryName,
      unitPrice: product.unitPrice,
      status:DefineValues.status().find(x => x.value == product.status).text,
    }));
  };

  const handleCreateDialogOpen = () => {
    setselectedProduct(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (record) => {
    if (record != null) {
      ProductService.get(customerId, record.productId)
        .then((res) => {
          setselectedProduct(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setMode(2);
      setOpenCreateDialog(true);
    }
  };

  const onDelete = () => {
    const lstRowId = [];

    selectedRows.map((id) => {
      let selectedRow = product.find(
        (x) =>
          x.productId === rows()[id].productId &&
          x.customerId === rows()[id].customerId
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      ProductService.BulkRemove(lstRowId)
        .then((res) => {
          setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
          });

          if (res.data) {
            Alert(getMessage(203), 1);
          } else {
            Alert(getMessage(303), 3);
          }
        })
        .catch((e) => {
          console.log(e);
          Alert(getMessage(303), 3);
        });
    }
  };

  return (
    <>
      <Card>
      <CardHeader title={fromName} sx={{ paddingBottom: 0 }}></CardHeader>
        <CardContent>
          <GridAddButton
            fromName={fromName}
            handleCreateDialogOpen={handleCreateDialogOpen}
          />

          <DeleteButton
            canDelete={canDelete}
            setConfirmDialog={setConfirmDialog}
            onDelete={onDelete}
          />

          <br />
          <br />

          <CheckBoxGrid
            rows={rows()}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            setCanDelete={setCanDelete}
            setSelectedRows={setSelectedRows}
            handleViewDialogOpen={handleViewDialogOpen}
          />
          <PopupFrom
            openDialog={openCreateDialog}
            setOpenDialog={setOpenCreateDialog}
            title={fromName}
            mode={mode}
            setMode={setMode}
          >
            <CreateProduct
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedProduct={selectedProduct}
              product={product}
            />
          </PopupFrom>
          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedProduct}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
