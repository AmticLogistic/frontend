import React, { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizedProps){
    const [isAthorized, setisAthorized] = useState(false);
    const {claims} = useContext(AuthenticationContext);

    useEffect(() =>{
        if (props.role){
            const indice = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role)
            setisAthorized(indice > -1);
        } else{
            setisAthorized(claims.length > 0 );
        }
    }, [claims, props.role])
    return(
        <>
        {isAthorized ? props.authorized : props.noAuthorized}
        </>
    )
}
interface authorizedProps{
    authorized: ReactElement;
    noAuthorized?: ReactElement;
    role?: string;
}