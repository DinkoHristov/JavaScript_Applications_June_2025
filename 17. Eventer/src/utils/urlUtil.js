const BASE_URL = `http://localhost:3030`;

export const urlUtil = {
    baseUrl: BASE_URL,
    loginPOST: BASE_URL + `/users/login`,
    registerPOST: BASE_URL + `/users/register`,
    logoutGET: BASE_URL + `/users/logout`,
    
    allEventsGET: BASE_URL + `/data/events?sortBy=_createdOn%20desc`,
    createEventPOST: BASE_URL + `/data/events`,
    eventDetails: BASE_URL + `/data/events/`,
    postGoing: BASE_URL + `/data/going`,
    getGoingCount: (eventId) => BASE_URL + `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    getUserGoingCount: (eventId, userId) => BASE_URL + `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}; 