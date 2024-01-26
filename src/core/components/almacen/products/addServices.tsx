import { useEffect, useState } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddIcon from '@mui/icons-material/Add';
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'

const AddServices = () => {


    const [category, setCategory] = useState('0')
    const [brand, setbrand] = useState('0')
    const [unid, setUnid] = useState('16')

    const [categories, setCategories] = useState([])
    const [brands, setbrands] = useState([])
    const [unids, setUnids] = useState([])

    const [name, setName] = useState("")

    useEffect(() => {
        fetchData();
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
    };

    const handleChangec = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    }

    const handleChangeb = (event: SelectChangeEvent) => {
        setbrand(event.target.value as string);
    }

    const handleChangeu = (event: SelectChangeEvent) => {
        setUnid(event.target.value as string);
    }

    const saveData = async () =>{
        const data = {
            nombre: name,
            codigo: "-",
            ficha: "-",
            imagen: "-",
            marca: brand,
            unidad: unid,
            categoria: category,
        }
        const response = await Api.SaveMateriale(data)
        if(response){
            setCategory("")
            setbrand("")
            setUnid("")
            setName("")
            Swal.fire('Exito!', 'Servicio agregado exitosamente.', 'success')
            
        }
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Nuevo Servicio"
                    subheader="Registrar nuevo Servicio"
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
                                    <TextField id="outlined-basic" label="Nombre de servicio" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label1">Unidad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={unid}
                                            label="Unidad"
                                            disabled
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
                                    <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} disabled={!name || !brand || !unid || !category } onClick={saveData}>
                                        Guardar Servicio
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
        </>
    )
}

export default AddServices