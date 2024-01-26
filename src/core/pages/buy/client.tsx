import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Avatar, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Fab from '@mui/material/Fab'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'

const Client = ({ setInfo }: any) => {

    const [client, setClient] = useState({
        typeDocument: '03',
        document: '',
        client: '',
        direction: '',
        phone: '',
        note: '',
        personas_id: 0,
        empresa_id: 1,
        serie: "BES1",
        tipoPago_id: 1
    })

    const comprobantes = [
        { code: '01', name: 'Factura Electronica', serie: 'FES1' },
        { code: '03', name: 'Boleta Electronica', serie: 'BES1' },
        { code: '10', name: 'Proforma', serie: 'PFS1' },
        { code: '20', name: 'Nota de pedido', serie: 'NPS1' }
    ]

    const handleChange = async (event) => {
        for (let x in comprobantes) {
            if (event.target.value == comprobantes[x].code) {
                const updatedClient = { ...client, serie: comprobantes[x].serie, typeDocument: event.target.value }
                await setClient(updatedClient)
                await setInfo(updatedClient)
                break;
            }
        }

    }
    const handleChangeDocument = async (event) => {
        const updatedClient = { ...client, document: event.target.value }
        await setClient(updatedClient)
        await setInfo(updatedClient)
    }

    const handleChangeClient = async (event) => {
        const updatedClient = { ...client, client: event.target.value }
        await setClient(updatedClient)
        await setInfo(updatedClient)
    }

    const handleChangeDirection = async (event) => {
        const updatedClient = { ...client, direction: event.target.value }
        await setClient(updatedClient)
        await setInfo(updatedClient)
    }

    const handleChangePhone = async (event) => {
        const updatedClient = { ...client, phone: event.target.value }
        await setClient(updatedClient)
        await setInfo(updatedClient)
    }

    const handleChangeNote = async (event) => {
        const updatedClient = { ...client, note: event.target.value }
        await setClient(updatedClient)
        await setInfo(updatedClient)
    }

    const getClient = async () => {
        try {
            const response = await fetch(`https://zbackend.d-todoimports.com/api/config/buscarCliente/${client.typeDocument}/${client.document}`)
            if (!response.ok) {
                alert('Hubo un problema al obtener los datos del cliente. Verifique los datos del DNI')
                return
            }

            const data = await response.json()
            if (data && data.data) {
                const updatedClient = {
                    ...client,
                    client: data.data['nombresCompletos'] ?? "-",
                    direction: data.data['direccion'] !== "" ? data.data['direccion'] : "-",
                    phone: data.data['telefono'] ?? "-",
                    personas_id: data.data['id'] ?? 0
                }
                await setClient(updatedClient)
                await setInfo(updatedClient)
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error)
        }
    }

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bg: 'red' }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Cliente"
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
                                    value={client.typeDocument}
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
                            {
                                client.typeDocument == '01' &&
                                <>
                                    <TextField id="outlined-basic" label="RUC" variant="outlined" onChange={handleChangeDocument} fullWidth />
                                </>
                            }
                            {
                                client.typeDocument != '01' &&
                                <>
                                    <TextField id="outlined-basic" label="Documento" variant="outlined" onChange={handleChangeDocument} fullWidth />
                                </>
                            }

                        </Grid>
                        <Grid item xs={1} sx={{ textAlign: 'center', mt: 1 }}>
                            <Fab color="primary" aria-label="SearchIcon" size="small" onClick={getClient}>
                                <SearchIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField id="outlined-basic1" label="Cliente" value={client.client} variant="outlined" onChange={handleChangeClient} fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField id="outlined-basic2" label="Direccion" value={client.direction} variant="outlined" onChange={handleChangeDirection} fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic3" label="Telefono" value={client.phone} variant="outlined" onChange={handleChangePhone} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic4" label="Nota" value={client.note} variant="outlined" onChange={handleChangeNote} fullWidth />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </>
    )
}
export default Client