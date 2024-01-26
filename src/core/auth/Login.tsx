import { useContext, useState, useEffect } from "react"

import Div from "@jumbo/shared/Div"
import { Card, CardContent, Typography } from "@mui/material"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from "app/services/config"
import { urlLogin } from "core/utils/endpoints"
import { useNavigate } from "react-router-dom"
import { credentialsUser, responseAuth } from "./auth.model"
import AuthenticationContext from "./AuthenticationContext"
import { obtenerClaims, saveTokenLocalStorage } from "./handlerJWT"
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField"
import LoadingButton from "@mui/lab/LoadingButton"
import { getAssetPath } from "app/utils/appHelpers"
import { ASSET_IMAGES } from "app/utils/constants/paths"
import { Form, Formik } from "formik"
import Divider from '@mui/material/Divider'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'

import * as yup from "yup"

const validationSchema = yup.object().shape({
    username: yup.string()
        .required('Usuario es obligatorio'),
    password: yup
        .string()
        .min(1, "Ingrese una contraseña valida.")
        .required('La contraseña es obligatoria'),
});


export default function Login() {

    const [cookies, setCookie] = useCookies(['config'])
    const [token, setToken] = useState("")
    const [load, setLoad] = useState(false)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1A3873',
            },
            secondary: {
                main: '#F2A71B',
            },
        },
        typography: {
            fontFamily: [
                'NoirPro',
                'sans-serif'
            ].join(','),
        },
    })

    const { actualizar } = useContext(AuthenticationContext);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    async function login(credentials: credentialsUser) {
        setLoad(true)
        try {
            await axios.post<responseAuth>(`${process.env.REACT_APP_LOGIN}`, {username: `${credentials.username}`, password: credentials.password})
                .then((response) => {
                    saveTokenLocalStorage(response.data);
                    actualizar(obtenerClaims());
                    navigate("/");
                    setLoad(false)
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: '<strong style="font-family: NoirPro">Credenciales invalidas.</strong>',
                        icon: 'error',
                        html: 'Verifica la información ingresada.',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                    })
                    setLoad(false)
                })

        } catch (error) {
            setErrors(error.response.data)
            setLoad(false)
        }
    }

    const zeroFill = (number, width) => {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + "";
    }
    const handleVerify = (event: any) => {
        setToken(event)
    }

    return (
        <Div sx={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            margin: 0,
            background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/folder/bg.jpg`, "640x428")}) no-repeat center`,
            backgroundSize: 'cover'
        }}>
            <Div sx={{
                display: 'flex',
                width: '80%',
                maxWidth: 1524,
                minWidth: 360,
                height: 420,
                alignItems: 'center',
                justifyContent: 'right',
                margin: 'auto',
            }}>
                <Card
                    sx={{
                        minWidth: 0,
                        width: 370,
                        paddingTop: 2,
                        marginLeft: '0',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <CardContent sx={{ flex: 1, pt: 0, pl: 4, pr: 4, textAlign: 'center' }} >

                        <img src={`${ASSET_IMAGES}/logo.png`} style={{ width: 250, marginTop: 35 }} alt="" />
                        <Typography variant={"h3"} mb={5} sx={{ mt: 4, color: '#323050' }}>Software Logistico</Typography>
                        <Formik
                            validateOnChange={true}
                            enableReinitialize={false}
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={
                                async values => await login(values)
                            }
                        >
                            {({ isSubmitting, isValid  }) => (
                                <Form style={{ textAlign: 'left' }}>
                                    <Div sx={{ mt: 5, mb: 1 }}>

                                        <JumboTextField
                                            fullWidth
                                            name="username"
                                            label="Usuario"
                                        />
                                    </Div>
                                    <Div sx={{ mt: 3, mb: 2 }}>
                                        <JumboTextField
                                            fullWidth
                                            name="password"
                                            label="Clave"
                                            type="password"
                                        />

                                    </Div>
                                    <LoadingButton
                                        loading={load}
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ mb: 2, mt:4 }}
                                        disabled={!isValid}
                                    >
                                        Ingresar
                                    </LoadingButton>
                                </Form>
                            )}
                        </Formik>

                        <Divider> <Typography variant="h5" component="h5" sx={{ color: '#323050' }}> O </Typography> </Divider>

                        <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled
                            sx={{ mt: 2 }}
                            onClick={() => { window.location.href = `${process.env.REACT_APP_REGISTER_PAGE}` }}
                        >
                            Registrarse
                        </LoadingButton>
                    </CardContent>
                </Card>
            </Div>

        </Div>

    )
}