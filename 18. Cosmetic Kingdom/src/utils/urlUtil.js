const BASE_URL = `http://localhost:3030`;

export const urlUtil = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    allGET: BASE_URL + `/data/products?sortBy=_createdOn%20desc`,
    createProductPOST: BASE_URL + `/data/products`,
    productDetails: BASE_URL + `/data/products/`,
    buyProductPOST: BASE_URL + `/data/bought`,
    totalBoughtsGET: (productId) => BASE_URL + `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    userBoughtsGET: (productId, userId) => BASE_URL + `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}; 