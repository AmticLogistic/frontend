import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface MaterialTableProps {
  cart: any[];
  onPrintValues: (values: any[]) => void;
  setTotal: (values: any) => void;
  setCart: (values: any) => void;
}

const MaterialTable: React.FC<MaterialTableProps> = ({
  cart,
  onPrintValues,
  setTotal,
  setCart,
}) => {
  const [total, setTotals] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const handleChange = (event: any, index: number) => {
    const updatedCart = [...cart];
    updatedCart[index][event.target.name] = event.target.value;
    const cantidad = parseFloat(updatedCart[index].cantidad) || 0;
    const precioUnitario = parseFloat(updatedCart[index].precioUnitario) || 0;
    updatedCart[index].subtotal = cantidad * precioUnitario;
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const calculateTotal = (updatedCart?: any[]) => {
    const cartToUse = updatedCart || cart;
    const newTotal = cartToUse.reduce(
      (acc, item) => acc + (item.subtotal || 0),
      0
    );
    setTotals(newTotal);
    setTotal(newTotal);
    handlePrintValues();
  };

  const handlePrintValues = () => {
    onPrintValues(cart);
  };

  const handleDeleteItem = (index: number) => {
    console.log("Deleting item at index:", index);
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell align="left">Material</TableCell>
          <TableCell align="left">Unidad</TableCell>
          <TableCell align="center">Cantidad</TableCell>
          <TableCell align="center">P/U</TableCell>
          <TableCell align="center">SubTotal</TableCell>
          <TableCell align="left"></TableCell>
        </TableHead>
        <TableBody>
          {cart && cart.length > 0 ? (
            cart.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.unidad}</TableCell>
                <TableCell align="left">
                  {row.material} {row.marca_nombre}
                </TableCell>
                <TableCell align="left" width={100}>
                  <TextField
                    id={`cantidad-${index}`}
                    name="cantidad"
                    value={row.cantidad}
                    label="Cantidad"
                    variant="outlined"
                    fullWidth
                    onChange={(event) => handleChange(event, index)}
                  />
                </TableCell>
                <TableCell align="center" width={120}>
                  {row.precioUnitario}
                </TableCell>
                <TableCell align="center" width={120}>
                  {row.subtotal}
                </TableCell>
                <TableCell align="center" width={100}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      console.log("Deleting item at index:", index);
                      handleDeleteItem(index);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                colSpan={7}
                sx={{ textAlign: "center", p: 6 }}
              >
                Selecciona materiales
              </TableCell>
            </TableRow>
          )}
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell colSpan={4} align="right">
              Total:
            </TableCell>
            <TableCell align="left">S/ {total}</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
