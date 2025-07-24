const BASE_URL = `http://localhost:3030`;

export const url = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    allShowsGET: BASE_URL + `/data/shows?sortBy=_createdOn%20desc`,
    createShowPOST: BASE_URL + `/data/shows`,
    showDetails: BASE_URL + `/data/shows/`
}; 