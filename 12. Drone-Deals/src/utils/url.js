const BASE_ADDRESS = `http://localhost:3030/`;

export const url = {
    loginPOST: BASE_ADDRESS + `users/login`,
    registerPOST: BASE_ADDRESS + `users/register`,
    logoutGET: BASE_ADDRESS + `users/logout`,
    dashboardGET: BASE_ADDRESS + `data/drones?sortBy=_createdOn%20desc`,
    addDronePOST: BASE_ADDRESS + `data/drones`,
    droneDetailsGET: BASE_ADDRESS + `data/drones/`,
    editDronePUT: BASE_ADDRESS + `data/drones/`,
    deleteDroneDELETE: BASE_ADDRESS + `data/drones/`
};