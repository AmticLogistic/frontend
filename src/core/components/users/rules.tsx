import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Api from "core/utils/query/api";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";

const Rules = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [rols, setRols] = useState(null);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await setLoad(true);
        const response = await Api.listRoles();
        if (isMounted) {
          setUsers(response.data);
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

  const reload = async () => {
    try {
      await setLoad(true);
      const response = await Api.listRoles();
      if (response) {
        setUsers(response.data);
        await setLoad(false);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      await setLoad(false);
    }
  };

  const handleModal = (state: boolean) => {
    setOpen(state);
  };

  const columns: GridColDef[] = [
    {
      field: "rol",
      headerName: "Rol",
      width: 130,
      flex: 1,
    },
    {
      field: "acction",
      headerName: "Permisos",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <IconButton
            aria-label="delete"
            onClick={() => {
              selectRol(row);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        );
      },
    },
  ];

  const selectRol = async (arrow) => {
    console.log(arrow);
    await setData(JSON.parse(arrow["permisos"]));
    console.log(data);
    await setTitle(arrow["rol"]);
    await setRols(arrow);
  };

  const saveData = async () => {
    const userSave = {
      id: rols.id,
      rol: rols.rol,
      estado: rols.estado,
      permisos: JSON.stringify(data),
    };
    await setLoad(true);
    const requestSave = await Api.saveRoles(userSave);
    if (requestSave.status) {
      Swal.fire(
        "Rol modificado exitosamente",
        "Los permisos del rol fue editado.",
        "success"
      );
    } else {
      Swal.fire(
        "Ops ocurrio algos..",
        "No se pudo generar el usuario, verifique los datos.",
        "error"
      );
    }
    await setLoad(false);
    await reload();
  };
  const saveRole = async () => {
    const userSave = {
      id: 0,
      rol: role,
    };
    await setLoad(true);
    const requestSave = await Api.saveRoles(userSave);
    if (requestSave.status) {
      Swal.fire(
        "Rol agregado exitosamente",
        "Los permisos del rol fue registrao exitomsane.",
        "success"
      );
    } else {
      Swal.fire(
        "Ops ocurrio algos..",
        "No se pudo generar el rol, verifique los datos.",
        "error"
      );
    }
    await setLoad(false);
    await setOpen(false);
    await setRole("");
    await reload();
  };

  const handleCheckboxChange = (moduleId, propertyName) => {
    const updatedData = data.map((row) => {
      if (row.id === moduleId) {
        return { ...row, [propertyName]: !row[propertyName] };
      }
      return row;
    });
    setData(updatedData);
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Administracion de Roles y Permisos"
          subheader="Lista de roles de usuarios segun el rol."
          avatar={<Avatar aria-label="recipe">U</Avatar>}
        ></CardHeader>
      </Card>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <DataGrid
            sx={{ background: "white", mt: 3 }}
            rows={users}
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
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            onClick={() => setOpen(true)}
          >
            Agregar Rol
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Card sx={{ mt: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#0D448C" }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={title}
              subheader="Administracion de Permisos"
            />
            <CardContent>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Modulo</TableCell>
                    <TableCell align="center">Acceso</TableCell>
                    <TableCell align="center">Ver</TableCell>
                    <TableCell align="center">Crear</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.length > 0 &&
                    data.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={row.access}
                            onChange={() =>
                              handleCheckboxChange(row.id, "access")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={row.view}
                            onChange={() =>
                              handleCheckboxChange(row.id, "view")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={row.create}
                            onChange={() =>
                              handleCheckboxChange(row.id, "create")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={row.edit}
                            onChange={() =>
                              handleCheckboxChange(row.id, "edit")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={row.delete}
                            onChange={() =>
                              handleCheckboxChange(row.id, "delete")
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ mb: 4 }}
                disabled={!title}
                onClick={saveData}
              >
                Guardar Cambios
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Dialog onClose={handleModal} open={open} fullScreen={fullScreen}>
        <DialogTitle>Nuevo Rol</DialogTitle>
        <DialogContent sx={{ p: 5 }}>
          <Grid container spacing={1}>
            <Grid xs={12}>
              <TextField
                id="outlined-basic"
                value={role}
                sx={{ mt: 3 }}
                label="Nombre del Rol"
                variant="outlined"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <LoadingButton
                loading={load}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 3 }}
                onClick={saveRole}
              >
                Agregar
              </LoadingButton>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                sx={{ mt: 3 }}
                onClick={() => {
                  handleModal(false);
                }}
              >
                Cerrar
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Rules;
