import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Autocomplete from '@mui/material/Autocomplete'
import { getAssetPath } from "./../../../app/utils/appHelpers"
import { ASSET_IMAGES } from "./../../../app/utils/constants/paths"

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import Swal from 'sweetalert2'

interface Option {
    nombre: string;
    id: number;
}

const createProduct = () => {

    const [saving, setSaving] = useState(false)

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState<Option | null>(null);


    const [providers, setProviders] = useState([])
    const [provider, setProvider] = useState('0')
    const [lines, setLines] = useState([])
    const [line, setLine] = useState('0')

    const [zone, setZone] = useState("")
    const [product, setProduct] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')

    const [stock, setStock] = useState('0')
    const [pc, setPc] = useState('0')
    const [pv, setPv] = useState('0')
    const [pm, setPm] = useState('0')

    const handleChangeProv = (event: SelectChangeEvent) => {
        setProvider(event.target.value);
    };
    const handleChange2 = (event: SelectChangeEvent) => {
        setLine(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const resCategories = await fetch(`${process.env.REACT_APP_API_URL}/api/config/listCategorias`);
                const resLines = await fetch(`${process.env.REACT_APP_API_URL}/api/config/listLines`);
                const resProviders = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/listProvider`);
                const result1 = await resCategories.json()
                const result2 = await resLines.json();
                const result3 = await resProviders.json();
                if (result1)
                    setCategories(result1.data)
                if (result2)
                    setLines(result2.data)
                if (result3)
                    setProviders(result3.data)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, []);

    const saveProduct = async () => {
        let data = {
            codigo: code,
            descripcion: description,
            marca_id: category.id,
            line: line,
            nombre: product,
            zone: zone,
            precio_compra: pc,
            precio_mayor: pm,
            precio_venta: pv,
            stock: stock,
            stock_min: 10,
            provider_id: provider
        }
        console.log(data)
        /*
        await setSaving(true)
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/saveProducto`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (result) {
            Swal.fire('Exito', 'Producto agregado exitosamente.', 'success')
            clear()
        }
        await setSaving(false)
        */
    }
    const clear = () => {
        setCategory(null)
        setLine('')
        setProduct('')
        setCode('')
        setDescription('')
        setStock('0')
        setPc('0')
        setPv('0')
        setPm('0')
    }

    const handleChange = (event, newValue) => {
        console.log(newValue);
        if (newValue) {
            console.log('Selected category:', newValue.id);
        }
    };

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            P
                        </Avatar>
                    }
                    title="Registro de productos"
                    subheader="Completa los campos para registrar un producto"
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{ p: 4, textAlign: 'center' }}>
                            <img src={getAssetPath(`${ASSET_IMAGES}/orden.png`, "100x100")} alt="" style={{ width: 210, height: 'auto' }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Codigo" value={code} variant="outlined" fullWidth onChange={(e) => { setCode(e.target.value) }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Linea</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select1"
                                            value={line}
                                            label="Linea"
                                            onChange={handleChange2}
                                        >
                                            <MenuItem value={'0'}>Seleccione una Linea</MenuItem>
                                            {
                                                lines.map((lin, key) => (
                                                    <MenuItem key={key} value={lin.id}>{lin.nombre}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
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
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Zona" value={zone} variant="outlined" fullWidth onChange={(e) => { setZone(e.target.value) }} />
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField id="outlined-basic" label="Producto" value={product} variant="outlined" fullWidth onChange={(e) => { setProduct(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Descripcion" value={description} variant="outlined" fullWidth multiline rows={4} onChange={(e) => { setDescription(e.target.value) }} />
                                </Grid>
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
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Stock" value={stock} variant="outlined" fullWidth onChange={(e) => { setStock((e.target.value)) }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Precio Compra" value={pc} variant="outlined" fullWidth onChange={(e) => { setPc((e.target.value)) }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Precio Mayor" value={pm} variant="outlined" fullWidth onChange={(e) => { setPm((e.target.value)) }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Precio Venta" value={pv} variant="outlined" fullWidth onChange={(e) => { setPv((e.target.value)) }} />
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                            <LoadingButton
                                variant="contained"
                                sx={{ mt: 5 }}
                                onClick={saveProduct}
                                loading={saving}
                                disabled={!code || !category || !product || !description}>
                                Guardar Producto
                            </LoadingButton>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>
    )
}
export default createProduct