const urls = {
    registerUrl: `http://localhost:3030/users/register`,
    loginUrl: `http://localhost:3030/users/login`,
    logoutUrl: `http://localhost:3030/users/logout`,
    dashboardUrl: `http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`,
    createUrl: `http://localhost:3030/data/ideas`,
    detailsUrl: `http://localhost:3030/data/ideas/`,
    deleteUrl: `http://localhost:3030/data/ideas/`,
};

export const utils = {
    urls,
}