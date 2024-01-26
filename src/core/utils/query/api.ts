
// const api_external = "http://localhost:8000/api"
const api_external = `${process.env.REACT_APP_API_URL}/api`

const GetCategorias = async () => {
    return fetch(`${api_external}/almacen/listCategorias`, {
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
const SaveCategorias = async (data) => {
    return fetch(`${api_external}/almacen/saveCategorias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const EditCategorias = async (data) => {
    return fetch(`${api_external}/almacen/editCategorias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const GetMarcas = async () => {
    return fetch(`${api_external}/almacen/listMarcas`, {
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
const SaveMarcas = async (data) => {
    return fetch(`${api_external}/almacen/saveMarcas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const EditMarcas = async (data) => {
    return fetch(`${api_external}/almacen/editMarcas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const GetMateriales = async () => {
    return fetch(`${api_external}/almacen/listMateriales`, {
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

const Getkardex = async (init, end) => {
    return fetch(`${api_external}/report/kardex/${init}/${end}`, {
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

const GetOrdenes = async (provider, init, end) => {
    return fetch(`${api_external}/report/ordenes/${provider}/${init}/${end}`, {
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

const GetServicios = async () => {
    return fetch(`${api_external}/almacen/listServicios`, {
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

const oneMaterial = async (id) => {
    return fetch(`${api_external}/almacen/oneMaterial/${id}`, {
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
const deleteMaterial = async (id) => {
    return fetch(`${api_external}/almacen/deleteMaterial/${id}`, {
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

const SaveMateriale = async (data) => {
    return fetch(`${api_external}/almacen/saveMaterial`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetUtils = async () => {
    return fetch(`${api_external}/almacen/utils`, {
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

const getPersons = async () => {
    return fetch(`${api_external}/utils/getPersons`, {
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

const getProviders = async () => {
    return fetch(`${api_external}/utils/getProviders`, {
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

const getTrans = async () => {
    return fetch(`${api_external}/utils/getTransport`, {
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
const getTransports = async () => {
    return fetch(`${api_external}/utils/getTransports`, {
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

const SaveRequerimiento = async (data) => {
    return fetch(`${api_external}/process/saveRequerimiento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const savePersonal = async (data) => {
    return fetch(`${api_external}/utils/savePersonal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}


const ListRequerimientos = async (init: string, end: string) => {
    return fetch(`${api_external}/process/listRequerimientos/${init}/${end}`, {
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

const SaveOrden = async (data) => {
    return fetch(`${api_external}/process/saveOrden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const SaveInput = async (data) => {
    return fetch(`${api_external}/process/saveInput`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const obtenerEntradas = async (init, end) => {
    return fetch(`${api_external}/process/obtenerEntradas/${init}/${end}`, {
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

const deleteOutput = async (id) => {
    return fetch(`${api_external}/process/deleteOutput/${id}`, {
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

const SaveOutput = async (data) => {
    return fetch(`${api_external}/process/saveOutput`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const getDataOrder = async (id) => {
    return fetch(`${api_external}/utils/getOrderOne/${id}`, {
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

const ListOrdenes = async (init: string, end: string) => {
    return fetch(`${api_external}/process/listOrden/${init}/${end}`, {
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

const listOutput = async (init, end) => {
    return fetch(`${api_external}/process/listOutput/${init}/${end}`, {
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

const getCCostos = async () => {
    return fetch(`${api_external}/utils/getCCostos`, {
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
const saveCCostos = async (data) => {
    return fetch(`${api_external}/utils/saveCCostos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const deleteCCostos = async (data) => {
    return fetch(`${api_external}/utils/deleteCCostos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const getRUC = async (ruc: string) => {
    let url = `https://dniruc.apisperu.com/api/v1/ruc/${ruc}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFtdGljbG9naXN0aWNAZ21haWwuY29tIn0.wpsLDrvqNzYkwaXJnANGFTcEGc_16fT77wC4vopv0wk`
    return fetch(url, {
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
const saveProviders = async (data) => {
    return fetch(`${api_external}/utils/saveProviders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const oneProviders = async (id) => {
    return fetch(`${api_external}/utils/oneProviders/${id}`, {
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
const onePersonal = async (id) => {
    return fetch(`${api_external}/utils/onePersonal/${id}`, {
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

const saveTransports = async (data) => {
    return fetch(`${api_external}/utils/saveTransports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const getRequimentEdit = async (id) => {
    return fetch(`${api_external}/document/getRequiredEdit/${id}`, {
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
const getOrderBuyEdit = async (id) => {
    return fetch(`${api_external}/document/getOrderBuyEdit/${id}`, {
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

const deleteRequerimiento = async (id) => {
    return fetch(`${api_external}/process/deleteRequerimiento/${id}`, {
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

const deleteInput = async (id) => {
    return fetch(`${api_external}/process/deleteInput/${id}`, {
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

const deleteProvider = async (id) => {
    return fetch(`${api_external}/utils/deleteProvider/${id}`, {
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

const saveSolicitud = async (data) => {
    return fetch(`${api_external}/process/saveSolicitud`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const createUser = async (data) => {
    return fetch(`${api_external}/users/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const editUser = async (data) => {
    return fetch(`${api_external}/users/editUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const listUsers = async () => {
    return fetch(`${api_external}/users/listUsers`, {
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

const listRoles = async () => {
    return fetch(`${api_external}/users/listRoles`, {
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

const listUtils = async () => {
    return fetch(`${api_external}/users/listUtils`, {
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

const getDisponibleMaterial = async (id) => {
    return fetch(`${api_external}/almacen/disponible/${id}`, {
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

const inventory = async (init, end) => {
    return fetch(`${api_external}/report/inventory/${init}/${end}`, {
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

const saveInventario = async (data) => {
    return fetch(`${api_external}/process/saveInventario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const listInventario = async (init, end) => {
    return fetch(`${api_external}/process/listInventario/${init}/${end}`, {
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

const deleteInventory = async (id) => {
    return fetch(`${api_external}/process/deleteInventory/${id}`, {
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

const deletePersonal = async (id) => {
    return fetch(`${api_external}/utils/deletePersonal/${id}`, {
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

const saveRoles = async (data) => {
    return fetch(`${api_external}/users/saveRoles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}



const dashboard = async () => {
    return fetch(`${api_external}/utils/dashboard`, {
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



export default {
    dashboard,
    GetCategorias,
    SaveCategorias,
    EditCategorias,
    GetMarcas,
    SaveMarcas,
    EditMarcas,
    GetMateriales,
    GetUtils,
    SaveMateriale,
    GetServicios,
    getPersons,
    SaveRequerimiento,
    ListRequerimientos,
    getProviders,
    SaveOrden,
    ListOrdenes,
    getTrans,
    SaveInput,
    obtenerEntradas,
    getDataOrder,
    getCCostos,
    SaveOutput,
    listOutput,
    Getkardex,
    saveCCostos,
    deleteCCostos,
    getTransports,
    getRUC,
    saveProviders,
    saveTransports,
    getRequimentEdit,
    deleteRequerimiento,
    saveSolicitud,
    getOrderBuyEdit,
    deleteInput,
    deleteOutput,
    listUsers,
    listUtils,
    listRoles,
    createUser,
    oneMaterial,
    deleteMaterial,
    deleteProvider,
    oneProviders,
    getDisponibleMaterial,
    inventory,
    saveInventario,
    listInventario,
    deleteInventory,
    saveRoles,
    savePersonal,
    onePersonal,
    deletePersonal,
    GetOrdenes,
    editUser
}