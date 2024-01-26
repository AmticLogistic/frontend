import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import BarChartIcon from '@mui/icons-material/BarChart';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HomeIcon from '@mui/icons-material/Home'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import VideoSettingsIcon from '@mui/icons-material/VideoSettings'
import InventoryIcon from '@mui/icons-material/Inventory';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

const parseMenu = async () => {
    let menus = [
        {
            label: 'Menu',
            type: "section",
        },
        {
            uri: `/dashboard`,
            label: 'Dashboard',
            type: "nav-item",
            icon: <BarChartIcon sx={{ fontSize: 20 }} />
        },
        {
            label: 'ABASTECIMIENTO',
            type: "section",
        },
        {
            uri: `/operaciones/requerimientos`,
            label: 'Requerimiento',
            type: "nav-item",
            icon: <AssignmentIcon sx={{ fontSize: 20 }} />
        },
        {
            uri: `/operaciones/ordencompras`,
            label: 'Orden de Compra',
            type: "nav-item",
            icon: <LaptopMacIcon sx={{ fontSize: 20 }} />
        },
        {
            uri: `/operaciones/entradas`,
            label: 'Entrada',
            type: "nav-item",
            icon: <KeyboardDoubleArrowRightIcon sx={{ fontSize: 20 }} />
        },
        {
            uri: `/operaciones/salidas`,
            label: 'Salida',
            type: "nav-item",
            icon: <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 20 }} />
        },
        {
            label: 'ALMACEN',
            type: "section",
        },
        {
            uri: `/almacen/controcostos`,
            label: 'Centro de Costos',
            type: "nav-item",
            icon: <LocalMallIcon sx={{ fontSize: 20 }} />
        },
        {
            label: 'Productos/Servicios',
            type: "collapsible",
            icon: <InventoryIcon sx={{ fontSize: 20 }} />,
            children: [
                {
                    uri: `/almacen/productos`,
                    label: 'Productos',
                    type: "nav-item"
                },
                {
                    uri: `/almacen/servicios`,
                    label: 'Servicios',
                    type: "nav-item"
                },
                {
                    uri: `/almacen/categorias`,
                    label: 'Categorias',
                    type: "nav-item"
                },
                {
                    uri: `/almacen/marcas`,
                    label: 'Marcas',
                    type: "nav-item"
                }
            ]
        },
        {
            uri: `/almacen/inventarios`,
            label: 'Inventarios/Almacen',
            type: "nav-item",
            icon: <LocalMallIcon sx={{ fontSize: 20 }} />
        },
        {
            label: 'Empresas',
            type: "section",
        },
        {
            uri: `/empresas/proveedores`,
            label: 'Proveedores',
            type: "nav-item",
            icon: <Diversity3Icon sx={{ fontSize: 20 }} />
        },
        {
            uri: `/empresas/transportistas`,
            label: 'Transportistas',
            type: "nav-item",
            icon: <LocalShippingIcon sx={{ fontSize: 20 }} />
        },
        {
            label: 'REPORTES',
            type: "section",
        },
        {
            label: 'Reportes',
            type: "collapsible",
            icon: <DashboardIcon sx={{ fontSize: 20 }} />,
            children: [
                {
                    uri: `/reportes/inventario`,
                    label: 'Inventario',
                    type: "nav-item"
                },
                {
                    uri: `/reportes/kardex`,
                    label: 'Reporte de Kardex',
                    type: "nav-item"
                },
                {
                    uri: `/reportes/ordenes`,
                    label: 'Reporte Ordenes de Compra',
                    type: "nav-item"
                }
            ]
        },
        {
            label: 'USUARIOS',
            type: "section",
        },
        {
            uri: `/usuarios/personal`,
            label: 'Personal de Trabajo',
            type: "nav-item",
            icon: <TransferWithinAStationIcon sx={{ fontSize: 20 }} />
        },
        {
            label: 'Credenciales',
            type: "collapsible",
            icon: <PermContactCalendarIcon sx={{ fontSize: 20 }} />,
            children: [
                {
                    uri: `/usuarios/lista`,
                    label: 'Lista de usuario',
                    type: "nav-item",
                    icon: <CreditCardIcon sx={{ fontSize: 20 }} />
                },
                {
                    uri: `/usuarios/permisos`,
                    label: 'Roles y permisos',
                    type: "nav-item",
                    icon: <VideoSettingsIcon sx={{ fontSize: 20 }} />
                }
            ]
        },
    ]
    return menus
}

export default parseMenu();
