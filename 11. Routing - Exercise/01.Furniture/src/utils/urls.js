export const urls = {
    registerPOST: `http://localhost:3030/users/register`,
    loginPOST: `http://localhost:3030/users/login`,
    logoutGET: `http://localhost:3030/users/logout`,
    createFurniturePOST: `http://localhost:3030/data/catalog`,
    allFurnituresGET: `http://localhost:3030/data/catalog`,
    furnitureDetailsGET: `http://localhost:3030/data/catalog/`,
    updateFurniturePUT: `http://localhost:3030/data/catalog/`,
    deleteFurnitureDELETE: `http://localhost:3030/data/catalog/`,
    getMyFurniture: `http://localhost:3030/data/catalog?where=_ownerId%3D%22`
};