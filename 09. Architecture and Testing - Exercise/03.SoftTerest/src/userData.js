function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

function getUserAccessToken() {
    return getUserData()?.accessToken;
}

function getUserId() {
    return getUserData()?._id;
}

function getUserEmail() {
    return getUserData()?.email;
}

function setUserData(data) {
    if (data != null) {
        sessionStorage.setItem('userData', JSON.stringify(data));
    }
}

function clearUserData() {
    sessionStorage.clear();
}

export const userUtils = {
    getUserAccessToken,
    getUserId,
    getUserEmail,
    setUserData,
    clearUserData
}