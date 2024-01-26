
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Thead = ({ headers = [] }: any) => {
    return (
        <>
            <TableRow>
                <TableCell/>
                {
                    headers && headers.length > 0 &&
                    headers.map((item, index) => (
                        <TableCell key={'thead' + index}>{item}</TableCell>
                    ))
                }
            </TableRow>
        </>

    )
}
export default Thead