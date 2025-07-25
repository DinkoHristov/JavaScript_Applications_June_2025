import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";
import { userInfo } from "../utils/user.js";

async function login(email, password) {
    let data = await request.postAsync(url.loginPOST, { email, password });
    userInfo.setUserData(data);
}

async function register(email, password) {
    let data = await request.postAsync(url.registerPOST, { email, password });
    userInfo.setUserData(data);
}

async function logout() {
    await request.getAsync(url.logoutGET);
    userInfo.clearUserData();
}

export const user = {
    login,
    register,
    logout
};