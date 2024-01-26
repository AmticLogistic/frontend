import { useEffect, useState } from 'react';

import {
    Autocomplete,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import Api from './../../../utils/query/api';
import { useNavigate } from 'react-router-dom';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import Swal from 'sweetalert2';
import LoadingButton from '@mui/lab/LoadingButton';


const MenuBuy = ({ data }) => {

    console.log(data)

    const navigate = useNavigate(); 



    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const [provider, setProvider] = useState(null);
    const [open, setOpen] = useState(false)
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');
    const [temp, setTemp] = useState(data)
    const [load, setLoad] = useState(false)
    const [listProv, setListProv] = useState(JSON.parse(localStorage.getItem('providers')))

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
    };

    const openReport = (id) => {
        const url = `${process.env.REACT_APP_API_URL}/api/document/required/${id}`;
        window.open(url, '_blank');
    }

    const openSolicitud = (id) => {
        const url = `${process.env.REACT_APP_API_URL}/api/document/solicitude/${id}`;
        window.open(url, '_blank');
    }

    const handleClose2 = () => {
        setOpen(false);
    };

    const cancelRequired = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Seguro(a) de anular el requerimiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, anular',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.deleteRequerimiento(id);
                if (response) {
                    Swal.fire({
                        title: 'Requerimiento anulado!',
                        text: 'Se anuló exitosamente el requerimiento.',
                        icon: 'success',
                    });
                }
            }
        });
    };

    const generateSolicitude = async () => {
        let tempData = JSON.parse(JSON.stringify(temp))
        tempData.Empresas_id = provider["id"]
        await setLoad(true)
        const response = await Api.saveSolicitud(tempData)
        if (response) {
            openSolicitud(response.data)
        }
        await setLoad(false)
    }

    const handleCheckboxChange = (index) => {
        setTemp((prevData) => {
            const newData = { ...prevData };
            newData.list[index].check = !newData.list[index].check;
            return newData;
        });
    };

    const openDocumentOrder = (id) => {
        const url = `${process.env.REACT_APP_API_URL}/api/document/orderbuy/${id}`
        window.open(url, '_blank');
    }

    return (
        <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { openDocumentOrder(data['id']) }}><VisibilityIcon /> &nbsp; Ver Orden de Compra</MenuItem>
                <MenuItem onClick={() => { navigate("/operaciones/entradas/" + data['id']) }} disabled={ data['cantidadEntrada'] >= data['cantidadTotal']} ><VisibilityIcon /> &nbsp; Generar Entrada</MenuItem>
                <MenuItem onClick={() => { navigate("/operaciones/ordencompras/edit/" + data['id']) }} disabled={ data['cantidadEntrada'] > 0 }><EditIcon /> &nbsp; Editar</MenuItem>
                <MenuItem onClick={handleClose} disabled={ data['cantidadEntrada'] > 0 }><DeleteIcon /> &nbsp; Anular</MenuItem>
            </Menu>
            <Dialog
                open={open}
                maxWidth={maxWidth}
                keepMounted
                onClose={handleClose2}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Generar Solicitud de Cotización"}</DialogTitle>
                <DialogContent sx={{ pt: 4 }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        {listProv && listProv.length > 0 && (
                            <Autocomplete
                                onChange={(_, newValue) => {
                                    setProvider(newValue);
                                }}
                                sx={{ mt: 3 }}
                                options={listProv}
                                getOptionLabel={(option) =>
                                    `${option['numDocIdentificacion']} - ${option['razonSocial']}`
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Proveedor" />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <span>
                                            {option['numDocIdentificacion']} -{" "}
                                            {option['razonSocial']}
                                        </span>
                                    </li>
                                )}
                            />
                        )}
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell align="left">MATERIAL</TableCell>
                                    <TableCell align="center">UND</TableCell>
                                    <TableCell align="center">MARCA</TableCell>
                                    <TableCell align="center">SELECCIONE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {temp['list'].map((row, index) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row" align="center">
                                            {row.cantidad}
                                        </TableCell>
                                        <TableCell align="left">{row.material}</TableCell>
                                        <TableCell align="center">{row.unidad_nombre}</TableCell>
                                        <TableCell align="center">{row.marca_nombre}</TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={row.check || false}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose2}
                        endIcon={<CloseIcon />}
                        style={{ marginRight: 'auto' }}
                    >
                        Cerrar
                    </Button>
                    <LoadingButton loading={load} variant="contained" onClick={generateSolicitude} endIcon={<SendIcon />} disabled={!provider}>
                        Generar
                    </LoadingButton >
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MenuBuy;