import React from 'react';
import Stack from "@mui/material/Stack";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import AuthUserDropdown from "../../../../shared/widgets/AuthUserDropdown";
import NotificationsDropdown from "../../../../shared/NotificationsDropdown";
import MessagesDropdown from "../../../../shared/MessagesDropdown";
import SearchGlobal from "../../../../shared/SearchGlobal";
import { IconButton, Slide, Typography, useMediaQuery } from "@mui/material";
import Div from "@jumbo/shared/Div";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import JumboIconButton from "@jumbo/components/JumboIconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "../../../../shared/Logo";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utils/constants";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Header = () => {
    const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
    const [dropdownSearchVisibility, setDropdownSearchVisibility] = React.useState(false);
    const { headerTheme } = useJumboHeaderTheme();

    const showDropdownSearch = useMediaQuery('(max-width:575px)');

    return (
        <React.Fragment>
            {
                (
                    sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER
                    || sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY
                    || (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT && !sidebarOptions.open)
                ) &&
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                        ml: sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ? -2 : 0,
                        mr: 3,
                    }}
                    onClick={() => setSidebarOptions({ open: !sidebarOptions.open })}
                >
                    {
                        sidebarOptions?.open ? <MenuOpenIcon /> : <MenuIcon />
                    }
                </IconButton>
            }
            {
                sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <Logo sx={{ mr: 3 }} mode={headerTheme.type ?? "light"} mini={undefined} />
            }
            {
                showDropdownSearch &&
                <Slide in={dropdownSearchVisibility}>
                    <Div
                        sx={{
                            zIndex: 5,
                            left: 0,
                            right: 0,
                            position: 'absolute',
                            height: '100%',
                        }}
                    >
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 15,
                                top: '50%',
                                color: 'inherit',
                                transform: 'translateY(-50%)',
                            }}
                            onClick={() => setDropdownSearchVisibility(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Div>
                </Slide>
            }
            <Typography variant="h1" gutterBottom>
                
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ ml: "auto" }}>
              
                {/*<MessagesDropdown/>
                <NotificationsDropdown/>*/}
                <AuthUserDropdown />
            </Stack>
        </React.Fragment>
    );
};

export default Header;
