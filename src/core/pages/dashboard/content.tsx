import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddchartIcon from "@mui/icons-material/Addchart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Line from "./line";
import CircleChart from "./circle";
import ListData from "./list";
import Api from "./../../utils/query/api";
import Loading from "core/utils/components/Loading";

const Content = () => {
  const [load, setLoad] = useState(false);
  const [dataHeader, setDataHeader] = useState(null);
  const [dataCircle, setDataCircle] = useState([]);
  const [dataBar, setDataBar] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await setLoad(true);
      const response = await Api.dashboard();
      if (response) {
        setDataCircle(response.invesion);
        setDataBar(response.invetario);
        setDataHeader([
          {
            icon: <InventoryIcon />,
            name: "Órdenes de compra cumplidas",
            value: `${response.panel1} %`,
            color: "red",
          },
          {
            icon: <AddchartIcon />,
            name: "Total de Proveedores",
            value: `${response.panel2}`,
            color: "green",
          },
          {
            icon: <ShoppingBagIcon />,
            name: "Total Compras",
            value: response.panel3,
            color: "blue",
          },
          {
            icon: <WidgetsIcon />,
            name: "Total productos Registrados",
            value: response.panel4,
            color: "tomato",
          },
        ]);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
    await setLoad(false);
  };

  return (
    <>
      {load && <Loading />}
      {!load && (
        <Grid container spacing={2} sx={{ pb: 20 }}>
          {dataHeader &&
            dataHeader.map((row) => (
              <Grid item sm={3}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item sm={5} style={styles.centerContent}>
                        <div style={styles.iconContainer}>{row.icon}</div>
                      </Grid>
                      <Grid item sm={7}>
                        <p style={styles.textNumber}>{row.value}</p>
                        <p style={styles.textTitle}>{row.name}</p>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          <Grid item sm={9}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#4F3981" }} aria-label="recipe">
                    I
                  </Avatar>
                }
                title="Inventario Valorizado"
                subheader="Reporte anual"
              />
              <CardContent>
                {dataBar && dataBar.length > 0 && <Line input={dataBar} />}
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#4F3981" }} aria-label="recipe">
                    T
                  </Avatar>
                }
                title="Total Inversion"
                subheader="Reporte General"
              />
              <CardContent>
                {dataCircle && dataCircle.length > 0 && (
                  <CircleChart input={dataCircle} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Content;

const styles = {
  container: {
    marginTop: 50,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    background: "#5637b094",
    margin: "auto",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5637b0",
  },
  textNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 16,
    height: 50,
  },
};
