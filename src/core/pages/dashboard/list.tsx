import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Paper from "@mui/material/Paper";

const ListData = () => {
  const rows = [
    { name: "Frozen yoghurt", fat: 159, carbs: 6.0, protein: 24, calories: 12 },
    { name: "Eclair", fat: 262, carbs: 16.0, protein: 24, calories: 6.0 },
    { name: "Cupcake", fat: 305, carbs: 3.7, protein: 67, calories: 4.3 },
    { name: "Gingerbread", fat: 356, carbs: 16.0, protein: 49, calories: 3.9 },
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Material</TableCell>
            <TableCell align="left">Stock</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell width={10}>
                <WidgetsIcon />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="right">Stock Bajo</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ListData;
