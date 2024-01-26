import { Typography } from "@mui/material";
import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableRow from '@mui/material/TableRow'
import Grid from '@mui/material/Unstable_Grid2';
import { CardActionArea } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
const SKAccumulated = () => {
    let array = [];
    for (let i = 0; i < 12; i++) array.push(i)


    return (
        array.map((val, index) => (
          
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left" width={100}>
                    <Skeleton variant="text"  />
                </TableCell>
                <TableCell align="left" width={120}>
                    <Skeleton variant="text"  />
                </TableCell>
                <TableCell align="left" width={140}>
                    <Skeleton variant="text"  />
                </TableCell>
                <TableCell align="right" width={100}>
                    <Skeleton variant="text"  />
                </TableCell>
                <TableCell align="right" width={100}>
                    <Skeleton variant="text"  />
                </TableCell>
                <TableCell align="right" width={100}>
                    <Skeleton variant="text" />
                </TableCell>
                <TableCell align="right" width={100}>
                    <Skeleton variant="text"  />
                </TableCell>
            </TableRow>

        ))
    );

};

export default SKAccumulated;
