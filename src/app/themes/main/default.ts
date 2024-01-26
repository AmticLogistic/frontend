import { alpha } from "@mui/material";

export const mainTheme = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        }
    },

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
            primary: '#000000',
            secondary: '#8595A6',
            disabled: '#A2B2C3',
        },
        divider: '#DEE2E6',
        background: {
            paper: '#FFFFFF',
            default: '#F5F7FA',
        },
        action: {
            active: '#475259',
            hover: '#F5F7FA',
        },
    },
    shadows: [
        "none",
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
        "0 5px 10px rgba(0, 0, 0, 0.085)",
        "0 5px 10px rgba(0, 0, 0, 0.175)",
    ],
    typography: {
        fontFamily: 'NoirPro, Arial',
        fontSize: 14,
        h1: {
            fontSize: '1.5rem',
            fontWeight: 400,
            color: process.env.REACT_APP_COLOR_TEXT,
            margin: '0 0 .5rem',
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            color: process.env.REACT_APP_COLOR_TEXT,
            margin: '0 0 .5rem'
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: 400,
            color: process.env.REACT_APP_COLOR_TEXT,
            margin: '0 0 .5rem'
        },
        h4: {
            fontSize: '1.1rem',
            fontWeight: 400,
            color: process.env.REACT_APP_COLOR_TEXT,
            margin: '0 0 .5rem'
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 400,
            color: process.env.REACT_APP_COLOR_TEXT,
            margin: '0 0 .5rem'
        },
        h6: {
            fontSize: '.875rem',
            fontWeight: 400,
            color: process.env.REACT_APP_COLOR_TEXT,
            margin: '0 0 .5rem'
        },
        body1: {
            fontSize: '.875rem',
        }
    },
    components: {
        MuiTableHead: {
            styleOverrides: {
                root: {
                    background: ""
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: alpha('#000', 0.1)
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: 'auto',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: `0 0.5rem 1.25rem ${alpha('#7352C7', .175)}`
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 24
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '18px 24px'
                },
                title: {
                    fontSize: '1.1rem',
                    marginBottom: 0
                },
                subheader: {
                    margin: '4px 0 0'
                },
                action: {
                    margin: 0
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '8px 24px'
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    lineHeight:4
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    letterSpacing: 1,
                    borderRadius: 40

                },
                sizeSmall: {
                    fontSize: '12px'
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: 8
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: 18
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '16px 24px'
                }
            }
        },
        MuiAvatarGroup: {
            styleOverrides: {
                avatar: {
                    backgroundColor: '#757575',
                    fontSize: 16
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                cell: {
                    borderColor: '#e5e5e5',
                    color:'#595959',
                },
                columnHeader: {
                    background:'',
                    color:'',
                },
                columnHeaderTitle: {
                    fontWeight:'400',
                    borderColor:'',
                },
                footerContainer:{
                    background:'',
                }
            },
        },
    },
    jumboComponents: {
        JumboSearch: {
            background: '#F5F5F5'
        }
    }
};
