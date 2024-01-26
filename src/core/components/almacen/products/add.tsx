import { useEffect, useState } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddIcon from '@mui/icons-material/Add';
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import Loading from "core/utils/components/Loading";

const AddProduct = () => {

    const { id } = useParams<{ id: string }>();

    const [category, setCategory] = useState('0')
    const [brand, setbrand] = useState('0')
    const [unid, setUnid] = useState('0')

    const [categories, setCategories] = useState([])
    const [brands, setbrands] = useState([])
    const [unids, setUnids] = useState([])
    const [name, setName] = useState("")
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchData();
        if (id)
            getData()
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.GetUtils()
            if (response) {
                setbrands(response.data.marcas)
                setCategories(response.data.categorias)
                setUnids(response.data.unidades)
            }

        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    const getData = async () => {
        try {
            await setLoad(true)
            const response = await Api.oneMaterial(id)
            if (response) {
                setName(response.data.material)
                setUnid(response.data.Unidades_id)
                setbrand(response.data.Marcas_id)
                setCategory(response.data.Categorias_id)
            }
            await setLoad(false)

        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    const handleChangec = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    }

    const handleChangeb = (event: SelectChangeEvent) => {
        setbrand(event.target.value as string);
    }

    const handleChangeu = (event: SelectChangeEvent) => {
        setUnid(event.target.value as string);
    }

    const saveData = async () => {
        const data = {
            id: id,
            nombre: name,
            codigo: "-",
            ficha: "-",
            imagen: "-",
            marca: brand,
            unidad: unid,
            categoria: category,
        }
        const response = await Api.SaveMateriale(data)
        if (response) {
            setCategory("")
            setbrand("")
            setUnid("")
            setName("")
            Swal.fire('Exito!', 'Material agregado exitosamente.', 'success')

        }
    }

    return (
        <>
            {
                load &&
                <Loading />
            }
            {
                !load &&
                <Card>
                    <CardHeader
                        title={parseInt(unid) == 16 ? "Servicio" : "Material"}
                        subheader="Registrar producto en el almacén"
                        avatar={
                            <Avatar aria-label="recipe">
                                P
                            </Avatar>
                        }
                    ></CardHeader>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField id="outlined-basic" label="Nombre de producto" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} fullWidth />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label1">Categoria</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={category}
                                                label="Categoria"
                                                onChange={handleChangec}
                                                sx={{ textAlign: 'center' }}
                                            >
                                                {
                                                    categories &&
                                                    categories.map((row) => (
                                                        <MenuItem key={'cat' + row.id} value={row.id}>{row.categoria}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {
                                        parseInt(unid) != 16 &&
                                        <Grid item xs={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label1">Marca</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={brand}
                                                    label="Marca"
                                                    onChange={handleChangeb}
                                                    sx={{ textAlign: 'center' }}
                                                >
                                                    {
                                                        brands &&
                                                        brands.map((row) => (
                                                            <MenuItem key={'mar' + row.id} value={row.id}>{row.marca}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    }

                                    <Grid item xs={4}>
                                        <FormControl fullWidth disabled={parseInt(unid) == 16}>
                                            <InputLabel id="demo-simple-select-label1">Unidad</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={unid}
                                                label="Unidad"
                                                onChange={handleChangeu}
                                                sx={{ textAlign: 'center' }}
                                            >
                                                {
                                                    unids &&
                                                    unids.map((row) => (
                                                        <MenuItem key={'und' + row.id} value={row.id}>{row.unidad}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} disabled={!name || !unid || !category} onClick={saveData}>
                                            Guardar Producto
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                <AddAPhotoIcon fontSize="large" sx={{ fontSize: 80, color: '#D9D9D9' }} /> <br />
                                <Button variant="text" sx={{ mt: 1 }} startIcon={<AddIcon />} size="small">
                                    Cargar Foto
                                </Button>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            }

        </>
    )
}

export default AddProduct