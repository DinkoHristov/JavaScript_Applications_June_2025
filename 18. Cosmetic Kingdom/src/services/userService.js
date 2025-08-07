import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

//TODO check if more properties need instead of: email and password only
async function login(email, password) {
    let data = await request.postAsync(urlUtil.loginPOST, { email, password });
    userUtil.setUserData(data);
}

//TODO check if more properties need instead of: email and password only
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