import { claim, responseAuth } from "./auth.model";
import moment from "moment/moment";

const keyToken = "token";
const keyExpiration = "token-expiration";

export function saveTokenLocalStorage(authentication: any) {
    let userInfo = {
        displayname:authentication.displayname, 
        expirationTime:authentication.expirationTime,  
        mail:authentication.mail, 
        name:authentication.name,
        user:authentication.user,
        document: authentication.userClient
    }
    localStorage.setItem(keyToken, authentication.token);
    localStorage.setItem('userClient', JSON.stringify(userInfo))
    localStorage.setItem(keyExpiration, authentication.expirationTime)
}

export function obtenerClaims(): claim[] {
    const token = localStorage.getItem(keyToken);

    if (!token) {
        return [];
    }
    // data expiration unix string
    const expiration = localStorage.getItem(keyExpiration);

    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
        logout();
        return [];
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    // data expiration unix
    const currentTime = moment().unix();
    if (currentTime > dataToken.exp) {
        logout();
        return [];
    }
    const response: claim[] = [];

    for (const property in dataToken) {
        response.push({ name: property, value: dataToken[property] })
    }
    return response;
}

export function logout() {
    localStorage.removeItem(keyToken);
    localStorage.removeItem(keyExpiration)
}

export function getToken() {
    return localStorage.getItem(keyToken);
}