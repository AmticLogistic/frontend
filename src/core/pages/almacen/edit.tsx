import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useParams } from 'react-router-dom'
import { getAssetPath } from "./../../../app/utils/appHelpers"
import { ASSET_IMAGES } from "./../../../app/utils/constants/paths"

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import Swal from 'sweetalert2'
import EditIcon from '@mui/icons-material/Edit'
import Autocomplete from '@mui/material/Autocomplete'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AddIcon from '@mui/icons-material/Add'

import Batch from './batch'

interface Option {
    nombre: string;
    id: number;
}

const editProduct = () => {

    const { id } = useParams();

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState<Option | null>(null);

    const [providers, setProviders] = useState([])
    const [provider, setProvider] = useState('0')
    const [product, setProduct] = useState('')
    const [code, setCode] = useState('')
    const [zone, setZone] = useState('')
    const [description, setDescription] = useState('')
    const [brachs, setBrachs] = useState([])

    const [si, setSi] = useState(0)
    const [pc, setPc] = useState(0)
    const [pv, setPv] = useState(0)
    const [pm, setPm] = useState(0)

    const [open, setOpen] = useState(false)

    const handleChangeProv = (event: SelectChangeEvent) => {
        setProvider(event.target.value);
    }

    useEffect(() => {

        async function fetchCategory() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/config/listCategorias`);
                const resProviders = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/listProvider`);
                const result3 = await resProviders.json();
                if (result3)
                    setProviders(result3.data)
                const data = await response.json();
                if (data)
                    setCategories(data.data)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchProduct()
        fetchCategory()
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/oneProducto/${id}`);
            const box = await response.json();
            if (box && box.data) {
                setCode(box.data.producto.codigo)
                setZone(box.data.producto.zone)
                setProduct(box.data.producto.nombre)
                setCategory(box.data.producto.marcas_id)
                setDescription(box.data.producto.descripcion)
                setBrachs(box.data.lotes)
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    const editProduct = async () => {
        let data = {
            id: id,
            codigo: code,
            zone: zone,
            descripcion: description,
            marcas_id: category.id,
            nombre: product,
            estado: null
        }
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/updateProducto`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (result)
            Swal.fire('Exito', 'Producto editado exitosamente.', 'success')
    }

    const saveLote = async (idLote: number = 0) => {
        let data = {
            id: idLote,
            provider_id:provider,
            precioCompra: pc,
            precioMayor: pm,
            precioVenta: pv,
            productos_id: id,
            stockIngreso: si
        }
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/addLote`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (result) {
            Swal.fire('Exito', 'Lote añadido exitosamente.', 'success')
            await fetchProduct()
        }

    }
    const createLote = (state: boolean) => {
        setOpen(state)
    }
    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            P
                        </Avatar>
                    }
                    action={
                        <Button variant="contained"
                            onClick={editProduct}
                            startIcon={<EditIcon />}
                            disabled={!code || !category || !product || !description}>
                            Editar
                        </Button>
                    }
                    title="Edicion de productos"
                    subheader="Completa los campos para registrar un producto"
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{ p: 4, textAlign: 'center' }}>
                            <img src={getAssetPath(`${ASSET_IMAGES}/orden.png`, "100x100")} alt="" style={{ width: 210, height: 'auto' }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Codigo" value={code} variant="outlined" fullWidth onChange={(e) => { setCode(e.target.value) }} />
                                </Grid>
                                <Grid item xs={6}>
                                {
                                        categories && categories.length > 0 &&
                                        <Autocomplete
                                            onChange={(_, newValue) => {setCategory(newValue)}}
                                            options={categories}
                                            getOptionLabel={(option) => option.nombre}
                                            renderInput={(params) => <TextField {...params} label="Buscar" />}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <span>{option.nombre}</span>
                                                </li>
                                            )}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField id="outlined-basic" label="Zona" variant="outlined" value={zone} fullWidth onChange={(e) => { setZone(e.target.value) }} />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField id="outlined-basic" label="Producto" variant="outlined" value={product} fullWidth onChange={(e) => { setProduct(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Descripcion" variant="outlined" value={description} fullWidth multiline rows={4} onChange={(e) => { setDescription(e.target.value) }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {
                brachs && brachs.length == 0 &&
                <h4>No se encontraron lotes.</h4>
            }
            {
                brachs && brachs.length > 0 &&
                <Batch list={brachs} setOpen={createLote} />
            }


            <Dialog
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Nuevo Lote de productos"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={provider}
                                        label="Proveedor"
                                        onChange={handleChangeProv}
                                    >
                                        <MenuItem value={'0'}>Seleccione un proveedor</MenuItem>
                                        {
                                            providers.map((prov, key) => (
                                                <MenuItem key={`${key}-provider`} value={prov.id}>{prov.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ p: 4, textAlign: 'center' }}><br />
                                <TextField id="outlined-basic" type='number' label="Stock Ingresado" value={si} variant="outlined" fullWidth onChange={(e) => { setSi(parseInt(e.target.value)) }} />
                            </Grid>
                            <Grid item xs={4} sx={{ p: 4, textAlign: 'center' }}>
                                <TextField id="outlined-basic" type='number' label="Precio Compra" value={pc} variant="outlined" fullWidth onChange={(e) => { setPc(parseInt(e.target.value)) }} />
                            </Grid>
                           
                            <Grid item xs={4} sx={{ p: 4, textAlign: 'center' }}>
                                <TextField id="outlined-basic" type='number' label="Precio Mayor" value={pm} variant="outlined" fullWidth onChange={(e) => { setPm(parseInt(e.target.value)) }} />
                            </Grid>
                            <Grid item xs={4} sx={{ p: 4, textAlign: 'center' }}>
                                <TextField id="outlined-basic" type='number' label="Precio Venta" value={pv} variant="outlined" fullWidth onChange={(e) => { setPv(parseInt(e.target.value)) }} />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => { setOpen(false) }}>Cerrar</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant='contained' onClick={() => { setOpen(false); saveLote() }} autoFocus>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default editProduct