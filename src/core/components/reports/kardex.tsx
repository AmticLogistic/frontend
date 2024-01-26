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
  { field: "id", headerName: "ID", width: 90 },
  { field: "fecha", headerName: "fecha", width: 120 },
  {
    field: "tipoDocumento",
    headerName: "Tipo de Documento",
    width: 150,
  },
  {
    field: "nDocumento",
    headerName: "N° Documento",
    width: 150,
  },
  {
    field: "material",
    headerName: "Concepto",
    flex: 1,
  },
  {
    field: "doc",
    headerName: "RUC/DNI",
    type: "number",
    width: 110,
  },
  {
    field: "entrada",
    headerName: "Entrada",
    type: "number",
    width: 110,
  },
  {
    field: "salida",
    headerName: "Salida",
    type: "number",
    width: 110,
  },
  {
    field: "saldo",
    headerName: "Saldo",
    type: "number",
    width: 110,
  },
];

const Kardex = () => {
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
      const responseMaterials = await Api.Getkardex(init, end);
      if (responseMaterials) setRows(responseMaterials.data);
      await setLoad(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      await setLoad(false);
    }
  };

  const openReport = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/report/kardexPdf/${init}/${end}`;
    window.open(url, "_blank");
  };

  const exportExcel = () => {
    let format = [];
    for (let x in rows) {
      format.push({
        ID: rows[x].id,
        Fecha: rows[x].fecha,
        "Tipo de Documento": rows[x].tipoDocumento,
        "N° Documento": rows[x].nDocumento,
        Concepto: rows[x].material,
        "RUC/DNI": rows[x].doc,
        Entrada: rows[x].entrada,
        Salida: rows[x].salida,
        Saldo: rows[x].saldo,
      });
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(format);
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

    // Guardar el archivo
    const fileName = "Report de Kardex.xlsx";
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
                Exporta Excel
              </Button>
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
          title="Reporte de KARDEX FISICO"
          subheader=""
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
export default Kardex;
