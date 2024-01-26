
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Chip from '@mui/material/Chip'

import Series from './series'
import moment from 'moment';
moment.locale('es');

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Batch = ({ list, setOpen }: any) => {

    const addLote = async() => {
        await setOpen(true)
    }

    return (
        <>
            <Grid container spacing={1} sx={{ mt: 4 }}>
                <Grid item xs={8} sx={{ p: 4, textAlign: 'center' }}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                    L
                                </Avatar>
                            }
                            action={
                                <IconButton size="large" onClick={addLote}>
                                    <AddIcon fontSize="inherit" />
                                </IconButton>
                            }
                            title="Series"
                            subheader="Listar de series"
                        />
                        <CardContent>
                            <TableContainer>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width={80}>ID</TableCell>
                                            <TableCell align="right">Stock Actual</TableCell>
                                            <TableCell align="right">Stock Ingreso</TableCell>
                                            <TableCell align="right">Fecha Ingreso</TableCell>
                                            <TableCell align="right">Precio Compra</TableCell>
                                            <TableCell align="right">Precio Mayor</TableCell>
                                            <TableCell align="right">Precio Venta</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list.map((row, key) => (
                                            <TableRow
                                                key={`${key}-t`}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">
                                                    <Chip label={row.id} size="small" color="primary" />
                                                </TableCell>
                                                <TableCell align="right">{row.stockActual}</TableCell>
                                                <TableCell align="right">{row.stockIngreso}</TableCell>
                                                <TableCell align="right">{moment(row.fechaIngreso).format("DD/MM/YY")}</TableCell>
                                                <TableCell align="right">{row.precioCompra}</TableCell>
                                                <TableCell align="right">{row.precioMayor}</TableCell>
                                                <TableCell align="right">{row.precioVenta}</TableCell>
                                                <TableCell align="right">
                                                    {/* <IconButton color="success">
                                                        <BorderColorIcon fontSize="inherit" />
                                                    </IconButton> */}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                    S
                                </Avatar>
                            }
                            title="Series"
                            subheader="Listar de series"
                        />
                        <CardContent>
                            <Series list={list}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
export default Batch