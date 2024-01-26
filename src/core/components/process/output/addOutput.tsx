import { useState, useEffect } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, ButtonGroup, Dialog, DialogTitle, DialogContent, useTheme, Autocomplete } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Api from './../../../utils/query/api'
import Loading from "core/utils/components/Loading";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from "@mui/lab/LoadingButton";

const AddOutput = () => {

    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)

    const [persons, setPersons] = useState([])
    const [fecha, setFecha] = useState(moment().format("YYYY-MM-DD"))
    const [person, setPerson] = useState(null)
    const [selectedMaterial, setSelectedMaterial] = useState(null)

    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [centro, setCentro] = useState("1")
    const [centros, setCentros] = useState([])
    const [cantidad, setCantidad] = useState("0")
    const [marca, setMarca] = useState("0")
    const [unidad, setUnidad] = useState("0")
    const [material, setMaterial] = useState(null)
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [observation, setObservation] = useState("")
    const [observationAdd, setObservationAdd] = useState("")
    const [disponible, setDisponible] = useState("0")
    

    const [materials, setMaterials] = useState([])
    const [cart, setCart] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.getPersons()
            if (response) {
                setPersons(response.data)
            }
            const responsecc = await Api.getCCostos()
            if (responsecc) {
                setCentros(responsecc.data)
            }
            const responseMaterials = await Api.GetMateriales()
            if (responseMaterials)
                setMaterials(responseMaterials.data)
            await setLoad(false)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    const selectedMarial = (row: any) => {
        setMaterial(row)
        setUnidad(row.unidad_nombre)
        setMarca(row.marca_nombre)
    }
    const addCart = async () => {
        const rowCart = {
            cantidad: cantidad,
            unid: unidad,
            marca: marca,
            observacion: '',
            Material_id: material.id,
        }
        const newRow = { ...material, ...rowCart }
        const newCart = [...cart, newRow]
        await setCart(newCart)
        await clearModal()
    }

    const clearModal = async () => {
        await setCantidad('0')
        await setMaterial(null)
        await setMarca('')
        await setUnidad('')
        await handleClearTextField()
    }

    const saveData = async () => {
        await setLoading(true)
        let data = {
            fecha: fecha,
            observacion: observation,
            Personas_id: person["id"],
            CCostosPrimarios_id: centro,
            detalles: cart
        }
        await setLoading(true)
        const request = await Api.SaveOutput(data)
        if (request.status) {
            Swal.fire('Salida Registrada', 'La salida fue registrada de forma exitosa.', 'success')
            navigate("/operaciones/salidas")
        } else {
            Swal.fire('Alerta', 'La salida no pudo ser registrada, verificar los datos ingresados', 'success')
        }
        await setLoading(false)
        await setLoading(false)
    }

    const handleClearTextField = () => {
        setSelectedMaterial(null);
    }

    const handleModal = (state: boolean) => {
        setOpen(state);
    }

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
    }
    const handleInputChange = (event) => {
        // Validación para permitir solo números y un solo punto decimal
        const inputValue = event.target.value;
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setCantidad(inputValue);
        }
    }

    const handleBlur = () => {
        const numericValue = parseFloat(cantidad);
        if (isNaN(numericValue) || numericValue < 0) {
            setCantidad('0');
        }
    }

    const getDisponible = async (material) => {
        await setCantidad('0')
        await setDisponible('0')
        await setLoad2(true)
        const responseDisp = await Api.getDisponibleMaterial(material.id)
        if(responseDisp)
            setDisponible(responseDisp.total)
        await setLoad2(false)
    }   

    return (
        <>
            {
                load &&
                <Loading />
            }
            {
                !load &&
                <>
                    <Card>
                        <CardHeader
                            title="Registra una nueva salida"
                            subheader="Registra una nueva salida de material"
                            avatar={
                                <Avatar aria-label="recipe">
                                    R
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    {
                                        persons && persons.length > 0 &&
                                        <Autocomplete
                                            onChange={(_, newValue) => { setPerson(newValue) }}
                                            options={persons}
                                            getOptionLabel={(option) => `${option.numDocIdentificacion} - ${option.nombres} ${option.apeMaterno} ${option.apePaterno}`}
                                            renderInput={(params) => <TextField {...params} label="Personal de trabajo" />}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <span>{option.numDocIdentificacion} - {option.nombres} {option.apeMaterno} {option.apePaterno}</span>
                                                </li>
                                            )}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="outlined-basic" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} label="Sitio entrega" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label1">Centro de Costo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={centro}
                                            label="Centro de Costo"
                                            onChange={(e) => setCentro(e.target.value)}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {
                                                centros && centros.length >= 0 &&
                                                centros.map((row) => (
                                                    <MenuItem value={row.id}>{row.centroCosto}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Observacion"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        value={observation}
                                        onChange={(e) => setObservation(e.target.value)}
                                        defaultValue="Ninguna"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">MATERIAL</TableCell>
                                    <TableCell align="left">UND</TableCell>
                                    <TableCell align="left">MARCA</TableCell>
                                    <TableCell align="center">CANTIDAD</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={() => { handleModal(true) }}><AddIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cart && cart.length >= 0 &&
                                    cart.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.material}</TableCell>
                                            <TableCell align="left">{row.unid}</TableCell>
                                            <TableCell align="left">{row.marca}</TableCell>
                                            <TableCell align="center">{row.cantidad}</TableCell>
                                            <TableCell align="center" width={40}>
                                                <ButtonGroup>
                                                    <Button variant="contained" color="error" onClick={() => { removeFromCart(index) }}><DeleteIcon fontSize="small" /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                {
                                    cart.length == 0 &&
                                    <TableRow  >
                                        <TableCell colSpan={8} sx={{ textAlign: 'center' }}>
                                            Agregue materiales
                                        </TableCell>
                                    </TableRow>
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <LoadingButton loading={loading} variant="contained" startIcon={<DeleteIcon fontSize="small" />} sx={{ mt: 4, width: 220, marginLeft: 'auto' }} onClick={saveData}>
                        Guardar Salida
                    </LoadingButton>
                </>
            }

            <Dialog onClose={handleModal} open={open} fullScreen={fullScreen}>
                <DialogTitle sx={{ textAlign: 'center', mt: 3 }}>Agregar Producto o Servicios</DialogTitle>
                <DialogContent sx={{ p: 5 }}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={9}>
                            {materials && materials.length > 0 && (
                                <Autocomplete
                                    value={selectedMaterial}
                                    onChange={(_, newValue) => { selectedMarial(newValue); setSelectedMaterial(newValue);getDisponible(newValue) }}
                                    options={materials}
                                    getOptionLabel={(option) => `${option.material} | ${option.unidad_nombre} | ${option.marca_nombre}`}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Material"
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            <span key={`li${option.id}`}>
                                                {option.material} | {option.unidad_nombre} | {option.marca_nombre}
                                            </span>
                                        </li>
                                    )}
                                />
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic|1" value={cantidad} label="Cantidad" disabled={parseInt(disponible) == 0} variant="outlined" onChange={handleInputChange} onBlur={handleBlur} fullWidth />
                        </Grid>
                        <Grid item xs={4} sx={{textAlign:'center'}}>
                            {
                                load2 && 
                                <CircularProgress/>
                            }
                            {
                                !load2 && 
                                <TextField id="outlined-basic" value={disponible} label="Disponible" variant="outlined" disabled fullWidth />
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" value={unidad} label="Unidad" variant="outlined" disabled fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" value={marca} label="Marca" variant="outlined" disabled fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" value={observationAdd} label="Observación" onChange={(e) => { setObservationAdd(e.target.value) }} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }} disabled={!cantidad || cantidad == '0' || parseFloat(cantidad) > parseFloat(disponible)} onClick={addCart}>
                                Agregar
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="error" startIcon={<CloseIcon />} sx={{ mt: 3 }} onClick={() => { handleModal(false) }}>
                                Cerrar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>
        </>
    )

}
export default AddOutput