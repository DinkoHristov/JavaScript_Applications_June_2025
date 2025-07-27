import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

async function login(email, password) {
    let data = await request.postAsync(urlUtil.loginPOST, { email, password });
    userUtil.setUserData(data);
}

async function register(email, password) {
    let data = await request.postAsync(urlUtil.registerPOST, { email, password });
    userUtil.setUserData(data);
}

async function logout() {
    await request.getAsync(urlUtil.logoutGET);
    userUtil.clearUserData();
}

export const user = {
    login,
    register,
    logout
}