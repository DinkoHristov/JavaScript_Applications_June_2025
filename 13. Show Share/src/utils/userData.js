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
    sessionStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    let userData = getUserData();
    if (userData) {
        sessionStorage.removeItem('userData');
    }
}

export const userInfo = {
    getUserData,
    getUserId,
    getUserAccessToken,
    setUserData,
    clearUserData
};