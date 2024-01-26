import { Avatar, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loading from "core/utils/components/Loading";
import LoadingButton from "@mui/lab/LoadingButton";
import { idID } from "@mui/material/locale";

const Costs = () => {

    const [data, setData] = useState([])
    const [name, setName] = useState("")

    const [load, setLoad] = useState(false)
    const [loadg, setLoadg] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.getCCostos()
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
            centroCostos: name,
            estado: 1
        }
        await setLoadg(true)
        const response = await Api.saveCCostos(data)
        if (response) {
            Swal.fire('Exito!', 'Marca creada exitosamente.', 'success')
            setId(0)
            fetchData()
            setName("")
        } else {
            Swal.fire('Alerta', 'No se pudo registrar la marca.', 'error')
        }
        await setLoadg(false)

    }

    const deleteData = async (row) => {
        const data = {
            id: row.id,
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
                const response = await Api.deleteCCostos(data)
                if (response) {
                    Swal.fire('Exito!', 'Marca eliminada exitosamente.', 'success')
                    setId(0)
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
            field: 'centroCosto',
            headerName: 'Centros de Costos',
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
                return (
                    <>
                        <Button variant="contained" color="info" onClick={() => { setId(row['id']);setName(row['centroCosto']) }}>
                            <EditIcon fontSize="small" />
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="error" onClick={() => { deleteData(row) }}>
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
                            title="Crea Centro de Costos"
                            subheader="Formulario de centro de costos"
                            avatar={
                                <Avatar aria-label="recipe">
                                    C
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <TextField id="outlined-basic" label="Centro de Costos" value={name} variant="outlined" fullWidth onChange={(e) => { setName(e.target.value) }} /><br /><br />
                            <LoadingButton loading={loadg} variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} onClick={()=>{saveData()}}>
                                Guardar
                            </LoadingButton>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            title="Lista de Centros de Costos"
                            subheader="Lista completa de Centros de Costos"
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
export default Costs