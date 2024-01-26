import React, { Suspense, useEffect, useState } from 'react'
import { IconButton, Typography } from "@mui/material"
import menus from "./menus"
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar"
import { DrawerHeader } from "@jumbo/components/JumboLayout/style"
import JumboScrollbar from "@jumbo/components/JumboScrollbar"
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar"
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme"
import { createTheme } from '@mui/material/styles'
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout"
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Zoom from "@mui/material/Zoom"
import Div from "@jumbo/shared/Div"
import SidebarSkeleton from "./SidebarSkeleton"
import Logo from 'app/shared/Logo'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

const Sidebar = () => {

    const [menu, setMenu] = useState([])
    const [nameProfile, setNameProfile] = useState("")
    const [code, setCode] = useState("")
    const [document, setDocument] = useState("")

    useEffect(() => {
        (async () => {
            let dataClient = localStorage.getItem('userClient')
            if (dataClient) {
                let parseDataClient = JSON.parse(dataClient)
                setNameProfile(parseDataClient.displayname)
                setCode(parseDataClient.user)
                setDocument(parseDataClient.document)
            }
            let data = await menus
            setMenu(data)
        })();
    }, [])

    const theme = createTheme({
        palette: {
            primary: {
                main: "#BF0637",
            },
            secondary: {
                main: "#F28B0C",
            },
        },
        typography: {
            fontFamily: [
                'NoirPro',
                'sans-serif'
            ].join(','),
        },
    })
    const stringToColor = (string: string) => {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }
    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            <React.Fragment>
                <SidebarHeader />
                <JumboScrollbar
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                >
                    <Suspense
                        fallback={
                            <Div
                                sx={{
                                    display: 'flex',
                                    minWidth: 0,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    px: 3
                                }}
                            >
                                <SidebarSkeleton />
                            </Div>
                        }
                    >
                        {
                            nameProfile &&
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant={"h5"} color={'#e60055'} m={'auto'} mb={1} mt={1} align='center' width={150}>{code}</Typography>
                                <Avatar {...stringAvatar(nameProfile)} sx={{ width: 60, height: 60, fontSize: 28, margin: 'auto' }} />
                                <Typography variant={"body1"} color={'#595959'} m={'auto'} mb={1} mt={1} align='center' width={150}>{nameProfile}</Typography>
                                <Typography variant={"body2"} color={'#595959'} m={'auto'} mb={5} mt={1} align='center' width={150}>{document}</Typography>
                            </div>

                        }

                        <JumboVerticalNavbar translate items={menu} theme={theme} />
                    </Suspense>
                </JumboScrollbar>
            </React.Fragment>


        </>
    )
};

const SidebarHeader = () => {
    const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
    const { sidebarTheme } = useJumboSidebarTheme();

    const isMiniAndClosed = React.useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions.view, sidebarOptions.open]);


    return (
        <React.Fragment>
            {
                sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <DrawerHeader>
                    <Logo mini={isMiniAndClosed} mode={sidebarTheme.type} sx={{ mr: 3 }} />
                    {
                        sidebarOptions?.view !== SIDEBAR_VIEWS.MINI &&
                        <Zoom in={sidebarOptions?.open}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ ml: 0, mr: -1.5 }}
                                onClick={() => setSidebarOptions({ open: false })}
                            >
                                <MenuOpenIcon />
                            </IconButton>
                        </Zoom>
                    }
                </DrawerHeader>
            }
        </React.Fragment>
    )
};

export default Sidebar;
