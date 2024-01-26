import React from "react"
import JWT from 'expo-jwt';
import { useParams } from "react-router-dom";

export default function Page() {

    let { page } = useParams();

    const link = () => {
        if (page) {
          const encode = JWT.decode(page, 'Olympus');
          return encode ? encode.route : 'URL_INVALIDA';
        }
        return 'URL_INVALIDA';
      }

    const iframeCSS = {
        width:'100%',
        height: 'calc(100vh - 160px)',
        border: 'none'
    }

    return (
        <>
            {/* <iframe src={link()} style={iframeCSS} title="Contenido externo"></iframe> */}
        </>
    )
}