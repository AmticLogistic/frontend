import Typography from '@mui/material/Typography'
import Div from "@jumbo/shared/Div"
import { getAssetPath } from "app/utils/appHelpers"
import { ASSET_IMAGES } from "app/utils/constants/paths"
import { useNavigate } from "react-router-dom"

const Main = () => {

    const navigate = useNavigate()

    return (
        <>
            <Div sx={{
                display: 'flex',
                width: '100%',
                minHeight: 880,
                margin: 0,
                background: `white url(${getAssetPath(`${ASSET_IMAGES}/folder/portada.jpg`, "640x428")}) no-repeat center`,
                backgroundSize: 'cover',
                borderRadius: 11
            }}>
                <Div sx={{
                    display: 'flex',
                    width: '80%',
                    maxWidth: 1524,
                    minWidth: 360,
                    height: 420,
                    alignItems: 'center',
                    justifyContent: 'left',
                    margin: 'auto',
                }}>
                    <Div>
                        <Typography variant="h1" component="h1">Amtic</Typography ><br /><br />
                        <Div sx={{ maxWidth: 380, mb:8 }} b>
                            <p style={{ fontSize: 18, color: '#343442' }}>
                                ¡Descubre la innovación tecnológica que cambiará tu vida! Presentamos los productos más avanzados y emocionantes que el mercado tiene para ofrecerte.

                            </p>
                            <br />
                            <p style={{ fontSize: 18, color: '#343442' }}>
                                Desde dispositivos inteligentes hasta gadgets revolucionarios, tenemos todo lo que necesitas para potenciar tu experiencia tecnológica.
                                Permítenos llevarte a un nuevo nivel de conectividad y comodidad.
                            </p>
                        </Div>
                       
                        <br /><br />

                    </Div>
                </Div>
            </Div >
        </>
    )
}
export default Main