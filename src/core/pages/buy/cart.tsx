import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LoadingButton from '@mui/lab/LoadingButton'
import utils from './../../utils/infoUser'
import Swal from 'sweetalert2'

const Cart = ({ setCart }: any) => {

    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])
    const [code, setCode] = useState('')
    const [totals, setTotals] = useState({
        subtotal: '0',
        igv: '0',
        total: '0',
    })

    useEffect(() => {
        console.log(data);
        calculateTotal();
    }, [data]);

    const getData = async () => {
        try {
            await setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/venta/getCart/${code}`);
            const data = await response.json();
            if (data) {
                addToCart(data.data)
            }
            await setLoad(false)
        } catch (error) {
            await setLoad(false)
            console.error('Error al obtener los datos:', error);
        }
    }

    const handleChange = (event: any) => {
        setCode(event.target.value)
    }

    const addToCart = async (product: any) => {
        if (product && product.length > 0) {
            let firstProduct = product[0];
            firstProduct.pu = product[0].precioVenta
            firstProduct.subtotal = product[0].precioVenta
            firstProduct.unitario = product[0].precioVenta
            firstProduct.series = []
            const existingProductIndex = data.findIndex(item => item.codigo === firstProduct.codigo);

            if (existingProductIndex !== -1) {
                const newData = data.map((item, index) => {
                    if (index === existingProductIndex) {
                        const newCantidad = item.cantidad + 1
                        const newSubtotal = newCantidad * item.pu
                        if (product[0].serie) {
                            item.series.push(code)
                        }
                        return { ...item, cantidad: newCantidad, subtotal: newSubtotal, unitario: product[0].precioVenta };
                    } else {
                        return item;
                    }
                });
                await setData(newData);
            } else {
                firstProduct.cantidad = 1
                if (product[0].serie) {
                    firstProduct.series.push(code)
                }
                await setData([firstProduct, ...data]);
            }
        }
        await setCode("")
    }

    const calculateTotal = async () => {
        const infoUser = await utils.GetInfoUser()
        if (infoUser) {
            let total = 0;
            data.forEach((row) => {
                total += parseFloat(row.subtotal); // Convierte a número antes de sumar
            });

            const igv = total * 0.18;
            const subtotal = total - igv;
            const box = {
                detalles: data,
                gravado: subtotal.toFixed(2),
                igv: igv.toFixed(2),
                invertido: 0,
                pago: total.toFixed(2),
                total: total.toFixed(2), // Mantenemos esto como una cadena de texto
                user_id: infoUser.id,
                vuelto: 0
            }
            let temp = {
                total: total.toFixed(2), // Mantenemos esto como una cadena de texto
                igv: igv.toFixed(2),
                subtotal: subtotal.toFixed(2),
            }
            await setTotals(temp)
            await setCart(box)
        }
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" value={code} label="Codigo o Serie" variant="outlined" onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'center' }}>
                            <LoadingButton loading={load} variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} onClick={getData}>
                                Agregar
                            </LoadingButton >
                        </Grid>
                    </Grid>

                    <TableContainer sx={{ mt: 3 }}>
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
                                    data.length > 0 &&
                                    data.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.cantidad}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.nombre} <br />
                                                {
                                                    row.series &&
                                                    row.series.map((s, ks) => (
                                                        <b key={'serie' + ks}>'{s}' </b>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell align="right">S/ {row.pu}</TableCell>
                                            <TableCell align="right">S/ {row.subtotal}</TableCell>
                                        </TableRow>
                                    ))}
                                {
                                    data.length > 0 &&
                                    <>
                                        <TableRow>
                                            <TableCell sx={{ p: 1 }} align="right" style={{ border: 'none' }} colSpan={2}></TableCell>
                                            <TableCell sx={{ p: 1 }} align="right" >Sub Total</TableCell>
                                            <TableCell sx={{ p: 1 }} align="right">S/ {totals.subtotal}</TableCell>
                                        </TableRow >
                                        <TableRow>
                                            <TableCell sx={{ p: 1 }} align="right" style={{ border: 'none' }} colSpan={2}></TableCell>
                                            <TableCell sx={{ p: 1 }} align="right" >IGV</TableCell>
                                            <TableCell sx={{ p: 1 }} align="right">S/ {totals.igv}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ p: 1 }} align="right" style={{ border: 'none' }} colSpan={2}></TableCell>
                                            <TableCell sx={{ p: 1 }} align="right" >Total</TableCell>
                                            <TableCell sx={{ p: 1 }} align="right"><strong style={{ fontSize: 21 }}> S/ {totals.total}</strong></TableCell>
                                        </TableRow>
                                    </>
                                }

                                {
                                    data.length == 0 &&
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
        </>
    )
}
export default Cart