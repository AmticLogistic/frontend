import { Card, CardContent, CardHeader, Avatar, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, Fab, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

const ticket = () => {

    const { id } = useParams(); 

    const [comprobante, setComprobante] = useState(null);

    useEffect(() => {
        // Realiza la solicitud a la API al iniciar el componente
        fetch(process.env.REACT_APP_API_URL +'/api/venta/getComprobante/' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setComprobante(data.data);
            })
            .catch((error) => {
                console.error('Error al obtener el comprobante:', error);
            });
    }, []);

    const printDocument = (type: Number) => {
        let url = '';

        switch (type) {
            case 1:
                url = process.env.REACT_APP_API_URL + '/api/export/comprobante/' + id;
                break;
            case 2:
                url = process.env.REACT_APP_API_URL + '/api/export/getComprobanteA4/' + id;
                break;
            case 3:
                url = process.env.REACT_APP_API_URL + '/api/export/getCartaGarantia/' + id;
                break;
            default:
                // Si el valor no coincide con ninguno de los casos, no se abrirá ninguna URL.
                return;
        }

        // Abre la URL en una nueva pestaña del navegador.
        window.open(url, '_blank');
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
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </>

                    }
                    title="Comprobante de Venta"
                    subheader="Información del comprobante registrado"
                />
                <CardContent>
                    {
                        comprobante &&
                        <table>
                            <tr>
                                <th style={{ textAlign: 'right', fontWeight: 400 }}>Fecha : </th>
                                <td>&nbsp;&nbsp;{comprobante.fecha}</td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'right', fontWeight: 400 }}>Comprobante : </th>
                                <td>&nbsp;&nbsp;{`${comprobante.serie}-${comprobante.correlativo}`}</td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'right', fontWeight: 400 }}>Cliente : </th>
                                <td>&nbsp;&nbsp;{`${comprobante.nombres} ${comprobante.paterno}  ${comprobante.materno}`}</td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'right', fontWeight: 400 }}>Documento : </th>
                                <td>&nbsp;&nbsp;{comprobante.documento}</td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'right', fontWeight: 400 }}>Dirección  : </th>
                                <td>&nbsp;&nbsp;{comprobante.direccion}</td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'right', fontWeight: 400 }}>Nota : </th>
                                <td>&nbsp;&nbsp;{comprobante.nota}</td>
                            </tr>
                        </table>
                    }

                </CardContent>
            </Card>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Fab variant="extended" color="primary" onClick={(e) => { printDocument(1) }}>
                        <LocalPrintshopIcon sx={{ mr: 1 }} />
                        Imprimir ticket
                    </Fab>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Fab variant="extended" color="primary" onClick={(e) => { printDocument(2) }}>
                        <LocalPrintshopIcon sx={{ mr: 1 }} />
                        Imprimir A4
                    </Fab>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Fab variant="extended" color="primary" onClick={(e) => { printDocument(3) }}>
                        <LocalPrintshopIcon sx={{ mr: 1 }} />
                        Carta de Garantia
                    </Fab>
                </Grid>
            </Grid>
            {
                comprobante &&
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <TableContainer>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Cant.</TableCell>
                                        <TableCell align="left">Descripción</TableCell>
                                        <TableCell align="right">P/U</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        comprobante.detalles.length > 0 &&
                                        comprobante.detalles.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.cantidad}
                                                </TableCell>
                                                <TableCell align="left">{row.nombre}</TableCell>
                                                <TableCell align="right">S/ {row.precio}</TableCell>
                                                <TableCell align="right">S/ {row.subtotal}</TableCell>
                                            </TableRow>
                                        ))}
                                    {
                                        comprobante.detalles.length > 0 &&
                                        <>
                                            <TableRow>
                                                <TableCell sx={{ p: 1 }} align="right" style={{ border: 'none' }} colSpan={2}></TableCell>
                                                <TableCell sx={{ p: 1 }} align="right" >Gravado</TableCell>
                                                <TableCell sx={{ p: 1 }} align="right">S/ {comprobante.gravado}</TableCell>
                                            </TableRow >
                                            <TableRow>
                                                <TableCell sx={{ p: 1 }} align="right" style={{ border: 'none' }} colSpan={2}></TableCell>
                                                <TableCell sx={{ p: 1 }} align="right" >IGV</TableCell>
                                                <TableCell sx={{ p: 1 }} align="right">S/ {comprobante.igv}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ p: 1 }} align="right" style={{ border: 'none' }} colSpan={2}></TableCell>
                                                <TableCell sx={{ p: 1 }} align="right" >Total</TableCell>
                                                <TableCell sx={{ p: 1 }} align="right"><strong style={{ fontSize: 21 }}> S/ {comprobante.monto}</strong></TableCell>
                                            </TableRow>
                                        </>
                                    }

                                    {
                                        comprobante.length == 0 &&
                                        <TableRow
                                            key={'key'}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center" colSpan={4} sx={{ p: 3 }}>
                                                Carrito vacio
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            }
        </>
    )
}
export default ticket