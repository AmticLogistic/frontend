import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  Autocomplete,
  DialogProps,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

import Api from "./../../../utils/query/api";

import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "core/utils/components/Loading";

const AddBuy = () => {
  const { idr } = useParams<{ idr: string }>();
  const { id } = useParams<{ id: string }>();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md");

  const [name, setName] = useState("");
  const [revisado, setRevisado] = useState("");
  const [aprobado, setAprobado] = useState("");
  const [provider, setProvider] = useState(null);
  const [providers, setProviders] = useState([]);
  const [sitio, setSitio] = useState("");
  const [product, setProduct] = useState("");
  const [required, setRequired] = useState(null);

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [area, setArea] = useState("0");
  const [person, setPerson] = useState("0");

  const [pay, setPay] = useState("1");
  const [methoPay, setMethoPay] = useState("1");

  const [marca, setMarca] = useState("");
  const [unidad, setUnidad] = useState("");
  const [observation, setObservation] = useState("");
  const [subtotal, setSubtotal] = useState("0");
  const [total, setTotal] = useState(0);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [cantidad, setCantidad] = useState("0");
  const [material, setMaterial] = useState(null);
  const [materials, setMaterials] = useState([]);

  const [cart, setCart] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [load, setLoad] = useState(false);
  const [observationAdd, setObservationAdd] = useState("");
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    fetchData();
    if (idr) getDataEdit();
    if (id) getDataEditoOrder();
  }, []);

  const fetchData = async () => {
    await setLoadPage(true);
    try {
      const response = await Api.getProviders();
      if (response) {
        setProviders(response.data);
      }
      const responseMaterials = await Api.GetMateriales();
      if (responseMaterials) {
        setMaterials(responseMaterials.data);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
    await setLoadPage(false);
  };

  const getDataEdit = async () => {
    const response = await Api.getRequimentEdit(idr);
    if (response) {
      setCart(response.data.detalles);
    }
  };
  const getDataEditoOrder = async () => {
    const response = await Api.getOrderBuyEdit(id);
    if (response) {
      setRevisado(response.data.revisadoPor);
      setAprobado(response.data.aprobadoPor);
      setSitio(response.data.sitioEntrega);
      setObservation(response.data.observacion);
      setPay(response.data.Monedas_id);
      setMethoPay(response.data.MetodosPago_id);
      setName(response.data.empresa);
      setProvider({ id: response.data.Empresas_id });
      setTotal(response.data.total);
      setRequired(response.data.Requerimiento_id);
      await setCart(response.data.detalles);
    }
  };

  const handleChangea = (event: SelectChangeEvent) => {
    setPay(event.target.value as string);
  };

  const handleChangep = (event: SelectChangeEvent) => {
    setMethoPay(event.target.value as string);
  };

  const handleModal = (state: boolean) => {
    setOpen(state);
  };

  const selectedMarial = (row: any) => {
    setMaterial(row);
    setUnidad(row.unidad_nombre);
    setMarca(row.marca_nombre);
  };

  const addCart = async () => {
    const rowCart = {
      cantidad: cantidad,
      observacion: "",
      Material_id: material.id,
      pu: subtotal,
      subtotal: parseInt(cantidad) * parseFloat(subtotal),
    };
    const newRow = { ...material, ...rowCart };
    const newCart = [...cart, newRow];
    await setCart(newCart);
    await clearModal();
    calcularTotal();
  };
  const clearInputs = () => {
    setRevisado("");
    setAprobado("");
    setProvider("");
    setSitio("");
    setObservation("");
    setProvider(null);
    setCart([]);
    setTotal(0);
  };

  const clearModal = async () => {
    await setCantidad("0");
    await setMaterial(null);
    await setMarca("");
    await setUnidad("");
    await setSubtotal("");
    await handleClearTextField();
  };
  const handleClearTextField = () => {
    setSelectedMaterial(null);
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    // Calcular el total automáticamente cuando se elimina un objeto del carrito
    calcularTotal();
  };

  const calcularTotal = async () => {
    await setTotal(0);
    let total = 0;
    for (const item of cart) {
      total += item.subtotal;
    }
    await setTotal(total);
  };

  const saveData = async () => {
    await setLoad(true);
    const dataSending = {
      id: parseInt(id) ?? 0,
      fecha: date,
      total: total,
      sitioEntrega: sitio,
      revisadoPor: revisado,
      aprobadoPor: aprobado,
      observacion: observation,
      Monedas_id: pay,
      requerimiento_id: idr ?? required,
      Empresas_id: provider["id"],
      MetodosPago_id: methoPay,
      detalles: cart,
    };
    const requestSave = await Api.SaveOrden(dataSending);
    if (requestSave) {
      Swal.fire(
        "Orden de Compra Generado",
        "La orden de compra ingresado fue guardado exitosamente.",
        "success"
      );
      await clearInputs();
      if (id) {
        getDataEditoOrder();
      }
    } else {
      Swal.fire(
        "Error en generado Orden de Compra",
        "La orden de compra ingresado no puedo ser procesaro, revisar los datos ingresados.",
        "error"
      );
    }
    await setLoad(false);
  };
  const handleQuantityChange = (index, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].cantidad = parseInt(newQuantity, 10);
      updatedCart[index].subtotal =
        updatedCart[index].cantidad * updatedCart[index].pu;
      calcularTotal();
      return updatedCart;
    });
  };

  const handlePriceChange = (index, newPrice) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].pu = parseFloat(newPrice);
      updatedCart[index].subtotal =
        updatedCart[index].cantidad * updatedCart[index].pu;
      calcularTotal();
      return updatedCart;
    });
  };
  const handleInputChange = (event) => {
    // Validación para permitir solo números y un solo punto decimal
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setCantidad(inputValue);
    }
  };

  const handleBlur = () => {
    const numericValue = parseFloat(cantidad);
    if (isNaN(numericValue) || numericValue < 0) {
      setCantidad("0");
    }
  };

  return (
    <>
      {loadPage && <Loading />}
      {!loadPage && (
        <>
          <Card>
            <CardHeader
              title="Crear Orden de Compra"
              subheader="Ingresa una nueva orden de Compra"
              avatar={<Avatar aria-label="recipe">R</Avatar>}
            ></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    id="outlined-basic"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    label="Fecha Emisión"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  {id && (
                    <TextField
                      id="outlined-basic"
                      value={name}
                      label="Proveedor"
                      variant="outlined"
                      disabled
                      fullWidth
                    />
                  )}
                  {!id && providers && providers.length > 0 && (
                    <Autocomplete
                      onChange={(_, newValue) => {
                        setProvider(newValue);
                      }}
                      options={providers}
                      getOptionLabel={(option) =>
                        `${option.numDocIdentificacion} - ${option.razonSocial}`
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Proveedor" />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <span>
                            {option.numDocIdentificacion} - {option.razonSocial}
                          </span>
                        </li>
                      )}
                    />
                  )}
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label1">
                      Moneda
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={pay}
                      label="Moneda"
                      onChange={handleChangea}
                      sx={{ textAlign: "center" }}
                    >
                      <MenuItem value={"1"}>SOLES</MenuItem>
                      <MenuItem value={"2"}>DOLAR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label1">
                      Metodo de Pago
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={methoPay}
                      label="Metodo de Pago"
                      onChange={handleChangep}
                      sx={{ textAlign: "center" }}
                    >
                      <MenuItem value={"1"}>AL CONTADO</MenuItem>
                      <MenuItem value={"2"}>CREDITO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    value={sitio}
                    onChange={(e) => setSitio(e.target.value)}
                    label="Sitio entrega"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    value={revisado}
                    onChange={(e) => setRevisado(e.target.value)}
                    label="Revisado"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    value={aprobado}
                    onChange={(e) => setAprobado(e.target.value)}
                    label="Aprobado"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Observacion"
                    multiline
                    fullWidth
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    rows={2}
                    defaultValue="Ninguna"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* <Button
                        variant="contained"
                        color="info"
                        startIcon={<AddIcon />}
                        sx={{ mt: 3, width: 250 }}
                        onClick={() => {
                            handleModal(true);
                        }}
                    >
                        Agregar Material
                    </Button> */}

          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">UND</TableCell>
                  <TableCell align="left">Material</TableCell>
                  <TableCell align="left">CANTIDAD</TableCell>
                  <TableCell align="left">P/U</TableCell>
                  <TableCell align="left">SUBTOTAL</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart && cart.length > 0 ? (
                  cart.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.unidad_nombre}</TableCell>
                      <TableCell align="left">
                        <span
                          style={
                            row.useRow ? { textDecoration: "line-through" } : {}
                          }
                        >
                          {row.material} {row.marca_nombre}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {!idr && (
                          <TextField
                            type="number"
                            value={row.cantidad}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                        )}
                        {idr && <span>{row.cantidad}</span>}
                      </TableCell>
                      <TableCell align="center" width={120}>
                        {!row["useRow"] && (
                          <TextField
                            type="number"
                            value={row.pu}
                            onChange={(e) =>
                              handlePriceChange(index, e.target.value)
                            }
                            InputProps={{
                              inputProps: {
                                step: "0.00", // Permite decimales de hasta dos lugares
                                min: "0", // No permite valores negativos
                              },
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" width={120}>
                        {!row["useRow"] && <span>S/ {row.subtotal}</span>}
                      </TableCell>
                      <TableCell align="center" width={100}>
                        {!row["useRow"] && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              handleRemoveItem(index);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        )}
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

          <LoadingButton
            loading={load}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 4, width: 380, marginLeft: "auto" }}
            onClick={saveData}
            disabled={
              !sitio ||
              !provider ||
              !revisado ||
              !aprobado ||
              !cart ||
              cart.length == 0 ||
              !total ||
              total < 1
            }
          >
            Guardar
          </LoadingButton>

          <Dialog onClose={handleModal} open={open} fullScreen={fullScreen}>
            <DialogTitle sx={{ textAlign: "center", mt: 3 }}>
              Agregar Producto o Servicio
            </DialogTitle>
            <DialogContent sx={{ p: 5 }}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={9}>
                  {materials && materials.length > 0 && (
                    <Autocomplete
                      value={selectedMaterial}
                      onChange={(_, newValue) => {
                        selectedMarial(newValue);
                        setSelectedMaterial(newValue);
                      }}
                      options={materials}
                      getOptionLabel={(option) =>
                        `${option.material} - ${option.categoria_nombre} - ${option.marca_nombre}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Material"
                          InputProps={{
                            ...params.InputProps,
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <span key={`li_${option.id}`}>
                            {option.material} - {option.categoria_nombre} -{" "}
                            {option.marca_nombre}
                          </span>
                        </li>
                      )}
                    />
                  )}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    value={cantidad}
                    label="Cantidad"
                    variant="outlined"
                    onChange={(e) => {
                      setCantidad(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    value={unidad}
                    label="Unidad"
                    variant="outlined"
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    value={marca}
                    label="Marca"
                    variant="outlined"
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    value={subtotal}
                    label="Precio Unitario"
                    variant="outlined"
                    onChange={(e) => {
                      setSubtotal(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    value={observationAdd}
                    label="Observación"
                    variant="outlined"
                    onChange={(e) => {
                      setObservationAdd(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mt: 3 }}
                    disabled={!cantidad || cantidad == "0"}
                    onClick={addCart}
                  >
                    Agregar
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CloseIcon />}
                    sx={{ mt: 3 }}
                    onClick={() => {
                      handleModal(false);
                    }}
                  >
                    Cerrar
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};
export default AddBuy;
