import { useEffect, useState } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"


import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuProduct from "./menuProduct";
import Api from './../../../utils/query/api';

import { useNavigate } from "react-router-dom";
import Loading from "core/utils/components/Loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const Services = () => {

    const navigate = useNavigate();

    const [age, setAge] = useState('10');
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(false)

    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.GetServicios()
            if (response)
                setProducts(response.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
        await setLoad(false)
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    }

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setMenuAnchorEl(null)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 160, headerAlign: 'center', align: 'center' },
        {
            field: 'material',
            headerName: 'DESCRIPCIÓN',
            flex: 1,
        },
        {
            field: 'unidad_nombre',
            headerName: 'UNIDAD',
            width: 150,
        },
        {
            field: 'categoria_nombre',
            headerName: 'CATEGORIA',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                const { row } = params
                const ids = row['id']
                return (
                    <>
                       <MenuProduct  data={row}/>
                    </>
                );
            },
        }
    ];


    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Servicios"
                    subheader="Lista completa de servicios"
                    avatar={
                        <Avatar aria-label="recipe">
                            S
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/almacen/servicios/nuevo"); }}>
                            Añadir Servicio
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField id="outlined-basic" label="Producto" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
                        </Grid>
                        <Grid item xs={5} sx={{ textAlign: 'right' }}>
                            <FormControl sx={{ width: 180 }}>
                                <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Marca"
                                    onChange={handleChange}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={10}>Todos</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {
                load &&
                <Loading />
            }
            {
                !load &&
                <DataGrid
                    sx={{ background: 'white', mt: 3 }}
                    rows={products}
                    columns={columns}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 12,
                            },
                        },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    disableRowSelectionOnClick
                />
            }
        </>
    )
}
export default Services