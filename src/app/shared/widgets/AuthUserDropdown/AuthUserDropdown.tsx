import { useState, useEffect } from 'react'
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Div from "@jumbo/shared/Div";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { FormControl, ListItemIcon, ListItemText, MenuItem, Select, ThemeProvider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AuthenticationContext from 'core/auth/AuthenticationContext';
import { logout } from 'core/auth/handlerJWT';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { authUser } from "./fake-db";
import TextField from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

const AuthUserDropdown = () => {
    const { actualizar, claims } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const { theme } = useJumboTheme();
    const [name, setName] = useState('')
    const [company, setCompany] = useState(1)

    useEffect(() => {
        (async () => {
            let dataClient = localStorage.getItem('userClient')
            if (dataClient) {
                let parseDataClient = JSON.parse(dataClient)
                setName(`${parseDataClient.user.person.nombres}`)
            }
        })();
    }, [])

    function getNameUser(): string {

        return claims.filter(x => x.name === "name")[0]?.value;
    }
    const handleChange = (event: any) => {
        setCompany(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={company}
                    label="Empresa"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>AMARU</MenuItem>
                    <MenuItem value={2}>TEST 2</MenuItem>
                </Select>
            </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;
            
            <JumboDdPopover
                triggerButton={
                    <Avatar
                        src={authUser.profile_pic}
                        sizes={"small"}
                        sx={{ boxShadow: 3, cursor: 'pointer', bgcolor: process.env.REACT_APP_COLOR_TEXT }}
                    />
                }
            >
                <Div sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minWidth: 180,
                    p: theme => theme.spacing(2.5),
                }}>

                    <Typography variant={"body2"} color="text.primary">Sistema de ventas</Typography>
                </Div>
                <Divider />
                <nav>
                    <List disablePadding sx={{ pb: 1 }}>
                        <ListItemButton onClick={() => {
                            logout();
                            actualizar([]);
                        }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Salir" sx={{ my: 0 }} />
                        </ListItemButton>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export default AuthUserDropdown;
