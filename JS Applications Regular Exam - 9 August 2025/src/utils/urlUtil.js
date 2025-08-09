const BASE_URL = `http://localhost:3030`;

export const urlUtil = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    allGET: BASE_URL + `/data/mindfultips?sortBy=_createdOn%20desc`,
    createPOST: BASE_URL + `/data/mindfultips`,
    details: BASE_URL + `/data/mindfultips/`
}; 