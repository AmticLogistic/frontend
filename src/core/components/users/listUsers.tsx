import { useEffect, useState } from "react";
import Working from "core/utils/components/Working";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Api from "core/utils/query/api";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";

const listUsers = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [user, setUser] = useState({});
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await setLoad(true);
        const response = await Api.listUsers();
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
      const response = await Api.listUsers();
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
  const handleModalEdit = (state: boolean) => {
    setOpenEdit(state);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "usuario",
      headerName: "Usuario",
      width: 150,
      flex: 1,
    },
    {
      field: "rol",
      headerName: "Rol",
      sortable: true,
      width: 120,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
    },

    {
      field: "acction",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setOpen(true);
                setUser(row);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setOpenEdit(true);
                setUsername(row["usuario"]);
                setId(row["id"]);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                deleteData(row);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const changeUsername = async () => {
    const userSave = {
      id: id,
      usuario: username,
      estado: 1,
    };
    await setLoad(true);
    const requestSave = await Api.editUser(userSave);
    if (requestSave.status) {
      Swal.fire(
        "Usuario modificado",
        "El username fue modificado exitomsane.",
        "success"
      );
    } else {
      Swal.fire(
        "Ops ocurrio algos..",
        "No se pudo generar el rol, verifique los datos.",
        "error"
      );
    }
    await setUsername("");
    await setLoad(false);
    await setOpenEdit(false);
    await reload();
  };

  const deleteData = async (row) => {
    const data = {
      id: row.id,
      usuario: row.usuario,
      estado: 0,
    };
    Swal.fire({
      title: "Estas seguro?",
      text: "Eliminaras el usuario de forma permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api.editUser(data);
        if (response) {
          Swal.fire("Exito!", "Usuario eliminado exitosamente.", "success");
          setId(0);
          reload();
        } else {
          Swal.fire("Alerta", "No se pudo eliminada la marca.", "error");
        }
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Administracion de Usuarios"
          subheader="Lista de usuario de acceso al sistema."
          avatar={<Avatar aria-label="recipe">U</Avatar>}
          action={
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              startIcon={<AddIcon />}
              onClick={() => {
                navigate("/usuarios/registro");
              }}
            >
              Crear Usuario
            </Button>
          }
        ></CardHeader>
      </Card>
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
      <Dialog onClose={handleModal} open={open} fullScreen={fullScreen}>
        <DialogTitle sx={{ textAlign: "center" }}>Usuario</DialogTitle>
        <DialogContent sx={{ p: 5, textAlign: "center" }}>
          <table>
            <tr>
              <th>Usuario</th>
              <td style={{ textAlign: "left" }}>{user["usuario"]}</td>
            </tr>
            <tr>
              <th>Documento</th>
              <td style={{ textAlign: "left" }}>
                {user["numDocIdentificacion"]}
              </td>
            </tr>
            <tr>
              <th>Nombres</th>
              <td style={{ textAlign: "left" }}>{user["nombres"]}</td>
            </tr>
            <tr>
              <th>Apellidos</th>
              <td style={{ textAlign: "left" }}>
                {user["apePaterno"]} {user["apeMaterno"]}
              </td>
            </tr>
            <tr>
              <th>Cargo</th>
              <td style={{ textAlign: "left" }}>{user["cargo"]}</td>
            </tr>
            <tr>
              <th>Rol</th>
              <td style={{ textAlign: "left" }}>{user["rol"]}</td>
            </tr>
          </table>
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
        </DialogContent>
      </Dialog>
      <Dialog onClose={handleModalEdit} open={openEdit} fullScreen={fullScreen}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Edición de usuario
        </DialogTitle>
        <DialogContent sx={{ p: 5, textAlign: "center" }}>
          <TextField
            id="outlined-basic"
            value={username}
            sx={{ mt: 3 }}
            label="Nuevo Username"
            variant="outlined"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fullWidth
          />
          <LoadingButton
            variant="contained"
            loading={load}
            startIcon={<AddIcon />}
            sx={{ mt: 3 }}
            onClick={changeUsername}
          >
            Guardar
          </LoadingButton>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            sx={{ mt: 3 }}
            onClick={() => {
              handleModalEdit(false);
            }}
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default listUsers;
