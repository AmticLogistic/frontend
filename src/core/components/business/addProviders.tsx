import { useEffect, useState } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, ButtonGroup, Dialog, DialogTitle, DialogContent, useTheme } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import Fab from '@mui/material/Fab';
import moment from "moment";
import Api from './../../utils/query/api'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from "@mui/lab/LoadingButton";
import Loading from "core/utils/components/Loading";

const AddProvider = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const theme = useTheme();
    const [ruc, setRuc] = useState("")
    const [razon, setRazon] = useState("")
    const [dir, setDir] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setphone] = useState("")
    const [rl, setRl] = useState("")
    const [activity, setActivity] = useState("")
    const [loadg, setLoadg] = useState(false)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (id)
            getData()
    }, []);


    const getRuc = async () => {
        try {
            const response = await Api.getRUC(ruc)
            if (response) {
                await setRazon(response['razonSocial'])
                await setDir(response['direccion'])
            }

        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    const getData = async () => {
        try {
            await setLoad(true)
            const response = await Api.oneProviders(id)
            if (response) {
                setRuc(response.data.numDocIdentificacion)
                setRazon(response.data.razonSocial)
                setDir(response.data.direccionFiscal)
                setMail(response.data.correo)
                setphone(response.data.telefono)
                setRl(response.data.representanteLegal)
                setActivity(response.data.actEconomica)
            }
            await setLoad(false)

        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    const saveData = async () => {
        let data = {
            id: id,
            razonSocial: razon,
            direccionFiscal: dir,
            numDocIdentificacion: ruc,
            actEconomica: activity,
            representanteLegal: rl,
            correo: mail,
            telefono: phone,
        }
        await setLoadg(true)
        const response = await Api.saveProviders(data)
        if (response) {
            Swal.fire({
                title: 'Éxito!',
                text: 'Proveedor registrado exitosamente.',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/empresas/proveedores');
                }
            });
        } else {
            Swal.fire('Alerta', 'No se pudo registrar el proveedor.', 'error');
        }
        await setLoadg(false)

    }

    return (
        <>
            {
                load &&
                <Loading />
            }
            {
                !load &&
                <Card>
                    <CardHeader
                        title="Registro de Proveedor"
                        subheader="Ingresa los datos solicitados"
                        avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                        }
                    ></CardHeader>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField id="outlined-basic" label="RUC" value={ruc} onChange={(e) => setRuc(e.target.value)} variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={1}>
                                <Fab color="primary" aria-label="add" onClick={getRuc}>
                                    <SearchIcon />
                                </Fab>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField id="outlined-basic" value={razon} onChange={(e) => setRazon(e.target.value)} label="RAZON SOCIAL" variant="outlined" defaultValue={" "} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" value={dir} onChange={(e) => setDir(e.target.value)} label="DIRECCION" variant="outlined" defaultValue={" "} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" value={mail} onChange={(e) => setMail(e.target.value)} label="CORREO" variant="outlined" defaultValue={" "} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" value={phone} onChange={(e) => setphone(e.target.value)} label="TELEFONO" variant="outlined" defaultValue={" "} fullWidth />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField id="outlined-basic" value={rl} onChange={(e) => setRl(e.target.value)} label="REPRESENTANTE LEGAL" variant="outlined" defaultValue={" "} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" value={activity} onChange={(e) => setActivity(e.target.value)} label="ACTIVIDAD ECONOMICA" variant="outlined" defaultValue={" "} fullWidth />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <LoadingButton loading={loadg} variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} onClick={saveData}>
                                    Guardar Proveedor
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }

        </>
    )
}
export default AddProvider