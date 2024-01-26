import { Avatar, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loading from "core/utils/components/Loading";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import moment from "moment";

const ListInventory = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState([])

    const [data, setData] = useState([])

    const [init, setInit] = useState(moment().startOf('month').format('YYYY-MM-DD'));
    const [end, setEnd] = useState(moment().format('YYYY-MM-DD'))

    const [load, setLoad] = useState(false)
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.listInventario(init, end)
            if (response)
                setData(response.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
        await setLoad(false)
    };

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleClickOpen = async (data: any) => {
        setDetails(data)
        setOpen(true);
    };

    const filteredData = data.filter((row) => {
        return (
            row.observacion.includes(filterText)
        )
    })

    const handleClose2 = () => {
        setOpen(false);
    }

    const deleteData = async (id) => {
        const data = {
            id: id,
            estado: 0
        }
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras el proveedor de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.deleteInventory(id)
                if (response) {
                    Swal.fire('Exito!', 'Inventario eliminada exitosamente.', 'success')
                    fetchData()
                } else {
                    Swal.fire('Alerta', 'No se pudo eliminada el inventario.', 'error')
                }
            }
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'code',
            headerName: 'ID',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            width: 120,
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'observacion',
            headerName: 'Titulo',
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
                        <Button variant="contained" color="info" onClick={() => { handleClickOpen(row['list']) }}>
                            <VisibilityIcon fontSize="small" />
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="error" onClick={() => { deleteData(row.id) }}>
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </>
                );
            },
        }
    ];


    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Inventarios/Almacen"
                    subheader="Lista Inventarios/Almacen"
                    avatar={
                        <Avatar aria-label="recipe">
                            L
                        </Avatar>
                    }
                    action={
                        <>

                            <Button
                                variant="contained"
                                sx={{ mt: 1 }}
                                endIcon={<ArrowForwardIosIcon />}
                                onClick={() => {
                                    navigate("/almacen/inventarios/add");
                                }}
                            >
                                Registrar Inventario
                            </Button>
                        </>
                    }
                >
                </CardHeader>
                <CardContent>
                    {
                        load &&
                        <Loading />
                    }
                    {
                        !load &&
                        <>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField type="date" id="outlined-basic" label="Fecha Inicial" value={init} onChange={(e) => setInit(e.target.value)} variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField type="date" id="outlined-basic" label="Fecha Final" variant="outlined" value={end} onChange={(e) => setEnd(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="contained" sx={{ mt: 1 }} onClick={fetchData}>Buscar</Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <DataGrid
                                sx={{ background: 'white', mt: 3 }}
                                rows={filteredData}
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
                        </>

                    }
                </CardContent>
            </Card>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose2}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Lista de Materiales"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                        >
                            {
                                details && details.length > 0 &&
                                details.map((d, k) => (
                                    <ListItemButton key={k}>
                                        <ListItemIcon>
                                            <Inventory2Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${d.cantidad} ${d.material}`} />
                                    </ListItemButton>
                                ))
                            }
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" endIcon={<CloseIcon />} onClick={handleClose2}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ListInventory