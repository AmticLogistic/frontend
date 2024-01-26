import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Autocomplete,
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
  { field: "id", headerName: "ID", width: 50 },
  { field: "numDoc", headerName: "Numero Docum. ", width: 120 },
  {
    field: "fecha",
    headerName: "Fecha Emisión",
    width: 150,
  },
  {
    field: "codigo",
    headerName: "Código",
    width: 150,
  },
  {
    field: "material",
    headerName: "Articulos o Servicio ",
    flex: 1,
  },
  {
    field: "cantidadPe",
    headerName: "C. Pedida",
    type: "number",
    width: 110,
  },
  {
    field: "cantidadAt",
    headerName: "C. Atendida",
    type: "number",
    width: 110,
  },
  {
    field: "cantidadTo",
    headerName: "C. Pendiente",
    type: "number",
    width: 110,
  },
  {
    field: "total",
    headerName: "VCA",
    type: "number",
    width: 110,
  },
];

const Order = () => {
  const [rows, setRows] = useState([]);
  const [load, setLoad] = useState(false);
  const [init, setInit] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));
  const [provider, setProvider] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Api.getProviders();
      if (response) {
        setProviders(response.data);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const getData = async () => {
    try {
      await setLoad(true);
      const responseMaterials = await Api.GetOrdenes(provider["id"], init, end);
      if (responseMaterials) setRows(responseMaterials.data);
      await setLoad(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      await setLoad(false);
    }
  };

  const openReport = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/report/ordenesCompraPdf/${provider["id"]}/${init}/${end}`;
    window.open(url, "_blank");
  };

  const exportExcel = () => {
    let format = [];
    for (let x in rows) {
      format.push({
        ID: rows[x].id,
        Fecha: rows[x].fecha,
        "Numero Docum. ": rows[x].numDoc,
        "Fecha Emisión": rows[x].tipoDocumento,
        Código: rows[x].codigo,
        "Articulos o Servicio": rows[x].material,
        "C. Pedida": rows[x].cantidadPe,
        "C. Atendida": rows[x].cantidadAt,
        "C. Pendiente": rows[x].cantidadTo,
        VCA: rows[x].total,
      });
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(format);
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

    // Guardar el archivo
    const fileName = "Report de Ordenes de Compra.xlsx";
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
                disabled={!provider || !provider["id"]}
              >
                Exporta Excel
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                color="error"
                onClick={openReport}
                disabled={!provider || !provider["id"]}
              >
                Exporta PDF
              </Button>
            </>
          }
          title="Reporte de Ordenes de Compra"
          subheader="Octubre 01, 2016"
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Autocomplete
                onChange={(_, newValue) => {
                  setProvider(newValue);
                }}
                options={providers}
                getOptionLabel={(option) =>
                  `${option.numDocIdentificacion} - ${option.razonSocial}`
                }
                renderInput={(params) => (
                  <TextField {...params} label="Proveedor" />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <span>
                      {option.numDocIdentificacion} - {option.razonSocial}
                    </span>
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="date"
                id="outlined-basic1"
                value={init}
                onChange={(e) => setInit(e.target.value)}
                label="Fecha Inicio"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="date"
                id="outlined-basic2"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                label="Fecha Fin"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={getData}
                disabled={!provider || !provider["id"]}
              >
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
export default Order;
