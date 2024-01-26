import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import Api from "./../../utils/query/api";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loading from "core/utils/components/Loading";
import Swal from "sweetalert2";

const PersonalList = () => {
  const navigate = useNavigate();

  const [personals, setPersonals] = useState([]);
  const [load, setLoad] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await setLoad(true);
        const response = await Api.getPersons();
        if (isMounted) {
          setPersonals(response.data);
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
      const response = await Api.getPersons();
      if (response) {
        setPersonals(response.data);
        await setLoad(false);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      await setLoad(false);
    }
  };

  const deleteData = async (id) => {
    const data = {
      id: id,
      estado: 0,
    };
    Swal.fire({
      title: "Estas seguro?",
      text: "Eliminaras el personal de forma permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api.deletePersonal(id);
        if (response) {
          Swal.fire("Exito!", "Personal eliminada exitosamente.", "success");
          getData();
        } else {
          Swal.fire("Alerta", "No se pudo eliminada la marca.", "error");
        }
      }
    });
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredData = personals.filter((row) => {
    return (
      row.nombres.toLowerCase().includes(filterText.toLowerCase()) ||
      row.apePaterno.toLowerCase().includes(filterText.toLowerCase()) ||
      row.apeMaterno.toLowerCase().includes(filterText.toLowerCase()) ||
      row.numDocIdentificacion.includes(filterText)
    );
  });

  const columns: GridColDef[] = [
    {
      field: "numDocIdentificacion",
      headerName: "Documento",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Personal",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        const { row } = params;

        return (
          <span>{`${row["nombres"]} ${row["apePaterno"]} ${row["apeMaterno"]}`}</span>
        );
      },
    },
    {
      field: "cargo",
      headerName: "Cargo",
      sortable: true,
      width: 120,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 150,
      sortable: false,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 150,
    },
    {
      field: "ac",
      headerName: "Accion",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                navigate("/usuarios/personal/edit/" + row["id"]);
              }}
            >
              <EditIcon fontSize="small" />
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteData(row.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title="Lista de Personal"
          subheader="Lista completa de personal de la empresa"
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                navigate("/usuarios/personal/nuevo");
              }}
            >
              Nuevo Personal
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Busqueda de proveedor"
                value={filterText}
                onChange={handleFilterChange}
                variant="outlined"
                sx={{ marginRight: 1, minWidth: 450 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {load && <Loading />}
      {!load && (
        <DataGrid
          sx={{ background: "white", mt: 3 }}
          rows={filteredData}
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
    </>
  );
};
export default PersonalList;
