import { useEffect, useState } from "react";
import { Avatar, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import Swal from 'sweetalert2'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Api from './../../../utils/query/api'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import Loading from "core/utils/components/Loading";

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")

    const [load, setLoad] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.GetCategorias()
            if (response)
                setCategories(response.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
        await setLoad(false)
    };

    const saveData = async () => {
        let data = {
            id:id,
            nombre: name,
            estado: 1
        }
        const response = await Api.SaveCategorias(data)
        if (response) {
            Swal.fire('Exito!', 'Categoria creada exitosamente.', 'success')
            fetchData()
            setId(0)
            setName("")
        } else {
            Swal.fire('Alerta', 'No se pudo registrar la categoria.', 'error')
        }


    }

    const deleteData = async (row) => {
        const data = {
            id: row.id,
            nombre: row.categoria,
            estado: 0
        }
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras el elemento de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.EditCategorias(data)
                if (response) {
                    Swal.fire('Exito!', 'Categoria modificada exitosamente.', 'success')
                    fetchData()
                } else {
                    Swal.fire('Alerta', 'No se pudo modificar la categoria.', 'error')
                }
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 160, headerAlign: 'center', align: 'center' },
        {
            field: 'categoria',
            headerName: 'Categoria',
            flex: 1,
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
                console.log(row['categoria'])
                return (
                    <>
                        <Button variant="contained" color="info" onClick={() => { setId(row['id']);setName(row['categoria']) }}>
                            <EditIcon fontSize="small" />
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="error" onClick={(e) => { deleteData(ids) }}>
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </>
                );
            },
        }
    ];


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title="Categoria"
                            subheader="Formulario categorias"
                            avatar={
                                <Avatar aria-label="recipe">
                                    C
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <TextField id="outlined-basic2" label="Categoria" variant="outlined" fullWidth value={name} onChange={(e) => { setName(e.target.value) }} /><br /><br />
                            <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} disabled={!name} onClick={saveData}>
                                Guardar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            title="Lista de Categorias"
                            subheader="Lista completa de categorias"
                            avatar={
                                <Avatar aria-label="recipe">
                                    L
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent>
                            {
                                load &&
                                <Loading />
                            }
                            {
                                !load &&
                                <DataGrid
                                    sx={{ background: 'white', mt: 3 }}
                                    rows={categories}
                                    columns={columns}
                                    autoHeight
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 20,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[20, 50, 100]}
                                    disableRowSelectionOnClick
                                />
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
export default Categories