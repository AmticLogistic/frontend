import { Avatar, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import Loading from "core/utils/components/Loading";

const Brand = () => {

    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [id, setId] = useState(0)

    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.GetMarcas()
            if (response)
                setData(response.data)
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
        const response = await Api.SaveMarcas(data)
        if (response) {
            Swal.fire('Exito!', 'Marca creada exitosamente.', 'success')
            fetchData()
            setName("")
        } else {
            Swal.fire('Alerta', 'No se pudo registrar la marca.', 'error')
        }


    }

    const deleteData = async (row) => {
        const data = {
            id: row.id,
            nombre: row.marca,
            estado: 0
        }
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras la de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.EditMarcas(data)
                if (response) {
                    Swal.fire('Exito!', 'Marca eliminada exitosamente.', 'success')
                    fetchData()
                } else {
                    Swal.fire('Alerta', 'No se pudo eliminada la marca.', 'error')
                }
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 160, headerAlign: 'center', align: 'center' },
        {
            field: 'marca',
            headerName: 'Marca',
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
                return (
                    <>
                        <Button variant="contained" color="info" onClick={() => { setId(row['id']);setName(row['marca']) }}>
                            <EditIcon fontSize="small" />
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="error" onClick={() => { deleteData(ids) }}>
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
                            title="Crea una Marca"
                            subheader="Formulario de marcas"
                            avatar={
                                <Avatar aria-label="recipe">
                                    C
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <TextField id="outlined-basic" label="Marca" variant="outlined" value={name} fullWidth onChange={(e) => { setName(e.target.value) }} /><br /><br />
                            <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} onClick={saveData}>
                                Guardar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            title="Lista de Marcas"
                            subheader="Lista completa de Marcas"
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
                                    rows={data}
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
export default Brand