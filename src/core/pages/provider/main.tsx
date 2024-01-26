import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Chip from '@mui/material/Chip'
import Empty from 'core/utils/components/Empty'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CategoryIcon from '@mui/icons-material/Category'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'

const Provider = () => {

    const navigate = useNavigate()

    const [rows, setRows] = useState([])
    const [load, setLoad] = useState(false)

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/listProvider`);
                const data = await response.json();
                setLoad(false)
                if (data)
                    setRows(data.data)

            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, []);

    const getData = async () => {
        try {
            setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/listProvider`);
            const data = await response.json();
            setLoad(false)
            if (data)
                setRows(data.data)

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    const saveCategory = async () => {
        const data = {
            nombre: name,
            direccion: address,
            telefono: phone,
            estado: 1,
        }
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/saveProvider`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (result) {
            Swal.fire('Exito', 'Categoria agregada.', 'success')
            await getData()
        }
    }
    const deleteCategory = async (category) => {
        const data = {
            id: category.id,
            codigo: category.codigo,
            estado: 0,
            nombre: category.nombre
        }
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/editProvider`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (result) {
            Swal.fire('Exito', 'Categoria eliminada.', 'success')
            await getData()
        }
    }


    return (
        <>
            {

                load &&
                <Empty />
            }
            {
                !load &&
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx={{ width: 180 }}>Proveedor</TableCell>
                                            <TableCell align="center" sx={{ width: 120 }}>Telefono</TableCell>
                                            <TableCell align="left" >Dirección</TableCell>
                                            <TableCell align="center" sx={{ width: 100 }}></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, key) => (
                                            <TableRow
                                                key={`${key}-${row.codigo}`}
                                            >
                                                <TableCell align="center">{row.nombre}</TableCell>
                                                <TableCell align="left">{row.telefono}</TableCell>
                                                <TableCell align="left">{row.direccion}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => { deleteCategory(row) }} color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 18, mb: 5 }} color="text.secondary" gutterBottom>
                                        Crea una nuevo Proveedor
                                    </Typography>
                                    <TextField id="cod" label="Nombre de proveedor" variant="outlined" onChange={(e) => { setName(e.target.value) }} fullWidth sx={{ mb: 3 }} />
                                    <TextField id="name" label="Direccion" variant="outlined" onChange={(e) => { setAddress(e.target.value) }} fullWidth sx={{ mb: 3 }} />
                                    <TextField id="name" label="Telefono o Movil" variant="outlined" onChange={(e) => { setPhone(e.target.value) }} fullWidth sx={{ mb: 3 }} />           
                                </CardContent>
                                <CardActions>
                                    <Button variant='contained' disabled={!address || !name} startIcon={<CheckIcon />} sx={{ mb: 3 }} fullWidth onClick={saveCategory}>Crear</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                </>
            }
        </>
    )
}

export default Provider