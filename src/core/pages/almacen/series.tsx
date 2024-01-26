import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Swal from 'sweetalert2'

import QrCode2Icon from '@mui/icons-material/QrCode2';

const Series = ({ list }: any) => {

    const [lote, setLote] = useState("0")
    const [code, setCode] = useState("")
    const [load, setLoad] = useState(false)

    const [codes, setCodes] = useState([])

    const getCodes = async (e: any) => {
        try {
            setLote(e)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/allSerie/${e}`);
            const data = await response.json();
            if (data)
                setCodes(data.data)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }
    const saveCode = async () => {
        let data = {
            codigo: code,
            lote_id: lote,
            estado: 1
        }
        await setLoad(true)
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/addSerie`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (result) {
            await setCode("")
            Swal.fire('Exito', 'Lote añadido exitosamente.', 'success')
            await getCodes(lote)
        }
        await setLoad(false)

    }

    const deleteSerie = async (idSerie) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Deseas eliminar la serie.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then( async (result) => {
            if (result.isConfirmed) {
                const result = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/deleteSerie/${idSerie}`);
                if (result) {
                    Swal.fire('Exito!', 'Serie eliminada permanentemente.', 'success' )
                    await getCodes(lote)
                }
            }
        })
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lote</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lote}
                            label="Lote"
                            sx={{ mb: 3 }}
                            onChange={(e) => { getCodes(e.target.value) }}
                        >
                            <MenuItem value={"0"}>Seleciona</MenuItem>
                            {list.map((row, key) => (
                                <MenuItem key={`${key}-Lote`} value={row.id}>{row.id}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" value={code} autoFocus label="Codigo" sx={{ mb: 1 }} variant="outlined" fullWidth onChange={(e) => { setCode(e.target.value) }} />
                </Grid>
            </Grid>
            <LoadingButton loading={load} variant="contained" disabled={!lote || !code || lote == "0"} onClick={saveCode} fullWidth>Guardar</LoadingButton> <br /><br />
            <Divider>Todas las Series ({codes.length})</Divider>
            <List>
                {
                    codes && codes.map((code, key) => (
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <QrCode2Icon color='primary' />
                            </ListItemIcon>
                            <ListItemText primary={code.codigo} />
                            <ListItemIcon>
                                <DeleteIcon color='error' onClick={(e)=>{deleteSerie(code.id)}} />
                            </ListItemIcon>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}

export default Series