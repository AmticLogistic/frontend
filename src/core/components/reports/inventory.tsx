import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Api from "./../../utils/query/api";
import moment from "moment";
import Loading from "core/utils/components/Loading";
import * as XLSX from "xlsx/xlsx.mjs";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "categoria_nombre",
    headerName: "Categoria",
    width: 220,
  },
  {
    field: "material",
    headerName: "Descripción",
    flex: 1,
  },
  {
    field: "marca_nombre",
    headerName: "Marca",
    width: 150,
  },
  {
    field: "unidad_nombre",
    headerName: "UND",
    type: "number",
    width: 110,
  },
  {
    field: "stock",
    headerName: "Saldo Actual",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    align: "center",
    width: 100,
  },
];

const Inventory = () => {
  const [rows, setRows] = useState([]);
  const [load, setLoad] = useState(false);
  const [init, setInit] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await setLoad(true);
      const responseMaterials = await Api.inventory(init, end);
      if (responseMaterials) setRows(responseMaterials.data);
      await setLoad(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const openReport = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/report/inventoryPdf/${init}/${end}`;
    window.open(url, "_blank");
  };

  const exportExcel = () => {
    let format = [];
    for (let x in rows) {
      format.push({
        id: rows[x].id,
        Categoria: rows[x].categoria_nombre,
        Material: rows[x].material,
        Unidad: rows[x].unidad_nombre,
        Marca: rows[x].marca_nombre,
        Stock: rows[x].stock,
      });
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(format);
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

    // Guardar el archivo
    const fileName = "Report de Inventario.xlsx";
    XLSX.writeFile(wb, fileName);
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <>
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                color="success"
                onClick={exportExcel}
              >
                Exporta EXCEL
              </Button>{" "}
              &nbsp;&nbsp;
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                color="error"
                onClick={openReport}
              >
                Exporta PDF
              </Button>
            </>
          }
          title="Reporte de inventario"
          subheader="Octubre 01, 2016"
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                type="date"
                id="outlined-basic1"
                value={init}
                onChange={(e) => {
                  setInit(e.target.value);
                }}
                label="Fecha Inicio"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="date"
                id="outlined-basic2"
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
                label="Fecha Fin"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" sx={{ mt: 1 }} onClick={fetchData}>
                Buscar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ height: 850, width: "100%", overflow: "auto" }}>
        {load && <Loading />}
        {!load && (
          <DataGrid
            sx={{ background: "white", mt: 3, sb: 3 }}
            rows={rows}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 12,
                },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </>
  );
};
export default Inventory;
