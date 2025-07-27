const BASE_URL = `http://localhost:3030`;

//TODO change urls to required ones
export const urlUtil = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    
    allGET: BASE_URL + `/data/motorcycles?sortBy=_createdOn%20desc`,
    addPOST: BASE_URL + `/data/motorcycles`,
    showDetails: BASE_URL + `/data/motorcycles/`,
    searchGET: (query) => BASE_URL + `/data/motorcycles?where=model%20LIKE%20%22${query}%22`
}; 