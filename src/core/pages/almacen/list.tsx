import { useState, useEffect, Fragment } from 'react'

import { useNavigate } from 'react-router-dom'

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Empty from 'core/utils/components/Empty'
import Avatar from '@mui/material/Avatar'
import CategoryIcon from '@mui/icons-material/Category'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

const List = () => {

    const navigate = useNavigate()

    const [rows, setRows] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/almacen/listProducto`);
                const data = await response.json();
                setLoad(false)
                if (data)
                    await processList(data.data)

            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, []);

    const viewProduct = () => {
        console.log('noooo')
        navigate('/producto')
    }
    const falseDelete = () => {
        console.log('view')
    }

    const processList = async (data) => {
        var listCat = []
        data.forEach((e) => {
            listCat.push(e.categoria)
        })
        const elementosUnicos = {};
        const arraySinRepetidos = listCat.filter((elemento) => {
            if (!elementosUnicos[elemento]) {
                elementosUnicos[elemento] = true;
                return true;
            }
            return false;
        })
        var temp = []
        arraySinRepetidos.forEach((e) => {
            temp.push({ categoria: e, children: [] })
        });
        for (let x in data) {
            temp.forEach((cat) => {
                if (cat.categoria == data[x].categoria) {
                    cat.children.push(data[x])
                }
            })
        }
        await setRows(temp)
    }

    return (
        <>
            {
                load &&
                <Empty />
            }
            {
                !load &&
                <>
                    <p style={{textAlign:'right', paddingBottom:10}}>
                        <Fab color="primary"  variant="extended"  aria-label="add" onClick={viewProduct}>
                            <AddIcon />&nbsp;&nbsp;
                            Añadir Producto
                        </Fab>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Fab  aria-label="add"  variant="extended" onClick={() => { navigate(`/category`) }}>
                            <CategoryIcon />&nbsp;&nbsp;
                            Añadir Categoria
                        </Fab>
                    </p>
                    
                    
                    <TableContainer component={Paper} sx={{ p: 0, m: 0, pb: 4 }}>
                        <Table sx={{ minWidth: 650, p: 0, m: 0 }} aria-label="simple table">
                            {rows.map((row, key) => (
                                <Fragment key={key}>
                                    <TableHead sx={{ background: '#BFBFBF' }}>
                                        <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="left" colSpan={5}>{row.categoria}</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {row.children.map((rowc, keyc) => ( // Corregimos el paréntesis de cierre
                                            <TableRow key={`keyc` + keyc} sx={{ m: 0, p: 0 }}>
                                                <TableCell align="center" sx={{ m: 0, p: 0 }}>
                                                    {rowc.zone}
                                                </TableCell>
                                                <TableCell align="center" sx={{ m: 0, p: 0 }}>
                                                    <Chip color="default" size="small" label={`${rowc.code}`} />
                                                </TableCell>
                                                <TableCell align="left" sx={{ maxWidth: 450 }}>
                                                    <Chip color="info" size="small" label={rowc.codigo} sx={{ m: 1 }} /> 
                                                    {rowc.nombre}
                                                </TableCell>
                                                <TableCell align="right">{rowc.precioVenta}</TableCell>
                                                <TableCell align="center">{rowc.stockActual}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => { navigate(`/producto/${rowc.id}`) }}>
                                                        <ViewInArIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Fragment>
                            ))}
                        </Table>
                    </TableContainer>
                </>
            }

        </>
    )
}

export default List