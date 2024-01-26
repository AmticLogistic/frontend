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


const MenuInput = ({ data }) => {

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
        const url = `${process.env.REACT_APP_API_URL}/api/document/input/${id}`;
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
            text: '¿Seguro(a) de anular la entrada?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, anular',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.deleteInput(id);
                if (response) {
                    Swal.fire({
                        title: 'Entrada anulada!',
                        text: 'Se anuló exitosamente la entrada.',
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
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

    return (
        <>
            {
                <IconButton aria-label="settings" onClick={handleMenuClick} >
                    <MoreVertIcon />
                </IconButton>
            }

            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => openReport(data['id'])}>
                    <VisibilityIcon /> &nbsp; Ver Entrada
                </MenuItem>
                <MenuItem onClick={() => cancelRequired(data['id'])}>
                    <DeleteIcon /> &nbsp; Anular
                </MenuItem>
            </Menu>
        </>
    );
};

export default MenuInput;