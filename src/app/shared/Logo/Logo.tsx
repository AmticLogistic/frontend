import React from 'react';
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material"
import {ASSET_IMAGES} from "../../utils/constants/paths";
import { useCookies } from 'react-cookie'
import { urlResource } from './../../../core/utils/endpoints'


const Logo = ({mini, mode, sx}) => {

    const [cookies, setCookie] = useCookies(['config'])

    return (
        <Div sx={{display: "inline-flex", ...sx}}>
            <Link href={'/'} style={{textAlign:'center', width:135}}>
                <img src={`/images/logo.png`} width={120} style={{marginTop:10}} alt="Logo" />
            </Link>
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
