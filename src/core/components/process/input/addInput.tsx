import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "core/utils/components/Loading";
import Api from "./../../../utils/query/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams, useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

import FormularioHeader from "./FormularioHeader";
import MaterialTable from "./MaterialTable";

const AddInput = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [transport, setTransport] = useState([]);
  const [cart, setCart] = useState([]);
  const [load, setLoad] = useState(true);
  const [loadSend, setLoadSend] = useState(false);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState("0");
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Carga de datos
    const fetchData = async () => {
      await setLoad(true);
      try {
        const response = await Api.getTransports();
        if (response) {
          setTransport(response.data);
        }
        const resposeOrder = await Api.getDataOrder(id);
        if (resposeOrder) {
          setCart(resposeOrder.data);
          setInfo(resposeOrder.info);
        }
        await setLoad(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleHeaderValues = async (values) => {
    console.log(values);
    await setData(values);
  };

  const handlePrintValues = async (values) => {
    console.log(values);
    await setData(values);
  };

  const saveInput = async () => {
    let dataSending = JSON.parse(JSON.stringify(data));
    if (id) dataSending["OrdenCompra_id"] = id;
    dataSending.detalles = cart;
    dataSending.Proveedores_id = info.Empresas_id;
    dataSending.Transportistas_id = dataSending.Transportistas_id.id;
    dataSending.total = total;

    await setLoadSend(true);
    const response = await Api.SaveInput(dataSending);
    if (response.status) {
      Swal.fire(
        "Entrada Registrada",
        "La entrada fue registrada de forma exitosa.",
        "success"
      );
      navigate("/operaciones/entradas"); // New line
    }
    await setLoadSend(false);
  };

  return (
    <>
      {load && <Loading />}
      {!load && (
        <>
          <FormularioHeader
            providers={providers}
            info={info}
            transport={transport}
            dataHeader={handleHeaderValues}
          />
          <MaterialTable
            cart={cart}
            setCart={setCart}
            onPrintValues={handlePrintValues}
            setTotal={setTotal}
          />
          <LoadingButton
            loading={loadSend}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ mt: 4, width: 280 }}
            // disabled={ !data.Transportistas_id || !data.puestoEn || !data.Proveedores_id }
            onClick={saveInput}
          >
            Guardar Entrada
          </LoadingButton>
        </>
      )}
    </>
  );
};

export default AddInput;
