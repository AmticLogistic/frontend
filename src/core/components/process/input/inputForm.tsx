import { useState, useEffect } from "react";
import { Avatar, Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import Loading from "core/utils/components/Loading";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Api from './../../../utils/query/api';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MenuInput from "./menuInput";

const InputForm = () => {
    const navigate = useNavigate();
    const [dateInit, setDateInit] = useState(moment().startOf('month').format('YYYY-MM-DD'));
    const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD'));
    const [filtro, setFiltro] = useState("");
    const [provider, setProvider] = useState("0");
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoad(true);
            const response = await Api.obtenerEntradas(dateInit, dateEnd);
            if (response) {
                setProducts(response.data);
                setLoad(false);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setLoad(false);
        }
    };

    const getData = async () => {
        try {
            setLoad(true);
            const response = await Api.obtenerEntradas(dateInit, dateEnd);
            if (response) {
                setProducts(response.data);
                setLoad(false);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setLoad(false);
        }
    };

    const handleClose2 = () => {
        setOpen(false);
    };

    const handleChangep = (event) => {
        setProvider(event.target.value);
    };

    const handleClickOpen = async (data) => {
        setDetails(data);
        setOpen(true);
    };

    const handleFilterChange = (e) => {
        setFiltro(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.proveedor.toLowerCase().includes(filtro.toLowerCase())
    );

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'ID', width: 120, headerAlign: 'center', align: 'center' },
        {
            field: 'proveedor',
            headerName: 'Proveedor',
            width: 150,
            flex: 1,
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            width: 150,
        },
        {
            field: 'list',
            headerName: 'Detalles',
            width: 60,
            sortable: false,
            renderCell: (params) => {
                const { row } = params;
                const dat = row['list'];

                return (
                    <IconButton aria-label="delete" onClick={() => { handleClickOpen(dat) }}>
                        <VisibilityIcon />
                    </IconButton>
                );

            },
        },
        {
            field: 'transportista',
            headerName: 'Transportista',
            width: 150,
            flex: 1,
        },
        {
            field: 'moneda',
            headerName: 'Moneda',
            width: 150,
            sortable: false,
        },
        {
            field: 'puestoEn',
            headerName: 'Puesto en',
            width: 150,
        },
        {
            field: 'total',
            headerName: 'Total',
            align: 'center',
            width: 150,
        },
        {
            field: 'op',
            headerName: 'Accion',
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            width: 100,
            renderCell: (params) => {
                const { row } = params;
                return (
                    <>
                        {row.estado === 1 && <MenuInput data={row} />}
                        {row.estado === 0 && <Chip label="Anulado" color="error" />}
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Entradas"
                    subheader="Lista de Entradas registrados"
                    avatar={<Avatar aria-label="recipe">C</Avatar>}
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField type="date" id="outlined-basic" label="Fecha Inicial" value={dateInit} onChange={(e) => setDateInit(e.target.value)} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField type="date" id="outlined-basic" label="Fecha Final" variant="outlined" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }} onClick={getData}>Buscar</Button>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <TextField
                                id="filtro"
                                value={filtro}
                                onChange={handleFilterChange}
                                label="Filtrar por Proveedor"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {load && <Loading />}
            {!load && (
                <DataGrid
                    sx={{ background: 'white', mt: 3 }}
                    rows={filteredProducts}
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
            )}
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose2}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Lista de Requerimientos"}</DialogTitle>
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
                    <Button onClick={handleClose2}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InputForm;
