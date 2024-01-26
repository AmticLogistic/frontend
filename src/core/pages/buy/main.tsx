import { useState, useEffect } from "react"
import Client from "./client"
import Cart from "./cart"
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from "@mui/lab/LoadingButton"
import Swal from "sweetalert2"
import { useNavigate  } from 'react-router-dom'

const buyMain = () => {

    const navigate = useNavigate()

    const [load, setLoad] = useState(false)
    const [data, setData] = useState({
        numero: "",
        cliente: "",
        direccion: "",
        comprobante: "",
        nota: "",
        telefono: "",

        personas_id: 0,
        empresa_id: 1,
        serie: "",
        tipoPago_id: 1,

        detalles: [],
        gravado: "",
        igv: "",
        invertido: 0,
        pago: "",
        total: 0,
        user_id: 1,
        vuelto: 0
    })

    useEffect(() => {
        console.log(data);
    }, [data]);

    const updateClient = async (dataClient: any) => {
        await setData(prevData => ({
            ...prevData,
            numero: dataClient.document,
            cliente: dataClient.client,
            direccion: dataClient.client,
            nota: dataClient.note,
            telefono: dataClient.phone,
            comprobante: dataClient.typeDocument,
            personas_id: dataClient.personas_id,
            serie: dataClient.serie,
        }));
    };

    const updateCart = async (dataClient: any) => {
        await setData(prevData => ({
            ...prevData,
            detalles: dataClient.detalles,
            gravado: dataClient.gravado,
            igv: dataClient.igv,
            invertido: dataClient.invertido,
            pago: dataClient.pago,
            total: dataClient.total,
            user_id: dataClient.user_id,
            vuelto: dataClient.vuelto
        }));
    }

    const openBuy = (data: any) => {
        console.log(data)
        Swal.fire({
            title: 'Venta realizada exitosamente.',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Imprimir',
            denyButtonText: `Nueva venta`,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/comprobante/${data.data}`)
            } else if (result.isDenied) {
                window.location.reload();
            }
        })
    }

    const buy = async () => {
        try {
            await setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/venta/saveVenta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Compra exitosa:', responseData);
                await setLoad(false)
                if (responseData)
                    await openBuy(responseData)
            } else {
                console.log('Error al realizar la compra:', response.status);
                await setLoad(false)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            await setLoad(false)
        }
    };

    return (
        <>
            <Client setInfo={updateClient} />
            <br />
            <LoadingButton variant="contained" loading={load} disabled={data.detalles.length == 0} endIcon={<SendIcon />} color="warning" onClick={buy}>
                Comprar
            </LoadingButton>
            <br />
            <Cart setCart={updateCart} />
        </>
    )
}
export default buyMain