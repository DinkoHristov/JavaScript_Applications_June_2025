const BASE_URL = `http://localhost:3030`;

export const url = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    allSolutionsGET: BASE_URL + `/data/solutions?sortBy=_createdOn%20desc`,
    createSolutionPOST: BASE_URL + `/data/solutions`,
    showDetails: BASE_URL + `/data/solutions/`,
    postLike: BASE_URL + `/data/likes`,
    getAllLikes: (solutionId) => BASE_URL + `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    getAllLikesForUser: (solutionId, userId) => BASE_URL + `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}; 