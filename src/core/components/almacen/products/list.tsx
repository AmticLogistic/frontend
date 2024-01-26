import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Api from "./../../../utils/query/api";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loading from "core/utils/components/Loading";
import MenuProduct from "./menuProduct";

const List = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("10");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [load, setLoad] = useState(false);
  const [mayor, setMayor] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Aplica el filtrado cuando cambia la data o los términos de búsqueda
    filterData();
  }, [searchTerm, selectedMarca, products, mayor]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    { field: "material", headerName: "MATERIAL", flex: 1 },
    {
      field: "img",
      headerName: "img",
      width: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <>{/* Agrega la lógica necesaria para mostrar la imagen */}</>;
      },
    },
    { field: "unidad_nombre", headerName: "UND", width: 150 },
    { field: "categoria_nombre", headerName: "CATEGORIA", width: 200 },
    { field: "marca_nombre", headerName: "MARCA", width: 150 },
    { field: "stock", headerName: "STOCK", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            <MenuProduct data={row} />
          </>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      setLoad(true);
      const response = await Api.GetMateriales();
      if (response) {
        setProducts(response.data);
      }
      setLoad(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const filterData = () => {
    const filtered = products.filter(
      (product) =>
        product.material.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedMarca === "10" ||
          product.marca_nombre.toLowerCase() === selectedMarca.toLowerCase()) &&
        (!mayor || product.stock > 0)
    );
    console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Lista de Productos"
          subheader="Lista completa de productos en el almacen"
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                navigate("/almacen/productos/nuevo");
              }}
            >
              Añadir producto
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                id="outlined-basic"
                label="Producto"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                label="Stock > 0"
                control={
                  <Checkbox
                    checked={mayor}
                    onChange={(e) => setMayor(e.target.checked)}
                  />
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {load && <Loading />}
      {!load && (
        <>
          <DataGrid
            sx={{ background: "white", mt: 3 }}
            rows={filteredProducts}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20, 50, 100]}
            disableRowSelectionOnClick
          />
        </>
      )}
    </>
  );
};

export default List;
