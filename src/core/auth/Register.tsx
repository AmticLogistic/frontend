import axios from "app/services/config";
import { urlAccount } from "core/utils/endpoints";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { credentialsUser, responseAuth } from "./auth.model";
import AuthenticationContext from "./AuthenticationContext";
import { obtenerClaims, saveTokenLocalStorage } from "./handlerJWT";
import Stack from "@mui/material/Stack";
import {Facebook, Google, Twitter} from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import {Card, CardContent, Checkbox, FormControlLabel, IconButton, Typography} from "@mui/material";
import * as yup from "yup";
import {Form, Formik} from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
    username: yup
        .string()        
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});
export default function Register(){

    const {actualizar} = useContext(AuthenticationContext);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    async function register(credentials: credentialsUser){
        try {
            const response = await
                axios.post<responseAuth>(`${urlAccount}/crear`, credentials); 
                saveTokenLocalStorage(response.data);
                actualizar(obtenerClaims());
                navigate("/");
                         
            
        } catch (error) {
            setErrors(error.response.data);
        }
    }
    return(
        <Div sx={{
            width: 720,
            maxWidth: '100%',
            margin: 'auto',
            p: 4
        }}>
            <Card
                sx={{
                    display: 'flex',
                    minWidth: 0,
                    flexDirection: {xs: 'column', md: 'row'}
                }}
            >
                
                <CardContent sx={{flex: 1, p: 4}}
                >
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={
                            //     (data, {setSubmitting}) => {
                            //     setSubmitting(true);
                            //     // onSignIn(data.email, data.password);
                            //     setSubmitting(false);
                            // }
                            async values => await register(values)
                        }
                    >
                        {({isSubmitting}) => (
                            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                <Div sx={{mt: 1, mb: 3}}>
                                    <JumboTextField
                                        fullWidth
                                        name="username"
                                        label="username"
                                    />
                                </Div>
                                <Div sx={{mt: 1, mb: 2}}>
                                    <JumboTextField
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Div>
                                <Div sx={{mb: 2}}>
                                    <FormControlLabel control={<Checkbox/>} label="Remember me"/>
                                </Div>
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{mb: 3}}
                                    disabled={isSubmitting}
                                >Sign In</LoadingButton>
                                {
                                    !isSubmitting && (
                                        <React.Fragment>
                                            <Typography variant={"body1"} mb={2}>Or sign in with</Typography>
                                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                                <IconButton sx={{
                                                    bgcolor: '#385196',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#385196',
                                                    }
                                                }} aria-label="Facebook">
                                                    <Facebook fontSize="small"/>
                                                </IconButton>
                                                <IconButton sx={{
                                                    bgcolor: '#00a8ff',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#00a8ff',
                                                    }
                                                }} aria-label="Twitter">
                                                    <Twitter fontSize="small"/>
                                                </IconButton>
                                                <IconButton sx={{
                                                    bgcolor: '#23272b',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#23272b',
                                                    }
                                                }} aria-label="Twitter">
                                                    <Google fontSize="small"/>
                                                </IconButton>
                                            </Stack>
                                        </React.Fragment>
                                    )
                                }

                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Div>
    )
    
}