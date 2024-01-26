import {alpha} from "@mui/material/styles";

export const sidebarTheme = {
    type: "light",
    palette: {
        primary: {
            main: process.env.REACT_APP_COLOR_PRIMARY,
            light: process.env.REACT_APP_COLOR_PRIMARY,
            dark: process.env.REACT_APP_COLOR_PRIMARY,
            contrastText: '#FFF'
        },
        secondary: {
            main: process.env.REACT_APP_COLOR_SECUNDARY,
            light: process.env.REACT_APP_COLOR_SECUNDARY,
            dark: process.env.REACT_APP_COLOR_SECUNDARY,
            contrastText: '#FFF'
        },
        error: {
            main: process.env.REACT_APP_COLOR_ERROR,
            light: process.env.REACT_APP_COLOR_ERROR,
            dark: process.env.REACT_APP_COLOR_ERROR,
            contrastText: '#FFF'
        },
        warning: {
            main: process.env.REACT_APP_COLOR_WARNING,
            light: process.env.REACT_APP_COLOR_WARNING,
            dark: process.env.REACT_APP_COLOR_WARNING,
            contrastText: '#FFF'
        },
        info: {
            main: process.env.REACT_APP_COLOR_INFO,
            light: process.env.REACT_APP_COLOR_INFO,
            dark: process.env.REACT_APP_COLOR_INFO,
            contrastText: '#FFF'
        },
        success: {
            main: process.env.REACT_APP_COLOR_SUCCESS,
            light: process.env.REACT_APP_COLOR_SUCCESS,
            dark: process.env.REACT_APP_COLOR_SUCCESS,
            contrastText: '#FFF'
        },
        text: {
            primary: '#475259',
            secondary: '#8595A6',
            disabled: '#A2B2C3',
        },
        nav: {
            action: {
                active: process.env.REACT_APP_COLOR_PRIMARY,
                hover: process.env.REACT_APP_COLOR_PRIMARY,
            },
            background: {
                active: alpha(process.env.REACT_APP_COLOR_PRIMARY, .15),
                hover: "#F2F2F2"
            },
            tick: {
                active: process.env.REACT_APP_COLOR_PRIMARY,
                hover: "#F2F2F2"
            }
        },
        divider : '#DEE2E6',
        background: {
            paper: '#FFFFFF',
            default: '#F5F7FA',
        },
        action: {
            active: '#475259',
            hover: '#F5F7FA',
        },
    }
};