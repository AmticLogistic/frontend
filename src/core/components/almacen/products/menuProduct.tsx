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


const MenuProduct = ({ data }) => {

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
    }

    const cancelMaterial = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Seguro(a) de anular el material?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, anular',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.deleteMaterial(data.id);
                if (response) {
                    Swal.fire({
                        title: 'Material anulado!',
                        text: 'Se anuló exitosamente el material.',
                        icon: 'success',
                    });
                }
            }
        });
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
                <MenuItem onClick={() => { navigate("/almacen/productos/edit/" + data['id']) }}><EditIcon /> &nbsp; Editar</MenuItem>
                <MenuItem onClick={cancelMaterial}><DeleteIcon /> &nbsp; Anular</MenuItem>
            </Menu>
        </>
    );
};

export default MenuProduct;