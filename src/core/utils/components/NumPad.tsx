import Div from "@jumbo/shared/Div"
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField"
import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useCookies } from 'react-cookie'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const keysPath = numbers.sort((a, b) => 0.5 - Math.random());



const Numpad = ({setText}:any) => {

    const [cookies, setCookie] = useCookies(['config'])


    const styleButton = {
        display: "block",
        width: 28,
        height: 15,
        paddingTop: 3,
        paddingBottom: 8,
        borderRadius: 4,
        backgroundColor: "#E5DDDA",
        borderWidth:2,
        borderColor: "#98B3B1",
        cursor:'pointer',
        margin: 1,
        color: cookies.config['color-secundary'],
    }
    const styleButtonClear = {
        display: "block",
        height: 15,
        padding: 3,
        paddingTop: 3,
        paddingBottom: 8,
        borderRadius: 4,
        backgroundColor: "#E5DDDA",
        borderWidth:2,
        borderColor: "#98B3B1",
        cursor:'pointer',
        margin: 1
    }
    return (
        <>
            <Div>
                    <Grid container spacing={2}>
                        {
                            keysPath.map((number, key) => {
                                return (
                                    <Grid item xs={2} key={key}>
                                        <a style={styleButton} onClick={ ()=> { setText(number) } }>
                                            <Typography variant={"h5"} style={{textAlign:'center', verticalAlign:'center'}} mb={3}>{number}</Typography>
                                        </a>
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={4}>
                            <a style={styleButtonClear} onClick={ ()=> { setText(null) } }>
                                <Typography variant={"body1"} style={{textAlign:'center', verticalAlign:'center'}} mb={1}>
                                    Clear
                                </Typography>
                            </a>
                        </Grid>
                    </Grid>
            </Div>
        </>

    )
}

export default Numpad