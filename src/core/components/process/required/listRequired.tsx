import { useEffect, useState } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Swal from 'sweetalert2'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Api from './../../../utils/query/api'
import moment from "moment";
import Loading from "core/utils/components/Loading";
import MenuRequired from "./menuRequired"
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import ProgressBar from "@ramonak/react-progress-bar";

const ListRequired = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [dateInit, setDateInit] = useState(moment().startOf('month').format('YYYY-MM-DD'));
    const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD'))
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false)
    const [details, setDetails] = useState([])
    const [providers, setProviders] = useState([]);

    const handleClickOpen = async (data: any) => {
        setDetails(data)
        setOpen(true);
    };

    const handleClose2 = () => {
        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoad(true)
                const response = await Api.ListRequerimientos(dateInit, dateEnd);
                if (isMounted) {
                    setList(response.data)
                    setLoad(false)
                }
                const responseProviders = await Api.getProviders();
                if (responseProviders) {
                    localStorage.setItem('providers', JSON.stringify(responseProviders.data))
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setLoad(false)
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    const getData = async () => {
        try {
            setLoad(true)
            const response = await Api.ListRequerimientos(dateInit, dateEnd);
            if (response) {
                setList(response.data)
                setLoad(false)
            }
        } catch (error) {
            setLoad(false)
        }
    }

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'ID', width: 120, headerAlign: 'center', align: 'center' },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 150,
            sortable: false,
            renderCell: (params) => {
                const { row } = params;
                let prog = '0'
                if( parseFloat(row['cantidadOrden']) > 0){
                    prog = ((parseInt(row['cantidadOrden']) / parseInt(row['cantidadTotal']) ) * 100).toFixed(0)
                    
                }
                return (
                  <div style={{width:100}}>
                    {
                        row['Orden_id'] == "-1" && 
                        <Chip label="Anulado" color="error"/>
                    }
                     {
                        row['Orden_id'] != "-1" && 
                        <ProgressBar completed={prog} width="100%" bgColor="#4B4B75" labelColor="#4B4B75" labelAlignment="outside" customLabel={`${prog}%`}/>
                    }
                  </div>
                    
                );
            },
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            width: 150,
        },
        {
            field: 'list',
            headerName: 'Lista',
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
            field: 'areaSolicita',
            headerName: 'Area Solicitante',
            align: 'left',
            flex: 1,
        },
        {
            field: 'nombre',
            headerName: 'Persona Solicitante',
            align: 'left',
            flex: 1,
        },
        {
            field: 'op',
            headerName: 'Accion',
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            width: 100,
            renderCell: (params) => {
                const { row } = params
                const tempProv = providers
                console.log(tempProv)
                return (
                    <>
                        <MenuRequired data={row}/>
                    </>
                );

            },
        },
    ];


    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Requerimientos"
                    subheader="Lista completa de requerimientos registrados"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/operaciones/requerimientos/nuevo"); }}>
                            Nuevo Requerimiento
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField type="date" id="outlined-basic" label="Fecha Inicial" value={dateInit} onChange={(e) => setDateInit(e.target.value)} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField type="date" id="outlined-basic" label="Fecha Final" variant="outlined" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }} onClick={getData}>Buscar</Button>
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
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <DataGrid
                            rows={list}
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
                    </CardContent>
                </Card>
            }
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
    )

}
export default ListRequired