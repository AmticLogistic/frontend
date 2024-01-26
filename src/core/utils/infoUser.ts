
const GetInfoUser = async () =>{

    const dataUser = localStorage.getItem('userClient')
    if (dataUser){
        let user = JSON.parse(dataUser)
        return {
            id: user['user'].id,
            name: user['user']['person'].nombres + user['user']['person'].paterno 
        }
    }
    return null

}

export default {
    GetInfoUser
}