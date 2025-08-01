const BASE_URL = `http://localhost:3030`;

export const urlUtil = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    
    allGET: BASE_URL + `/data/fruits?sortBy=_createdOn%20desc`,
    createFruitPOST: BASE_URL + `/data/fruits`,
    details: BASE_URL + `/data/fruits/`,
    searchGET: (query) => BASE_URL + `/data/fruits?where=name%20LIKE%20%22${query}%22`
}; 