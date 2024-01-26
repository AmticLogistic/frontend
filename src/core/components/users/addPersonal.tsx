import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useNavigate, useParams } from "react-router-dom";
import Api from "./../../utils/query/api";
import { useEffect, useState } from "react";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";

const AddPersonal = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [nombres, setNombres] = useState("");
  const [numDocIdentificacion, setNumDocIdentificacion] = useState("");
  const [apePaterno, setApePaterno] = useState("");
  const [apeMaterno, setApeMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    moment("2000-01-01").format("YYYY-MM-DD")
  );

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (id) getData();
  }, []);

  const getData = async () => {
    try {
      await setLoad(true);
      const response = await Api.onePersonal(id);
      if (response) {
        setNombres(response.data.nombres);
        setNumDocIdentificacion(response.data.numDocIdentificacion);
        setApePaterno(response.data.apePaterno);
        setApeMaterno(response.data.apeMaterno);
        setCorreo(response.data.correo);
        setDireccion(response.data.direccion);
        setTelefono(response.data.telefono);
        setCargo(response.data.cargo);
        setUrlImagen(response.data.urlImagen);
        setFechaNacimiento(response.data.fechaNacimiento);
      }
      await setLoad(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const saveData = async () => {
    let data = {
      id: id ?? 0,
      nombres: nombres,
      numDocIdentificacion: numDocIdentificacion,
      apePaterno: apePaterno,
      apeMaterno: apeMaterno,
      correo: correo,
      direccion: direccion,
      telefono: telefono,
      cargo: cargo,
      urlImagen: urlImagen,
      fechaNacimiento: fechaNacimiento,
      TiposDocsIdentificacion_id: 2,
    };
    await setLoad(true);
    const response = await Api.savePersonal(data);
    if (response.status) {
      Swal.fire(
        "Personal Registrada",
        "El personal fue registrada de forma exitosa.",
        "success"
      );
      navigate("/usuarios/personal");
    } else {
      Swal.fire(
        "Alerta",
        "El personal no pudo ser registrada, verificar los datos ingresados",
        "success"
      );
    }
    await setLoad(false);
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Nuevo personal de trabajo"
          subheader="Registrar nuevo personal de trabajo"
          avatar={<Avatar aria-label="recipe">C</Avatar>}
        ></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Nombres"
                    variant="outlined"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Ape. Paterno"
                    variant="outlined"
                    value={apePaterno}
                    onChange={(e) => setApePaterno(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Ape. Materno"
                    variant="outlined"
                    value={apeMaterno}
                    onChange={(e) => setApeMaterno(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="DNI"
                    variant="outlined"
                    value={numDocIdentificacion}
                    onChange={(e) => setNumDocIdentificacion(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    type="date"
                    label="Fecha Nacimiento"
                    variant="outlined"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Correo"
                    variant="outlined"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Dirección"
                    variant="outlined"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Telefono"
                    variant="outlined"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined-basic"
                    label="Cargo"
                    variant="outlined"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <AddAPhotoIcon
                fontSize="large"
                sx={{ fontSize: 120, color: "#D9D9D9" }}
              />
              <Button variant="outlined" sx={{ mt: 1 }} startIcon={<AddIcon />}>
                Cargar Foto
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <LoadingButton
                loading={load}
                variant="contained"
                sx={{ mt: 1 }}
                startIcon={<AddIcon />}
                onClick={saveData}
              >
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
export default AddPersonal;
