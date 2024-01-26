import { urlCore } from "core/utils/endpoints"

//-----------------------------------------------------------------

const api_external = "http://localhost:8089/api"


const GetClients = async (state) => {
    let query = `state=${state}`

    return fetch(`${urlCore}/listPersons?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetDataValid01 = async (dni) => {

    let query = `pnvNumDocumento=${dni}`
    return fetch(`${api_external}/Contribuyente/Documento?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetObligations = async () => {
    let dataClient = localStorage.getItem('userClient')
    let codeUser
    if (dataClient) {
        let parseDataClient = JSON.parse(dataClient)
        codeUser = zeroPad(parseDataClient.user, 12)
        console.log(codeUser)
    }
    let query = `pcCodRegContribuyente=${codeUser}`
    return fetch(`${urlCore}/api/obligations?${query}`, {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }, 
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetInstitucions = async() => {
    return fetch(`${urlCore}/api/institutions`, {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }, 
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetDependencies = async(code: string) => {
    let query = `pcCodMaeAcreedor=${code}`
    return fetch(`${urlCore}/api/dependency?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetTributes = async(acred: string, inst: string) => {
    let query = `pcCodMaeAcreedor=${acred}&pcCodMaeAreaInstitucion=${inst}`
    return fetch(`${urlCore}/api/tribute?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetConcept = async(acred: string, inst: string, trib: string) => {
    let query = `pcCodMaeAcreedor=${acred}&pcCodMaeAreaInstitucion=${inst}&pcCodMaeClasTributo=${trib}`
    return fetch(`${urlCore}/api/concepts?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetAmount = async(acred: string, inst: string, trib: string, concept: string) => {
    let query = `pcCodMaeAcreedor=${acred}&pcCodMaeAreaInstitucion=${inst}&pcCodMaeClasTributo=${trib}&pcCodMaeClasConcepto=${concept}`
    return fetch(`${urlCore}/api/detail?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}


const setToken = async() => {
    let token = await localStorage.getItem('token')
    return token
}

const GetToken = async (amount:string = "0.00", codeUser:string = "") => {
    return fetch(`${urlCore}/api/getToken?amount=${amount}&code=${codeUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }
    })
        .then(data => data.json())
}

const GetPayment = async (operation:string) =>{
    let query = `purchaseNumber=${operation}`
    return fetch(`${urlCore}/api/getPayment?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await setToken()
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }
    return zeroString+n;
}

export default {
    GetObligations,
    GetClients,
    GetDataValid01,
    GetInstitucions,
    GetDependencies,
    GetTributes,
    GetConcept,
    GetAmount,
    GetToken,
    GetPayment
}