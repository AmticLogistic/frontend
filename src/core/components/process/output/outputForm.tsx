import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import Loading from "core/utils/components/Loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Api from "./../../../utils/query/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import moment from "moment";
import MenuOutput from "./menuOutput";

const OutputForm = () => {
  const navigate = useNavigate();

  const [dateInit, setDateInit] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [dateEnd, setDateEnd] = useState(moment().format("YYYY-MM-DD"));
  const [load, setLoad] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoad(true);
        const response = await Api.listOutput(dateInit, dateEnd);
        if (isMounted) {
          setProducts(response.data);
          setLoad(false);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setLoad(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getData = async () => {
    try {
      setLoad(true);
      const response = await Api.listOutput(dateInit, dateEnd);
      if (response) {
        setProducts(response.data);
        setLoad(false);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setLoad(false);
    }
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleClickOpen = async (data) => {
    setDetails(data);
    setOpen(true);
  };

  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    (product.nombre + product.paterno + product.materno)
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "ID",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
    },
    {
      field: "list",
      headerName: "Lista",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const dat = row["list"];

        return (
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleClickOpen(dat);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
    {
      field: "nombre",
      headerName: "PERSONAL/TRABAJADOR",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        const nombres = `${row["paterno"]}  ${row["materno"]}  ${row["nombre"]}`;

        return <span>{nombres}</span>;
      },
    },
    {
      field: "cc",
      headerName: "CENTRO DE COSTOS",
      width: 150,
      sortable: false,
    },
    {
      field: "",
      headerName: "Action",
      width: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {row.estado === 1 && <MenuOutput data={row} />}
            {row.estado === 0 && <Chip label="Anulado" color="error" />}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title="Lista de Salidas"
          subheader="Lista de Salidas registradas"
          avatar={<Avatar aria-label="recipe">C</Avatar>}
          action={
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                navigate("/operaciones/salidas/registro");
              }}
            >
              Nueva Salida
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                type="date"
                id="outlined-basic"
                label="Fecha Inicial"
                value={dateInit}
                onChange={(e) => setDateInit(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="date"
                id="outlined-basic"
                label="Fecha Final"
                variant="outlined"
                onChange={(e) => setDateEnd(e.target.value)}
                value={dateEnd}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" sx={{ mt: 1 }} onClick={getData}>
                Buscar
              </Button>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <TextField
                id="filtro"
                value={filtro}
                onChange={handleFilterChange}
                label="Filtrar por Personal"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {load && <Loading />}
      {!load && (
        <DataGrid
          sx={{ background: "white", mt: 3 }}
          rows={filteredProducts}
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
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Lista de Requerimientos"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {details &&
                details.length > 0 &&
                details.map((d, k) => (
                  <ListItemButton key={k}>
                    <ListItemIcon>
                      <Inventory2Icon />
                    </ListItemIcon>
                    <ListItemText primary={`${d.cantidad} ${d.material}`} />
                  </ListItemButton>
                ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OutputForm;
