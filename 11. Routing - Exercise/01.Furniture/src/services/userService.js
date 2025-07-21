function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

function getUserId() {
    let userData = getUserData();
    if (userData) {
        return userData._id;
    }

    return null;
}

function getUserAccessToken() {
    let userData = getUserData();
    if (userData) {
        return userData.accessToken;
    }

    return null;
}

function setUserData(data) {
    if (data != undefined && data != null) {
        sessionStorage.setItem('userData', JSON.stringify(data));
    }
}

function clearUserData() {
    let userData = getUserData();
    if (userData != null) {
        sessionStorage.removeItem('userData');
    }
}

export const userService = {
    getUserId,
    getUserAccessToken,
    getUserData,
    setUserData,
    clearUserData
};