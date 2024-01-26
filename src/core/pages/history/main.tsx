import { useState } from "react"
import { Card, CardContent, CardHeader, Avatar, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, Fab, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Menu } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate  } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import DownloadIcon from '@mui/icons-material/Download'
import CheckIcon from '@mui/icons-material/Check'
import moment from "moment"

import Paper from '@mui/material/Paper';

const historyMain = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
    };

    const [filter, setFilter] = useState({
        cliente: "",
        comprobante: '03',
        empresa: 1,
        end: moment().format("YYYY-MM-DD"),
        init: moment("2023-08-01").format("YYYY-MM-DD"),
        month: 8,
        year: 2023
    })

    const comprobantes = [
        { code: '0', name: 'Todos', serie: '' },
        { code: '01', name: 'Factura Electronica', serie: 'FES1' },
        { code: '03', name: 'Boleta Electronica', serie: 'BES1' },
        { code: '10', name: 'Proforma', serie: 'PFS1' },
        { code: '20', name: 'Nota de pedido', serie: 'NPS1' }
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const action = () => {
        console.log('ejecutando')
    }

    const getHistory = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/reportes/reporteDocumentos`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filter),
            };

            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const data = await response.json();
                setData(data.data)
                // console.log(data); // Hacer lo que necesites con los datos recibidos
            } else {
                console.error('Error en la consulta:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleMenuItemClick = (action) => {
        // Aquí puedes realizar acciones según la opción seleccionada
        console.log('Opción seleccionada:', action)

        // Cerrar el menú
        handleMenuClose()
    }

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bg: 'red' }} aria-label="recipe">
                            H
                        </Avatar>
                    }
                    action={
                        <>
                            <IconButton aria-label="settings" onClick={handleMenuClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={menuAnchorEl}
                                open={Boolean(menuAnchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Enviar a SUNAT</MenuItem>
                                <MenuItem onClick={handleClose}>Descargar Archivo</MenuItem>
                            </Menu>
                        </>

                    }
                    title="Historial de Ventas"
                    subheader="Ingrese informacion del cliente"
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo de Comprobante</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="comprobante" // Nombre del campo en filter
                                    value={filter.comprobante}
                                    label="Tipo de Comprobante"
                                    onChange={handleChange}
                                >
                                    {
                                        comprobantes.map((row, index) => (
                                            <MenuItem key={index} value={row.code}>{row.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic1" label="Cliente" name="cliente" variant="outlined" value={filter.cliente} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="outlined-basic2" type="date" name="init" label="Inicio" value={filter.init} variant="outlined" onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="outlined-basic3" type="date" name="end" label="Termino" value={filter.end} variant="outlined" onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'center', mt: 1 }}>
                            <Fab color="primary"  variant="extended" onClick={getHistory}>
                                <SearchIcon />&nbsp;
                                Buscar
                            </Fab>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={140}>Fecha</TableCell>
                            <TableCell align="center">Cliente</TableCell>
                            <TableCell width={100} align="left">Serie</TableCell>
                            <TableCell width={100} align="left">Monto</TableCell>
                            <TableCell width={100} align="left">Estado</TableCell>
                            <TableCell width={100} align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.length > 0 &&
                            data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{moment(row.fecha).format("DD-MMM YYYY hh:mm a")} </TableCell>
                                    <TableCell align="left">{row.paterno} {row.materno} {row.nombres} </TableCell>
                                    <TableCell align="left">{row.serie}-{row.correlativo}</TableCell>
                                    <TableCell align="left">{row.monto}</TableCell>
                                    <TableCell align="center">
                                        <CheckIcon  color="success"/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="settings" onClick={handleMenuOpen}>
                                            <MoreVertIcon  />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => navigate(`/comprobante/${row.id}`) }>Ver detalles</MenuItem>
                                            {/* <MenuItem onClick={() => handleMenuItemClick('Opción 2')}>Descargar PDF</MenuItem>
                                            <MenuItem onClick={() => handleMenuItemClick('Opción 3')}>Descargar XML</MenuItem>
                                            <MenuItem onClick={() => handleMenuItemClick('Opción 4')}>Descargar CDR</MenuItem>
                                            <MenuItem onClick={() => handleMenuItemClick('Opción 5')}>Anular</MenuItem> */}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default historyMain