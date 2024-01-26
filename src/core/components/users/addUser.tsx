import { Autocomplete, Avatar, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Api from "core/utils/query/api"
import Swal from "sweetalert2"
import LoadingButton from "@mui/lab/LoadingButton"

const AddUser = () => {

    const navigate = useNavigate();

    const [personas, setPersonas] = useState([])
    const [roles, setRoles] = useState([])
    const [load, setLoad] = useState(false)

    const [person, setPerson] = useState(null)
    const [rol, setRol] = useState('0')
    const [state, setState] = useState('1')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                await setLoad(true)
                const response = await Api.listUtils();
                if (isMounted) {
                    setPersonas(response.personal)
                    setRoles(response.roles)
                    await setLoad(false)
                }
            } catch (error) {
                console.error('Error al cargar datos:', error)
                await setLoad(false)
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    const saveUser = async () => {
        const userSave = {
            person_id: person.id,
            rol_id:rol,
            user: username,
            password:password,
            state: state
        } 
        await setLoad(true);
        const requestSave = await Api.createUser(userSave);
        console.log(requestSave.status)
        if (requestSave.status) {
            Swal.fire(
                "Usuario creado exitosamente",
                "El usuario fue registrado en la base de datos.",
                "success"
            )
            navigate("/usuarios/lista");
        } else {
            Swal.fire(
                "Ops ocurrio algos..",
                "No se pudo generar el usuario, verifique los datos.",
                "error"
            );
        }
        await setLoad(false);
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Nuevo usuario"
                    subheader="Registro de nuevo usuario de acceso"
                    avatar={
                        <Avatar aria-label="recipe">
                            C
                        </Avatar>
                    }
                ></CardHeader>
                <CardContent sx={{p:5}}>
                    <Grid container spacing={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {
                                    personas && personas.length > 0 &&
                                    <Autocomplete
                                        onChange={(_, newValue) => { setPerson(newValue) }}
                                        options={personas}
                                        getOptionLabel={(option) => `${option.numDocIdentificacion} - ${option.nombres} ${option.apeMaterno} ${option.apePaterno}`}
                                        renderInput={(params) => <TextField {...params} label="Selecciona las Persona" />}
                                        renderOption={(props, option) => (
                                            <li {...props}>
                                                <span>{option.numDocIdentificacion} - {option.nombres} {option.apeMaterno} {option.apePaterno}</span>
                                            </li>
                                        )}
                                    />
                                }
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">
                                        Rol de usuario
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={rol}
                                        label="Rol de usuario"
                                        onChange={(e)=> setRol(e.target.value)}
                                    >
                                        <MenuItem value={"0"}>Selecciona un Rol</MenuItem>
                                        {
                                            roles && roles.length > 0 &&
                                            roles.map((x)=> (
                                                <MenuItem value={x.id}>{x.rol}</MenuItem>
                                            ))
                                        }
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">
                                        Estado
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state}
                                        label="Estado"
                                        onChange={(e)=> setState(e.target.value)}
                                    >
                                        <MenuItem value={"1"}>Activo</MenuItem>
                                        <MenuItem value={"0"}>Inactivo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic3" label="Usuario" onChange={(e)=> setUsername(e.target.value)} variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic4" type="password" label="Clave" onChange={(e)=> setPassword(e.target.value)} variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic5" type="password" label="Respite la Clave" onChange={(e)=> setRepassword(e.target.value)} variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', mt:3 }}>
                        <LoadingButton loading={load} variant="contained" sx={{ mt: 1 }} onClick={saveUser} disabled={!person || rol == '0' || !username || password != repassword}>
                            Guardar
                        </LoadingButton>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}
export default AddUser