import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Api from "./../../../utils/query/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loading from "core/utils/components/Loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Slider from "@mui/material/Slider";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuBuy from "./menuBuy";
import ProgressBar from "@ramonak/react-progress-bar";

const BuysForm = () => {
  const navigate = useNavigate();

  const [dateInit, setDateInit] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [dateEnd, setDateEnd] = useState(moment().format("YYYY-MM-DD"));
  const [provider, setProvider] = useState("0");
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await setLoad(true);
        const response = await Api.ListOrdenes(dateInit, dateEnd);
        if (isMounted) {
          setProducts(response.data);
          await setLoad(false);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        await setLoad(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getData = async () => {
    try {
      await setLoad(true);
      const response = await Api.ListOrdenes(dateInit, dateEnd);
      if (response) {
        setProducts(response.data);
        await setLoad(false);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      await setLoad(false);
    }
  };

  function valuetext(value: number) {
    return `${value}%`;
  }

  const handleChangep = (event: SelectChangeEvent) => {
    setProvider(event.target.value as string);
  };

  const handleClickOpen = async (data: any) => {
    setDetails(data);
    setOpen(true);
  };
  const handleClose2 = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "ID",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "porcetaje",
      headerName: "Avance",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        let prog = "0";
        if (parseFloat(row["cantidadEntrada"]) > 0) {
          prog = (
            (parseInt(row["cantidadEntrada"]) /
              parseInt(row["cantidadTotal"])) *
            100
          ).toFixed(0);
        }
        return (
          <div style={{ width: 100 }}>
            <ProgressBar
              completed={prog}
              width="100%"
              bgColor="#4B4B75"
              labelColor="#4B4B75"
              labelAlignment="outside"
              customLabel={`${prog}%`}
            />
          </div>
        );
      },
    },
    {
      field: "empresa",
      headerName: "Proveedor",
      width: 150,
      flex: 1,
    },
    {
      field: "codeReq",
      headerName: "Requerimiento",
      sortable: true,
      width: 120,
    },
    {
      field: "fecha",
      headerName: "Fecha Emisión",
      width: 150,
    },
    {
      field: "list",
      headerName: "Lista",
      width: 60,
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
      field: "moneda",
      headerName: "Moneda",
      width: 150,
      sortable: false,
    },
    {
      field: "total",
      headerName: "total",
      align: "left",
      renderCell: (params) => {
        const { row } = params;
        const totalp = row["total"];

        return (
          <>
            {parseFloat(totalp).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </>
        );
      },
    },
    {
      field: "ac",
      headerName: "Accion",
      align: "center",
      width: 100,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            <MenuBuy data={row} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title="Lista de Ordenes de Compra"
          subheader="Lista de Ordenes de Compra registrados"
          avatar={<Avatar aria-label="recipe">C</Avatar>}
          // action={
          //     <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/operaciones/ordencompras/nuevo"); }}>
          //         Nueva Orden
          //     </Button>
          // }
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
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" sx={{ mt: 1 }} onClick={getData}>
                Buscar
              </Button>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              {/* <FormControl sx={{ width: 160 }}>
                                <InputLabel id="demo-simple-select-label1">Proveedor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={provider}
                                    label="Proveedor"
                                    onChange={handleChangep}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={0}>Seleccione</MenuItem>
                                    <MenuItem value={1}>cat 1</MenuItem>
                                    <MenuItem value={2}>cat 2</MenuItem>
                                </Select>
                            </FormControl> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {load && <Loading />}
      {!load && (
        <DataGrid
          sx={{ background: "white", mt: 3 }}
          rows={products}
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

export default BuysForm;
