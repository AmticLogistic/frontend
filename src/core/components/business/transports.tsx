import { Avatar, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Api from './../../utils/query/api'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loading from "core/utils/components/Loading";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

const Transports = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [name, setName] = useState("")

    const [load, setLoad] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const [loadg, setLoadg] = useState(false)
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await setLoad(true)
            const response = await Api.getTransports()
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

    const filteredData = data.filter((row) => {
        return (
            row.razonSocial.toLowerCase().includes(filterText.toLowerCase()) ||
            row.numDocIdentificacion.includes(filterText)
        );
    })

    const deleteData = async (ids) => {
        const data = {
            id: ids,
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
                const response = await Api.deleteProvider(ids)
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
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', align: 'center' },
        {
            field: 'razonSocial',
            headerName: 'Razon Social',
            flex: 1,
        },
        {
            field: 'numDocIdentificacion',
            headerName: 'RUC',
            width: 120,
        },
        {
            field: 'correo',
            headerName: 'Correo',
            width: 150,
        },
        {
            field: 'telefono',
            headerName: 'Telefono',
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
                return (
                    <>
                        <Button variant="contained" color="info" onClick={() => { navigate("/empresas/transportistas/edit/" + row['id']) }}>
                            <EditIcon fontSize="small" />
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="error" onClick={() => { deleteData(row['id']) }}>
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
                    title="Lista de Transportistas"
                    subheader="Lista completa de Transportistas"
                    avatar={
                        <Avatar aria-label="recipe">
                            L
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/empresas/transportistas/nuevo"); }}>
                            Registrar Transportista
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    {
                        load &&
                        <Loading />
                    }
                    {
                        !load &&
                        <>
                            <TextField
                                label="Busqueda de transportista"
                                value={filterText}
                                onChange={handleFilterChange}
                                variant="outlined"
                                sx={{ marginRight: 1, minWidth: 450 }}
                            />
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

        </>
    )
}
export default Transports